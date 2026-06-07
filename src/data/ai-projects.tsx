import type { ReactNode } from 'react'

export interface AIProject {
  slug: string
  title: string
  tagline: string
  tags: string[]
  detail: ReactNode
}

/* ============================================================
   Shared text components
   ============================================================ */
function H3({ children }: { children: string }) {
  return <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(222,219,200,0.5)', margin: '26px 0 8px' }}>{children}</div>
}
function P({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return <div style={{ fontSize: '14px', lineHeight: 1.85, color: 'rgba(222,219,200,0.7)', marginBottom: '6px', ...style }}>{children}</div>
}
function HL({ children }: { children: string }) {
  return <span style={{ color: '#E1E0CC', fontWeight: 400 }}>{children}</span>
}
function Flow({ children }: { children: string }) {
  return <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', padding: '12px 16px', fontSize: '12px', lineHeight: 1.7, color: 'rgba(222,219,200,0.65)', fontFamily: 'monospace', whiteSpace: 'pre-wrap', margin: '8px 0' }}>{children}</div>
}
function Link({ href, children }: { href: string; children: string }) {
  return <a href={href} target="_blank" style={{ color: '#DEDBC8', textDecoration: 'none', border: '0.5px solid rgba(222,219,200,0.2)', padding: '4px 10px', borderRadius: '4px', fontSize: '12px' }}>{children}</a>
}
function THead({ children }: { children: ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', borderBottom: '0.5px solid rgba(255,255,255,0.1)', padding: '6px 0', marginBottom: '4px', fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(222,219,200,0.5)', textTransform: 'uppercase' }}>{children}</div>
}
function TRow({ left, right }: { left: string; right: string }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', padding: '5px 0', borderBottom: '0.5px solid rgba(255,255,255,0.03)', fontSize: '13px' }}><span style={{ color: 'rgba(222,219,200,0.65)' }}>{left}</span><span style={{ color: 'rgba(222,219,200,0.8)' }}>{right}</span></div>
}
function Tag({ children }: { children: string }) {
  return <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', color: 'rgba(222,219,200,0.55)', margin: '0 4px 4px 0' }}>{children}</span>
}

/* ============================================================
   PM OS
   ============================================================ */
function PmOsDetail() {
  return <>
    <H3>项目简介</H3>
    <P>基于 DONNER 真实 PM 经验（IPD 流程、TR/DCP 评审、MIL、BOM），用 Claude Code 独立开发的全功能项目管理工具。覆盖从概念到量产的全生命周期管理。</P>
    <div style={{ marginTop: '8px' }}><Link href="https://demo.pm-os.pages.dev">Live Demo ↗ demo.pm-os.pages.dev</Link></div>

    <H3>解决的问题</H3>
    <P>传统项目管理依赖 Excel + 多工具切换，信息散落在邮件/IM/文档里。需要一个<HL>按 IPD 流程设计的集成工具</HL>，把里程碑、任务、BOM、会议、复盘全部串起来。</P>

    <H3>核心功能</H3>
    <P><HL>IPD 全流程</HL> — 13 个里程碑节点（TR1→CDCP→TR2→HMS→TR3→PDCP→EVT→TR4→DVT→TR5→ADCP1→PVT→MP），7 阶段门管理，准入准出标准</P>
    <P><HL>自绘 SVG 甘特图</HL> — 不依赖第三方库，支持缩放、依赖连线、里程碑菱形标记、今日红线、逾期高亮</P>
    <P><HL>9 张数据表</HL> — 项目 / 里程碑 / 任务 / 会议 / 复盘 / 变更 / BOM / 采购 / 认证，全部 IndexedDB 本地存储，离线可用</P>
    <P><HL>AI 辅助</HL> — DeepSeek 驱动会议纪要智能分析（行动项提取 + 风险识别）、复盘自动生成</P>
    <P><HL>双部署</HL> — Vercel 全功能可编辑版 + Cloudflare Pages 只读 Demo 版（国内直连）</P>

    <H3>技术栈</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
      <Tag>Next.js 15</Tag><Tag>React</Tag><Tag>TypeScript</Tag><Tag>IndexedDB (Dexie)</Tag><Tag>SVG 自绘</Tag><Tag>DeepSeek API</Tag><Tag>Vercel</Tag><Tag>Cloudflare Pages</Tag>
    </div>

    <H3>项目教训</H3>
    <P>1. <HL>部署平台先验证</HL> — CF Pages 免费版 Next.js SSR 单 Worker 3MB 限制，22 路由远超上限，最终走静态导出</P>
    <P>2. <HL>版本锁定</HL> — Next.js 16 strict mode 导致 ESLint 大量报错，next-on-pages 只支持 15.x，中途回滚浪费数小时</P>
    <P>3. <HL>Demo 模式从 Day 1 规划</HL> — 后期给 20+ 文件加只读包裹，如果一开始设计 readonly prop 就简单了</P>
  </>
}

