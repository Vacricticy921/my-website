#!/usr/bin/env node

/**
 * markdown-to-json.js
 * 将markdown读书笔记转换为结构化JSON格式
 *
 * 使用方式：
 * node markdown-to-json.js <输入文件> [输出文件]
 * 示例：
 * node markdown-to-json.js readsNotes/分析与思考.md output.json
 */

const fs = require('fs');
const path = require('path');

// 解析markdown文件
function parseMarkdown(content) {
  const lines = content.split('\n');
  let currentChapter = null;
  let inBlockquote = false;
  let blockquoteContent = [];

  const result = {
    title: '',
    author: '',
    noteCount: '',
    chapters: []
  };

  // 先尝试提取书籍元数据（前几行）
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const line = lines[i].trim();
    if (line.startsWith('###') && !result.title) {
      // 提取标题，移除###和多余的*
      result.title = line.replace(/^#+\s*\**\s*|\**\s*$/g, '').trim();
    } else if (line && !result.author && !line.startsWith('###') && !line.startsWith('*')) {
      // 假设标题后的第一行非空行是作者
      result.author = line;
    } else if (line.includes('个笔记') && !result.noteCount) {
      result.noteCount = line;
    }
  }

  // 解析章节和要点
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 处理引用块
    if (line.startsWith('>')) {
      if (!inBlockquote) {
        inBlockquote = true;
        blockquoteContent = [];
      }
      blockquoteContent.push(line.replace(/^>\s*/, ''));
      continue;
    } else if (inBlockquote && line) {
      // 引用块内的续行（没有>前缀）
      blockquoteContent.push(line);
      continue;
    } else if (inBlockquote && !line) {
      // 引用块结束
      if (currentChapter && blockquoteContent.length > 0) {
        currentChapter.points.push({
          type: 'blockquote',
          text: blockquoteContent.join('\n')
        });
      }
      inBlockquote = false;
      blockquoteContent = [];
    }

    // 章节标题 (###)
    if (line.startsWith('###')) {
      // 保存之前的章节
      if (currentChapter) {
        result.chapters.push(currentChapter);
      }

      // 创建新章节
      const chapterTitle = line.replace(/^#+\s*\**\s*|\**\s*$/g, '').trim();
      currentChapter = {
        title: chapterTitle,
        points: []
      };
      continue;
    }

    // 要点 (*)
    if (line.startsWith('*')) {
      if (!currentChapter) {
        // 如果在章节外遇到要点，创建一个默认章节
        currentChapter = {
          title: '未分类',
          points: []
        };
      }

      const pointText = line.replace(/^\*\s*/, '').trim();

      // 检查是否有日期标记
      const dateMatch = pointText.match(/\*\*(\d{4}\/\d{2}\/\d{2})\s*(.*?)\*\*/);
      if (dateMatch) {
        currentChapter.points.push({
          type: 'dated_note',
          date: dateMatch[1],
          text: dateMatch[2].trim()
        });
      } else {
        currentChapter.points.push({
          type: 'point',
          text: pointText
        });
      }
      continue;
    }

    // 空行分隔
    if (!line && currentChapter && currentChapter.points.length > 0) {
      // 空行可能表示要点的结束，但这里我们继续
    }
  }

  // 添加最后一个章节
  if (currentChapter) {
    result.chapters.push(currentChapter);
  }

  return result;
}

// 主函数
function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log('使用方法: node markdown-to-json.js <输入文件> [输出文件]');
    console.log('示例: node markdown-to-json.js readsNotes/分析与思考.md output.json');
    process.exit(1);
  }

  const inputFile = args[0];
  const outputFile = args[1] || inputFile.replace(/\.(md|markdown)$/i, '') + '.json';

  try {
    // 读取输入文件
    const content = fs.readFileSync(inputFile, 'utf-8');

    // 解析markdown
    const parsedData = parseMarkdown(content);

    // 转换为JSON字符串
    const jsonString = JSON.stringify(parsedData, null, 2);

    // 写入输出文件
    fs.writeFileSync(outputFile, jsonString, 'utf-8');

    console.log(`✅ 转换成功！`);
    console.log(`   输入: ${inputFile}`);
    console.log(`   输出: ${outputFile}`);
    console.log(`   统计: ${parsedData.chapters.length} 个章节，共 ${
      parsedData.chapters.reduce((sum, chapter) => sum + chapter.points.length, 0)
    } 个要点`);

  } catch (error) {
    console.error('❌ 转换失败:', error.message);
    process.exit(1);
  }
}

// 执行主函数
if (require.main === module) {
  main();
}

// 导出解析函数供其他模块使用
module.exports = { parseMarkdown };