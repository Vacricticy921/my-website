# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 项目概述

这是一个使用 Next.js 15、TypeScript 和 Tailwind CSS 4 构建的个人网站。该网站作为作品集和旅游博客，包含两个主要部分：旅游经历和个人简历。

## 开发命令

### 核心开发

- `npm run dev` - 在 http://localhost:3000 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint 检查代码质量

### TypeScript 支持

- TypeScript 启用严格模式
- 路径别名配置：`@/*` 映射到 `./src/*`
- 类型检查在开发期间自动进行

## 架构

### 技术栈

- **框架**: Next.js 15 with App Router
- **语言**: TypeScript
- **样式**: Tailwind CSS 4（新的内联配置）
- **字体**: Geist Sans 和 Geist Mono 来自 Google Fonts
- **代码检查**: ESLint with Next.js 核心网页性能指标和 TypeScript 规则

### 项目结构

```
src/
├── app/                 # Next.js App Router 页面
│   ├── layout.tsx       # 根布局，包含元数据和字体
│   ├── page.tsx         # 首页，包含英雄区域和导航
│   ├── travel/          # 旅游经历页面
│   ├── resume/          # 个人简历页面
│   └── globals.css      # Tailwind CSS 主题配置
├── components/          # 可复用的 React 组件
│   └── Navigation.tsx   # 固定头部导航，带激活状态
└── styles/              # 额外的 CSS 样式
    └── globals.css      # 自定义 CSS 类和响应式设计
```

### 核心组件

#### 导航组件 (`src/components/Navigation.tsx`)

- 响应式设计的固定头部
- 使用 `usePathname` 进行激活状态追踪
- 悬停效果和平滑过渡
- 导航项：首页、旅游合集、个人简历

#### 页面结构

所有页面遵循一致的模式：

1. 导航组件
2. 渐变背景的英雄区域
3. 主要内容区域
4. 浅色背景的页脚

### 样式系统

#### Tailwind CSS 4 配置

- 在 `globals.css` 中使用新的内联配置
- 支持暗色模式，使用 `prefers-color-scheme`
- 主题颜色的自定义 CSS 变量
- Geist 字体集成

#### 自定义 CSS (`src/styles/globals.css`)

- 包含 box-sizing 的 CSS 重置
- 响应式网格系统
- 带有阴影的卡片组件
- 按钮样式和悬停效果
- 移动优先的响应式设计断点

### 内容管理

#### 旅游页面

- 数据驱动方式，使用硬编码的旅游目的地
- 每个目的地包括：标题、日期、描述、图片路径、亮点
- 使用渐变占位符进行动态渲染
- 基于标签的亮点系统

#### 简历页面

- 技能、经验和教育的结构化数据
- 桌面版双列布局，移动版单列布局
- 基于标签显示的技能类别
- 时间轴风格的经验展示

### 国际化

- 网站内容为简体中文
- 元数据和页面标题使用中文字符
- 导航标签和章节标题已本地化

## 开发说明

### 代码风格

- 使用严格类型检查的 TypeScript
- 函数式 React 组件
- 动态值的内联样式
- 静态样式的 CSS 类
- 一致的配色方案（#667eea 主色调，#764ba2 次色调）

### 资源管理

- 静态图片预期在 `public/` 目录中
- 旅游图片引用为 `/travel/filename.jpg`
- 目前使用渐变占位符作为旅游图片

### 响应式设计

- 移动优先方法
- 网格系统从 300px 最小列开始适应
- 导航在移动设备上适当折叠
- 字体大小针对不同屏幕尺寸进行缩放

## 构建和部署

### 构建过程

- Next.js 处理静态站点生成
- Tailwind CSS 在构建期间处理样式
- TypeScript 编译和类型检查
- ESLint 在构建完成前运行

### 部署考虑

- 兼容 Vercel、Netlify 等的静态站点
- 无外部 API 依赖
- 所有内容自包含
- 图片应针对网页传输进行优化

## 分支开发规范

### 分支命名约定

- 每日开发分支格式：`develope/YYYY-MM-DD`
- 示例：`develope/2025-09-21`
- 分支名称使用 UTC 日期

### 分支管理流程

1. **创建每日开发分支**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b develope/2025-09-21
   ```

2. **开发完成后合并到 main**
   ```bash
   git checkout main
   git merge develope/2025-09-21
   git push origin main
   ```

3. **清理已合并的分支**
   ```bash
   git branch -d develope/2025-09-21
   git push origin --delete develope/2025-09-21
   ```

### 分支策略

- **main**: 主分支，始终保持可部署状态
- **develope/YYYY-MM-DD**: 每日开发分支，包含当日所有开发内容
- 每天开始开发前创建新的开发分支
- 当日开发完成后，将分支合并到 main 并删除

### 提交规范

- 提交信息使用中文
- 提交格式：`类型: 简短描述`
- 类型包括：`feat`、`fix`、`docs`、`style`、`refactor`、`test`、`chore`
- 示例：`feat: 添加新的旅游目的地页面`
