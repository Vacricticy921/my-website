import Navigation from '@/components/Navigation'

const travelDestinations = [
  {
    id: 1,
    title: '日本东京',
    date: '2023年4月',
    description: '体验了日本传统文化的魅力，从现代的东京塔到古老的浅草寺，每一处都让人难忘。',
    image: '/travel/japan.jpg',
    highlights: ['浅草寺', '东京塔', '富士山', '新宿']
  },
  {
    id: 2,
    title: '法国巴黎',
    date: '2023年7月',
    description: '浪漫之都巴黎的艺术气息深深吸引了我，埃菲尔铁塔下的日落是永恒的记忆。',
    image: '/travel/paris.jpg',
    highlights: ['埃菲尔铁塔', '卢浮宫', '香榭丽舍大街', '圣母院']
  },
  {
    id: 3,
    title: '中国西藏',
    date: '2023年9月',
    description: '高原的纯净与宁静让人心灵得到净化，布达拉宫的雄伟壮观令人震撼。',
    image: '/travel/tibet.jpg',
    highlights: ['布达拉宫', '大昭寺', '纳木错', '羊卓雍错']
  },
  {
    id: 4,
    title: '意大利罗马',
    date: '2023年11月',
    description: '走在古老的城市中，感受历史的厚重，斗兽场的每一块石头都诉说着故事。',
    image: '/travel/rome.jpg',
    highlights: ['斗兽场', '梵蒂冈', '许愿池', '西班牙广场']
  }
]

export default function TravelPage() {
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
              🌍 我的旅行记录
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
              记录每一次美好的旅程，分享世界的精彩
            </p>
          </div>
        </section>

        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <div className="grid">
              {travelDestinations.map((destination) => (
                <div key={destination.id} className="card">
                  <div style={{
                    width: '100%',
                    height: '200px',
                    background: `linear-gradient(45deg, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)})`,
                    borderRadius: '8px 8px 0 0',
                    marginBottom: '1rem'
                  }} />
                  <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                    {destination.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    {destination.date}
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    {destination.description}
                  </p>
                  <div style={{ marginBottom: '1rem' }}>
                    <strong>主要景点：</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                      {destination.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          style={{
                            background: '#e3f2fd',
                            color: '#1976d2',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.8rem'
                          }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{
          background: '#f8f9fa',
          padding: '4rem 0',
          textAlign: 'center'
        }}>
          <div className="container">
            <h2 style={{ marginBottom: '2rem' }}>旅行感悟</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
              旅行不仅让我看到了世界的美丽，更让我了解了不同文化的魅力。
              每一次旅行都是一次心灵的成长，让我变得更加开放和包容。
              我相信，最好的风景在路上，最好的故事在远方。
            </p>
          </div>
        </section>
      </main>
    </>
  )
}