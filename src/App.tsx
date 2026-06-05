import { useState, useRef, useCallback, useEffect } from 'react'
import { ArrowRight, ArrowUpRight, FileText, X } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

const BASE = import.meta.env.BASE_URL

function useResponsive() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440)
  useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h) }, [])
  return { isMobile: w < 900 }
}

/* ============================================================
   Modal
   ============================================================ */
function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: React.ReactNode; onClose: () => void }) {
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }; if (open) window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h) }, [open, onClose])
  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose() }} style={{
      position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.72)',
      backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: open ? 1 : 0, visibility: open ? 'visible' : 'hidden', pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity 0.35s, visibility 0.35s',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'rgba(12,12,12,0.95)', border: '0.5px solid rgba(255,255,255,0.1)',
        padding: 'clamp(18px,4vw,44px)', maxWidth: '680px', width: '94vw', maxHeight: '85vh', overflowY: 'auto',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '20px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(222,219,200,0.5)', background: 'none', border: 'none', fontSize: '20px', transition: 'color 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#DEDBC8' }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(222,219,200,0.5)' }}><X size={20} strokeWidth={1} /></button>
        <div style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 200, color: '#E1E0CC', letterSpacing: '-0.01em', marginBottom: '24px' }}>{title}</div>
        <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'rgba(222,219,200,0.7)' }}>{children}</div>
      </div>
    </div>
  )
}

function ModalH4({ children }: { children: string }) {
  return <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(222,219,200,0.5)', margin: '22px 0 6px' }}>{children}</div>
}
function ModalP({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: '4px' }}>{children}</div>
}
function HL({ children }: { children: string }) {
  return <span style={{ color: '#E1E0CC', fontWeight: 400 }}>{children}</span>
}

/* ============================================================
   Data: Contact, Work, Project, Tag
   ============================================================ */
function getContactContent() {
  return <>
    <ModalH4>电话</ModalH4><ModalP><span style={{ fontSize: '18px', color: '#E1E0CC' }}>+86 13042055591</span></ModalP>
    <ModalH4>邮箱</ModalH4><ModalP><HL>pzj19991107@163.com</HL></ModalP>
    <ModalH4>微信</ModalH4><ModalP><HL>ZacharyPenetti</HL></ModalP>
  </>
}

function getWorkData(type: string) {
  if (type === 'donner') return {
    title: 'DONNER — Project Management Trainee · 2025.6 – 2026.2',
    body: <><ModalH4>核心职责</ModalH4><ModalP>主导 IPD 自研产品全生命周期管理，包括开发进度规划、预算编制、成本审核、风险管理；运用敏捷管理方法推动项目交付。</ModalP><ModalP>基于 Claude Code 采用 Vibe Coding 独立开发 AI 会议纪要智能管理工具，实现从内容导入到风险识别及待办追踪的闭环。</ModalP><ModalH4>核心成果</ModalH4><ModalP><HL>100%</HL> — 项目里程碑及评审准时达成率（非 ECN）</ModalP><ModalP><HL>85.7%</HL> — TR 评审一次通过率</ModalP><ModalP><HL>≤ 3%</HL> — ADCP1 整机成本偏差（PDC 目标成本法）</ModalP><ModalP><HL>~10%</HL> — 敏捷管理使日常项目周期平均缩短</ModalP></>,
  }
  return {
    title: 'URBAN REVIVO — Procurement PMO · 2022.2 – 2023.3',
    body: <><ModalH4>核心职责</ModalH4><ModalP>负责全品类 MRO 物料引入与供应商开发，使用 AutoCAD 精准转化设计师需求为可制造规格；独立完成从需求分析、工艺匹配、打样验收到大货采购交接的全链路管理。</ModalP><ModalP>主导 MRO 开发及售后支持端流程重构迭代：建立"绿通"快采机制，重构售后维修流程与数据池。</ModalP><ModalH4>核心成果</ModalH4><ModalP><HL>−5.7%</HL> — 采购成本降幅</ModalP><ModalP><HL>93.7%</HL> — 打样合格率</ModalP><ModalP><HL>−7~10 自然日/项目</HL> — "绿通"开发周期缩短</ModalP><ModalP><HL>2,000+ 元/年/店</HL> — 单店灯具成本降低</ModalP></>,
  }
}

