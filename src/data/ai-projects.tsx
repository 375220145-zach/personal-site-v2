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
    <P>源自 DONNER 实战经验（IPD 流程、TR/DCP 评审、MIL、BOM），用 Claude Code 独立开发。覆盖概念到量产全过程，集成了 AI 会议纪要智能分析能力。</P>
    <div style={{ marginTop: '8px' }}><Link href="https://demo.pm-os.pages.dev">Live Demo ↗ demo.pm-os.pages.dev</Link></div>

    <H3>解决的问题</H3>
    <P>同时管理多个项目时，里程碑、任务、BOM、会议纪要散落在不同工具里，互相割裂。把这套东西整合进一个<HL>按 IPD 流程设计的工具</HL>。</P>

    <H3>核心功能</H3>
    <P><HL>IPD 全流程</HL> — 13 个里程碑节点（TR1→CDCP→TR2→HMS→TR3→PDCP→EVT→TR4→DVT→TR5→ADCP1→PVT→MP），7 阶段门管理，准入准出标准</P>
    <P><HL>自绘 SVG 甘特图</HL> — 不依赖第三方库，支持缩放、依赖连线、里程碑菱形标记、今日红线、逾期高亮</P>
    <P><HL>9 张数据表</HL> — 项目 / 里程碑 / 任务 / 会议 / 复盘 / 变更 / BOM / 采购 / 认证，全部 IndexedDB 本地存储，离线可用</P>
    <P><HL>AI 会议纪要</HL> — 导入会议内容，AI 自动提取行动项、识别风险、生成待办清单。支持 Markdown / PDF / Excel 多格式导出。30min → 5min</P>
    <P><HL>AI 复盘</HL> — DeepSeek 驱动，聚合项目数据自动生成复盘报告</P>
    <P><HL>双部署</HL> — Vercel 全功能可编辑版 + Cloudflare Pages 只读 Demo 版（国内直连）</P>
    <P><HL>Excel 批量导入</HL> — 所有面板支持模板下载 + 批量导入，适配企业级数据迁移</P>

    <H3>效率提升</H3>
    <div style={{ padding: '10px 0' }}>
      <THead><span>指标</span><span>变化</span></THead>
      <TRow left="会议纪要整理时间" right="30min → 5min" />
      <TRow left="行动项遗漏率" right="显著降低" />
      <TRow left="项目里程碑准时率" right="100%" />
      <TRow left="TR 评审一次通过率" right="85.7%" />
    </div>

    <H3>技术栈</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
      <Tag>Next.js 15</Tag><Tag>React</Tag><Tag>TypeScript</Tag><Tag>IndexedDB (Dexie)</Tag><Tag>SVG 自绘</Tag><Tag>DeepSeek API</Tag><Tag>Vercel</Tag><Tag>Cloudflare Pages</Tag>
    </div>
  </>
}

/* ============================================================
   产品全链路 Skill System
   ============================================================ */
function PmChainDetail() {
  return <>
    <H3>项目简介</H3>
    <P>基于 Claude Code Skill 框架搭建的 PM 全链路自动化体系。覆盖市场调研 → 竞品分析 → 头脑风暴 → PRD → GTM 策略 → 风险评估 → 架构图 → 交互原型，输入产品 idea，输出 8 tab 完整 HTML 报告。每个 skill 也支持独立触发。</P>
    <div style={{ marginTop: '8px' }}><Link href={import.meta.env.BASE_URL + 'mobile-llm-agent-report.html'}>Showcase: Pocket Agent 全链路报告 ↗</Link></div>

    <H3>链路能力</H3>
    <P><HL>市场调研</HL> — 6 模块报告（赛道概况 / 趋势 / 市场规模 / 用户画像 / 竞品格局 / 机会评估），3 模式（完整报告 / 快速扫描 / TAM-SAM-SOM），5 品类自动适配</P>
    <P><HL>深度竞品分析</HL> — 4 模式智能分流（深度 Excel / 快速扫描 / 竞争简报 / 概念验证），6–10 竞品 × 9 sheet Excel 输出。每个数据字段标注可信度，无公开来源不填</P>
    <P><HL>头脑风暴</HL> — PM / Designer / Engineer 三视角 × 各 5 个 idea，加权评分优先，强制"毙掉清单"</P>
    <P><HL>PRD 撰写</HL> — 8 段式标准模板（Summary / Contacts / Background / Objective / Market / Value / Solution / Release），硬件产品自动追加 4 段（工业设计 / 技术规格 / 制造供应链 / 包装上市）</P>
    <P><HL>GTM 策略</HL> — 定位 → 分阶段发布路径 → 定价策略 → 渠道优先级 → 冷启动方案</P>
    <P><HL>风险评估</HL> — 概率 × 影响矩阵，逐项缓解策略 + 触发指标</P>
    <P><HL>架构图</HL> — HTML+CSS 直出，CJK 无渲染问题</P>
    <P><HL>交互原型</HL> — 嵌入式 HTML/CSS 可交互原型，自适应产品形态（Web / 移动端 / 硬件面板）</P>

    <H3>技术栈</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
      <Tag>Claude Code Skill</Tag><Tag>Web Search</Tag><Tag>Excel (exceljs)</Tag><Tag>DeepSeek API</Tag><Tag>HTML+CSS</Tag><Tag>SWOT</Tag>
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

    <H3>为什么做这个</H3>
    <P>Claude Code 有一个问题：<HL>每次新对话从零开始。</HL>上回告诉它的偏好、规则、教训，换一个对话框就全忘了。我的解法是一套 <HL>Markdown 文件夹——Agent 能读也能写，人也能随时改。</HL></P>

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

    <H3>近期迭代</H3>
    <P><HL>AI 速读关键信号</HL> — who-i-am 新增 13 维度结构化摘要，Agent 30 秒内理解人格模式，无需读完 400 行全文</P>
    <P><HL>graduation-queue 读顺序提升</HL> — 从可选变成必读（AGENTS.md 第 3 步），确保跨项目原则每个 session 都加载</P>
    <P><HL>Obsidian Git 自动备份</HL> — 60 分钟自动 commit + push 到 GitHub，防丢失</P>

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
  </>
}

