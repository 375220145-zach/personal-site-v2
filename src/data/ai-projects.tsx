import type { ReactNode } from 'react'

export interface AIProject {
  slug: string
  title: string
  tagline: string
  problem: string
  solution: string
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

    <H3>做了什么</H3>
    <P>源自 DONNER 实战经验（IPD 流程、TR/DCP 评审、MIL、BOM），用 Claude Code 独立开发。把多项目并行时散落各处的里程碑、任务、BOM、会议纪要，整合进一个按 IPD 流程设计的工具，覆盖概念到量产全过程。</P>
    <div style={{ marginTop: '8px' }}><Link href="https://demo.pm-os.pages.dev">Live Demo ↗ demo.pm-os.pages.dev</Link></div>

    <div style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
      <img src={import.meta.env.BASE_URL + 'pm-os-screenshot.png'} alt="PM OS 截图" style={{ width: '100%', display: 'block' }} />
    </div>

    <H3>核心能力</H3>
    <P><HL>IPD 全流程</HL> — 13 个里程碑节点（TR1→CDCP→TR2→HMS→TR3→PDCP→EVT→TR4→DVT→TR5→ADCP1→PVT→MP），7 阶段门管理，准入准出标准</P>
    <P><HL>自绘 SVG 甘特图</HL> — 不依赖第三方库，支持缩放、依赖连线、里程碑菱形标记、今日红线、逾期高亮</P>
    <P><HL>9 张数据表</HL> — 项目 / 里程碑 / 任务 / 会议 / 复盘 / 变更 / BOM / 采购 / 认证，全部 IndexedDB 本地存储，离线可用</P>
    <P><HL>AI 会议纪要</HL> — 导入会议内容，AI 自动提取行动项、识别风险、生成待办清单。支持 Markdown / PDF / Excel 多格式导出</P>
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
      { label: '报告 Tab', value: '17' },
      { label: '中间格式', value: '7 JSON' },
      { label: '质量门禁', value: '10 项' },
    ]} />

    <H3>做了什么</H3>
    <P>一套自动化产品工作流引擎。给一句话产品方向，按顺序跑完 9 个专业阶段——每阶段输出结构化中间产物、自动做假设冲突检查——最终拼成一份 17 tab、可直接分享的专业报告。</P>
    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div>
        <Link href={import.meta.env.BASE_URL + 'miyavi-pedal-report.html'}>Showcase: MIYAVI × Donner 效果器 全链路报告 ↗</Link>
        <div style={{ fontSize: '11px', color: 'rgba(222,219,200,0.3)', marginTop: '1px' }}>消费电子 · 已上市产品</div>
      </div>
      <div>
        <Link href={import.meta.env.BASE_URL + 'mobile-llm-agent-report.html'}>Showcase: Pocket Agent 全链路报告 ↗</Link>
        <div style={{ fontSize: '11px', color: 'rgba(222,219,200,0.3)', marginTop: '1px' }}>AI 原生产品 · 概念验证</div>
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap', padding: '16px 0 8px', overflowX: 'auto' }}>
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
      输入 Idea ──→ 9 阶段自动执行 ──→ 17 tab HTML 报告
    </P>

    <H3>核心能力</H3>
    <P><HL>9 阶段管线</HL> — 舆情预研 → 市场调研 → 竞品分析 → 头脑风暴 → PRD → GTM → 风险评估 → 架构图 → 交互原型，全自动串联</P>
    <P><HL>10 项质量门禁</HL> — 毙掉清单 ≥10 · 财务 3 情景 · War Game 6 场景 · 17 tab 缺一不可 · 触发指标全覆盖 · 数据来源标注可信度 · 品类自动路由（7 品类 × 概念/具体双维度）</P>
    <P><HL>自改进机制</HL> — 每次产出后对照标准审查，审查结论写回质量标准文件。下次跑新产品时自动加载最新规范</P>

    <H3>技术栈</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
      <Tag>Claude Code Skill</Tag><Tag>Web Search</Tag><Tag>Excel (exceljs)</Tag><Tag>DeepSeek API</Tag><Tag>HTML+CSS</Tag><Tag>Pipeline 编排</Tag>
    </div>
  </>
}

