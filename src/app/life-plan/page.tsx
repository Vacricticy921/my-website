import Navigation from '@/components/Navigation'

const lifeGoals = [
  {
    id: 1,
    category: '职业发展',
    categoryKey: 'career',
    title: '成为技术专家',
    description: '在软件开发领域深耕，成为行业内的技术专家，能够解决复杂的技术难题。',
    timeline: '2024-2027',
    status: '进行中',
    statusKey: 'ongoing',
    priority: '高',
    priorityKey: 'high',
    milestones: ['掌握高级架构设计', '获得技术认证', '带领技术团队', '参与开源项目']
  },
  {
    id: 2,
    category: '个人成长',
    categoryKey: 'personal',
    title: '终身学习',
    description: '保持学习的热情，不断探索新的知识领域，提升自己的综合能力。',
    timeline: '持续进行',
    status: '进行中',
    statusKey: 'ongoing',
    priority: '高',
    priorityKey: 'high',
    milestones: ['每年阅读20本书', '学习新的编程语言', '参加行业会议', '建立个人品牌']
  },
  {
    id: 3,
    category: '财务目标',
    categoryKey: 'financial',
    title: '财务自由',
    description: '通过合理的理财规划和投资，实现财务自由，为自己和家人提供更好的生活保障。',
    timeline: '2024-2035',
    status: '规划中',
    statusKey: 'planned',
    priority: '高',
    priorityKey: 'high',
    milestones: ['建立应急基金', '学习投资理财', '多元收入来源', '房产投资']
  },
  {
    id: 4,
    category: '健康管理',
    categoryKey: 'health',
    title: '身心健康',
    description: '保持良好的生活习惯，注重身心健康，为自己的事业和家庭打下坚实基础。',
    timeline: '持续进行',
    status: '进行中',
    statusKey: 'ongoing',
    priority: '中',
    priorityKey: 'medium',
    milestones: ['规律运动', '健康饮食', '定期体检', '心理健康维护']
  },
  {
    id: 5,
    category: '家庭生活',
    categoryKey: 'family',
    title: '建立幸福家庭',
    description: '与伴侣共建幸福的家庭生活，培养良好的亲子关系，营造温馨的家庭氛围。',
    timeline: '2024-2030',
    status: '规划中',
    statusKey: 'planned',
    priority: '高',
    priorityKey: 'high',
    milestones: ['找到合适的伴侣', '结婚生子', '改善居住环境', '家庭旅行']
  },
  {
    id: 6,
    category: '社会贡献',
    categoryKey: 'social',
    title: '回馈社会',
    description: '用自己的专业技能和社会资源，为社会做出积极贡献，帮助更多需要帮助的人。',
    timeline: '2025-2040',
    status: '规划中',
    statusKey: 'planned',
    priority: '中',
    priorityKey: 'medium',
    milestones: ['参与公益活动', '技术分享', '指导新人', '环保行动']
  }
]

export default function LifePlanPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="hero-gradient">
          <div className="container hero-content">
            <h1 style={{ color: 'white', marginBottom: '1rem' }}>
              🎯 我的人生规划
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
              规划精彩人生，实现自我价值
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>6</div>
                <div style={{ opacity: 0.9 }}>个核心目标</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>2</div>
                <div style={{ opacity: 0.9 }}>个进行中</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>16年</div>
                <div style={{ opacity: 0.9 }}>长期规划</div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <div className="grid">
              {lifeGoals.map((goal) => (
                <div key={goal.id} className="card">
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.5rem'
                  }}>
                    <span className={`goal-category ${goal.categoryKey}`}>
                      {goal.category}
                    </span>
                    <span className={`goal-status ${goal.statusKey}`}>
                      {goal.status}
                    </span>
                  </div>

                  <h3 style={{ color: '#1e293b', marginBottom: '1rem', fontSize: '1.25rem' }}>
                    {goal.title}
                  </h3>

                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>
                      📅 {goal.timeline}
                    </span>
                  </div>

                  <p style={{
                    marginBottom: '1.5rem',
                    lineHeight: '1.6',
                    color: '#475569',
                    fontSize: '0.95rem'
                  }}>
                    {goal.description}
                  </p>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ color: '#64748b', fontWeight: '500' }}>优先级：</span>
                    <span className={`priority-${goal.priorityKey}`}>
                      {goal.priority}
                    </span>
                  </div>

                  <div>
                    <strong style={{ color: '#374151', marginBottom: '0.75rem', display: 'block' }}>
                      关键里程碑：
                    </strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {goal.milestones.map((milestone, index) => (
                        <span key={index} className="milestone-tag">
                          {milestone}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="timeline-section">
          <div className="container">
            <h2 style={{ marginBottom: '2rem', color: '#1e293b' }}>人生理念</h2>
            <div style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              maxWidth: '800px',
              margin: '0 auto',
              color: '#475569'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                人生就像一场漫长的旅程，需要有明确的目标和规划。我相信通过持续的努力和不断的学习，
                每个人都能实现自己的梦想。
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                重要的是保持积极的心态，勇敢面对挑战，在实现个人价值的同时，也为社会创造价值。
              </p>
              <p style={{ fontStyle: 'italic', color: '#64748b' }}>
                &quot;成功的秘诀在于始终如一地追求目标。&quot;
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}