function getProjectData(type: string) {
  if (type === 'pm-os') return {
    title: 'PM OS — AI 辅助 IPD 研发项目全流程管理工具 · 2026',
    body: <><ModalH4>项目简介</ModalH4><ModalP>基于 DONNER 真实 PM 经验（IPD 流程、TR/DCP 评审、MIL、BOM），用 Claude Code 独立开发的全功能项目管理工具。覆盖从概念到量产的全生命周期管理。</ModalP><div style={{ marginBottom: '4px' }}><a href="https://demo.pm-os.pages.dev" target="_blank" style={{ color: '#DEDBC8', textDecoration: 'none', border: '0.5px solid rgba(222,219,200,0.2)', padding: '4px 10px', borderRadius: '4px', fontSize: '12px' }}>Live Demo ↗ demo.pm-os.pages.dev</a></div><ModalH4>技术栈</ModalH4><ModalP>Next.js 16 + TypeScript + Tailwind CSS + Dexie.js (IndexedDB) + DeepSeek API + 自绘 SVG 甘特图 + xlsx + JSZip</ModalP><ModalH4>核心功能</ModalH4><ModalP><HL>IPD 全流程</HL> — 13 个里程碑节点（TR1→CDCP→TR2→HMS→TR3→PDCP→EVT→TR4→DVT→TR5→ADCP1→PVT→MP），7 阶段门管理，准入准出标准</ModalP><ModalP><HL>自绘 SVG 甘特图</HL> — 不依赖第三方库，支持缩放、依赖连线、里程碑菱形标记、今日红线、逾期高亮</ModalP><ModalP><HL>9 张数据表</HL> — 项目 / 里程碑 / 任务 / 会议 / 复盘 / 变更 / BOM / 采购 / 认证 / MIL，全部 IndexedDB 本地存储，离线可用</ModalP><ModalP><HL>AI 辅助</HL> — DeepSeek 驱动会议纪要智能分析（行动项提取 + 风险识别）、复盘自动生成（聚合项目数据）</ModalP><ModalP><HL>双部署</HL> — Vercel 全功能可编辑版 + Cloudflare Pages 只读 Demo 版（国内直连）</ModalP><ModalP><HL>Excel 批量导入</HL> — 所有面板支持模板下载 + 批量导入，适配企业级数据迁移</ModalP></>,
  }
  if (type === 'miyavi') return {
    title: 'MIYAVI 联名款 3-in-1 吉他效果器 · 2025.8 – 2026.1',
    body: <><div style={{ marginBottom: '20px', borderRadius: '4px', overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.08)' }}><video src={BASE + '89c9d818ea6471aca23e1b766927b458.mp4'} controls playsInline preload="metadata" style={{ width: '100%', display: 'block' }} /></div><ModalH4>项目背景</ModalH4><ModalP>主导与日本艺人 MIYAVI 联名开发 Double Swords 3-in-1 吉他效果器，复刻其经典音色并确保交付落地。</ModalP><ModalH4>核心职责</ModalH4><ModalP><HL>跨职能协同</HL> — 协调品牌、产研与艺人团队，解决音色复刻与硬件实现之间的技术偏离。</ModalP><ModalP><HL>流程优化</HL> — 运用 IPD 管理逻辑并行与裁切流程节点，前置识别供应链风险。</ModalP><ModalP><HL>AI 赋能</HL> — 0→1 搭建 AI 工作流，借助 Claude Code 自动化编排甘特图。</ModalP><ModalH4>核心成果</ModalH4><ModalP><HL>21%</HL> — 项目周期缩短</ModalP><ModalP><HL>1.93%–2.41%</HL> — 整机成本偏差</ModalP><ModalP><HL>92%+</HL> — PVT / MP 良率</ModalP></>,
  }
  if (type === 'mro') return {
    title: 'MRO 2.0 数字化流程迭代 · 2022.11 – 2023.3',
    body: <><ModalH4>项目背景</ModalH4><ModalP>针对系统流程老旧、非标采购周期长等痛点，对 MRO 系统进行全链路流程升级。</ModalP><ModalH4>核心职责</ModalH4><ModalP><HL>流程重构</HL> — 绘制 MRO 2.0 开发端及售后支持端全流转业务流程图。</ModalP><ModalP><HL>需求拉通</HL> — 主导挖掘采购、售后等多业务模块需求，与 IT 对齐逻辑实现可行性。</ModalP><ModalH4>核心成果</ModalH4><ModalP><HL>−2 人天</HL> — 单个售后流程耗时降低</ModalP><ModalP><HL>97.6%</HL> — 绿通打烊准时率</ModalP><ModalP><HL>100%</HL> — MP 质量合格率</ModalP><ModalP><HL>−3 单/月/店</HL> — 售后端返单数量</ModalP></>,
  }
  if (type === 'ai-meeting') return {
    title: 'AI 会议纪要智能管理工具 · 2025',
    body: <><ModalH4>项目简介</ModalH4><ModalP>基于 Claude Code 采用 Vibe Coding 独立开发，实现内容导入 → AI 分析 → 风险识别 → 待办追踪 → 多格式导出的完整闭环。</ModalP><ModalP><a href="https://ai-execution-pocket.vercel.app/" target="_blank" style={{ color: '#DEDBC8', textDecoration: 'none' }}>Live Demo ↗ ai-execution-pocket.vercel.app</a></ModalP><ModalH4>核心功能</ModalH4><ModalP><HL>智能分析</HL> — AI 自动提取关键议题、决策事项及行动项。</ModalP><ModalP><HL>风险识别</HL> — 自动标记潜在风险项，按严重程度分级。</ModalP><ModalP><HL>待办追踪</HL> — 自动生成待办清单，状态流转与截止提醒。</ModalP><ModalP><HL>灵活导出</HL> — 支持 Markdown / PDF / Excel 多格式导出。</ModalP><ModalH4>核心成果</ModalH4><ModalP><HL>30min → 5min</HL> — 纪要整理时间压缩比</ModalP></>,
  }
  return {
    title: '竞品分析 Agent Skill · 2026',
    body: <><ModalH4>项目简介</ModalH4><ModalP>基于 Claude Code Skill 框架搭建的自动化竞品分析工具。输入产品名即可自动完成：竞品信息收集 → 多维度对比分析 → 数据可视化 → Excel 深度报告导出。支持两种分析模式：</ModalP><ModalH4>具体竞品分析</ModalH4><ModalP>针对已上市实体产品，搜索同品类竞品进行横向对比。覆盖基础信息、评分口碑、销量排名、产品规格、价格分布、SWOT、用户评价、市场空白与战略建议等维度。适用于产品立项前的市场竞争格局扫描。</ModalP><div style={{ fontSize: '11px', color: 'rgba(222,219,200,0.4)', margin: '2px 0 4px' }}>案例：绿联67W充电宝 vs 小米/倍思/安克/罗马仕/酷态科 6 款同规格产品全维度分析</div><ModalH4>概念竞品分析</ModalH4><ModalP>针对创新概念或未上市方案，搜索专利、众筹项目、学术文献及替代方案，评估概念新颖性和专利侵权风险。覆盖相似产品清单、功能对比矩阵、冲突等级判定、差异化路径建议。</ModalP><div style={{ fontSize: '11px', color: 'rgba(222,219,200,0.4)', margin: '2px 0 4px' }}>案例：无拉链行李箱闭合方案 — 10 个竞品/专利的功能矩阵对比 + 风险判定 + 差异化建议</div><div style={{ marginTop: '16px' }}><a href={BASE + 'competitive-analysis-portfolio.pdf'} target="_blank" style={{ color: '#DEDBC8', textDecoration: 'none', border: '0.5px solid rgba(222,219,200,0.3)', padding: '6px 14px', borderRadius: '4px', fontSize: '12px' }}>查看案例报告 PDF ↗</a></div></>,
  }
}

const tagData: Record<string, { title: string; body: React.ReactNode }> = {
  'Project Management': { title: 'Project Management', body: <><ModalP>精通 IPD 流程与敏捷开发方法论，具备从概念到量产的全生命周期交付能力。主导跨职能团队协同，覆盖品牌、产研、供应链及外部合作方。</ModalP><ModalH4>关联成果</ModalH4><ModalP><HL>100%</HL> — 里程碑准时达成率（DONNER）</ModalP><ModalP><HL>21%</HL> — MIYAVI 项目周期缩短</ModalP></> },
  'Vibe Coding': { title: 'Vibe Coding', body: <><ModalP>基于 Claude Code 采用自然语言驱动开发，可独立搭建 AI 工具与自动化工作流，无需专业编程背景。</ModalP><ModalH4>代表项目</ModalH4><ModalP><HL>AI 会议纪要智能管理工具</HL> — 30min → 5min</ModalP><ModalP><HL>甘特图自动编排</HL> — MIYAVI 项目中 0→1 搭建</ModalP><ModalP><HL>本网站</HL> — 亦由 Claude Code Vibe Coding 生成</ModalP></> },
  'IPD': { title: 'IPD', body: <><ModalP>集成产品开发流程。在 DONNER 主导自研产品全生命周期管理，覆盖进度规划、预算编制、成本审核、风险管理。</ModalP><ModalH4>关联成果</ModalH4><ModalP><HL>100%</HL> — 里程碑准时达成率</ModalP><ModalP><HL>85.7%</HL> — TR 评审一次通过率</ModalP><ModalP><HL>≤3%</HL> — ADCP1 整机成本偏差</ModalP></> },
  'Agile': { title: 'Agile', body: <><ModalP>敏捷开发管理方法论。推行每日站会迭代与看板可视化，提升团队响应速度与交付节奏。</ModalP><ModalH4>关联成果</ModalH4><ModalP><HL>~10%</HL> — 日常项目周期缩短（DONNER）</ModalP><ModalP><HL>21%</HL> — MIYAVI 项目周期缩短</ModalP></> },
  'Supply Chain': { title: 'Supply Chain', body: <><ModalP>深耕 ODM/OEM 开发与 MRO 寻源，擅长目标成本管理（PDC）与标准化降本。具备从需求分析到供应商全周期引入的完整经验。</ModalP><ModalH4>关联成果</ModalH4><ModalP><HL>−5.7%</HL> — 采购成本降幅</ModalP><ModalP><HL>2,000+ 元/年/店</HL> — 灯具标准化降本</ModalP></> },
  'Claude Code': { title: 'Claude Code', body: <><ModalP>AI 辅助编程工具，对话即代码。用于搭建个人 AI 工作流、自动化甘特图编排、开发会议纪要智能管理工具。是 Vibe Coding 的核心实践平台。</ModalP><ModalH4>关联成果</ModalH4><ModalP>本网站、AI 会议纪要工具、甘特图自动编排——均由 Claude Code 驱动实现。</ModalP></> },
  'Risk Control': { title: 'Risk Control', body: <><ModalP>项目风险识别、预判与应对预案制定。运用 IPD 管理逻辑前置识别供应链风险，确保项目在不确定条件下按计划推进。</ModalP><ModalH4>关联成果</ModalH4><ModalP><HL>1.93%–2.41%</HL> — MIYAVI 项目成本偏差（低于 3% 预设目标）</ModalP><ModalP>提前 21% 完成市场交付</ModalP></> },
  'Cost Management': { title: 'Cost Management', body: <><ModalP>运用 PDC 目标成本法进行预算编制与实时成本监控。在研发全周期中跟踪人力、上游资源与时间成本。</ModalP><ModalH4>关联成果</ModalH4><ModalP><HL>≤3%</HL> — DONNER ADCP1 整机成本偏差</ModalP><ModalP><HL>1.93%–2.41%</HL> — MIYAVI 项目成本偏差（优于目标）</ModalP></> },
  'MRO Sourcing': { title: 'MRO Sourcing', body: <><ModalP>非生产性物料寻源与供应商开发管理。独立完成从需求分析、工艺匹配、打样验收到大货采购交接的全链路管理。</ModalP><ModalH4>关联成果</ModalH4><ModalP><HL>93.7%</HL> — 打样合格率</ModalP><ModalP><HL>−7~10 自然日</HL> — 绿通开发周期缩短</ModalP></> },
  'AIGC': { title: 'AIGC', body: <><ModalP>AI 生成内容多场景应用。利用 AIGC 技术提升工作效率，包括自动化文档生成、数据分析可视化、会议纪要智能整理等。</ModalP></> },
  'ODM/OEM': { title: 'ODM/OEM', body: <><ModalP>原始设计与设备制造商开发管理。负责供应商全周期引入，建立评估体系提升协同水平，降低物料采购成本。</ModalP><ModalH4>关联成果</ModalH4><ModalP><HL>−5.7%</HL> — 采购成本降幅</ModalP></> },
  'AutoCAD': { title: 'AutoCAD', body: <><ModalP>工程制图工具。精准转化设计师需求为可制造规格，确保技术参数、尺寸与材质的准确性。</ModalP><ModalH4>关联成果</ModalH4><ModalP><HL>93.7%</HL> — 打样合格率</ModalP></> },
  'No-code Agent': { title: 'No-code Agent', body: <><ModalP>无代码 AI 智能体搭建。可独立构建业务自动化 Agent，将重复性工作转化为自动化流程，无需专业开发背景。</ModalP></> },
  // New tags — simple descriptions
  'Prompt Engineering': { title: 'Prompt Engineering', body: <><ModalP>通过精准的提示词设计引导 LLM 产出高质量结果。日常使用 Claude Code 进行复杂任务编排与自动化，积累了大量 prompt 设计经验。</ModalP></> },
  'Workflow Optimization': { title: 'Workflow Optimization', body: <><ModalP>擅长识别流程瓶颈并设计自动化方案。从 MRO 2.0 数字化迭代到 AI 驱动的会议纪要工具，持续探索更高效的工作方式。</ModalP></> },
  'Skill Design': { title: 'Skill Design', body: <><ModalP>基于 Claude Code Skill 框架搭建可复用的自动化能力模块。代表作为竞品分析 Agent Skill，输入产品名即可自动生成深度分析报告。</ModalP></> },
  'Cross-functional': { title: 'Cross-functional', body: <><ModalP>具备跨品牌、产研、供应链及外部合作方的多方协调能力。MIYAVI 项目中成功统筹品牌、产研、艺人三方团队达成交付目标。</ModalP></> },
  'Gantt Chart': { title: 'Gantt Chart', body: <><ModalP>运用甘特图进行项目进度编排与资源规划。MIYAVI 项目中借助 Claude Code 实现甘特图自动生成，0→1 搭建 AI 辅助排程能力。</ModalP></> },
  'SPSS': { title: 'SPSS', body: <><ModalP>统计分析工具，用于数据处理与量化分析，支持项目决策与业务洞察。</ModalP></> },
  'MS Office': { title: 'MS Office', body: <><ModalP>精通 Word、Excel、PowerPoint 等办公软件，用于日常项目管理、数据分析与汇报呈现。</ModalP></> },
  'Music Tech': { title: 'Music Tech', body: <><ModalP>音乐科技爱好者。主导 MIYAVI 联名款吉他效果器开发，将对音乐的理解转化为产品洞察与创新。</ModalP></> },
  'Solo Travel': { title: 'Solo Travel', body: <><ModalP>热爱独自旅行。独立规划行程、适应未知环境，培养了主动探索与自我驱动的习惯。</ModalP></> },
}

/* ============================================================
   JD Match — analysis result type
   ============================================================ */
interface JDMatchResult {
  score: number
  summary: string
  items: { requirement: string; stars: number; match: string; level: string }[]
  highlights: string[]
  suggestions: string[]
}

function StarRating({ stars }: { stars: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ fontSize: '12px', color: i <= stars ? '#DEDBC8' : 'rgba(222,219,200,0.2)' }}>★</span>
      ))}
    </span>
  )
}

function JDMatchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [jd, setJd] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<JDMatchResult | null>(null)
  const [error, setError] = useState('')

  const analyze = async () => {
    if (jd.trim().length < 20) { setError('请粘贴完整的 JD 内容'); return }
    setError('')
    setLoading(true)
    try {
      // Use DeepSeek API directly for now; switch to worker URL for production
      const apiUrl = 'https://api.deepseek.com/v1/chat/completions'
      const apiKey = 'sk-af0502a10aca40319b09c287ea26c87e'

      const resume = `# 候选人档案：潘子健 / Zachary Pan

## 教育
- 硕士：马来西亚理科大学 USM (QS 134) — MBA 专业管理方向，2024-2025
- 本科：广州工商学院 — 采购管理专业，2018-2022

## 早期经历
- 高中期间 EF 英语助教 1.5 年，全英辅助外教管理课堂
- 本科期间校艺术团声乐部部长，组织商演与活动策划
- 本科毕业后雅思口语陪练 7 个月
- MBA 期间任中国学生联合会英语角策划主持
- 多国 Solo Travel（埃及、斯里兰卡、高加索等），全程自主规划、预算精准控制、备选方案设计

## 现任：广州蓝深科技有限公司 (Lanshen Technology / DONNER 品牌) — PM/研发管培生，2025.6-至今
- 公司第一届管培生，培养体系从零搭建，大部分靠自己学 + AI 辅助
- 主管多项自研产品项目管理，覆盖 IPD 全生命周期（CDCP→PDAP→ADCP，HMS→EVT→DVT→PVT→MP）
- 里程碑准时达成率 100%、TR 一次通过率 85.7%、成本偏差 ≤3%、项目周期缩短 ~10%
- 同时管理 10+ 项目：MIYAVI 联名效果器、Pocket Wave 吉他音箱、HUSH 系列颜色扩展/迭代、Pokemon IP 联名（评估中）、无头吉他系列（HLX500/550/DST1000）、Plug 音箱电吉他

### MIYAVI 联名款 3-in-1 吉他效果器 (2025.8-2026.1)
- 与日本吉他手 MIYAVI 联名，统筹品牌/产研/艺人三方团队
- 成本偏差 1.93%-2.41%，良率 >92%，周期提前 21% 交付
- 0→1 搭建 AI 甘特图自动编排
- 处理品牌部与研发部大货质量冲突，学会"在约束条件下找最优解"

### 工厂轮岗
- 深度产线实践，输出改善建议（poka-yoke 防错、测试流程简化、样品管理标准化）

## 前任：URBAN REVIVO — 采购 PMO，2022.2-2023.3
- 校招进入，采购成本降幅 −5.7%，打样合格率 93.7%
- 主导 MRO 2.0 数字化流程迭代
- 旗舰店建设：20+ 非标物料开发，3轮准时率 97.6%，MP 合格率 100%

## 硬技能
IPD、敏捷/Scrum、WBS、甘特图、PDCA、SMART、鱼骨图/5 Whys、MIL 管理、供应链管理、MRO 寻源、ODM/OEM、AutoCAD、PDC 目标成本法、PRD、BOM 报价与成本测算、DFM、FAI、MS Office/Project/Visio、SPSS

## 跨领域技术知识（能与各职能专家有效沟通）
- ID/表面处理：VDI 纹理、喷漆（封闭/半封闭）、丝印/移印、氧化、抛光、打磨、UV/铅笔/百格/酒精测试
- 硬件/电子：SMT/波峰焊/回流焊、MCU/DSP/模拟电路、FPC/BTB、Gerber 文件、锂电池类型、ESD/EMC
- 结构/模具：ABS/PC/ABS+PC/PA+FG(尼龙+玻纤)、拔模角度、熔接痕、CNC 铣削/车削/冲压
- 声学/音频：IR 脉冲响应、EQ/AMP/CAB/MOD/DLY/REV、Feedback 回授、自适应陷波、SNR 信噪比
- 认证：无线/儿童产品/EMC/安全/化学认证风险评估
- 包装/生产：数码样/大货样、打白墨、爆色、爬坡计划

## AI/技术
Claude Code(深度使用)、Vibe Coding、AIGC、Prompt Engineering、Skill Design、工作流自动化、Python(基础)、React/TS/Tailwind(Vibe Coding)、Node.js(基础)、GitHub

## 软技能
跨职能协同（品牌/产研/ID/结构/硬件/采购/供应商）、风险管理与预判、需求拉通与流程重构、0→1 搭建、快速自学（第一届管培生无培养体系，靠 AI 自学 PM 全流程）、结构化思维、跨文化沟通

## 语言
中文(母语)、粤语(流利)、英文(IELTS 6.0，工作级，享受跨文化英语交流)

## PM 风格与成长
早期理想主义(让各方都满足)→务实迭代(在最低限度条件下让各方满足)。主动复盘：从 UV 测试跟进疏漏中建立测试追踪意识；从 MIYAVI 包装冲突中学会在品牌与研发之间找平衡。擅长规划排期与风险预测（熟悉领域后），习惯在预算中预留 buffer。主动记录 28 条项目经验教训并建立知识库（148 条跨领域术语）

## 个人
自学 + AI 辅助独立搭建多个工具，热爱音乐科技与独自旅行，享受用英语与不同文化背景的人交流`

      const prompt = `你是资深HR顾问。根据候选人档案分析JD匹配度。

返回纯JSON（无markdown）：
{
  "score": 数字0-100,
  "summary": "一句话总结",
  "items": [{"requirement":"JD要求","stars":0-5,"match":"候选人对应经历","level":"strong|partial|gap"}],
  "highlights": ["亮点1","亮点2"],
  "suggestions": ["弥补建议1","弥补建议2"]
}

规则：
- score加权：硬技能+工具35%、经验+项目30%、软技能20%、行业+学历15%
- 提取5-8条JD核心要求，⭐评分：5=完美匹配 4=强匹配 3=可弥补 2=差距明显 1=基本不符 0=无关
- highlights: 2-3个此岗位最突出优势
- suggestions: 固定2条，面向HR，语气是"候选人虽然在X方面稍有不足，但可通过Y方式有效弥补"。要让HR感受到候选人的成长潜力和可培养价值，而非自我辩护
- 专业客观，不过度包装也不过度贬低
- 所有涉及候选人的称呼统一使用"候选人"

候选人档案：
${resume}

JD：
${jd}`

      const resp = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0,
          max_tokens: 2500,
        }),
      })
      if (!resp.ok) { setError(`API 错误 (${resp.status})`); setLoading(false); return }
      const data = await resp.json()
      const raw = data.choices?.[0]?.message?.content || ''
      // Strip markdown code fences
      const json = JSON.parse(raw.replace(/^```\w*\n?/,'').replace(/\n?```$/,''))
      setResult(json)
    } catch (e: any) {
      setError(`分析失败: ${e.message}`)
    }
    setLoading(false)
  }

  const reset = () => { setJd(''); setResult(null); setError('') }

  useEffect(() => { if (!open) { reset() } }, [open])

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose() }} style={{
      position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.72)',
      backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: open ? 1 : 0, visibility: open ? 'visible' : 'hidden', pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity 0.35s, visibility 0.35s',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'rgba(12,12,12,0.95)', border: '0.5px solid rgba(255,255,255,0.1)',
        padding: 'clamp(18px,4vw,40px)', maxWidth: '700px', width: '94vw', maxHeight: '85vh', overflowY: 'auto',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '20px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(222,219,200,0.5)', background: 'none', border: 'none', fontSize: '20px', transition: 'color 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#DEDBC8' }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(222,219,200,0.5)' }}><X size={20} strokeWidth={1} /></button>

        {!result ? (
          <>
            <div style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 200, color: '#E1E0CC', letterSpacing: '-0.01em', marginBottom: '20px' }}>JD Match</div>
            <textarea value={jd} onChange={e => setJd(e.target.value)}
              placeholder="在此粘贴您的岗位JD，查看我们之间的匹配程度..."
              style={{
                width: '100%', minHeight: '180px', background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(222,219,200,0.15)',
                color: '#E1E0CC', fontSize: '13px', lineHeight: 1.7, padding: '14px', resize: 'vertical',
                fontFamily: "'Almarai', sans-serif", outline: 'none',
              }} />
            {error && <div style={{ color: 'rgba(255,120,100,0.8)', fontSize: '12px', marginTop: '8px' }}>{error}</div>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px' }}>
              <button onClick={analyze} disabled={loading} style={{
                padding: '10px 28px', borderRadius: '999px', border: 'none', cursor: loading ? 'default' : 'pointer',
                background: loading ? 'rgba(222,219,200,0.3)' : '#DEDBC8', color: '#000',
                fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em', transition: 'background 0.3s',
              }}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '14px', height: '14px', border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                    分析中...
                  </span>
                ) : '开始分析'}
              </button>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </>
        ) : (
          <>
            {/* Score */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ fontSize: 'clamp(48px,6vw,72px)', fontWeight: 200, color: '#DEDBC8', lineHeight: 1 }}>{result.score}%</div>
              <div style={{ fontSize: '14px', color: 'rgba(222,219,200,0.6)', marginTop: '8px' }}>{result.summary}</div>
            </div>

            {/* Item-by-item */}
            <ModalH4>逐项匹配</ModalH4>
            {result.items.map((item, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < result.items.length - 1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(222,219,200,0.85)' }}>{item.requirement}</span>
                  <StarRating stars={item.stars} />
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(222,219,200,0.5)', marginTop: '4px' }}>{item.match}</div>
              </div>
            ))}

            {/* Highlights */}
            {result.highlights.length > 0 && (
              <>
                <ModalH4>匹配亮点</ModalH4>
                {result.highlights.map((h, i) => (
                  <ModalP key={i}><span style={{ color: '#DEDBC8', marginRight: '6px' }}>✦</span>{h}</ModalP>
                ))}
              </>
            )}

            {/* Suggestions */}
            {result.suggestions.length > 0 && (
              <>
                <ModalH4>弥补建议</ModalH4>
                {result.suggestions.map((s, i) => (
                  <ModalP key={i}><span style={{ color: 'rgba(222,219,200,0.4)', marginRight: '6px' }}>→</span>{s}</ModalP>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

/* ============================================================
   JD Match Slider
   ============================================================ */
function JDMatchSlider({ onActivate, resetSignal }: { onActivate: () => void; resetSignal?: number }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const [progress, setProgress] = useState(0)
  const [anim, setAnim] = useState(true)
  const activated = useRef(false)

  // Reset when triggered externally (modal closed)
  useEffect(() => { setProgress(0); activated.current = false }, [resetSignal])
  const knobSize = 32

  const update = useCallback((clientX: number) => {
    const t = trackRef.current; if (!t) return
    const r = t.getBoundingClientRect()
    const clamped = Math.max(0, Math.min(1, (clientX - r.left - knobSize / 2) / (r.width - knobSize - 8)))
    setProgress(clamped)
    if (clamped >= 0.95 && !activated.current) { activated.current = true; onActivate() }
  }, [onActivate])

  const startDrag = useCallback((clientX: number) => { dragging.current = true; setAnim(false); update(clientX) }, [update])
  const stopDrag = useCallback(() => { dragging.current = false; setAnim(true); setProgress(p => p < 0.95 ? 0 : p) }, [])

  useEffect(() => {
    const mm = (e: MouseEvent) => { if (dragging.current) update(e.clientX) }
    const mu = () => { if (dragging.current) stopDrag() }
    const tm = (e: TouchEvent) => { if (dragging.current) { e.preventDefault(); update(e.touches[0].clientX) } }
    const te = () => { if (dragging.current) stopDrag() }
    window.addEventListener('mousemove', mm)
    window.addEventListener('mouseup', mu)
    window.addEventListener('touchmove', tm, { passive: false })
    window.addEventListener('touchend', te)
    return () => {
      window.removeEventListener('mousemove', mm)
      window.removeEventListener('mouseup', mu)
      window.removeEventListener('touchmove', tm)
      window.removeEventListener('touchend', te)
    }
  }, [update, stopDrag])

  const fill = `${Math.max(8, progress * 100)}%`
  return (
    <div className="flex justify-center px-4" style={{ marginTop: '14px' }}>
      <div ref={trackRef} style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '44px', borderRadius: '999px', overflow: 'hidden', background: '#DEDBC8' }}>
        <div style={{ position: 'absolute', inset: '2px', borderRadius: '999px', background: 'rgba(0,0,0,0.06)', width: fill, transition: anim ? 'width 0.5s cubic-bezier(0.22,0.58,0.12,1)' : 'none' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', letterSpacing: '0.08em', fontWeight: 400, color: 'rgba(0,0,0,0.3)', transition: 'opacity 0.3s', opacity: progress > 0.3 ? 0 : 1 }}>滑动解锁 JD 匹配</div>
        <div onMouseDown={e => { e.preventDefault(); startDrag(e.clientX) }} onTouchStart={e => { startDrag(e.touches[0].clientX) }} style={{
          position: 'absolute', left: `calc(${progress * 100}% - ${progress * knobSize}px + ${2 + progress * 4}px)`, top: '50%', transform: 'translateY(-50%)',
          width: knobSize, height: knobSize, borderRadius: '50%', background: '#0a0a0a', border: '0.5px solid rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab',
          transition: anim ? 'left 0.5s cubic-bezier(0.22,0.58,0.12,1)' : 'none', zIndex: 2,
        }}><ArrowRight size={14} strokeWidth={2.5} color="#DEDBC8" /></div>
      </div>
    </div>
  )
}

/* ============================================================
   Word Cloud
   ============================================================ */
interface TagItem { text: string; cls: string; v: boolean }
const tagItems: TagItem[] = [
  { text: 'Project Management', cls: 'xl', v: false }, { text: 'Vibe Coding', cls: 'lg', v: true },
  { text: 'IPD', cls: 'md', v: false }, { text: 'Supply Chain', cls: 'md', v: false },
  { text: 'Agile', cls: 'sm', v: true }, { text: 'Claude Code', cls: 'sm', v: false },
  { text: 'Risk Control', cls: 'sm', v: false }, { text: 'Cost Management', cls: 'sm', v: false },
  { text: 'Prompt Engineering', cls: 'sm', v: false }, { text: 'Workflow Optimization', cls: 'sm', v: true },
  { text: 'MRO Sourcing', cls: 'xs', v: true }, { text: 'AIGC', cls: 'xs', v: false },
  { text: 'ODM/OEM', cls: 'xs', v: true }, { text: 'AutoCAD', cls: 'xs', v: false },
  { text: 'No-code Agent', cls: 'xs', v: false }, { text: 'Skill Design', cls: 'xs', v: false },
  { text: 'Cross-functional', cls: 'xs', v: true }, { text: 'Gantt Chart', cls: 'xs', v: false },
  { text: 'SPSS', cls: 'xs', v: false }, { text: 'MS Office', cls: 'xs', v: false },
  { text: 'Music Tech', cls: 'xs', v: false }, { text: 'Solo Travel', cls: 'xs', v: true },
]
const clsMap: Record<string, { fontSize: number; weight: number; color: string }> = {
  xl: { fontSize: 48, weight: 200, color: '#E1E0CC' }, lg: { fontSize: 34, weight: 200, color: 'rgba(222,219,200,0.78)' },
  md: { fontSize: 24, weight: 300, color: 'rgba(222,219,200,0.62)' }, sm: { fontSize: 17, weight: 300, color: 'rgba(222,219,200,0.62)' },
  xs: { fontSize: 13, weight: 400, color: 'rgba(222,219,200,0.42)' },
}

function WordCloud({ onTagClick }: { onTagClick: (text: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tags, setTags] = useState<{ text: string; x: number; y: number; fs: number; w: number; c: string; v: boolean }[]>([])
  const built = useRef(false)
  const tRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const build = async () => {
      const el = ref.current; if (!el) return
      await document.fonts.ready
      const W = el.clientWidth, H = el.clientHeight
      if (W < 60 || H < 60) return
      built.current = true
      const CELL = 10, COLS = Math.floor(W / CELL), ROWS = Math.floor(H / CELL)
      const grid = new Uint8Array(COLS * ROWS)
      const order: Record<string, number> = { xl: 5, lg: 4, md: 3, sm: 2, xs: 1 }
      const sorted = [...tagItems].sort((a, b) => order[b.cls] - order[a.cls])
      const cx = Math.floor(COLS / 2), cy = Math.floor(ROWS / 2)

      const m = document.createElement('div')
      m.style.cssText = 'position:absolute;left:-9999px;top:-9999px;font-family:Almarai,sans-serif;'
      document.body.appendChild(m)

      // Scale down font sizes on narrow screens
      const scale = Math.min(1, W / 500)
      const out: typeof tags = []
      sorted.forEach(t => {
        const s = clsMap[t.cls]
        const fs = Math.round(s.fontSize * scale)
        m.innerHTML = `<span style="font-size:${fs}px;font-weight:${s.weight};white-space:nowrap;writing-mode:${t.v ? 'vertical-rl' : 'horizontal-tb'};text-orientation:mixed;">${t.text}</span>`
        const r = (m.firstChild as HTMLElement).getBoundingClientRect()
        const tw = Math.ceil(r.width) + 10, th = Math.ceil(r.height) + 10
        const gw = Math.max(1, Math.floor(tw / CELL)), gh = Math.max(1, Math.floor(th / CELL))
        let bx = -1, by = -1, best = Infinity

        for (let rad = 0; rad < Math.max(COLS, ROWS) && best === Infinity; rad++) {
          for (let dy = -rad; dy <= rad && best === Infinity; dy++) {
            for (let dx = -rad; dx <= rad && best === Infinity; dx++) {
              if (Math.abs(dx) !== rad && Math.abs(dy) !== rad) continue
              const gx = cx + dx - Math.floor(gw / 2), gy = cy + dy - Math.floor(gh / 2)
              if (gx < 0 || gy < 0 || gx + gw > COLS || gy + gh > ROWS) continue
              let ok = true
              for (let y2 = gy; y2 < gy + gh && ok; y2++) for (let x2 = gx; x2 < gx + gw && ok; x2++) if (grid[y2 * COLS + x2]) ok = false
              if (ok && dx * dx + dy * dy < best) { best = dx * dx + dy * dy; bx = gx; by = gy }
            }
          }
        }
        if (bx < 0) { bx = cx - Math.floor(gw / 2); by = cy - Math.floor(gh / 2) }
        for (let y2 = by; y2 < by + gh; y2++) for (let x2 = bx; x2 < bx + gw; x2++) grid[y2 * COLS + x2] = 1
        out.push({ text: t.text, x: bx * CELL + tw / 2, y: by * CELL + th / 2, fs, w: s.weight, c: s.color, v: t.v })
      })
      document.body.removeChild(m)
      setTags(out)
    }
    clearTimeout(tRef.current); tRef.current = setTimeout(build, 80)
    const onResize = () => { built.current = false; setTags([]); clearTimeout(tRef.current); tRef.current = setTimeout(() => { build() }, 300) }
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); clearTimeout(tRef.current) }
  }, [])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative', width: '100%', maxWidth: '700px', height: 'clamp(420px,58vh,560px)', margin: '0 auto', border: '0.5px solid rgba(222,219,200,0.08)' }}>
      {tags.map((t, i) => (
        <motion.span key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.03 }}
          style={{ position: 'absolute', left: t.x, top: t.y, transform: 'translate(-50%,-50%)', fontSize: t.fs, fontWeight: t.w, color: t.c, letterSpacing: '0.01em', cursor: 'pointer', whiteSpace: 'nowrap', writingMode: t.v ? 'vertical-rl' : 'horizontal-tb', textOrientation: 'mixed' }}
          onClick={() => onTagClick(t.text)}
          onMouseEnter={e => { (e.target as HTMLElement).style.color = '#DEDBC8' }}
          onMouseLeave={e => { (e.target as HTMLElement).style.color = t.c }}
        >{t.text}</motion.span>
      ))}
    </motion.div>
  )
}

