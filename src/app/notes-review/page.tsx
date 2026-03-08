import Navigation from '@/components/Navigation'
import NotesReviewClient from './NotesReviewClient'
import fs from 'fs'
import path from 'path'

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

export default function NotesReviewPage() {
  // 读取 notes 目录中的所有 JSON 文件
  const notesDir = path.join(process.cwd(), 'readsNotes', 'notes')
  const files = fs.readdirSync(notesDir).filter(file => file.endsWith('.json'))

  const books: BookInfo[] = []

  for (const file of files) {
    try {
      const filePath = path.join(notesDir, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const bookData: BookData = JSON.parse(fileContents)

      // 计算总笔记数（排除章节标题）
      const totalPoints = bookData.chapters.reduce((sum, chapter) => sum + chapter.points.length, 0)

      books.push({
        filename: file,
        title: bookData.title,
        author: bookData.author,
        totalPoints,
        chaptersCount: bookData.chapters.length,
        bookData
      })
    } catch (error) {
      console.error(`Error reading file ${file}:`, error)
    }
  }

  return (
    <>
      <Navigation />
      <main>
        <section className="hero-gradient">
          <div className="container">
            <div className="hero-content">
              <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>读书笔记复习系统</h1>
              <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '1rem' }}>
                选择书籍，系统复习读书笔记
              </p>
            </div>
          </div>
        </section>

        <section style={{ padding: '2rem 0' }}>
          <div className="container">
            <NotesReviewClient
              books={books}
            />
          </div>
        </section>

        <section style={{
          background: '#f8f9fa',
          padding: '4rem 0',
          textAlign: 'center'
        }}>
          <div className="container">
            <h2 style={{ marginBottom: '2rem' }}>复习说明</h2>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
                本页面用于系统复习读书笔记。笔记按照书籍章节进行组织，每次只展示一条笔记，帮助您集中注意力。
              </p>
              <p style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
                点击&quot;下一条&quot;按钮继续当前章节的复习，当前章节复习完成后按钮将变为&quot;下一章&quot;。
              </p>
              <p style={{ lineHeight: '1.8' }}>
                顶部显示总笔记数和已复习笔记数，帮助您跟踪复习进度。
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}