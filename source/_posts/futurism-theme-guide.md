---
title: 从零打造 Futurism —— 一个 Playful + Futuristic 的 Hexo 主题
date: 2026-05-26 15:00:00
updated: 2026-05-26 15:00:00
tags:
  - Hexo
  - 主题开发
  - 前端
  - CSS
categories:
  - 技术
cover: /images/futurism-cover.png
excerpt: 记录从设计到落地的全过程：如何基于 EJS + Stylus + Vanilla JS 构建一个支持深色/浅色切换、命令面板、阅读进度条、响应式布局的现代 Hexo 主题。
---

## 前言

Hexo 是一个基于 Node.js 的静态博客框架，拥有丰富的主题生态。但当我想要一个同时具备 **科技感** 和 **趣味性** 的主题时，发现现有选项都不太契合。于是我决定自己动手，从零打造一个名为 **Futurism** 的主题。

这篇文章记录了整个主题的设计思路、技术选型、架构搭建过程，以及最终如何将它应用到 Hexo 框架中。

<!-- more -->

---

## 一、设计方向：Playful + Futuristic

在动手写代码之前，先明确设计语言：

- **色调**：以深空蓝 `#0A0B14` 为底色，搭配紫色 `#7C5CFF`、青色 `#00E5FF`、粉色 `#FF6B9D` 三种品牌色
- **圆角**：大量使用 `border-radius: 12px~20px`，营造亲和感
- **光晕**：按钮、卡片悬停时带有柔和的 `box-shadow` 发光效果
- **渐变**：标题文字、Hero 区背景、进度条均使用线性/径向渐变
- **字体**：Geist（标题）+ Inter（正文）+ JetBrains Mono（代码）

这些设计决策最终被抽象为一套 **Design Token 系统**，通过 CSS Variables 实现深色/浅色主题切换。

---

## 二、技术选型

| 层面       | 选择                | 理由                                  |
| ---------- | ------------------- | ------------------------------------- |
| 模板引擎   | EJS                 | Hexo 原生支持，语法简洁               |
| CSS 预处理 | Stylus              | Hexo 主题标配，支持变量和 mixin       |
| JavaScript | Vanilla JS          | 零依赖，体积小，够用                  |
| 代码高亮   | Prism.js            | Hexo 7.x 内置支持                     |
| 搜索       | 命令面板 + Pagefind | 本地模糊搜索 + 构建时全文索引         |
| 评论       | Giscus              | 基于 GitHub Discussions，免费无服务器 |

---

## 三、主题目录结构

```
themes/futurism/
├── _config.yml          # 主题配置文件
├── package.json         # 主题包描述
├── languages/           # 国际化
│   ├── zh-CN.yml
│   └── en.yml
├── layout/
│   ├── layout.ejs       # 全局骨架
│   ├── index.ejs        # 首页
│   ├── post.ejs         # 文章页
│   ├── archive.ejs      # 归档页
│   ├── tag.ejs          # 标签页
│   ├── category.ejs     # 分类页
│   ├── page.ejs         # 通用页面
│   └── _partial/
│       ├── head.ejs     # <head> 区块
│       ├── header.ejs   # 顶部导航
│       ├── footer.ejs   # 页脚
│       ├── hero.ejs     # 首屏 Hero 区
│       ├── post-card.ejs # 文章卡片
│       └── command-palette.ejs # 命令面板
└── source/
    ├── css/
    │   ├── style.styl         # 入口文件
    │   ├── _variables.styl    # Design Token
    │   ├── _base.styl         # CSS Reset
    │   ├── _typography.styl   # 排版
    │   └── _components/       # 组件样式
    │       ├── header.styl
    │       ├── hero.styl
    │       ├── post-card.styl
    │       ├── post.styl
    │       ├── index.styl
    │       ├── archive.styl
    │       ├── toc.styl
    │       ├── code-block.styl
    │       ├── command-palette.styl
    │       └── footer.styl
    └── js/
        ├── theme-toggle.js    # 主题切换
        ├── main.js            # 全局初始化
        ├── toc-progress.js    # 目录 + 进度条
        └── command-palette.js # 命令面板
```

---

## 四、核心实现详解

### 4.1 Design Token 系统

所有视觉属性都通过 CSS Variables 定义，切换主题只需在 `<html>` 上切换 `data-theme` 属性：

```css
:root,
[data-theme="dark"] {
  --bg-base: #0a0b14;
  --bg-surface: #12131f;
  --text-primary: #f0f0f5;
  --brand-primary: #7c5cff;
  --brand-accent: #00e5ff;
  --brand-warm: #ff6b9d;
}

[data-theme="light"] {
  --bg-base: #fafafe;
  --bg-surface: #ffffff;
  --text-primary: #1a1a2e;
}
```

在 Stylus 中，这些变量通过 `s()` 函数引用：

```stylus
body
  background: s('var(--bg-base)')
  color: s('var(--text-primary)')
  font-family: $font-body
```

### 4.2 全局骨架 layout.ejs

```html
<html data-theme="dark">
  <head>
    <%- partial('_partial/head') %>
  </head>
  <body>
    <%- partial('_partial/header') %> <%- partial('_partial/command-palette') %>
    <main class="container"><%- body %></main>
    <%- partial('_partial/footer') %>
    <script src="<%- url_for('js/theme-toggle.js') %>"></script>
    <script src="<%- url_for('js/main.js') %>"></script>
  </body>
</html>
```

关键设计：`<%- body %>` 是 Hexo 的内容注入点，各页面模板（index、post、archive 等）的内容会在这里渲染。

