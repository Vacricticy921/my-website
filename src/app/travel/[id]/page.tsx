import Navigation from '@/components/Navigation'
import { getDestinationById } from '@/data/travel-destinations'
import { getDestinationImagesPaginated } from '@/lib/image-loader'
import ImageGallery from '@/components/travel/ImageGallery'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface TravelImagePageProps {
  params: Promise<{ id: string }>
}

export default async function TravelImagePage({ params }: TravelImagePageProps) {
  // 解析参数
  const { id } = await params
  const destinationId = parseInt(id, 10)

  // 获取目的地信息
  const destination = getDestinationById(destinationId)
  if (!destination) {
    notFound()
  }

  // 获取该目的地的图片列表（第一页）
  const pageSize = 6
  const { images, total } = await getDestinationImagesPaginated(destinationId, 1, pageSize)

  return (
    <>
      <Navigation />
      <main>
        {/* 英雄区域 */}
        <section style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '3rem 0',
          textAlign: 'center',
        }}>
          <div className="container">
            <h1 style={{ color: 'white', marginBottom: '1rem' }}>
              📸 {destination.title} - 旅行相册
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
              {destination.date} · 共 {total} 张照片
            </p>
          </div>
        </section>

        {/* 返回链接 */}
        <section style={{ padding: '1.5rem 0', background: '#f8f9fa' }}>
          <div className="container">
            <Link
              href="/travel"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              ← 返回旅行合集
            </Link>
          </div>
        </section>

        {/* 图片展示区域 */}
        <section style={{ padding: '3rem 0' }}>
          <div className="container">
            {images.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: '#f8f9fa',
                borderRadius: '12px',
              }}>
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1rem',
                  opacity: 0.5,
                }}>
                  📷
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>暂无照片</h3>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                  该旅行目的地还没有上传照片，请将照片放入
                  <code style={{ background: '#e9ecef', padding: '0.2rem 0.4rem', borderRadius: '4px', margin: '0 0.3rem' }}>
                    public/travel/{destinationId}/
                  </code>
                  目录中
                </p>
                <div style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}>
                  <strong>支持的图片格式：</strong>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'].map(ext => (
                      <span key={ext} style={{
                        background: '#e3f2fd',
                        color: '#1976d2',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                      }}>
                        {ext}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <ImageGallery
                destinationId={destinationId}
                destinationTitle={destination.title}
                initialImages={images}
                totalImages={total}
              />
            )}
          </div>
        </section>

        {/* 目的地描述 */}
        <section style={{
          background: '#f8f9fa',
          padding: '3rem 0',
        }}>
          <div className="container">
            <h2 style={{ marginBottom: '1rem' }}>关于{destination.title}</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {destination.description}
            </p>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>主要景点：</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {destination.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    style={{
                      background: '#e3f2fd',
                      color: '#1976d2',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                    }}
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

// 生成静态参数
export async function generateStaticParams() {
  const { getAllDestinationIds } = await import('@/data/travel-destinations')
  const destinationIds = getAllDestinationIds()

  return destinationIds.map(id => ({
    id: id.toString(),
  }))
}

// 设置页面元数据
export async function generateMetadata({ params }: TravelImagePageProps) {
  const { id } = await params
  const destinationId = parseInt(id, 10)
  const { getDestinationById } = await import('@/data/travel-destinations')
  const destination = getDestinationById(destinationId)

  if (!destination) {
    return {
      title: '目的地未找到',
    }
  }

  return {
    title: `${destination.title} - 旅行相册 | 我的旅行记录`,
    description: `${destination.title}的旅行照片合集：${destination.description}`,
  }
}