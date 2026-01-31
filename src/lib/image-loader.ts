import fs from 'fs/promises'
import path from 'path'

/**
 * 获取旅游目的地图片目录的路径
 * @param destinationId 旅游目的地ID
 * @returns 图片目录的绝对路径
 */
export function getDestinationImageDir(destinationId: number): string {
  // 图片存储在 public/travel/{id}/ 目录下
  return path.join(process.cwd(), 'public', 'travel', destinationId.toString())
}

/**
 * 检查图片目录是否存在
 * @param destinationId 旅游目的地ID
 * @returns 目录是否存在
 */
export async function checkImageDirExists(destinationId: number): Promise<boolean> {
  try {
    const dirPath = getDestinationImageDir(destinationId)
    await fs.access(dirPath)
    return true
  } catch {
    return false
  }
}

/**
 * 获取旅游目的地目录中的所有图片文件
 * @param destinationId 旅游目的地ID
 * @returns 图片文件列表（相对路径，从public目录开始）
 */
export async function getDestinationImages(destinationId: number): Promise<string[]> {
  try {
    const dirPath = getDestinationImageDir(destinationId)

    // 读取目录内容
    const files = await fs.readdir(dirPath)

    // 过滤图片文件（支持常见图片格式）
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg']
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return imageExtensions.includes(ext)
    })

    // 按文件名排序（可选：可以按修改时间或其他规则排序）
    imageFiles.sort()

    // 返回相对于public目录的路径
    return imageFiles.map(file => `/travel/${destinationId}/${file}`)
  } catch (error) {
    console.error(`Error reading images for destination ${destinationId}:`, error)
    return []
  }
}

/**
 * 分页获取旅游目的地图片
 * @param destinationId 旅游目的地ID
 * @param page 页码（从1开始）
 * @param pageSize 每页图片数量
 * @returns 分页的图片列表和总页数
 */
export async function getDestinationImagesPaginated(
  destinationId: number,
  page: number = 1,
  pageSize: number = 6
): Promise<{ images: string[]; total: number; totalPages: number }> {
  try {
    const allImages = await getDestinationImages(destinationId)
    const total = allImages.length
    const totalPages = Math.ceil(total / pageSize)

    // 计算分页
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedImages = allImages.slice(startIndex, endIndex)

    return {
      images: paginatedImages,
      total,
      totalPages
    }
  } catch (error) {
    console.error(`Error getting paginated images for destination ${destinationId}:`, error)
    return {
      images: [],
      total: 0,
      totalPages: 0
    }
  }
}

/**
 * 创建图片目录（如果不存在）
 * @param destinationId 旅游目的地ID
 */
export async function createImageDirIfNeeded(destinationId: number): Promise<void> {
  const dirPath = getDestinationImageDir(destinationId)
  try {
    await fs.access(dirPath)
  } catch {
    // 目录不存在，创建它
    await fs.mkdir(dirPath, { recursive: true })
    console.log(`Created image directory: ${dirPath}`)
  }
}

/**
 * 获取所有旅游目的地的图片目录状态
 * @returns 每个目的地ID对应的图片数量
 */
export async function getAllDestinationImageStats(): Promise<Record<number, number>> {
  const stats: Record<number, number> = {}

  // 假设有4个旅游目的地（根据travel/page.tsx）
  for (let id = 1; id <= 4; id++) {
    try {
      const images = await getDestinationImages(id)
      stats[id] = images.length
    } catch {
      stats[id] = 0
    }
  }

  return stats
}