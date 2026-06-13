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

/* Metric bar — horizontal stat cards */
function MetricBar({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '12px 0' }}>
      {items.map((m, i) => (
        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.06)', padding: '10px 16px', borderRadius: '6px', textAlign: 'center', minWidth: '80px' }}>
          <div style={{ fontSize: '22px', fontWeight: 300, color: '#E1E0CC', letterSpacing: '-0.02em' }}>{m.value}</div>
          <div style={{ fontSize: '10px', color: 'rgba(222,219,200,0.4)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</div>
        </div>
      ))}
    </div>
  )
}

/* Pipeline node — one stage in the workflow */
function PipelineNode({ label, active }: { label: string; active?: boolean }) {
  return (
    <div style={{
      background: active ? 'rgba(222,219,200,0.08)' : 'rgba(255,255,255,0.02)',
      border: `0.5px solid ${active ? 'rgba(222,219,200,0.2)' : 'rgba(255,255,255,0.06)'}`,
      padding: '6px 10px', borderRadius: '5px',
      fontSize: '11px', color: active ? '#E1E0CC' : 'rgba(222,219,200,0.5)',
      whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {label}
    </div>
  )
}
function PipeArrow() {
  return <span style={{ color: 'rgba(222,219,200,0.15)', fontSize: '10px', flexShrink: 0 }}>→</span>
}

/* Category badge for Skills card */
function CatBadge({ label, count }: { label: string; count: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
      <span style={{ fontSize: '12px', color: 'rgba(222,219,200,0.7)' }}>{label}</span>
      <span style={{ fontSize: '10px', color: 'rgba(222,219,200,0.3)', background: 'rgba(255,255,255,0.04)', padding: '1px 6px', borderRadius: '3px' }}>{count}</span>
    </div>
  )
}


/* ============================================================
   1. PM OS
   ============================================================ */
function PmOsDetail() {
  return <>
    <MetricBar items={[
      { label: '会议纪要', value: '30→5min' },
      { label: '里程碑准时率', value: '100%' },
      { label: 'TR 一次通过', value: '85.7%' },
      { label: '数据存储', value: 'IndexedDB' },
    ]} />

    <H3>项目简介</H3>
    <P>源自 DONNER 实战经验（IPD 流程、TR/DCP 评审、MIL、BOM），用 Claude Code 独立开发。覆盖概念到量产全过程，集成了 AI 会议纪要智能分析能力。</P>
    <div style={{ marginTop: '8px' }}><Link href="https://demo.pm-os.pages.dev">Live Demo ↗ demo.pm-os.pages.dev</Link></div>

    <H3>产品截图</H3>
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden', marginTop: '8px' }}>
      <img src={import.meta.env.BASE_URL + 'pm-os-screenshot.png'} alt="PM OS 截图" style={{ width: '100%', display: 'block' }} />
    </div>

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

    <H3>技术栈</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
      <Tag>Next.js 15</Tag><Tag>React</Tag><Tag>TypeScript</Tag><Tag>IndexedDB (Dexie)</Tag><Tag>SVG 自绘</Tag><Tag>DeepSeek API</Tag><Tag>Vercel</Tag><Tag>Cloudflare Pages</Tag>
    </div>
  </>
}

/* ============================================================
   2. 产品全链路工作流
   ============================================================ */
function PmChainDetail() {
  const stages = ['舆情预研', '市场调研', '竞品分析', '头脑风暴', 'PRD', 'GTM', '风险评估', '架构图', '交互原型']
  return <>
    <MetricBar items={[
      { label: '质量维度', value: '14' },
      { label: '报告 Tab', value: '16' },
      { label: '中间格式', value: '7 JSON' },
      { label: '质量门禁', value: '10 项' },
    ]} />

    <H3>一句话</H3>
    <P>一套<HL>自动化产品工作流引擎</HL>。你给一句话产品方向，它按顺序跑完 9 个专业阶段——每阶段输出结构化中间产物、自动做假设冲突检查——最终拼成一份 16 tab、可直接分享的专业报告。</P>
    <div style={{ marginTop: '12px' }}><Link href={import.meta.env.BASE_URL + 'mobile-llm-agent-report.html'}>Showcase: Pocket Agent 全链路报告 ↗</Link></div>

    <H3>工作流管线</H3>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap', padding: '12px 0', overflowX: 'auto' }}>
      <div style={{ fontSize: '15px', marginRight: '6px', flexShrink: 0 }}>💡</div>
      {stages.map((s, i) => (
        <span key={s} style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
          <PipelineNode label={s} active={i < 3} />
          {i < stages.length - 1 && <PipeArrow />}
        </span>
      ))}
      <PipeArrow />
      <div style={{ fontSize: '13px', marginLeft: '2px', flexShrink: 0 }}>📄</div>
    </div>
    <P style={{ fontSize: '12px', color: 'rgba(222,219,200,0.4)', textAlign: 'center' }}>
      输入 Idea ──→ 9 阶段自动执行 ──→ 16 tab HTML 报告
    </P>

    <H3>每阶段产出</H3>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', marginTop: '8px' }}>
      <TRow left="舆情预研" right="last30days 双版，社区情绪信号" />
      <TRow left="市场调研" right="TAM/SAM/SOM + 细分 + Go/No-Go" />
      <TRow left="竞品分析" right="6-10 竞品 × 10 维度 × Excel" />
      <TRow left="头脑风暴" right="三视角方案 + 毙掉清单 ≥10 项" />
      <TRow left="PRD" right="两版交付：概念 → 落地" />
      <TRow left="GTM 策略" right="定位 + 三阶段路线 + 定价" />
      <TRow left="风险评估" right="概率×影响矩阵 + 触发指标" />
      <TRow left="架构图" right="HTML+CSS 直出，CJK 无问题" />
      <TRow left="交互原型" right="嵌入式可交互原型" />
    </div>

    <H3>质量体系</H3>
    <P>每份报告过 10 项质量门禁：毙掉清单 ≥10 · 财务 3 情景 · War Game 6 场景 · 触发指标全覆盖 · 数据来源标注可信度 · 架构图嵌入报告 · 原型至少 3 页面预览</P>
    <P><HL>改进机制</HL> — 每次产出后对照标准审查，审查结论写回质量标准文件。下次跑新产品时自动加载最新规范。</P>

    <H3>技术栈</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
      <Tag>Claude Code Skill</Tag><Tag>Web Search</Tag><Tag>Excel (exceljs)</Tag><Tag>DeepSeek API</Tag><Tag>HTML+CSS</Tag><Tag>Pipeline 编排</Tag>
    </div>
  </>
}

/* ============================================================
   3. Obsidian AI 记忆系统
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
    <P>13 个大类、130+ 个问题的个人档案在 00-Rules/ 里，从性格到审美偏好。新增 <HL>AI 速读关键信号</HL>摘要，Agent 30 秒内理解人格模式，无需读完 400 行全文。</P>

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
   4. 灵枢 Oracle
   ============================================================ */
function FortuneDetail() {
  return <>
    <H3>项目简介</H3>
    <P>三大命理体系融合应用——<HL>奇门遁甲、八字、塔罗</HL>，每套体系独立运作又统一在一个应用内。国内用户友好，Cloudflare Pages 直连部署。</P>
    <div style={{ marginTop: '8px' }}><Link href="https://fortune-telling-84p.pages.dev">Live Demo ↗ fortune-telling-84p.pages.dev</Link></div>

    <H3>模块一：奇门遁甲</H3>
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '14px 16px', marginTop: '8px' }}>
      <P style={{ marginBottom: '4px' }}><HL>阳盘排盘</HL> — 时家转盘奇门，含天盘 / 地盘 / 八门 / 九星 / 八神 / 天盘九宫。支持自动定局（置闰法）和手动选局。</P>
      <P style={{ marginBottom: '4px' }}><HL>阴盘排盘</HL> — 道家阴盘奇门，侧重心法解读，不同起局逻辑。</P>
      <P style={{ marginBottom: '4px' }}><HL>AI 解盘</HL> — DeepSeek 深度解读，按用神 / 时干 / 值符值使逐层分析。覆盖事业、财运、感情、健康、风水五类问题。</P>
      <P style={{ marginBottom: 0 }}><HL>方位风水</HL> — 基于奇门九宫格快速查询吉方凶方，出行 / 谈判 / 布局参考。</P>
    </div>

    <H3>模块二：八字</H3>
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '14px 16px', marginTop: '8px' }}>
      <P style={{ marginBottom: '4px' }}><HL>四柱排盘</HL> — 年柱 / 月柱 / 日柱 / 时柱完整推算，节气交界精确到时分。支持 1900-2100 年范围。</P>
      <P style={{ marginBottom: '4px' }}><HL>大运流年</HL> — 自动计算起运年龄 + 十年大运 + 流年天干地支。顺逆排大运逻辑正确。</P>
      <P style={{ marginBottom: '4px' }}><HL>十神分析</HL> — 比肩 / 劫财 / 食神 / 伤官 / 偏财 / 正财 / 七杀 / 正官 / 偏印 / 正印，完整十神定位 + 五行生克。</P>
      <P style={{ marginBottom: 0 }}><HL>AI 命理解读</HL> — 综合日主强弱、格局喜忌、大运走势，输出结构化命理报告。可指定问事业 / 感情 / 财运。</P>
    </div>

    <H3>模块三：塔罗</H3>
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '14px 16px', marginTop: '8px' }}>
      <P style={{ marginBottom: '4px' }}><HL>Celtic Cross 牌阵</HL> — 10 张牌完整牌阵，每张牌对应独立牌位含义。AI 综合牌阵位置 + 正逆位 + 牌义交叉解读。</P>
      <P style={{ marginBottom: '4px' }}><HL>多牌阵支持</HL> — 单张问事 / 三张过去现在未来 / Celtic Cross 完整牌阵，按问题复杂度自动推荐牌阵。</P>
      <P style={{ marginBottom: 0 }}><HL>正逆位解读</HL> — 78 张塔罗牌全部含正位 + 逆位含义，AI 解读时自动匹配当前抽取结果。</P>
    </div>

    <H3>技术特点</H3>
    <P>• Cloudflare Pages 国内直连，无 VPN 可用</P>
    <P>• DeepSeek API 驱动 AI 解读，中文命理术语理解精准</P>
    <P>• 八字 + 奇门纯前端计算，不依赖服务端排盘 API</P>

    <H3>技术栈</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
      <Tag>Next.js</Tag><Tag>React</Tag><Tag>TypeScript</Tag><Tag>Cloudflare Pages</Tag><Tag>DeepSeek API</Tag><Tag>传统历法</Tag><Tag>奇门遁甲</Tag>
    </div>
  </>
}

