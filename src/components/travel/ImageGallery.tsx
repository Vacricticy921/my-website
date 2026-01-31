'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface ImageGalleryProps {
  destinationId: number
  destinationTitle: string
  initialImages: string[]
  totalImages: number
}

const PAGE_SIZE = 6 // 每页加载6张图片

export default function ImageGallery({
  destinationId,
  destinationTitle,
  initialImages,
  totalImages
}: ImageGalleryProps) {
  const [images, setImages] = useState<string[]>(initialImages)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialImages.length < totalImages)

  // 计算总页数
  const totalPages = Math.ceil(totalImages / PAGE_SIZE)

  // 加载更多图片
  const loadMoreImages = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    const nextPage = page + 1

    try {
      // 调用API路由获取分页图片
      const response = await fetch(`/api/travel/images?destinationId=${destinationId}&page=${nextPage}&pageSize=${PAGE_SIZE}`)
      if (!response.ok) {
        throw new Error('Failed to load images')
      }

      const data = await response.json()
      setImages(prev => [...prev, ...data.images])
      setPage(nextPage)
      setHasMore(nextPage < totalPages)
    } catch (error) {
      console.error('Error loading more images:', error)
    } finally {
      setLoading(false)
    }
  }, [destinationId, page, loading, hasMore, totalPages])

  // 监听滚动事件，实现下拉加载
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return

      // 检查是否滚动到底部附近（距离底部100px）
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      const clientHeight = document.documentElement.clientHeight || window.innerHeight

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMoreImages()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMoreImages, loading, hasMore])

  // 初始加载时，如果图片少于总数，显示加载更多按钮
  useEffect(() => {
    setHasMore(images.length < totalImages)
  }, [images.length, totalImages])

  return (
    <>
      {/* 图片网格 */}
      <div className="grid" style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}>
        {images.map((imageSrc, index) => (
          <div key={index} className="card" style={{
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
          }}>
            <div style={{
              width: '100%',
              height: '200px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <Image
                src={imageSrc}
                alt={`${destinationTitle} - 照片 ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div style={{ padding: '1rem' }}>
              <p style={{
                fontSize: '0.9rem',
                color: '#666',
                margin: 0,
              }}>
                照片 {index + 1} / {totalImages}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 加载更多按钮和状态 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '2rem 0',
      }}>
        {hasMore ? (
          <>
            <button
              onClick={loadMoreImages}
              disabled={loading}
              style={{
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'opacity 0.2s ease',
              }}
            >
              {loading ? '加载中...' : '加载更多照片'}
            </button>
            <p style={{ color: '#666', margin: 0 }}>
              已显示 {images.length} / {totalImages} 张照片
            </p>
            <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>
              向下滚动或点击按钮加载更多
            </p>
          </>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '1.5rem',
            background: '#f8f9fa',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '400px',
          }}>
            <p style={{ margin: 0, color: '#666' }}>
              🎉 已加载全部 {totalImages} 张照片
            </p>
          </div>
        )}
      </div>
    </>
  )
}