/* ============================================================
   AI 会议纪要工具
   ============================================================ */
function AiMeetingDetail() {
  return <>
    <H3>项目简介</H3>
    <P>基于 Claude Code 采用 Vibe Coding 独立开发，实现内容导入 → AI 分析 → 风险识别 → 待办追踪 → 多格式导出的完整闭环。30 分钟的手工整理压缩到 5 分钟。</P>
    <div style={{ marginTop: '8px' }}><Link href="https://ai-execution-pocket.vercel.app/">Live Demo ↗ ai-execution-pocket.vercel.app</Link></div>

    <H3>解决的问题</H3>
    <P>PM 每天参加大量会议，纪要整理耗时耗力。关键决策和行动项容易被遗漏。需要一个<HL>从录音到待办全自动</HL>的工具。</P>

    <H3>核心功能</H3>
    <P><HL>智能分析</HL> — AI 自动提取关键议题、决策事项及行动项</P>
    <P><HL>风险识别</HL> — 自动标记潜在风险项，按严重程度分级</P>
    <P><HL>待办追踪</HL> — 自动生成待办清单，状态流转与截止提醒</P>
    <P><HL>灵活导出</HL> — 支持 Markdown / PDF / Excel 多格式导出</P>

    <H3>技术栈</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
      <Tag>Vite</Tag><Tag>React</Tag><Tag>TypeScript</Tag><Tag>Cloudflare Pages</Tag><Tag>DeepSeek API</Tag><Tag>Tailwind CSS</Tag>
    </div>

    <H3>效果</H3>
    <div style={{ padding: '16px 0' }}>
      <THead><span>指标</span><span>变化</span></THead>
      <TRow left="纪要整理时间" right="30min → 5min" />
      <TRow left="行动项遗漏率" right="显著降低" />
      <TRow left="部署平台" right="Vercel → CF Pages（国内直连）" />
    </div>
  </>
}

/* ============================================================
   竞品分析 Agent Skill
   ============================================================ */
function CompetitorDetail() {
  return <>
    <H3>项目简介</H3>
    <P>基于 Claude Code Skill 框架搭建的自动化竞品分析工具。输入产品名即可自动完成：竞品信息收集 → 多维度对比分析 → 数据可视化 → Excel 深度报告导出。</P>

    <H3>智能分类</H3>
    <P>根据输入自动识别产品类型，匹配对应的分析框架。LLM / SaaS / 消费电子 / 家居用品 / 概念方案，每类有独立的搜索策略和对比维度。</P>
    <P style={{ color: 'rgba(222,219,200,0.35)', fontSize: '11px' }}>示例：输入「智能笔记 LLM」→ 自动识别为 SaaS 品类，聚焦模型能力、API 定价、多模态支持、上下文窗口等维度，而非硬件参数</P>

    <H3>具体竞品分析</H3>
    <P>针对已上市产品，搜索同品类竞品进行横向对比。覆盖基础信息、评分口碑、销量排名、产品规格、价格分布、SWOT、用户评价、市场空白与战略建议。</P>
    <P style={{ color: 'rgba(222,219,200,0.4)', fontSize: '11px' }}>案例：绿联67W充电宝 vs 小米/倍思/安克/罗马仕/酷态科 6 款同规格产品全维度分析</P>

    <H3>概念竞品分析</H3>
    <P>针对创新概念或未上市方案，搜索专利、众筹项目、学术文献及替代方案，评估概念新颖性和专利侵权风险。</P>
    <P style={{ color: 'rgba(222,219,200,0.4)', fontSize: '11px' }}>案例：无拉链行李箱闭合方案 — 10 个竞品/专利的功能矩阵对比 + 风险判定 + 差异化建议</P>

    <H3>技术栈</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
      <Tag>Claude Code Skill</Tag><Tag>Web 搜索</Tag><Tag>Excel 导出</Tag><Tag>SWOT 分析</Tag><Tag>专利检索</Tag>
    </div>

    <div style={{ marginTop: '14px' }}>
      <Link href={import.meta.env.BASE_URL + 'competitive-analysis-portfolio.pdf'}>查看案例报告 PDF ↗</Link>
    </div>
  </>
}