/* ============================================================
   5. Claude Code Skills 总览
   ============================================================ */
function SkillsDetail() {
  const categories = [
    {
      label: 'PM 全链路',
      count: 5,
      items: [
        ['market-research', '市场调研：6 模块报告，3 模式，5 品类适配'],
        ['competitive-analysis', '竞品分析：4 模式分流，6-10 竞品 × 9 sheet Excel'],
        ['brainstorming', '头脑风暴：PM/Designer/Engineer 三视角，毙掉清单'],
        ['prd-writer', 'PRD 撰写：两版交付，硬件自动追加 4 段'],
        ['pm-chain', '全链路串联：一条指令输出 16 tab 完整报告'],
      ],
    },
    {
      label: '效率工具',
      count: 4,
      items: [
        ['weekly-review', '周度 AI 使用深度复盘，自动提炼可复用教训'],
        ['prompt-optimizer', '分析原始指令，匹配最佳实践，输出优化提示词'],
        ['to-prd', '将对话上下文一键转化为 PRD 文档'],
        ['to-issues', '将方案/PRD 拆分为独立可抓取的 Issues'],
      ],
    },
    {
      label: '分析与研究',
      count: 2,
      items: [
        ['diagnose', '受控诊断循环：复现 → 缩小 → 假设 → 插桩 → 修复'],
        ['triag', 'Issue 状态机管理，按角色路由'],
      ],
    },
    {
      label: '部署与网络',
      count: 2,
      items: [
        ['deploy-site', '一键部署到 Cloudflare Pages / Vercel'],
        ['web-access', '统一网络入口，CLI 受阻自动切 CDP 浏览器'],
      ],
    },
    {
      label: '文档与创作',
      count: 2,
      items: [
        ['pdf', 'PDF 读取/合并/拆分/表单填写/OCR'],
        ['writing-fragments', '素材挖掘：从对话中提取写作片段'],
      ],
    },
  ]

  return <>
    <H3>项目简介</H3>
    <P>为 Claude Code 搭建的<HL> 15+ 能力模块</HL>，覆盖产品全流程、效率提升、分析诊断、部署发布四类场景。AI 遇到对应任务时自动加载对应 Skill——不需要手动切换。</P>

    <H3>模块分类</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '12px 0' }}>
      {categories.map(c => <CatBadge key={c.label} label={c.label} count={c.count} />)}
    </div>

    {categories.map(cat => (
      <div key={cat.label} style={{ marginTop: '16px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(222,219,200,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>
          {cat.label} · {cat.count}
        </div>
        {cat.items.map(([name, desc]) => (
          <TRow key={name} left={name} right={desc} />
        ))}
      </div>
    ))}

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
    title: '产品全链路工作流',
    tagline: '输入产品 idea → 自动跑通 9 阶段 → 输出 16 tab 专业报告',
    tags: ['Pipeline 自动化', '14 维度', 'HTML 报告'],
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
    tagline: '奇门遁甲 · 八字 · 塔罗，三大命理体系融合',
    tags: ['Next.js', 'React', 'CF Pages', 'DeepSeek'],
    detail: <FortuneDetail />,
  },
  {
    slug: 'claude-code-skills',
    title: 'Claude Code Skills',
    tagline: '15+ 能力模块，4 大分类，AI 自动加载对应场景',
    tags: ['Skill Framework', 'Node.js', 'CDP', 'Automation'],
    detail: <SkillsDetail />,
  },
]
