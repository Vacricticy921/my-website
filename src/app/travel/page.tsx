import Navigation from '@/components/Navigation'
import { travelDestinations } from '@/data/travel-destinations'
import Link from 'next/link'

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
                <Link
                  key={destination.id}
                  href={`/travel/${destination.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="card" style={{
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}>
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
                </Link>
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