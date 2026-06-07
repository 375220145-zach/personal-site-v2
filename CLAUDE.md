## Personal Site V2 — 个人站点（React + Cloudflare Worker）

### 技术栈
Vite + React + TypeScript + Tailwind CSS + Framer Motion
Cloudflare Worker：JD 匹配分析 API（DeepSeek）

### 构建与部署
```bash
# 构建前端
npm run build

# 部署前端到 Cloudflare Pages
npx wrangler pages deploy dist --project-name=<project-name> --commit-dirty=true --branch=main

# 部署 Worker（JD 匹配 API）
cd worker && npx wrangler deploy
```

- 输出目录：`dist/`
- Worker 配置：`worker/wrangler.toml`
- 环境变量：`DEEPSEEK_API_KEY`（Worker 使用）

### 项目结构
- `src/` — React 前端源码
- `worker/` — Cloudflare Worker（JD 匹配 API，调用 DeepSeek 分析 JD vs 简历匹配度）
- `public/` — 静态资源（视频等）
- `dist/` — 构建输出

### 功能
- 个人主页（React SPA）
- JD 匹配分析：粘贴 JD → Worker 调用 DeepSeek → 返回匹配度评分和详细分析
