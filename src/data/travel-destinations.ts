export interface TravelDestination {
  id: number
  title: string
  date: string
  description: string
  image: string
  highlights: string[]
}

export const travelDestinations: TravelDestination[] = [
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

/**
 * 根据ID获取旅游目的地
 * @param id 目的地ID
 * @returns 目的地对象或undefined
 */
export function getDestinationById(id: number): TravelDestination | undefined {
  return travelDestinations.find(dest => dest.id === id)
}

/**
 * 获取所有目的地ID列表
 * @returns 目的地ID数组
 */
export function getAllDestinationIds(): number[] {
  return travelDestinations.map(dest => dest.id)
}