/* ============================================================
   Obsidian AI 记忆系统
   ============================================================ */
function ObsidianMemoryDetail() {
  return <>
    <H3>一句话</H3>
    <P>用 Obsidian + Claude Code 搭了一套 AI Agent 共享记忆系统。新 session 自动加载全部偏好和项目上下文。每次踩坑自动沉淀为可复用的经验。</P>

    <H3>背景：AI Agent 的健忘症</H3>
    <P>Claude Code 这类 AI Agent 有一个致命问题：<HL>每次新对话从零开始。</HL>上回告诉它的偏好、规则、教训，换一个对话框就全忘了。</P>
    <P>传统方案是 RAG（检索增强生成），但小而美的个人场景不需要向量数据库。我需要的是一套 <HL>Markdown 文件夹，Agent 能读也能写，人也能随时改。</HL></P>

    <H3>架构：5 个文件夹</H3>
    <Flow>{`Vault/
├── 00-Rules/         ← 全局规则：我是谁、怎么沟通、什么不能做
├── 01-Projects/      ← 每个项目独立，互不污染
│   └── <project>/
│       ├── _memory/  ← 项目状态、决策、事实（Agent 直接写）
│       └── _feedback/← 每次被纠正的反馈（Agent 自动写）
├── 02-Sources/       ← Web 资料自动归档
├── 03-Maps/          ← 图表
└── 04-Feedback/
    └── graduation-queue.md ← 跨项目原则候审队列`}</Flow>
    <P>核心设计：<HL>项目级 Agent 自动写，全局原则必须人审批。</HL></P>

    <H3>反馈回路</H3>
    <Flow>{`用户纠正 Agent → Agent 自动写 _feedback/ 文件
                         ↓
              ≥10 条反馈 → 压缩成 compacted.md
                         ↓
         跨项目重复出现 → 进入 graduation-queue
                         ↓
           用户 approve → 升入 _principles/（全局生效）`}</Flow>

    <H3>读取链</H3>
    <Flow>{`新 session 启动 → who-i-am → 协作规则 → 工程纪律
→ 跨项目教训 → 当前项目 _feedback/ → _memory/`}</Flow>
    <P>13 个大类、130+ 个问题的个人档案在 00-Rules/ 里，从性格到审美偏好。Agent 读了就知道怎么协作。</P>

    <H3>关键决策</H3>
    <div style={{ padding: '8px 0' }}>
      <THead><span>决策</span><span>原因</span></THead>
      <TRow left="Markdown，不用数据库" right="Agent 原生支持，人可用 Obsidian 随时改" />
      <TRow left="项目 _feedback/ Agent 直接写" right="写错了改起来成本低" />
      <TRow left="全局 _principles/ Agent 决不能写" right="错了影响所有项目，成本太高" />
      <TRow left="Git 60 分钟自动备份" right="Obsidian Git + GitHub 仓库" />
    </div>

    <H3>技术栈</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
      <Tag>Obsidian</Tag><Tag>Claude Code Agent SDK</Tag><Tag>AGENTS.md</Tag><Tag>GitHub</Tag><Tag>Obsidian Git</Tag><Tag>Templater</Tag><Tag>Vault Starter Pack</Tag>
    </div>

    <H3>效果</H3>
    <P>• 新 session 自动加载全部规则 + 偏好 + 项目上下文 + 历史反馈</P>
    <P>• 反馈 → 规则提炼 → 全局原则，全自动流转</P>
    <P>• 覆盖 6 个并行项目，各自独立互不污染</P>
    <P>• 灵感来源：Karpathy "llm-wiki" + PEEK 论文 (MIT/Stanford)</P>
  </>
}

/* ============================================================
   灵枢 Oracle
   ============================================================ */
function FortuneDetail() {
  return <>
    <H3>项目简介</H3>
    <P>八字 + 紫微斗数 + 塔罗三板块融合的命理应用。国内用户友好，Cloudflare Pages 直连部署。</P>

    <H3>解决的问题</H3>
    <P>市面上的命理工具要么是单一体系，要么界面陈旧。做一个<HL>三板块融合 + 现代 UI</HL>的命理应用。</P>

    <H3>已实现功能</H3>
    <P>• 八字排盘 + 解读</P>
    <P>• 紫微斗数排盘</P>
    <P>• 塔罗抽牌</P>
    <P>• 方位风水功能</P>
    <P>• Cloudflare Pages 国内直连</P>

    <H3>待实现</H3>
    <P>• 飞盘排盘</P>
    <P>• 置闰法</P>
    <P>• 节气时分精度</P>

    <H3>技术栈</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
      <Tag>Next.js</Tag><Tag>React</Tag><Tag>TypeScript</Tag><Tag>Cloudflare Pages</Tag><Tag>DeepSeek API</Tag>
    </div>
  </>
}