/* ============================================================
   Section Card
   ============================================================ */
function SectionCard({ title, items, onItemClick, index = 0 }: { title: string; items: { id: string; company: string; role: string; period: string; highlights: string[] }[]; onItemClick: (id: string) => void; index?: number }) {
  const [hover, setHover] = useState(false)
  // Fly in from different directions: 0=left, 1=bottom, 2=right
  const dirs = [{ x: -80, y: 0 }, { x: 0, y: 60 }, { x: 80, y: 0 }]
  const d = dirs[index % 3]
  return (
    <motion.div initial={{ opacity: 0, x: d.x, y: d.y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: '#101010', border: '0.5px solid rgba(255,255,255,0.06)', padding: 'clamp(20px,3vw,32px)', display: 'flex', flexDirection: 'column', gap: '20px', cursor: 'default', transition: 'border-color 0.4s, background 0.4s', position: 'relative' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = '#141414'; setHover(true) }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = '#101010'; setHover(false) }}
    >
      <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#DEDBC8', textTransform: 'uppercase', fontWeight: 400 }}>{title}</div>
      {/* Hint */}
      <div style={{ position: 'absolute', top: '20px', right: '22px', fontSize: '10px', letterSpacing: '0.12em', color: hover ? 'rgba(222,219,200,0.4)' : 'rgba(222,219,200,0.18)', transition: 'color 0.4s', pointerEvents: 'none' }}>点击查看详情</div>
      {items.map((item, i) => (
        <div key={i} style={{ borderTop: i > 0 ? '0.5px solid rgba(255,255,255,0.06)' : 'none', paddingTop: i > 0 ? '16px' : 0, cursor: 'pointer', position: 'relative' }} onClick={(e) => { e.stopPropagation(); onItemClick(item.id) }}>
          <div style={{ fontSize: '16px', fontWeight: 300, color: '#E1E0CC', marginBottom: '2px', transition: 'color 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#DEDBC8' }} onMouseLeave={e => { e.currentTarget.style.color = '#E1E0CC' }}>{item.company}</div>
          <div style={{ fontSize: '11px', color: 'rgba(222,219,200,0.45)', letterSpacing: '0.05em', marginBottom: '8px' }}>{item.role} · {item.period}</div>
          {item.highlights.map((h, j) => (<div key={j} style={{ fontSize: '12px', color: 'rgba(222,219,200,0.6)', lineHeight: 1.6 }}>— {h}</div>))}
        </div>
      ))}
    </motion.div>
  )
}

