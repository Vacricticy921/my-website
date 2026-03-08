'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: '首页' },
    { href: '/travel', label: '旅游合集' },
    { href: '/life-plan', label: '人生规划' },
    { href: '/resume', label: '个人简历' },
    { href: '/notes-review', label: '笔记复习' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-brand">
          <span className="brand-icon">🚀</span>
          <span>个人网站</span>
        </Link>

        <div className="navbar-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}