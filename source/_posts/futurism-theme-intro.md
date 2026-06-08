---
title: Futurism 主题：从零构建一个现代 Hexo 博客主题
date: 2026-05-20 10:00:00
categories:
  - 技术
tags:
  - Hexo
  - 前端
  - 主题开发
cover: /images/futurism-cover.jpg
---

这篇文章记录了 Futurism 主题的设计思路和实现过程，从技术选型到最终落地。

<!-- more -->

## 为什么要做这个主题

市面上的 Hexo 主题要么功能臃肿，要么设计过时。我想要一个：

- **轻量**：不引入 jQuery、Bootstrap 等重依赖
- **现代**：CSS Variables、Grid/Flexbox、现代色彩体系
- **实用**：暗色模式、搜索、目录、代码高亮一应俱全

## 技术选型

| 层面 | 选择 | 理由 |
|------|------|------|
| 模板 | EJS | Hexo 原生支持，语法简单 |
| 样式 | Stylus | 嵌套友好，变量系统强大 |
| 脚本 | Vanilla JS | 零依赖，极致轻量 |
| 搜索 | Pagefind | 静态搜索，无需后端 |

## 设计系统

### 色彩

采用 CSS Variables 实现主题切换：

```css
:root[data-theme="dark"] {
  --bg-base: #0A0B14;
  --brand-primary: #7C5CFF;
  --brand-accent: #00E5FF;
}
```

### 字体

- **标题**：Geist（Vercel 出品，几何感强）
- **正文**：Inter（可读性极佳的无衬线体）
- **代码**：JetBrains Mono（程序员最爱）

## 核心功能

### 1. 命令面板

按 `Cmd/Ctrl + K` 打开命令面板，支持文章搜索和快速导航。

### 2. 阅读进度

文章页顶部有阅读进度条，侧边栏有自动生成的目录。

### 3. 代码高亮

基于 Prism.js，支持一键复制和语言标签显示。

## 总结

做主题是一个系统工程，涉及模板、样式、脚本、构建等多个方面。但这个过程也充满乐趣，每一个像素的调整都能带来即时反馈。

如果你也想自定义自己的博客主题，不妨从一个简单的 HTML 开始，逐步迭代。

---

> 项目地址：[hexo-theme-futurism](https://github.com/Dhwass01/hexo-theme-futurism)
