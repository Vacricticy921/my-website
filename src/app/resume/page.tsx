import Navigation from '@/components/Navigation'

const skills = [
  { category: '前端开发', items: ['React', 'Next.js', 'TypeScript', 'HTML/CSS', 'JavaScript'] },
  { category: '后端开发', items: ['Node.js', 'Python', 'Express', 'MongoDB', 'PostgreSQL'] },
  { category: '工具与其他', items: ['Git', 'Docker', 'AWS', 'Linux', 'Figma'] }
]

const experience = [
  {
    title: '高级前端开发工程师',
    company: '科技创新有限公司',
    period: '2022年3月 - 至今',
    description: '负责公司主要产品的前端架构设计和开发，带领团队完成多个重要项目。',
    achievements: [
      '优化了网站性能，加载速度提升40%',
      '设计了可复用的组件库，提高开发效率30%',
      '指导初级开发人员，提升团队整体技术水平'
    ]
  },
  {
    title: '前端开发工程师',
    company: '互联网科技公司',
    period: '2020年6月 - 2022年2月',
    description: '参与公司Web应用的开发和维护，与后端团队协作完成产品迭代。',
    achievements: [
      '独立完成用户中心模块的开发',
      '参与移动端响应式设计适配',
      '优化用户体验，提高用户满意度'
    ]
  }
]

const education = [
  {
    degree: '计算机科学与技术学士',
    school: '知名大学',
    period: '2016年9月 - 2020年6月',
    description: '主修计算机科学与技术，辅修设计学。获得优秀毕业生称号。'
  }
]

export default function ResumePage() {
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
              📋 个人简历
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
              专业、专注、创新 - 让技术创造价值
            </p>
          </div>
        </section>

        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <div className="grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
              <div>
                <div className="card">
                  <h3 style={{ color: '#667eea', marginBottom: '1.5rem' }}>
                    个人信息
                  </h3>
                  <p><strong>姓名：</strong>张三</p>
                  <p><strong>年龄：</strong>28岁</p>
                  <p><strong>邮箱：</strong>zhangsan@email.com</p>
                  <p><strong>电话：</strong>138-0000-0000</p>
                  <p><strong>地址：</strong>北京市朝阳区</p>
                </div>

                <div className="card" style={{ marginTop: '2rem' }}>
                  <h3 style={{ color: '#667eea', marginBottom: '1.5rem' }}>
                    技能专长
                  </h3>
                  {skills.map((skillGroup, index) => (
                    <div key={index} style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ marginBottom: '0.5rem', color: '#333' }}>
                        {skillGroup.category}
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {skillGroup.items.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            style={{
                              background: '#e3f2fd',
                              color: '#1976d2',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.8rem'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginLeft: '2rem' }}>
                <div className="card">
                  <h3 style={{ color: '#667eea', marginBottom: '1.5rem' }}>
                    工作经历
                  </h3>
                  {experience.map((exp, index) => (
                    <div key={index} style={{ marginBottom: '2rem' }}>
                      <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>
                        {exp.title}
                      </h4>
                      <p style={{ color: '#667eea', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {exp.company}
                      </p>
                      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        {exp.period}
                      </p>
                      <p style={{ marginBottom: '1rem' }}>
                        {exp.description}
                      </p>
                      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} style={{ marginBottom: '0.5rem', color: '#555' }}>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                      {index < experience.length - 1 && (
                        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '1rem 0' }} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="card" style={{ marginTop: '2rem' }}>
                  <h3 style={{ color: '#667eea', marginBottom: '1.5rem' }}>
                    教育背景
                  </h3>
                  {education.map((edu, index) => (
                    <div key={index}>
                      <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>
                        {edu.degree}
                      </h4>
                      <p style={{ color: '#667eea', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {edu.school}
                      </p>
                      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        {edu.period}
                      </p>
                      <p>
                        {edu.description}
                      </p>
                    </div>
                  ))}
                </div>
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
            <h2 style={{ marginBottom: '2rem' }}>联系方式</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
              如果您对我的经历感兴趣，欢迎与我联系讨论合作机会。
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
              <a href="mailto:zhangsan@email.com" className="btn">
                发送邮件
              </a>
              <a href="tel:138-0000-0000" className="btn">
                电话联系
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}