/* ============================================================
   Claude Code Skills 总览
   ============================================================ */
function SkillsDetail() {
  return <>
    <H3>项目简介</H3>
    <P>基于 Claude Code Skill 框架搭建的 11 个可复用自动化能力模块。每个 Skill 是一个独立的功能单元，AI Agent 遇到特定任务时自动加载。</P>

    <H3>Skills 清单</H3>

    <div style={{ marginTop: '12px' }}>
      <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(222,219,200,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>效率工具</div>
      <TRow left="weekly-review" right="周度 AI 使用深度复盘，自动提炼可复用教训" />
      <TRow left="prompt-optimizer" right="分析原始指令，匹配最佳实践，输出优化后的提示词" />
      <TRow left="to-prd" right="将对话上下文一键转化为 PRD 文档" />
      <TRow left="to-issues" right="将方案/PRD 拆分为独立可抓取的 Issues" />
    </div>

    <div style={{ marginTop: '16px' }}>
      <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(222,219,200,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>分析与研究</div>
      <TRow left="competitive-analysis" right="自动竞品搜索 + 多维度对比 + Excel 报告导出" />
      <TRow left="diagnose" right="受控诊断循环：复现 → 缩小 → 假设 → 插桩 → 修复" />
      <TRow left="triag" right="Issue 状态机管理，按角色路由" />
    </div>

    <div style={{ marginTop: '16px' }}>
      <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(222,219,200,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>部署与网络</div>
      <TRow left="deploy-site" right="一键部署到 Cloudflare Pages / Vercel" />
      <TRow left="web-access" right="统一网络入口，CLI 受阻自动切 CDP 浏览器" />
    </div>

    <div style={{ marginTop: '16px' }}>
      <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(222,219,200,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>文档与创作</div>
      <TRow left="pdf" right="PDF 读取/合并/拆分/表单填写/OCR" />
      <TRow left="writing-fragments" right="素材挖掘：从对话中提取写作片段" />
    </div>

    <H3>技术栈</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
      <Tag>Claude Code Skill Framework</Tag><Tag>Node.js</Tag><Tag>CDP</Tag><Tag>React</Tag><Tag>Cloudflare Pages</Tag>
    </div>
  </>
}

/* ============================================================
   导出列表
   ============================================================ */
export const aiProjects: AIProject[] = [
  {
    slug: 'pm-os',
    title: 'PM OS',
    tagline: 'IPD 全流程项目管理工具，自绘 SVG 甘特图',
    tags: ['Next.js', 'IndexedDB', 'SVG', 'DeepSeek'],
    detail: <PmOsDetail />,
  },
  {
    slug: 'ai-meeting',
    title: 'AI 会议纪要',
    tagline: '30min → 5min，风险识别 + 待办追踪全自动',
    tags: ['Vite', 'React', 'CF Pages', 'DeepSeek'],
    detail: <AiMeetingDetail />,
  },
  {
    slug: 'competitor-analysis',
    title: '竞品分析 Skill',
    tagline: '输入产品名，自动生成深度竞品报告',
    tags: ['Skill Design', 'Web Search', 'Excel', 'SWOT'],
    detail: <CompetitorDetail />,
  },
  {
    slug: 'obsidian-memory',
    title: 'Obsidian AI 记忆系统',
    tagline: '给 AI Agent 搭一个不会失忆的共享大脑',
    tags: ['Obsidian', 'Agent SDK', 'Markdown', 'Git'],
    detail: <ObsidianMemoryDetail />,
  },
  {
    slug: 'fortune-telling',
    title: '灵枢 · Oracle',
    tagline: '八字紫微塔罗三板块融合，国内直连',
    tags: ['Next.js', 'React', 'CF Pages', 'DeepSeek'],
    detail: <FortuneDetail />,
  },
  {
    slug: 'claude-code-skills',
    title: 'Claude Code Skills',
    tagline: '11 个可复用自动化能力模块',
    tags: ['Skill Framework', 'Node.js', 'CDP', 'Automation'],
    detail: <SkillsDetail />,
  },
]
