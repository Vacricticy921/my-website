# 旅游图片展示功能使用说明

## 功能概述

已实现点击旅游合集的每一个旅游地，进入图片展示列表，支持下拉动态加载本地配置的图片目录中的文件。

## 功能特性

1. **动态路由**：每个旅游目的地都有独立的图片展示页面 (`/travel/[id]`)
2. **本地图片加载**：从 `public/travel/{id}/` 目录动态加载图片文件
3. **下拉无限滚动**：滚动到底部自动加载更多图片，也支持点击"加载更多"按钮
4. **分页加载**：每次加载6张图片，减少初始加载时间
5. **响应式设计**：适配各种屏幕尺寸
6. **图片格式支持**：支持 `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.avif`, `.svg` 格式

## 目录结构

```
public/travel/
├── 1/          # 日本东京的图片目录 (对应id:1)
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── ...
├── 2/          # 法国巴黎的图片目录 (对应id:2)
├── 3/          # 中国西藏的图片目录 (对应id:3)
└── 4/          # 意大利罗马的图片目录 (对应id:4)
```

## 使用方法

### 1. 添加旅游图片

1. 在 `public/travel/` 目录下创建以旅游目的地ID命名的子目录
2. 将图片文件放入对应目录
3. 支持的图片格式：`.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.avif`, `.svg`

示例：
```bash
# 为日本东京（ID:1）添加图片
cp ~/photos/tokyo/*.jpg public/travel/1/
```

### 2. 访问图片页面

1. 访问旅游合集页面：`http://localhost:3000/travel`
2. 点击任意旅游目的地卡片
3. 进入该目的地的图片展示页面

### 3. 加载更多图片

- **下拉加载**：滚动到页面底部，自动加载更多图片
- **按钮加载**：点击"加载更多照片"按钮
- **状态显示**：显示已加载图片数量/总图片数量

## 技术实现

### 核心文件

```
src/
├── app/travel/[id]/page.tsx          # 图片展示页面
├── components/travel/ImageGallery.tsx # 无限滚动画廊组件
├── lib/image-loader.ts               # 图片加载工具函数
├── data/travel-destinations.ts       # 旅游目的地数据
└── app/api/travel/images/route.ts    # 图片API端点
```

### API接口

```
GET /api/travel/images?destinationId={id}&page={page}&pageSize={size}
```

响应示例：
```json
{
  "images": ["/travel/1/photo1.jpg", "/travel/1/photo2.jpg"],
  "page": 1,
  "pageSize": 6,
  "total": 12,
  "totalPages": 2,
  "hasMore": true
}
```

## 自定义配置

### 修改每页加载数量

在 `src/app/travel/[id]/page.tsx` 中修改 `pageSize` 变量：
```typescript
const pageSize = 12 // 改为每页加载12张图片
```

### 修改图片目录结构

在 `src/lib/image-loader.ts` 中修改 `getDestinationImageDir` 函数：
```typescript
export function getDestinationImageDir(destinationId: number): string {
  // 修改目录结构，例如按名称而不是ID
  return path.join(process.cwd(), 'public', 'travel', `destination-${destinationId}`)
}
```

## 常见问题

### 1. 图片不显示
- 检查图片文件是否在正确的目录中：`public/travel/{id}/`
- 检查图片格式是否支持
- 检查文件名是否包含特殊字符（建议使用英文文件名）

### 2. 下拉加载不工作
- 确保图片总数大于第一页加载数量
- 检查浏览器控制台是否有JavaScript错误
- 确认API端点正常工作：`/api/travel/images?destinationId=1`

### 3. 图片加载缓慢
- 优化图片大小（建议使用WebP格式）
- 调整 `pageSize` 减少每次加载数量
- 使用Next.js Image组件自动优化

## 开发说明

### 添加新的旅游目的地

1. 在 `src/data/travel-destinations.ts` 中添加新的目的地数据：
```typescript
{
  id: 5, // 确保ID唯一
  title: '新目的地',
  date: '2024年1月',
  description: '描述文字',
  image: '/travel/new-destination.jpg',
  highlights: ['景点1', '景点2']
}
```

2. 创建对应的图片目录：`public/travel/5/`

### 扩展功能建议

1. **图片上传界面**：添加管理后台用于上传图片
2. **图片分类**：支持按标签或景点分类图片
3. **图片描述**：为每张图片添加描述文字
4. **幻灯片模式**：添加全屏幻灯片浏览模式
5. **图片分享**：添加社交媒体分享功能

## 测试数据

项目中已包含测试用的SVG图片文件，位于：
- `public/travel/1/photo1.svg` - `photo3.svg`
- `public/travel/2/photo1.svg` - `photo3.svg`
- `public/travel/3/photo1.svg` - `photo3.svg`
- `public/travel/4/photo1.svg` - `photo3.svg`

这些文件用于演示功能，可以替换为实际的旅游照片。