### 4.3 主题切换

```javascript
// theme-toggle.js
(function () {
  const stored = localStorage.getItem("theme");
  const theme = stored || "dark";
  document.documentElement.dataset.theme = theme;

  window.ThemeToggle = {
    toggle() {
      const next =
        document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
    },
  };
})();
```

默认深色，切换时同步更新 Giscus 评论组件的主题。

### 4.4 命令面板 (Cmd+K)

按下 `Cmd+K`（Mac）或 `Ctrl+K`（Windows）打开命令面板，支持模糊搜索所有文章和页面：

```javascript
// 核心搜索逻辑
function fuzzyMatch(query, text) {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}
```

搜索索引在页面渲染时通过 `<script>` 注入 `window.__searchIndex`，无需额外的 API 请求。

### 4.5 阅读进度条 + TOC 高亮

`toc-progress.js` 使用 `IntersectionObserver` 监听标题元素的可见性，自动高亮当前章节：

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 高亮对应的 TOC 链接
        highlightTocLink(entry.target.id);
      }
    });
  },
  { rootMargin: "-20% 0px -80% 0px" },
);
```

阅读进度条通过 `scroll` 事件计算百分比，使用 `requestAnimationFrame` 优化性能。

---

## 五、如何将主题应用到 Hexo

### 5.1 安装 Hexo

```bash
npm install -g hexo-cli
hexo init my-blog
cd my-blog
npm install
```

### 5.2 放置主题

将主题文件夹放到 `themes/` 目录下：

```bash
# 方式一：直接复制
cp -r futurism my-blog/themes/

# 方式二：Git Submodule（推荐）
cd my-blog
git submodule add https://github.com/your-repo/hexo-theme-futurism themes/futurism
```

### 5.3 修改站点配置

编辑根目录的 `_config.yml`：

```yaml
# 切换主题
theme: futurism

# 代码高亮
syntax_highlighter: prism

# 语言
language: zh-CN
```

### 5.4 安装依赖插件

```bash
npm install hexo-wordcount hexo-generator-feed --save
```

### 5.5 本地预览

```bash
hexo clean && hexo generate && hexo server
```

访问 `http://localhost:4000` 即可看到效果。

### 5.6 部署到 GitHub Pages

```bash
# 安装部署插件
npm install hexo-deployer-git --save

# 配置 _config.yml
deploy:
  type: git
  repo: https://github.com/username/username.github.io.git
  branch: main

# 部署
hexo deploy
```

---

## 六、主题配置说明

主题的所有配置都在 `themes/futurism/_config.yml` 中，主要包括：

```yaml
# 站点信息
site:
  title: "你的博客名"
  description: "一句话描述"

# 导航菜单
menu:
  Home: /
  Archives: /archives
  Tags: /tags
  About: /about

# 首屏 Hero 区
hero:
  greeting: "Hi, I'm YourName 👋"
  tagline: "你的标语"
  cta_primary:
    text: "阅读博客"
    url: "#post-list"

# 社交链接
social:
  github: https://github.com/yourname

# Giscus 评论
giscus:
  enable: false # 改为 true 启用
  repo: "your-repo"
  repoId: "your-repo-id"
```

---

## 七、构建过程中的踩坑记录

### 7.1 Hexo 7.x 的 PowerShell 兼容问题

在 Windows 上直接运行 `npx hexo` 可能遇到 `PSSecurityException`，解决方案：

```powershell
# 使用 node 直接调用
node .\node_modules\hexo\bin\hexo generate

# 或通过 cmd 包裹
cmd /c "npx hexo generate"
```

### 7.2 Git Credential Manager 拦截推送

安装了 GCM 的系统在 `git push` 时会弹出浏览器 OAuth 登录，即使 token 已嵌入 URL：

```bash
# 临时禁用 GCM
git config --global credential.helper ""

# 推送
git push -u origin main

# 恢复
git config --global credential.helper manager
```

### 7.3 Geist 字体 CDN 的 MIME 类型问题

jsdelivr 对某些 npm 包的 CSS 文件返回 `text/plain` MIME 类型，改用 unpkg 解决：

```yaml
# 改用 unpkg
geist_cdn: "https://unpkg.com/geist@1.4.1/dist/fonts/geist-sans/style.css"
```

---

## 八、效果预览

最终效果：

- **首页**：Hero 全屏首屏 + 文章卡片网格（3列响应式）
- **文章页**：左侧 TOC 目录 + 右侧正文 + 阅读进度条
- **归档页**：按年份分组的时间线布局
- **命令面板**：`Cmd+K` 快速搜索，支持键盘导航
- **主题切换**：一键切换深色/浅色模式，localStorage 持久化

---

## 总结

从设计到落地，Futurism 主题的开发过程可以概括为：

1. **明确设计语言** → 确定色彩、圆角、光晕、渐变等视觉元素
2. **建立 Token 系统** → 用 CSS Variables 统一管理所有视觉属性
3. **搭建骨架** → layout.ejs + partial 模板的层级关系
4. **逐模块实现** → 导航 → 首页 → 文章页 → 归档 → 命令面板
5. **测试迭代** → `hexo server` 实时预览，逐步修复问题

Hexo 的主题系统虽然不算现代，但 EJS 模板 + Stylus 样式的组合依然高效。如果你也想打造自己的主题，希望这篇文章能给你一些参考。

> 主题源码：[GitHub 仓库地址](https://github.com/Dhwass01/hexo-theme-futurism)