/* ============================================================
   3. AIGC TVC
   ============================================================ */
function AigcTvcDetail() {
  return <>
    <MetricBar items={[
      { label: '总耗时', value: '6h' },
      { label: '分镜', value: '1min' },
      { label: '工具链', value: '7 个' },
      { label: '团队', value: '1 人' },
    ]} />

    <H3>做了什么</H3>
    <P>MIYAVI × Donner TripleSwords-Azure Edge 效果器的品牌 TVC——从零开始，用 Shotlab 编排全流程：角色形象生成 → 产品三视图还原（嵌入 CMF 工程数据） → 场景资产搭建 → 1 分钟分镜脚本 → Seedance 逐段视频生成 → 剪映剪辑成片。<HL>一人，六小时，从概念到成片。</HL></P>

    <div style={{ borderRadius: '4px', overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.06)', marginBottom: '20px' }}>
      <video src={import.meta.env.BASE_URL + 'aigc-tvc.mp4'} controls playsInline preload="metadata" style={{ width: '100%', display: 'block' }} />
    </div>

    <div style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden', marginTop: '16px', marginBottom: '20px' }}>
      <img src={import.meta.env.BASE_URL + 'aigc-tvc-shotlab.png'} alt="Shotlab 无限画布工作流" style={{ width: '100%', display: 'block' }} />
    </div>

    <H3>核心能力</H3>
    <P><HL>Shotlab 分镜编排</HL> — 无限画布管理从角色设定、产品资产到场景背景的完整视觉工作流</P>
    <P><HL>多模型图像管线</HL> — Midjourney 定角色与场景调性，Stable Diffusion 还原产品三视图，nano banana + image2 迭代细节</P>
    <P><HL>Seedance 视频生成</HL> — 逐段 prompt 精确控制运镜、光影融合、产品与人物的大小比例关系</P>
    <P><HL>Prompt 工程</HL> — 角色一致性锁定（--cref 跨镜头串联）、CMF 色号嵌入（PANTONE 10258 C）、去 AI 味约束</P>
    <P><HL>全流程一人</HL> — 无团队、无实拍、无 3D 软件。纯 AI 管线从概念到成片</P>

    <H3>技术栈</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
      <Tag>Shotlab</Tag><Tag>Midjourney</Tag><Tag>Stable Diffusion</Tag><Tag>nano banana</Tag><Tag>image2</Tag><Tag>Seedance</Tag><Tag>剪映</Tag>
    </div>
  </>
}

/* ============================================================
   4. Agent Loop · 自主迭代
   ============================================================ */
function AgentLoopDetail() {
  return <>
    <H3>应用层：内容平台选题自动化</H3>

    <P>针对小红书+抖音创作者的日常选题需求，搭了一条全自动数据管线：凌晨自动采集四平台热点（小红书 OpenCLI + 抖音 CDP + B站 bili-cli + 百度热搜）→ 按细分赛道分类筛选 → 生成可执行的选题建议 → 微信服务号推送。<HL>创作者早上醒来，当日选题已在手机里。</HL></P>

    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap', padding: '12px 0 8px', overflowX: 'auto' }}>
      <PipelineNode label="0:03 自动触发" active />
      <PipeArrow />
      <PipelineNode label="四平台采集" active />
      <PipeArrow />
      <PipelineNode label="赛道分类" active />
      <PipeArrow />
      <PipelineNode label="微信推送" active />
    </div>

    <P style={{ fontSize: '12px', color: 'rgba(222,219,200,0.4)', textAlign: 'center' }}>
      每日 0:03 自动运行 → 选题直达手机
    </P>

    <P>关键词搜索代替死链接、视频原生平台代替纯新闻源、可拍性优先代替数据堆砌。同样架构可迁移至舆情监测、竞品动态追踪等场景。</P>

    <div style={{ margin: '24px 0', borderTop: '0.5px solid rgba(255,255,255,0.06)' }} />

    <H3>基础设施层：Agent 自主循环系统</H3>

    <P>上面这套跑在一个跨项目共享的 Agent 循环引擎上——未来任何项目都能接入同样的记忆+执行能力。</P>

    <P><HL>记忆系统（Vault + Letta 双层分流）</HL> — Claude Code 每次新对话从零开始。会话结束 → Stop hook 自动把完整 transcript 发给 Letta 后台 Agent → 独立分析、提取偏好 → 存入 8 个 memory blocks → 下次会话自动唤醒。不再依赖人写 feedback，Agent 自主判断什么值得记住。</P>

    <Flow>{`Vault（人类主动管理的规则）              Letta（Agent 被动学到的知识）
───────────────────────────────    ───────────────────────────
00-Rules/    全局规则+红线          偏好 / 语气 / 坑点
01-Projects/ 项目状态+决策+反馈     跨会话行为模式
04-Feedback/ graduation-queue      8 个 memory blocks`}</Flow>

    <P><HL>执行系统</HL> — 两层自动执行：</P>
    <P style={{ marginLeft: '16px' }}><HL>知识晋升</HL> — 跨项目重复踩坑 → graduation-queue 积累 → 确认后 Agent 自动晋升到全局规则。已晋升 3 条（部署 GFW 优先 / Python 版本门禁 / 图标名校验），5 条候审中。</P>
    <P style={{ marginLeft: '16px' }}><HL>代码修复</HL> — 项目 feedback 同类模式 ≥2 次 → 每 2 天自动扫描 → 触发修复 → 微信通知结果。</P>

    <Flow>{`会话结束 → Stop hook              feedback 同类 ×2
    ↓                               ↓
transcript → Letta 分析         触发修复 Agent
    ↓                               ↓
更新 memory blocks               graduation-queue → 晋升
    ↓                               ↓
下次自动 whisper 唤醒            微信通知`}</Flow>

    <H3>核心能力</H3>
    <P><HL>多平台自动采集</HL> — 小红书(OpenCLI) + 抖音(CDP，零配置) + B站(bili-cli) + 百度热搜，四平台无人值守</P>
    <P><HL>自动记忆积累</HL> — 会话结束自动触发，Agent 从完整 transcript 自主判断什么值得记住</P>
    <P><HL>双层记忆分流</HL> — Vault 管结构化规则，Letta 管隐形知识，互不污染</P>
    <P><HL>分级权限</HL> — 项目 _feedback/ Agent 直接写；全局 _principles/ Agent 不能写</P>
    <P><HL>自主修复链</HL> — 观察 → 记录 → 重复识别 → 自动修复 → 通知验证</P>
    <P><HL>跨项目复用</HL> — 引擎层与业务层解耦，新项目接入同一套记忆+执行能力</P>

    <H3>技术栈</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
      <Tag>Claude Code Cron</Tag><Tag>Letta Agent SDK</Tag><Tag>Subconscious</Tag><Tag>OpenCLI</Tag><Tag>CDP</Tag><Tag>bili-cli</Tag><Tag>PushPlus</Tag><Tag>Obsidian</Tag><Tag>Loop Engineer</Tag><Tag>GitHub</Tag>
    </div>
  </>
}

/* ============================================================
   5. 灵枢 Oracle
   ============================================================ */
function FortuneDetail() {
  return <>
    <H3>做了什么</H3>
    <P>三大命理体系——奇门遁甲、八字、塔罗——融合在一个应用内，每套体系独立运作。DeepSeek 驱动 AI 解读，Cloudflare Pages 国内直连，八字和奇门纯前端计算不依赖服务端排盘 API。</P>
    <div style={{ marginTop: '8px' }}><Link href="https://fortune-telling-84p.pages.dev">Live Demo ↗ fortune-telling-84p.pages.dev</Link></div>

    <H3>核心能力</H3>
    <P><HL>奇门遁甲</HL> — 阳盘排盘（时家转盘，含天盘/地盘/八门/九星/八神，置闰法自动定局）+ 阴盘排盘（道家心法解读）+ AI 解盘（按用神/时干/值符值使逐层，覆盖事业/财运/感情/健康/风水）+ 方位风水吉凶查询</P>
    <P><HL>八字</HL> — 四柱排盘（节气交界精确到时分，1900-2100 年范围）+ 大运流年（起运年龄 + 十年大运 + 流年天干地支，顺逆排运）+ 十神分析（完整十神定位 + 五行生克）+ AI 命理解读（日主强弱 + 格局喜忌 + 大运走势）</P>
    <P><HL>塔罗</HL> — Celtic Cross 10 张完整牌阵 + 单张问事 + 三张过去现在未来，78 张牌全部含正逆位含义，AI 综合牌阵位置 + 正逆位 + 牌义交叉解读</P>

    <H3>技术栈</H3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
      <Tag>Next.js</Tag><Tag>React</Tag><Tag>TypeScript</Tag><Tag>Cloudflare Pages</Tag><Tag>DeepSeek API</Tag><Tag>传统历法</Tag><Tag>奇门遁甲</Tag>
    </div>
  </>
}

/* ============================================================
   6. Claude Code Skills 总览
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
        ['pm-chain', '全链路串联：一条指令输出 17 tab 完整报告'],
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
    tagline: '',
    problem: '多项目并行时，里程碑、任务、BOM、会议纪要散落各处，互相割裂',
    solution: '按 IPD 流程整合为单一工具，内置 AI 会议纪要，离线可用',
    tags: ['Next.js', 'IndexedDB', 'SVG', 'DeepSeek'],
    detail: <PmOsDetail />,
  },
  {
    slug: 'pm-chain',
    title: '产品全链路工作流',
    tagline: '',
    problem: '从 idea 到 PRD 到 GTM，每个阶段都要手动切换工具、重复输入上下文',
    solution: '一条指令自动串联 9 个专业阶段，输出 17 tab HTML 报告',
    tags: ['Pipeline 自动化', '17 tab', '7 品类', 'HTML 报告'],
    detail: <PmChainDetail />,
  },
  {
    slug: 'agent-loop',
    title: 'Agent Loop · 自主迭代',
    tagline: '',
    problem: 'Claude Code 会话结束即失忆。Agent 学到的东西只存在对话里，下次全忘。光记不够，得让它自己修。',
    solution: '应用层：内容平台选题自动推送。基础设施层：Vault + Letta 双层记忆 + graduation-queue 知识晋升 + 重复模式自动修复。',
    tags: ['Loop Engineer', 'Subconscious', 'Creator Daily', '自动化'],
    detail: <AgentLoopDetail />,
  },
  {
    slug: 'aigc-tvc',
    title: 'AIGC TVC',
    tagline: '单人 + AI 管线 = 一条 TVC 短片。从角色生成到视频输出，全流程一人完成。',
    problem: '',
    solution: '',
    tags: ['Shotlab', 'Midjourney', 'Stable Diffusion', 'nano banana', 'image2', 'Seedance', '剪映'],
    detail: <AigcTvcDetail />,
  },
  {
    slug: 'fortune-telling',
    title: '灵枢 · Oracle',
    tagline: '',
    problem: '命理工具散落在不同 app 和网站，没有统一的 AI 解读入口',
    solution: '奇门、八字、塔罗三合一，DeepSeek 驱动，国内直连',
    tags: ['Next.js', 'React', 'CF Pages', 'DeepSeek'],
    detail: <FortuneDetail />,
  },
  {
    slug: 'claude-code-skills',
    title: 'Claude Code Skills',
    tagline: '15+ 能力模块，4 大分类，AI 自动加载对应场景',
    problem: '',
    solution: '',
    tags: ['Skill Framework', 'Node.js', 'CDP', 'Automation'],
    detail: <SkillsDetail />,
  },
]
