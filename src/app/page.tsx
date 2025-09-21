import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <section style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '4rem 0',
          textAlign: 'center',
        }}>
          <div className="container">
            <h1 style={{ color: 'white', marginBottom: '1rem' }}>
              欢迎来到我的个人网站
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
              探索我的旅行故事和职业经历
            </p>
            <Link href="/travel" className="btn">
              开始探索
            </Link>
          </div>
        </section>

        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <h2 className="text-center" style={{ marginBottom: '3rem' }}>
              网站导航
            </h2>
            <div className="grid">
              <div className="card">
                <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>
                  🌍 旅游合集
                </h3>
                <p>
                  记录我在世界各地的旅行经历，分享美丽的风景和有趣的故事。
                </p>
                <Link href="/travel" className="btn" style={{ marginTop: '1rem' }}>
                  查看旅行记录
                </Link>
              </div>
              <div className="card">
                <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>
                  📋 个人简历
                </h3>
                <p>
                  了解我的教育背景、工作经历和技能专长。
                </p>
                <Link href="/resume" className="btn" style={{ marginTop: '1rem' }}>
                  查看简历
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section style={{
          background: '#f8f9fa',
          padding: '4rem 0',
          textAlign: 'center'
        }}>
          <div className="container">
            <h2 style={{ marginBottom: '2rem' }}>关于我</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
              我是一个热爱旅行和技术的探索者。通过这个网站，我希望能够分享我的经历和见解，
              与志同道合的朋友们交流和互动。
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