/* ============================================================
   灵枢 Oracle
   ============================================================ */
function FortuneDetail() {
  return <>
    <H3>项目简介</H3>
    <P>八字 + 紫微斗数 + 塔罗三板块融合的命理应用。国内用户友好，Cloudflare Pages 直连部署。</P>
    <div style={{ marginTop: '8px' }}><Link href="https://fortune-telling-84p.pages.dev">Live Demo ↗ fortune-telling-84p.pages.dev</Link></div>

    <H3>解决的问题</H3>
    <P>八字、紫微、塔罗三套体系分散在不同平台。身边多位好友有实际使用需求，整合到一个应用里。</P>

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
    <P>为 Claude Code 搭建的能力模块，覆盖 PM 全链路、效率工具、分析研究、部署发布四类场景。AI 遇到对应任务时自动加载。</P>

    <H3>Skills 清单</H3>

    <div style={{ marginTop: '12px' }}>
      <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(222,219,200,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>PM 全链路</div>
      <TRow left="market-research" right="市场调研：6 模块报告，3 模式，5 品类适配" />
      <TRow left="competitive-analysis" right="竞品分析：4 模式分流，6-10 竞品 × 9 sheet Excel" />
      <TRow left="brainstorming" right="头脑风暴：PM/Designer/Engineer 三视角，强制毙掉清单" />
      <TRow left="prd-writer" right="PRD 撰写：8 段式模板，硬件自动追加 4 段" />
      <TRow left="pm-chain" right="全链路串联：一条指令输出 8 tab HTML 完整报告" />
    </div>

    <div style={{ marginTop: '16px' }}>
      <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(222,219,200,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>效率工具</div>
      <TRow left="weekly-review" right="周度 AI 使用深度复盘，自动提炼可复用教训" />
      <TRow left="prompt-optimizer" right="分析原始指令，匹配最佳实践，输出优化后的提示词" />
      <TRow left="to-prd" right="将对话上下文一键转化为 PRD 文档" />
      <TRow left="to-issues" right="将方案/PRD 拆分为独立可抓取的 Issues" />
    </div>

    <div style={{ marginTop: '16px' }}>
      <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(222,219,200,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>分析与研究</div>
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
    tagline: 'IPD 全流程项目管理工具，内置 AI 会议纪要',
    tags: ['Next.js', 'IndexedDB', 'SVG', 'DeepSeek'],
    detail: <PmOsDetail />,
  },
  {
    slug: 'pm-chain',
    title: '产品全链路 Skill System',
    tagline: '从 idea 到 8 tab 完整报告，一条指令跑通全流程',
    tags: ['Skill Design', 'Web Search', 'Excel', 'DeepSeek'],
    detail: <PmChainDetail />,
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
    tagline: 'PM 全链路 + 效率工具 + 部署发布，15+ 能力模块',
    tags: ['Skill Framework', 'Node.js', 'CDP', 'Automation'],
    detail: <SkillsDetail />,
  },
]
