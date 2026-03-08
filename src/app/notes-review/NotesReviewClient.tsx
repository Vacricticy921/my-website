'use client'

import { useState, useEffect } from 'react'

interface Point {
  type: string
  text: string
  date?: string
}

interface Chapter {
  title: string
  points: Point[]
}

interface BookData {
  title: string
  author: string
  noteCount: string
  chapters: Chapter[]
}

interface BookInfo {
  filename: string
  title: string
  author: string
  totalPoints: number
  chaptersCount: number
  bookData: BookData
}

interface NotesReviewClientProps {
  books: BookInfo[]
}

interface NotesReviewSessionProps {
  bookData: BookData
  totalPoints: number
}

// 复习会话组件，包含原有的复习逻辑
function NotesReviewSession({ bookData, totalPoints }: NotesReviewSessionProps) {
  // 调试：输出传入的 props
  console.log('NotesReviewSession: 渲染开始', {
    bookDataTitle: bookData?.title,
    totalPoints,
    chaptersCount: bookData?.chapters?.length
  })

  // 当前章节索引
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
  // 当前笔记索引（在当前章节中）
  const [currentPointIndex, setCurrentPointIndex] = useState(0)
  // 已复习的笔记数
  const [reviewedCount, setReviewedCount] = useState(0)
  // 撒花动效显示状态
  const [showConfetti, setShowConfetti] = useState(false)

  // 从 localStorage 加载保存的进度
  useEffect(() => {
    if (!bookData || !bookData.title) {
      console.log('加载进度: bookData 或 bookData.title 为空', { bookData })
      return
    }

    // bookData 可能已变化，重新加载进度

    const storageKey = `notes-review-progress-${bookData.title}`
    console.log('加载进度: 尝试加载键名', storageKey)
    const savedProgress = localStorage.getItem(storageKey)
    console.log('加载进度: 获取到的数据', savedProgress)

    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress)
        console.log('加载进度: 解析后的进度数据', progress)

        // 验证保存的数据结构
        if (
          typeof progress === 'object' &&
          typeof progress.currentChapterIndex === 'number' &&
          typeof progress.currentPointIndex === 'number' &&
          typeof progress.reviewedCount === 'number'
        ) {
          // 检查索引是否有效
          const validChapterIndex = Math.min(
            Math.max(0, progress.currentChapterIndex),
            bookData.chapters.length - 1
          )
          const validPointIndex = Math.min(
            Math.max(0, progress.currentPointIndex),
            (bookData.chapters[validChapterIndex]?.points || []).length - 1
          )
          const validReviewedCount = Math.min(
            Math.max(0, progress.reviewedCount),
            totalPoints
          )

          console.log('加载进度: 验证后的索引', {
            validChapterIndex,
            validPointIndex,
            validReviewedCount,
            totalPoints
          })

          setCurrentChapterIndex(validChapterIndex)
          setCurrentPointIndex(validPointIndex)
          setReviewedCount(validReviewedCount)

          console.log('加载进度: 状态已更新')
        } else {
          console.log('加载进度: 进度数据结构无效', progress)
        }
      } catch (error) {
        console.error('加载保存的进度失败:', error)
      }
    } else {
      console.log('加载进度: 没有找到保存的进度')
    }

    // 进度加载完成
  }, [bookData, totalPoints])

  // 撒花动效自动隐藏
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 2000) // 2秒后隐藏
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  // 保存进度到 localStorage 的辅助函数
  const saveProgress = (chapterIndex: number, pointIndex: number, count: number) => {
    if (!bookData || !bookData.title) {
      console.log('保存进度: bookData 或 bookData.title 为空')
      return
    }

    const storageKey = `notes-review-progress-${bookData.title}`
    const progress = {
      currentChapterIndex: chapterIndex,
      currentPointIndex: pointIndex,
      reviewedCount: count,
      lastUpdated: new Date().toISOString()
    }

    console.log('保存进度: 保存键名', storageKey)
    console.log('保存进度: 进度数据', progress)

    localStorage.setItem(storageKey, JSON.stringify(progress))
  }

  // 保护性检查
  if (!bookData || !bookData.chapters || bookData.chapters.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>书籍数据错误</h3>
        <p style={{ marginBottom: '1rem' }}>无法加载书籍数据或书籍没有章节内容。</p>
      </div>
    )
  }

  // 检查当前章节索引是否有效
  if (currentChapterIndex >= bookData.chapters.length) {
    // 如果当前章节索引无效，重置为0
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>章节数据错误</h3>
        <p style={{ marginBottom: '1rem' }}>当前章节索引无效，正在重置...</p>
        <button
          onClick={() => {
            setCurrentChapterIndex(0)
            setCurrentPointIndex(0)
          }}
          className="btn"
        >
          重新开始
        </button>
      </div>
    )
  }

  // 当前章节数据
  const currentChapter = bookData.chapters[currentChapterIndex]
  // 当前章节的笔记数据，默认为空数组
  const currentChapterPoints = currentChapter.points || []
  // 当前笔记数据
  const currentPoint = currentChapterPoints[currentPointIndex]

  // 处理"下一条/下一章"按钮点击
  const handleNext = () => {
    let newChapterIndex = currentChapterIndex
    let newPointIndex = currentPointIndex
    let newReviewedCount = reviewedCount
    let showConfettiFlag = false

    // 增加已复习计数（当前笔记），但不超过总笔记数
    if (reviewedCount < totalPoints) {
      newReviewedCount = reviewedCount + 1
    }

    // 如果当前章节还有下一条笔记
    if (currentPointIndex < currentChapterPoints.length - 1) {
      newPointIndex = currentPointIndex + 1
    } else {
      // 当前章节已完成，切换到下一章
      if (currentChapterIndex < bookData.chapters.length - 1) {
        newChapterIndex = currentChapterIndex + 1
        newPointIndex = 0
        showConfettiFlag = true // 显示撒花动效
      } else {
        // 已经是最后一章的最后一个笔记，可以回到开始或显示完成信息
        // 这里我们回到第一章第一条笔记，重新开始复习
        newChapterIndex = 0
        newPointIndex = 0
        // 重新开始时重置已复习计数，以便重新计数
        newReviewedCount = 0
      }
    }

    // 更新状态
    setCurrentChapterIndex(newChapterIndex)
    setCurrentPointIndex(newPointIndex)
    setReviewedCount(newReviewedCount)
    if (showConfettiFlag) {
      setShowConfetti(true)
    }

    // 直接保存进度到 localStorage
    saveProgress(newChapterIndex, newPointIndex, newReviewedCount)
  }

  // 处理"上一条/上一章"按钮点击
  const handlePrev = () => {
    let newChapterIndex = currentChapterIndex
    let newPointIndex = currentPointIndex
    let newReviewedCount = reviewedCount

    // 减少已复习计数（如果是从已复习状态回退）
    if (reviewedCount > 0) {
      newReviewedCount = reviewedCount - 1
    }

    // 如果当前章节还有上一条笔记
    if (currentPointIndex > 0) {
      newPointIndex = currentPointIndex - 1
    } else {
      // 当前章节已到第一条笔记，切换到上一章
      if (currentChapterIndex > 0) {
        const prevChapterIndex = currentChapterIndex - 1
        const prevChapter = bookData.chapters[prevChapterIndex]
        const prevChapterPoints = prevChapter.points || []
        const lastPointIndex = Math.max(0, prevChapterPoints.length - 1)

        newChapterIndex = prevChapterIndex
        newPointIndex = lastPointIndex
      } else {
        // 已经是第一章第一条笔记，可以不做操作或循环到最后
        // 这里选择循环到最后：跳到最后一章的最后一条笔记
        const lastChapterIndex = bookData.chapters.length - 1
        const lastChapter = bookData.chapters[lastChapterIndex]
        const lastChapterPoints = lastChapter.points || []
        const lastPointIndex = Math.max(0, lastChapterPoints.length - 1)

        newChapterIndex = lastChapterIndex
        newPointIndex = lastPointIndex
      }
    }

    // 更新状态
    setCurrentChapterIndex(newChapterIndex)
    setCurrentPointIndex(newPointIndex)
    setReviewedCount(newReviewedCount)

    // 直接保存进度到 localStorage
    saveProgress(newChapterIndex, newPointIndex, newReviewedCount)
  }

  // 获取"下一条/下一章"按钮文本
  const getButtonText = () => {
    if (currentChapterIndex >= bookData.chapters.length - 1 &&
        currentPointIndex >= currentChapterPoints.length - 1) {
      return '重新开始'
    }
    if (currentPointIndex >= currentChapterPoints.length - 1) {
      return '下一章'
    }
    return '下一条'
  }

  // 获取"上一条/上一章"按钮文本
  const getPrevButtonText = () => {
    if (currentChapterIndex <= 0 && currentPointIndex <= 0) {
      return '循环到最后'
    }
    if (currentPointIndex <= 0) {
      return '上一章'
    }
    return '上一条'
  }

  // 计算进度百分比
  const progressPercentage = totalPoints > 0 ? Math.round((reviewedCount / totalPoints) * 100) : 0

  // 内联CSS动画
  const confettiStyle = `
    @keyframes confettiFall {
      0% {
        opacity: 0;
        transform: translateY(-20px) rotate(0deg);
      }
      10% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translateY(100vh) rotate(360deg);
      }
    }
  `

  return (
    <div className="notes-review-container">
      {/* 撒花动效 */}
      {showConfetti && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          <style>{confettiStyle}</style>
          {/* 多个撒花元素 */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                fontSize: '2rem',
                opacity: 0,
                animation: `confettiFall ${Math.random() * 1 + 1}s ease-in forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
                left: `${Math.random() * 100}%`,
                top: '-10%',
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              {['🌸', '🎉', '✨', '🎊', '🥳', '👍', '✅', '🌟'][Math.floor(Math.random() * 8)]}
            </div>
          ))}
        </div>
      )}

      {/* 顶部进度统计 */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>复习进度</h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              总笔记数：<strong>{totalPoints}</strong> 条
            </p>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              已复习：<strong>{reviewedCount}</strong> 条
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
              {progressPercentage}%
            </div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>完成进度</div>
          </div>
        </div>
        {/* 进度条 */}
        <div style={{
          height: '8px',
          backgroundColor: '#e2e8f0',
          borderRadius: '4px',
          marginTop: '1rem',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressPercentage}%`,
            height: '100%',
            backgroundColor: '#10b981',
            borderRadius: '4px',
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* 重置进度按钮 */}
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => {
              if (window.confirm('确定要重置复习进度吗？这将清除当前书籍的所有复习记录。')) {
                // 重置状态
                setCurrentChapterIndex(0)
                setCurrentPointIndex(0)
                setReviewedCount(0)

                // 从 localStorage 删除保存的进度
                if (bookData && bookData.title) {
                  const storageKey = `notes-review-progress-${bookData.title}`
                  localStorage.removeItem(storageKey)
                  console.log('重置进度: 已删除键名', storageKey)
                }
              }
            }}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              backgroundColor: 'transparent',
              color: '#ef4444',
              border: '1px solid #ef4444',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fef2f2'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            重置进度
          </button>
        </div>
      </div>

      {/* 章节和步骤条 */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ margin: 0 }}>当前章节：{currentChapter.title || '无标题章节'}</h3>
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
            第 {currentChapterIndex + 1} / {bookData.chapters.length} 章
          </div>
        </div>

        {/* 步骤条 */}
        <div style={{ marginBottom: '2rem' }}>
          {/* 步骤条可视化 */}
          <div style={{
            display: 'flex',
            gap: '4px',
            marginBottom: '1rem',
            position: 'relative'
          }}>
            {currentChapterPoints.map((_, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  height: '6px',
                  backgroundColor: index <= currentPointIndex ? '#10b981' : '#e2e8f0',
                  borderRadius: '3px',
                  transition: 'background-color 0.3s ease'
                }}
                title={`笔记 ${index + 1}`}
              />
            ))}
            {/* 当前进度显示在步骤条右上方 */}
            <div style={{
              position: 'absolute',
              top: '-1.5rem',
              right: '0',
              fontSize: '0.9rem',
              color: '#64748b'
            }}>
              当前进度：{currentPointIndex + 1} / {currentChapterPoints.length}
            </div>
          </div>

          {/* 步骤标签 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: '#64748b'
          }}>
            <span>开始</span>
            <span>结束</span>
          </div>
        </div>

        {/* 当前笔记展示 */}
        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid #e2e8f0',
          position: 'relative'
        }}>
          {/* 右上角操作按钮 */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <button
              onClick={handlePrev}
              className="btn"
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                backgroundColor: '#f1f5f9',
                color: '#64748b',
                border: '1px solid #cbd5e1'
              }}
            >
              {getPrevButtonText()}
            </button>
            <button
              onClick={handleNext}
              className="btn"
              style={{
                padding: '0.5rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              {getButtonText()}
            </button>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              marginRight: '0.75rem'
            }}>
              {currentPointIndex + 1}
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                {currentPoint ? (
                  currentPoint.type === 'dated_note' ? '日期笔记' :
                  currentPoint.type === 'blockquote' ? '原文引用' : '要点'
                ) : '空章节'}
              </div>
              {currentPoint && currentPoint.date && (
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  日期：{currentPoint.date}
                </div>
              )}
            </div>
          </div>

          <div style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            {currentPoint ? currentPoint.text : '此章节暂无笔记内容'}
          </div>
        </div>

      </div>

      {/* 章节列表 */}
      <div className="card">
        <h3 style={{ marginBottom: '1rem' }}>章节列表</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {bookData.chapters.map((chapter, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                backgroundColor: index === currentChapterIndex ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                border: index === currentChapterIndex ? '1px solid #10b981' : '1px solid #e2e8f0',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: index === currentChapterIndex ? '#10b981' : '#e2e8f0',
                color: index === currentChapterIndex ? 'white' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                marginRight: '0.75rem'
              }}>
                {index + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: index === currentChapterIndex ? '600' : '500' }}>
                  {chapter.title || '无标题章节'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {(chapter.points || []).length} 条笔记
                </div>
              </div>
              {index === currentChapterIndex && (
                <div style={{
                  fontSize: '0.75rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontWeight: '600'
                }}>
                  进行中
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 书籍卡片组件，处理客户端进度显示
interface BookCardProps {
  book: BookInfo
  onClick: () => void
}

function BookCard({ book, onClick }: BookCardProps) {
  // 状态管理进度百分比，初始为 null 表示未加载
  const [progressPercentage, setProgressPercentage] = useState<number | null>(null)
  const [reviewedCount, setReviewedCount] = useState<number | null>(null)

  useEffect(() => {
    // 只在客户端执行
    const storageKey = `notes-review-progress-${book.title}`
    const savedProgress = localStorage.getItem(storageKey)
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress)
        if (progress && typeof progress.reviewedCount === 'number') {
          const reviewed = Math.min(progress.reviewedCount, book.totalPoints)
          const percentage = book.totalPoints > 0 ? Math.round((reviewed / book.totalPoints) * 100) : 0
          setReviewedCount(reviewed)
          setProgressPercentage(percentage)
        }
      } catch (error) {
        console.error('解析进度数据失败:', error)
      }
    }
  }, [book.title, book.totalPoints])

  return (
    <div
      className="card"
      style={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '2px solid #e2e8f0'
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.borderColor = '#0070f3'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = '#e2e8f0'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>{book.title}</h4>
          <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>
            作者：{book.author}
          </p>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
            <span style={{ color: '#64748b' }}>
              📚 {book.chaptersCount} 章
            </span>
            <span style={{ color: '#64748b' }}>
              📝 {book.totalPoints} 条笔记
            </span>
          </div>
          {/* 复习进度条 - 只在客户端加载后显示 */}
          {progressPercentage !== null && reviewedCount !== null && (
            <div style={{ marginTop: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>复习进度</span>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#10b981' }}>{progressPercentage}%</span>
              </div>
              <div style={{
                height: '6px',
                backgroundColor: '#e2e8f0',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${progressPercentage}%`,
                  height: '100%',
                  backgroundColor: '#10b981',
                  borderRadius: '3px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                已复习 {reviewedCount} / {book.totalPoints} 条笔记
              </div>
            </div>
          )}
        </div>
        <div style={{
          fontSize: '1.5rem',
          color: '#0070f3'
        }}>
          →
        </div>
      </div>
    </div>
  )
}

// 主组件
export default function NotesReviewClient({ books }: NotesReviewClientProps) {
  // 选中的书籍索引，null 表示未选择
  const [selectedBookIndex, setSelectedBookIndex] = useState<number | null>(null)

  // 如果没有书籍
  if (books.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>暂无读书笔记</h3>
        <p style={{ marginBottom: '1rem' }}>请将 JSON 格式的读书笔记文件放入 readsNotes/notes 目录中。</p>
      </div>
    )
  }

  // 如果还没有选择书籍，显示书籍选择界面
  if (selectedBookIndex === null) {
    return (
      <div className="books-selection-container">
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>选择要复习的书籍</h3>
          <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>
            请从以下书籍中选择一本开始复习：
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {books.map((book, index) => (
              <BookCard
                key={book.filename}
                book={book}
                onClick={() => setSelectedBookIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 显示选中的书籍的复习界面
  const selectedBook = books[selectedBookIndex]
  return (
    <div>
      {/* 返回按钮 */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => setSelectedBookIndex(null)}
          className="btn"
          style={{
            backgroundColor: 'transparent',
            color: '#64748b',
            border: '1px solid #e2e8f0',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem'
          }}
        >
          ← 返回书籍选择
        </button>
        <div style={{ marginTop: '1rem' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>{selectedBook.title}</h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
            作者：{selectedBook.author} | 笔记总数：{selectedBook.totalPoints}条
          </p>
        </div>
      </div>

      {/* 复习会话 */}
      <NotesReviewSession
        bookData={selectedBook.bookData}
        totalPoints={selectedBook.totalPoints}
      />
    </div>
  )
}