/* ============================================================
   Fade-in wrapper
   ============================================================ */
/* Character-by-character scroll reveal */
function CharReveal({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const chars = [...text]
  return (
    <div ref={ref} style={{ lineHeight: 1.15 }}>
      {chars.map((ch, i) => (
        <motion.span key={i} initial={{ opacity: 0.2 }} animate={inView ? { opacity: 1 } : { opacity: 0.2 }} transition={{ duration: 0.4, delay: i * 0.02, ease: 'easeOut' }} style={{ color: 'inherit' }}>{ch}</motion.span>
      ))}
    </div>
  )
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

/* ============================================================
   App
   ============================================================ */
/* ============================================================
   Loading Screen
   ============================================================ */
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'sector' | 'shrink' | 'expand' | 'done'>('sector')
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('shrink'), 2000)
    const t2 = setTimeout(() => setPhase('expand'), 2200)
    const t3 = setTimeout(() => setPhase('done'), 3200)
    const t4 = setTimeout(() => doneRef.current(), 3400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  if (phase === 'done') return null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
      background: '#fff', width: '100vw',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: '60px', height: '60px',
        animation: phase === 'sector' ? undefined
          : phase === 'shrink' ? 'shrinkDot 0.2s ease-in forwards'
          : phase === 'expand' ? 'burstOut 1s cubic-bezier(0.25, 0, 0.15, 1) forwards'
          : undefined,
      }}>
        {phase === 'sector' ? (
          <svg width="60" height="60" viewBox="0 0 60 60" style={{ display: 'block' }}>
            {/* Border ring */}
            <circle cx="30" cy="30" r="28" fill="none" stroke="#000" strokeWidth="1.5" />
            {/* Sector fill — rotated -90 so stroke starts from top (12 o'clock) */}
            <circle cx="30" cy="30" r="14" fill="none" stroke="#000" strokeWidth="28"
              strokeDasharray="88 88" strokeDashoffset="88"
              transform="rotate(-90 30 30)"
              style={{ animation: 'sweepClock 2s linear forwards' }} />
          </svg>
        ) : (
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: '#000',
          }} />
        )}
      </div>
      <style>{`
        @keyframes sweepClock {
          0% { stroke-dashoffset: 88; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes shrinkDot {
          0% { transform: scale(1); }
          100% { transform: scale(0.85); }
        }
        @keyframes burstOut {
          0% { transform: scale(0.85); opacity: 1; }
          100% { transform: scale(60); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default function App() {
  const { isMobile } = useResponsive()
  const [modal, setModal] = useState<{ open: boolean; title: string; body: React.ReactNode }>({ open: false, title: '', body: null })
  const [jdModalOpen, setJdModalOpen] = useState(false)
  const [jdReset, setJdReset] = useState(0)
  const [loading, setLoading] = useState(true)
  const openJdModal = () => setJdModalOpen(true)
  const closeJdModal = () => { setJdModalOpen(false); setJdReset(r => r + 1) }
  const handleLoadingDone = useCallback(() => setLoading(false), [])

  // Galaxy scroll parallax
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('galaxy-bg')
      if (!el) return
      const y = window.scrollY * 0.03
      el.style.backgroundPosition = `${50 + y * 0.5}% ${40 + y * 0.3}%, ${70 - y * 0.3}% ${30 + y * 0.4}%, ${50 + y * 0.2}% ${80 - y * 0.5}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openModal = (title: string, body: React.ReactNode) => setModal({ open: true, title, body })
  const closeModal = () => setModal({ open: false, title: '', body: null })

  const openContact = () => openModal('Get in Touch', getContactContent())
  const openWork = (type: string) => { const d = getWorkData(type); openModal(d.title, d.body) }
  const openProject = (type: string) => { const d = getProjectData(type); openModal(d.title, d.body) }
  const openTag = (text: string) => { const d = tagData[text]; if (d) openModal(d.title, d.body) }

  return (
    <div style={{ background: '#000' }}>
      {/* Loading screen */}
      {loading && <LoadingScreen onDone={handleLoadingDone} />}

      {/* Subtle galaxy background — scroll-driven parallax */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 50% at 30% 60%, rgba(180,160,120,0.04) 0%, transparent 70%),
          radial-gradient(ellipse 60% 40% at 70% 30%, rgba(200,190,160,0.03) 0%, transparent 60%),
          radial-gradient(ellipse 50% 30% at 50% 80%, rgba(160,140,100,0.02) 0%, transparent 50%)
        `,
        transition: 'background-position 0.8s ease-out',
      }} id="galaxy-bg" />

      {/* ============================================================
          NAV BAR (Prisma-style pill)
          ============================================================ */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: '#000', borderRadius: '0 0 12px 12px', padding: '6px 14px', whiteSpace: 'nowrap' }} className="md:rounded-b-3xl md:px-8 md:py-2">
        <div style={{ display: 'flex', gap: 'clamp(10px,3vw,40px)', fontSize: '9px', letterSpacing: '0.08em', color: 'rgba(225,224,204,0.7)' }} className="sm:text-xs md:text-sm">
          <a href="#about" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => { e.currentTarget.style.color = '#E1E0CC' }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(225,224,204,0.7)' }}>About</a>
          <a href="#skills" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => { e.currentTarget.style.color = '#E1E0CC' }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(225,224,204,0.7)' }}>Skills</a>
          <a href="#work" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => { e.currentTarget.style.color = '#E1E0CC' }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(225,224,204,0.7)' }}>Work</a>
          <a href="#ai" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => { e.currentTarget.style.color = '#E1E0CC' }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(225,224,204,0.7)' }}>AI</a>
        </div>
        </div>
      </nav>

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="h-screen relative p-4 md:p-6" id="about">
        <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
          {/* Video: poster fallback for WeChat mobile only */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} transition={{ duration: 0.6 }} style={{ position: 'absolute', inset: 0 }}>
            {isMobile && /MicroMessenger/i.test(navigator.userAgent) ? (
              <img src={BASE + 'hero-poster.jpg'} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <video src={BASE + 'b048d1974e26508d52a4b1d58732e729.mp4'} autoPlay loop muted playsInline webkit-playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portrait" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
          </motion.div>
          <div className="noise-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.55, mixBlendMode: 'overlay', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent 40%, transparent 70%, rgba(0,0,0,0.55))', pointerEvents: 'none' }} />

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? '0 16px 16px' : '0 0 20px 10px', zIndex: 2 }}>
            {isMobile ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', fontWeight: 700, color: '#DEDBC8', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: '16px' }}>Zachary Pan</div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <a href={BASE + 'resume.pdf'} target="_blank" style={{ border: '0.5px solid rgba(222,219,200,0.35)', color: 'rgba(222,219,200,0.8)', padding: '8px 16px', borderRadius: '999px', fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}><FileText size={12} strokeWidth={1.2} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />Resume</a>
                  <button onClick={openContact} style={{ border: '0.5px solid rgba(222,219,200,0.35)', color: '#000', background: '#DEDBC8', padding: '8px 16px', borderRadius: '999px', fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}><ArrowUpRight size={12} strokeWidth={1.5} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />Get in Touch</button>
                </div>
                <JDMatchSlider onActivate={openJdModal} resetSignal={jdReset} />
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'clamp(32px,5vw,64px)' }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(100px,12vw,160px)', fontWeight: 700, color: '#DEDBC8', letterSpacing: '-0.03em', lineHeight: 0.92, flexShrink: 0, transform: 'scaleX(0.88)', transformOrigin: 'left bottom', paddingBottom: '4px' }}>Zachary Pan</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, paddingBottom: '6px', marginRight: '10px', alignItems: 'flex-end' }}>
                  <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '400px' }}>
                    <a href={BASE + 'resume.pdf'} target="_blank" className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-medium tracking-[0.08em] uppercase transition-all duration-300 no-underline"
                      style={{ border: '0.5px solid rgba(222,219,200,0.3)', color: 'rgba(222,219,200,0.75)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(222,219,200,0.55)'; e.currentTarget.style.color = '#DEDBC8' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(222,219,200,0.3)'; e.currentTarget.style.color = 'rgba(222,219,200,0.75)' }}><FileText size={13} strokeWidth={1.2} />Resume</a>
                    <button onClick={openContact} className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-medium tracking-[0.08em] uppercase transition-all duration-300"
                      style={{ border: '0.5px solid rgba(222,219,200,0.3)', color: '#000', background: '#DEDBC8', cursor: 'pointer' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#e8e6d8' }} onMouseLeave={e => { e.currentTarget.style.background = '#DEDBC8' }}><ArrowUpRight size={13} strokeWidth={1.5} />Get in Touch</button>
                  </div>
                  <div style={{ width: '100%', maxWidth: '400px' }}><JDMatchSlider onActivate={openJdModal} resetSignal={jdReset} /></div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          CONTENT: Text + Word Cloud
          ============================================================ */}
      <section id="skills" style={{ background: '#000', padding: 'clamp(60px,10vh,100px) 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: 'clamp(80px,12vh,140px)', textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: '#E1E0CC', letterSpacing: '-0.01em' }}><CharReveal text="白天管交付。" /></div>
            <div style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 300, color: 'rgba(225,224,204,0.4)', letterSpacing: '-0.01em', marginTop: '2px' }}><CharReveal text="晚上造工具。" /></div>
            <div style={{ fontSize: '12px', fontWeight: 400, color: 'rgba(222,219,200,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 'clamp(16px,2.5vw,28px)' }}><CharReveal text="Project Management & AI Builder" /></div>
            <div style={{ fontSize: '14px', color: 'rgba(222,219,200,0.45)', lineHeight: 1.8, marginTop: '8px', maxWidth: '520px' }}><CharReveal text="从 IPD 流程到 Claude Code。从供应链到 AI 工作流。一直在找更高效的方式，把复杂变成结果。" /></div>
          </div>

        <FadeIn delay={0.15}>
          <div style={{ fontSize: '12px', letterSpacing: '0.3em', color: 'rgba(222,219,200,0.5)', textTransform: 'uppercase', marginBottom: '6px', marginTop: 'clamp(20px,3vh,40px)', textAlign: 'center', width: '100%' }}>技能词云</div>
          <div style={{ fontSize: '13px', color: 'rgba(222,219,200,0.35)', fontWeight: 300, marginBottom: '10px', textAlign: 'center', width: '100%' }}>点击标签查看详情</div>
        </FadeIn>
        <WordCloud onTagClick={openTag} />
      </section>

      {/* ============================================================
          THREE SECTION CARDS
          ============================================================ */}
      <section id="work" style={{ background: '#000', padding: 'clamp(60px,10vh,100px) 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 'clamp(12px,1.5vw,20px)' }}>
          <SectionCard index={0} title="Working Experience" onItemClick={openWork} items={[
            { id: 'donner', company: 'DONNER', role: 'PM 管培生', period: '2025.6 – 2026.2', highlights: ['里程碑 100% 准时达成', 'TR 一次通过率 85.7%', '整机成本偏差 ≤3%'] },
            { id: 'ur', company: 'URBAN REVIVO', role: '采购 PMO', period: '2022.2 – 2023.3', highlights: ['采购成本降幅 −5.7%', '打样合格率 93.7%', '绿通周期缩短 −7d'] },
          ]} />
          <SectionCard index={1} title="Projects Experience" onItemClick={openProject} items={[
            { id: 'miyavi', company: 'MIYAVI 联名款 3-in-1 吉他效果器', role: 'Project Lead', period: '2025.8 – 2026.1', highlights: ['项目周期缩短 21%', '整机成本偏差 1.93%', 'MP 良率 92%+', 'AI 甘特图 0→1'] },
            { id: 'mro', company: 'MRO 2.0 数字化流程迭代', role: 'Process Owner', period: '2022.11 – 2023.3', highlights: ['售后耗时 −2 人天', '绿通准时率 97.6%', '返单 −3单/月'] },
          ]} />
          <div id="ai" style={{ display: 'contents' }}>
            <SectionCard index={2} title="AI Projects" onItemClick={openProject} items={[
            { id: 'pm-os', company: 'PM OS — IPD 研发项目管理工具', role: '独立开发', period: '2026', highlights: ['13 里程碑 / 7 阶段 IPD 流程', '自绘 SVG 甘特图 + 9 张数据表', 'Vercel + CF Pages 双部署'] },
            { id: 'ai-meeting', company: 'AI 会议纪要智能管理工具', role: '独立开发', period: '2025', highlights: ['30min → 5min 纪要整理', '风险识别 + 待办追踪', 'Claude Code Vibe Coding'] },
            { id: 'competitor', company: '竞品分析 Agent Skill', role: '独立开发', period: '2026', highlights: ['具体竞品 / 概念竞品双模式', '自动化搜索 + Excel 报告', '附带 PDF 案例报告'] },
          ]} />
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <section id="match" style={{ background: '#000', padding: '0 24px 60px', textAlign: 'center' }}>
        <FadeIn>
          <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(222,219,200,0.3)', marginBottom: '8px' }}>
            BTW — 这个网站也是用 Claude Code Vibe Coding 生成的。对话即交付。
          </div>
        </FadeIn>
      </section>

      {/* Modal */}
      <Modal open={modal.open} title={modal.title} onClose={closeModal}>{modal.body}</Modal>
      {/* JD Match Modal */}
      <JDMatchModal open={jdModalOpen} onClose={closeJdModal} />
    </div>
  )
}
