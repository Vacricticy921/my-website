import { NextRequest, NextResponse } from 'next/server'
import { getDestinationImagesPaginated } from '@/lib/image-loader'

export async function GET(request: NextRequest) {
  try {
    // 从查询参数中获取参数
    const searchParams = request.nextUrl.searchParams
    const destinationId = searchParams.get('destinationId')
    const page = searchParams.get('page')
    const pageSize = searchParams.get('pageSize')

    // 验证参数
    if (!destinationId) {
      return NextResponse.json(
        { error: 'Missing destinationId parameter' },
        { status: 400 }
      )
    }

    const id = parseInt(destinationId, 10)
    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        { error: 'Invalid destinationId parameter' },
        { status: 400 }
      )
    }

    const pageNum = page ? parseInt(page, 10) : 1
    const pageSizeNum = pageSize ? parseInt(pageSize, 10) : 6

    if (isNaN(pageNum) || pageNum <= 0 || isNaN(pageSizeNum) || pageSizeNum <= 0) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters' },
        { status: 400 }
      )
    }

    // 获取分页图片
    const result = await getDestinationImagesPaginated(id, pageNum, pageSizeNum)

    return NextResponse.json({
      images: result.images,
      page: pageNum,
      pageSize: pageSizeNum,
      total: result.total,
      totalPages: result.totalPages,
      hasMore: pageNum < result.totalPages
    })
  } catch (error) {
    console.error('Error in travel images API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// 配置路由
export const dynamic = 'force-dynamic' // 确保每次请求都动态处理