# 🚀 Futurism 主题开发计划

> **主题名称**：Futurism  
> **气质定位**：活泼 + 未来感  
> **方向**：技术 × 设计  
> **创建日期**：2026-05-26

---

## 目录

- [项目现状](#项目现状)
- [技术栈](#技术栈)
- [Design Token 体系](#design-token-体系)
- [主题文件结构](#主题文件结构)
- [信息架构](#信息架构)
- [功能模块分级](#功能模块分级)
- [front-matter 规范](#front-matter-规范)
- [分步执行计划](#分步执行计划)
- [插件安装清单](#插件安装清单)
- [风险与注意事项](#风险与注意事项)

---

## 项目现状

| 项目          | 状态                                |
| ------------- | ----------------------------------- |
| Hexo 版本     | 7.3.0 ✅                            |
| EJS 渲染器    | 已安装 ✅                           |
| Stylus 渲染器 | 已安装 ✅                           |
| 当前主题      | landscape（默认）                   |
| themes 目录   | 空（仅有 .gitkeep）                 |
| 站点语言      | zh-CN                               |
| 部署目标      | GitHub Pages (`dhwass01.github.io`) |
| 包管理        | npm（建议迁移 pnpm）                |

---

## 技术栈（严格遵守）

| 类别       | 技术选型                                           |
| ---------- | -------------------------------------------------- |
| 静态生成器 | Hexo 7.x                                           |
| 模板引擎   | EJS（优先）                                        |
| 样式方案   | Stylus + CSS Variables（深浅色切换）               |
| 脚本       | 原生 ES6 + GSAP（仅 Hero 动效）+ Alpine.js（可选） |
| 代码高亮   | Hexo 内置 Prism（或 hexo-shiki 插件）              |
| 搜索       | hexo-generator-searchdb + Pagefind 客户端          |
| 部署       | GitHub Pages（现有）/ 后续可迁移 Vercel            |
| 包管理     | pnpm                                               |

---

## Design Token 体系

### CSS Variables 定义（Stylus 语法）

```stylus
// ===== 暗色主题(默认) =====
:root[data-theme="dark"]
  // 背景层
  --bg-base          #0A0B14
  --bg-elevated      #12141F
  --bg-overlay       #1A1D2E

  // 文字层
  --text-primary     #F5F7FF
  --text-secondary   #A8AECB
  --text-muted       #5A6080

  // 品牌色
  --brand-primary    #7C5CFF
  --brand-accent     #00E5FF
  --brand-warm       #FF6B9D

  // 边框 + 辉光
  --border-subtle    rgba(255,255,255,0.06)
  --border-strong    rgba(124,92,255,0.25)
  --glow-primary     0 0 24px rgba(124,92,255,0.35)
  --glow-accent      0 0 32px rgba(0,229,255,0.30)

// ===== 浅色主题 =====
:root[data-theme="light"]
  --bg-base          #FAFBFF
  --bg-elevated      #FFFFFF
  --bg-overlay       #F0F2FA
  --text-primary     #0A0B14
  --text-secondary   #4A5070
  --text-muted       #8B92B0
  --brand-primary    #6344FF
  --brand-accent     #0099B8
  --brand-warm       #E84F87

// ===== 字体 / 字号 =====
$font-display = 'Geist', 'PingFang SC', system-ui, sans-serif
$font-body    = 'Inter', 'PingFang SC', system-ui, sans-serif
$font-mono    = 'JetBrains Mono', 'Geist Mono', monospace

$text-xs   = 0.75rem
$text-sm   = 0.875rem
$text-base = 1rem
$text-lg   = 1.25rem
$text-xl   = 1.563rem
$text-2xl  = 1.953rem
$text-3xl  = 2.441rem
$text-4xl  = 3.052rem

$radius-sm = 6px
$radius-md = 12px
$radius-lg = 20px
$prose-max-width = 720px
```

### Token 色彩说明

| Token              | 深色值             | 浅色值             | 用途      |
| ------------------ | ------------------ | ------------------ | --------- |
| `--bg-base`        | `#0A0B14` 深空蓝黑 | `#FAFBFF` 极浅蓝白 | 页面底色  |
| `--bg-elevated`    | `#12141F` 深夜蓝   | `#FFFFFF` 纯白     | 卡片/面板 |
| `--bg-overlay`     | `#1A1D2E` 暗蓝灰   | `#F0F2FA` 浅灰蓝   | 弹窗/遮罩 |
| `--text-primary`   | `#F5F7FF` 冷白     | `#0A0B14` 近黑     | 主文字    |
| `--text-secondary` | `#A8AECB` 银灰     | `#4A5070` 深灰     | 次要文字  |
| `--text-muted`     | `#5A6080` 暗灰     | `#8B92B0` 中灰     | 弱化文字  |
| `--brand-primary`  | `#7C5CFF` 电光紫   | `#6344FF` 深紫     | 主品牌色  |
| `--brand-accent`   | `#00E5FF` 荧光青   | `#0099B8` 深青     | 强调色    |
| `--brand-warm`     | `#FF6B9D` 暖粉     | `#E84F87` 深粉     | 点缀/标签 |

### 字体方案

| 变量            | 字体栈                                  | 用途        |
| --------------- | --------------------------------------- | ----------- |
| `$font-display` | Geist → PingFang SC → system-ui         | 标题 / 导航 |
| `$font-body`    | Inter → PingFang SC → system-ui         | 正文        |
| `$font-mono`    | JetBrains Mono → Geist Mono → monospace | 代码块      |

> **字体加载策略**：优先使用 Google Fonts CDN 加载 Inter + JetBrains Mono；Geist 字体从 Vercel CDN 或本地 `@font-face` 加载。

---

## 主题文件结构

```
themes/futurism/
├── _config.yml                # 主题配置
├── package.json               # 主题包描述
├── languages/                 # i18n
│   ├── zh-CN.yml
│   └── en.yml
├── layout/
│   ├── layout.ejs             # 全局骨架
│   ├── index.ejs              # 首页
│   ├── post.ejs               # 文章页
│   ├── page.ejs               # 独立页面
│   ├── archive.ejs            # 归档
│   ├── tag.ejs                # 标签页
│   ├── category.ejs           # 分类页
│   └── _partial/              # 局部模板
│       ├── head.ejs           # <meta> + CSS
│       ├── header.ejs         # 导航 + 主题切换
│       ├── footer.ejs         # 页脚
│       ├── hero.ejs           # 首页 Hero 区
│       ├── post-card.ejs      # 文章卡片
│       ├── toc.ejs            # 文章目录
│       └── command-palette.ejs # Cmd+K 命令面板
├── source/
│   ├── css/
│   │   ├── _variables.styl    # ✅ Design Token（已定义）
│   │   ├── _base.styl         # Reset + 基础
│   │   ├── _typography.styl   # 排版系统
│   │   ├── _components/       # 组件样式
│   │   │   ├── header.styl
│   │   │   ├── hero.styl
│   │   │   ├── post-card.styl
│   │   │   ├── toc.styl
│   │   │   ├── code-block.styl
│   │   │   ├── command-palette.styl
│   │   │   └── footer.styl
│   │   └── style.styl         # 入口文件
│   ├── js/
│   │   ├── theme-toggle.js    # 深浅色切换
│   │   ├── hero-shader.js     # WebGL 背景（P2）
│   │   ├── toc-progress.js    # TOC + 阅读进度
│   │   ├── command-palette.js # Cmd+K 面板
│   │   └── main.js            # 入口
│   └── images/
│       └── favicon.*
└── （无 node_modules，依赖由站点根目录管理）
```

---

## 信息架构（Hexo 路由）

| 路由                  | 模板           | 说明                  |
| --------------------- | -------------- | --------------------- |
| `/`                   | `index.ejs`    | 首页：Hero + 最新文章 |
| `/archives/`          | `archive.ejs`  | 归档：时间轴          |
| `/categories/[name]/` | `category.ejs` | 分类文章列表          |
| `/tags/[name]/`       | `tag.ejs`      | 标签文章列表          |
| `/posts/[slug]/`      | `post.ejs`     | 文章详情              |
| `/about/`             | `page.ejs`     | 关于页面              |
| `/uses/`              | `page.ejs`     | 装备清单              |
| `/projects/`          | `page.ejs`     | 作品集                |

---

## 功能模块分级

### P0 必做（纯前端 / 构建时即可实现）

| #   | 功能                    | 实现方式                                      |
| --- | ----------------------- | --------------------------------------------- |
| 1   | 深色优先 + 主题切换     | `localStorage` + CSS Variables + `data-theme` |
| 2   | Markdown 增强：代码高亮 | Prism + 行号 + 复制按钮 + 文件名标签          |
| 3   | 文章 TOC + 阅读进度     | `IntersectionObserver` + 进度条               |
| 4   | 标签/分类系统           | Hexo 原生                                     |
| 5   | 全文搜索                | Pagefind（构建后注入）/ searchdb 兜底         |
| 6   | 响应式布局              | Stylus + 媒体查询                             |
| 7   | SEO                     | sitemap + 自定义 OG 图模板                    |
| 8   | RSS                     | hexo-generator-feed                           |
| 9   | 阅读时长 + 字数         | hexo-wordcount                                |

### P1 加分（纯静态可达）

| #   | 功能           | 实现方式                          |
| --- | -------------- | --------------------------------- |
| 10  | 评论系统       | Giscus（GitHub Discussions 嵌入） |
| 11  | Newsletter     | Buttondown / MailerLite iframe    |
| 12  | 命令面板 Cmd+K | 原生 JS + 静态站点地图 JSON       |
| 13  | 相关文章推荐   | 构建时基于标签生成（Hexo helper） |

### P2 锦上添花（纯客户端）

| #   | 功能            | 实现方式                 |
| --- | --------------- | ------------------------ |
| 14  | 鼠标辉光指针    | CSS + JS mousemove       |
| 15  | 滚动入场动画    | GSAP + ScrollTrigger     |
| 16  | Hero WebGL 背景 | Three.js / 纯 Shader     |
| 17  | 可变字体        | Variable Font @font-face |

### ⚠️ 需降级或舍弃的功能

| 功能                        | 降级方案                                                     |
| --------------------------- | ------------------------------------------------------------ |
| AI 文章摘要                 | 手动填写 front-matter `summary`，或 GitHub Action 构建前生成 |
| 访客统计                    | 接入 Umami / Plausible（自托管或 SaaS）                      |
| Server Actions / API Routes | Hexo 不支持，全部去掉                                        |

---

## front-matter 规范

```yaml
---
title: 文章标题
date: 2026-05-26 11:00:00
updated: 2026-05-26 11:00:00
tags: [Next.js, 设计工程]
categories: [技术]
cover: /images/covers/xxx.jpg
summary: 一句话 TL;DR，显示在卡片与文章顶部
toc: true
mathjax: false
---
```

| 字段         | 类型     | 必填 | 说明                           |
| ------------ | -------- | ---- | ------------------------------ |
| `title`      | string   | ✅   | 文章标题                       |
| `date`       | datetime | ✅   | 发布日期                       |
| `updated`    | datetime | ❌   | 最后更新日期                   |
| `tags`       | array    | ❌   | 标签列表                       |
| `categories` | array    | ❌   | 分类（建议单级）               |
| `cover`      | string   | ❌   | 封面图路径                     |
| `summary`    | string   | ❌   | 一句话摘要，用于卡片展示       |
| `toc`        | boolean  | ❌   | 是否显示目录（默认 true）      |
| `mathjax`    | boolean  | ❌   | 是否启用数学公式（默认 false） |

---

## 分步执行计划

### 执行依赖关系

```
Step 1 (package.json + _config.yml)
  │
  ▼
Step 2 (layout.ejs 全局骨架)
  │
  ├──────────────────┐
  ▼                  ▼
Step 3 (Design Token)  Step 4 (header + 主题切换)
  │                  │
  └────────┬─────────┘
           ▼
     Step 5 (index + Hero)
           │
     ┌─────┴─────┐
     ▼           ▼
Step 6 (post)  Step 7 (post-card + 列表)
     │           │
     └─────┬─────┘
           ▼
     Step 8 (Cmd+K)
           │
           ▼
     Step 9 (Pagefind)
```

---

### 📦 Step 1：`package.json` + `_config.yml`

**目标**：建立主题的包描述和核心配置文件

**文件清单**：

- `themes/futurism/package.json` — 主题包描述
- `themes/futurism/_config.yml` — 主题配置

**配置要点**：

- 导航菜单项（Home / Archives / Tags / About / Projects）
- 社交链接（GitHub、Twitter/X、Email）
- Hero 区配置（标题、副标题、CTA 按钮文字）
- 代码高亮开关（Prism）
- Giscus 评论配置占位
- Pagefind 搜索开关
- 默认主题 `dark`
- 字体 CDN 配置

**站点 `_config.yml` 需修改**：

```yaml
theme: futurism
syntax_highlighter: prism
```

---

### 🏗️ Step 2：`layout.ejs`（全局骨架）

**目标**：构建所有页面的 HTML 外壳

**文件**：`themes/futurism/layout/layout.ejs`

**职责**：

- `<!DOCTYPE html>` + `<html lang="zh-CN" data-theme="dark">`
- `<%- partial('_partial/head') %>` — meta / SEO / CSS
- `<%- partial('_partial/header') %>` — 导航
- `<main><%- body %></main>` — 页面内容注入
- `<%- partial('_partial/footer') %>` — 页脚
- JS 加载顺序：`theme-toggle.js` → `main.js` → 可选 GSAP

**关联子模板**：

- `_partial/head.ejs` — `<meta>` 标签、SEO OG 标签、CSS 入口、favicon
- `_partial/footer.ejs` — 版权、社交链接、back-to-top

---

### 🎨 Step 3：`_variables.styl` + `style.styl`

**目标**：Design Token 完整落地 + 样式入口

**文件清单**：

- `source/css/_variables.styl` — ✅ 已有 Design Token 定义
- `source/css/_base.styl` — CSS Reset + 全局基础
- `source/css/_typography.styl` — 排版系统（标题/正文/引用/列表）
- `source/css/_components/*.styl` — 各组件样式
- `source/css/style.styl` — 入口 `@import` 所有模块

**style.styl 结构**：

```stylus
@import '_variables'
@import '_base'
@import '_typography'
@import '_components/header'
@import '_components/hero'
@import '_components/post-card'
@import '_components/toc'
@import '_components/code-block'
@import '_components/command-palette'
@import '_components/footer'
```

**`_base.styl` 核心内容**：

- `*` box-sizing 重置
- `body` 使用 `--bg-base` / `--text-primary` / `$font-body`
- `a` 链接使用 `--brand-accent`，hover 时 glow
- 平滑滚动 `scroll-behavior: smooth`
- `::selection` 使用紫色半透明背景

---

### 🧭 Step 4：`header.ejs` + 主题切换 JS

**目标**：导航栏 + 深浅色切换

**文件清单**：

- `layout/_partial/header.ejs`
- `source/js/theme-toggle.js`
- `source/css/_components/header.styl`

**导航栏设计**：

- 固定顶部，`backdrop-filter: blur(16px)` 毛玻璃
- 左侧：站点名称（`--brand-accent` 荧光青 glow）
- 右侧：导航链接 + 主题切换按钮 + 搜索图标
- 移动端：汉堡菜单 → 侧滑抽屉

**主题切换逻辑**：

```javascript
// 1. 读取 localStorage，无则默认 'dark'
// 2. document.documentElement.dataset.theme = theme
// 3. 点击按钮切换 dark ↔ light
// 4. localStorage.setItem('theme', theme)
// 5. 图标动态：🌙 / ☀️
```

---

### 🏠 Step 5：`index.ejs` + Hero 区

**目标**：首页布局 + Hero 视觉区

**文件清单**：

- `layout/index.ejs`
- `layout/_partial/hero.ejs`
- `source/css/_components/hero.styl`

**首页布局**：

```
┌─────────────────────────────────────────┐
│  [Hero 区域 - 全宽视口高度]              │
│  CSS 渐变动画背景（深空流动）             │
│                                         │
│   Hi, I'm [Name] 👋                    │
│   构建 × 创造 × 探索                    │
│   ─────────────                         │
│   [阅读博客 →]  [关于我]                 │
│   ↓                                     │
├─────────────────────────────────────────┤
│  [最新文章网格]                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ card 1  │ │ card 2  │ │ card 3  │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                         │
│  [标签云]  [分页]                        │
└─────────────────────────────────────────┘
```

**Hero 区细节**：

- 背景：`radial-gradient` + `@keyframes` 深空流动（P2 再加 WebGL）
- 标题：`$font-display` 大号，`text-shadow` 紫色 glow
- CTA 按钮：渐变边框 + hover glow 扩散
- 文章网格：3列 → 2列（平板）→ 1列（手机）

---

### 📝 Step 6：`post.ejs` + TOC + 代码高亮

**目标**：文章详情页 — 博客核心体验

**文件清单**：

- `layout/post.ejs`
- `layout/_partial/toc.ejs`
- `source/css/_components/toc.styl`
- `source/css/_components/code-block.styl`
- `source/js/toc-progress.js`

**文章页布局**：

```
┌──────────┬──────────────────────┬────────────┐
│ [TOC     │ [文章正文]            │ [阅读进度]  │
│  侧边栏] │                      │  右侧细线   │
│  ~20%    │  标题                │             │
│          │  meta (日期/字数/时长) │             │
│  ● H2    │  ──────────────      │             │
│    ● H3  │  正文内容...          │             │
│  ● H2    │  代码块 (行号+复制)   │             │
│          │  标签                 │             │
│          │  上一篇/下一篇         │             │
│          │  Giscus 评论区        │             │
└──────────┴──────────────────────┴────────────┘
```

**TOC 功能**：

- 从 `h2`~`h4` 自动生成目录树
- `IntersectionObserver` 高亮当前可见标题
- 点击平滑滚动
- 移动端：浮动按钮 → 侧滑面板

**代码块样式**：

- Prism 主题定制（匹配深空蓝配色）
- 行号 + 一键复制按钮 + 文件名标签
- 圆角 `$radius-md` + 内阴影

---

### 🃏 Step 7：`post-card.ejs` + 首页文章列表

**目标**：文章卡片组件

**文件清单**：

- `layout/_partial/post-card.ejs`
- `source/css/_components/post-card.styl`

**卡片设计**：

```
┌──────────────────────────────────┐
│  [封面图 / 标题hash渐变占位]      │
│                                  │
│  分类标签                         │
│  文章标题（2行截断）              │
│  摘要（3行截断）                  │
│  ──────────────────────────────  │
│  📅 2026-05-26  ·  ⏱ 5 min     │
│  🏷️ Next.js, 设计工程            │
└──────────────────────────────────┘
```

**交互**：Hover 上浮 + `--glow-primary` 边框扩散

**归档页** (`archive.ejs`)：时间轴布局，按年月分组

---

### ⌨️ Step 8：命令面板 Cmd+K

**目标**：快速搜索 + 导航

**文件清单**：

- `layout/_partial/command-palette.ejs`
- `source/js/command-palette.js`
- `source/css/_components/command-palette.styl`

**功能**：

- 触发：`Cmd+K`（Mac）/ `Ctrl+K`（Windows）
- 居中弹出，毛玻璃遮罩
- 搜索框 + 实时过滤
- 数据源：所有文章 + 固定页面 + 标签/分类
- 键盘导航：↑↓ 选择、Enter 跳转、Esc 关闭
- 匹配文字高亮

---

### 🔍 Step 9：Pagefind 集成

**目标**：构建后全文搜索

**方案**：

1. `package.json` scripts 添加：
   ```json
   "build": "hexo generate && npx pagefind --site public"
   ```
2. Pagefind 在 `public/` 生成搜索索引
3. 搜索 UI 集成到 command-palette 或独立搜索页

**备选**：先用 `hexo-generator-searchdb` + Fuse.js，后续迁移到 Pagefind

---

## 插件安装清单

| 插件                                | 用途               | 优先级 | 安装命令                                       |
| ----------------------------------- | ------------------ | ------ | ---------------------------------------------- |
| hexo-prism-plugin                   | Prism 代码高亮增强 | P0     | `pnpm add hexo-prism-plugin`                   |
| hexo-generator-searchdb             | 搜索索引 JSON      | P0     | `pnpm add hexo-generator-searchdb`             |
| hexo-generator-feed                 | RSS 订阅           | P0     | `pnpm add hexo-generator-feed`                 |
| hexo-wordcount                      | 字数/阅读时长      | P0     | `pnpm add hexo-wordcount`                      |
| hexo-generator-seo-friendly-sitemap | SEO Sitemap        | P0     | `pnpm add hexo-generator-seo-friendly-sitemap` |
| pagefind                            | 全文搜索（构建后） | P0     | `pnpm add -D pagefind`                         |

---

## 风险与注意事项

| 风险                   | 应对策略                                          |
| ---------------------- | ------------------------------------------------- |
| WebGL Hero 影响 LCP    | P2 阶段再实现，先用 CSS 渐变占位                  |
| GSAP 包体积大          | 仅引入 `gsap.min.js` + `ScrollTrigger`            |
| Prism vs Shiki         | 先用 Prism（Hexo 原生支持好），Shiki 作为升级方案 |
| Pagefind 兼容性        | 备用 `hexo-generator-searchdb` + Fuse.js          |
| 移动端 TOC 体验        | 侧滑面板 + 浮动按钮                               |
| Geist 字体加载         | CDN 优先，本地 `@font-face` 兜底                  |
| `npx hexo` 安全限制    | 使用 `node .\node_modules\hexo\bin\hexo` 代替     |
| npm 被 PowerShell 拦截 | 使用 `cmd /c npm ...` 或迁移 pnpm                 |

---

## 视觉风格速查

- **深空蓝黑** `#0A0B14` 作为默认背景
- **电光紫** `#7C5CFF` 用于主品牌色、链接、按钮
- **荧光青** `#00E5FF` 用于强调、hover、活跃状态
- **暖粉** `#FF6B9D` 用于标签、点缀
- **毛玻璃** `backdrop-filter: blur(16px)` 用于 header / 弹窗
- **辉光效果** `box-shadow: var(--glow-primary)` 用于卡片 hover / 焦点
- **深色优先**，浅色模式通过 `[data-theme="light"]` 覆盖

---

> 📌 **下一步**：确认计划无误后，从 **Step 1** 开始逐文件生成。
