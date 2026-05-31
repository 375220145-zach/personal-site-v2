export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }
    if (request.headers.get('Content-Type')?.includes('application/json') === false) {
      // Handle CORS preflight
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
      }
    }

    try {
      const { jd } = await request.json();
      if (!jd || jd.trim().length < 20) {
        return new Response(JSON.stringify({ error: 'JD 内容太短，请粘贴完整的岗位描述' }), { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      }

      const resume = `# 候选人档案

## 基本信息
- 姓名：潘子健 / Zachary Pan
- 目标岗位：PM / AI Product Manager / Project Manager
- 当前状态：在职，开放看机会

## 教育背景
- 硕士：马来西亚理科大学 (USM) — MBA（专业管理方向）
- 本科：广州工商学院 — 采购管理专业

## 工作经历

### DONNER — PM 管培生 (2025.6 – 2026.2)
- 主导 IPD 自研产品全生命周期管理，覆盖进度规划、预算编制、成本审核、风险管理
- 运用敏捷管理方法推动项目交付，日常项目周期平均缩短 ~10%
- 里程碑准时达成率 100%（非 ECN），TR 评审一次通过率 85.7%
- ADCP1 整机成本偏差 ≤ 3%（PDC 目标成本法）
- 基于 Claude Code 采用 Vibe Coding 独立开发 AI 会议纪要智能管理工具（30min → 5min）

### URBAN REVIVO — 采购 PMO (2022.2 – 2023.3)
- 负责全品类 MRO 物料引入与供应商开发管理
- 采购成本降幅 −5.7%
- 打样合格率 93.7%
- 建立"绿通"快采机制，开发周期缩短 7~10 自然日/项目
- 主导 MRO 2.0 数字化流程迭代，售后单流程耗时降低 2 人天

## 项目经验
- MIYAVI 联名款 3-in-1 吉他效果器：统筹品牌、产研、艺人三方团队，项目周期缩短 21%，0→1 搭建 AI 甘特图
- MRO 2.0 数字化流程迭代：绘制全链路业务流程图，绿通准时率 97.6%
- AI 会议纪要智能管理工具：Claude Code + Vibe Coding 独立开发，30min → 5min
- 竞品分析 Agent Skill：Claude Code Skill 框架，自动化搜索 + Excel 报告
- 本网站（personal-site V2）：React + TypeScript + Tailwind CSS + Framer Motion，Claude Code Vibe Coding 构建

## 硬技能
IPD、敏捷/Agile、供应链管理、MRO 寻源、ODM/OEM、AutoCAD、PDC 目标成本法、Claude Code、Vibe Coding、AIGC、甘特图、PRD、SPSS、MS Office

## 软技能
跨职能协同（品牌/产研/供应链/外部合作方）、风险管理、需求拉通、流程重构、0→1 搭建、Prompt Engineering、工作流优化、Skill Design

## 语言
中文（母语）、英文（工作级，可阅读英文文档和进行工作沟通）

## 技术工具
Claude Code（深度使用）、Python（基础）、React/TypeScript/Tailwind CSS（Vibe Coding 构建）、Node.js（基础）、GitHub、AutoCAD

## 行业背景
消费电子/乐器（DONNER）、快时尚零售（URBAN REVIVO）

## 个人特质
- 持续自驱学习：非技术背景，通过 Claude Code 独立搭建多个 AI 工具
- 结果导向：每个项目都有量化成果支撑
- 跨领域适应：从供应链到产品管理到 AI 开发
- 热爱音乐科技与独自旅行，具备独立探索和解决问题的能力`;

      const systemPrompt = `你是一位资深 HR 和职业顾问。你需要根据候选人的档案，对一份 JD（岗位描述）进行深度匹配分析。

请严格按照以下 JSON 格式返回分析结果（只返回 JSON，不要任何其他文字）：

{
  "score": 数字(0-100),
  "summary": "一句话总结匹配情况",
  "items": [
    {
      "requirement": "JD中的具体要求",
      "stars": 数字(0-5),
      "match": "候选人的对应经历或能力",
      "level": "strong" 或 "partial" 或 "gap"
    }
  ],
  "highlights": ["亮点1", "亮点2", "亮点3"],
  "suggestions": ["弥补建议1", "弥补建议2"]
}

分析规则：
1. score: 综合匹配度百分比。加权：硬技能+工具 35%，经验+项目 30%，软技能 20%，行业+学历 15%
2. items: 从 JD 中提取 5-8 条核心要求，每条给出 0-5 星评分。5星=完全匹配，4星=强匹配，3星=部分匹配但可弥补，2星=有明显差距，1星=基本不匹配，0星=完全不相关。level 对应：5-4星="strong"，3星="partial"，2-0星="gap"
3. highlights: 2-4 个候选人在此岗位上最突出的优势，结合 JD 和候选人档案
4. suggestions: 2-3 条建议，告诉 HR 候选人可以如何弥补不足之处。要具体、真诚，不要空洞
5. 整体语气：专业、客观，既不过度包装也不过度贬低
6. 如果 JD 中有明显超出候选人经验范围的要求（如"10年以上经验"），如实标注，但指出候选人其他方面的补偿优势

JD 内容：
${jd}`;

      const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${env.DEEPSEEK_API_KEY}` },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: '请分析上述 JD 并返回 JSON。' }
          ],
          temperature: 0.3,
          max_tokens: 3000,
        }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        return new Response(JSON.stringify({ error: `DeepSeek API 错误: ${resp.status}` }), { status: 502, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      }

      const data = await resp.json();
      const content = data.choices?.[0]?.message?.content || '';

      // Extract JSON from response (handle markdown code blocks)
      let jsonStr = content.trim();
      if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
      }

      const result = JSON.parse(jsonStr);
      return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });

    } catch (err) {
      return new Response(JSON.stringify({ error: `分析失败: ${err.message}` }), { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    }
  }
};
