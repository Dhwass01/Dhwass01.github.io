---
title: CSS Variables 实战：构建可维护的设计系统
date: 2026-05-10 09:00:00
categories:
  - 技术
tags:
  - CSS
  - 前端
  - 设计系统
---

CSS Custom Properties（CSS 变量）是现代前端开发的基石之一。本文分享如何用它构建一个可维护的设计系统。

<!-- more -->

## 为什么用 CSS Variables

相比 Sass/Less 变量，CSS 变量有天然优势：

- **运行时可变**：可以通过 JS 动态修改
- **继承性**：子元素自动继承父元素的变量
- **级联性**：可以在不同层级覆盖
- **原生**：无需编译，浏览器直接支持

## 定义设计 Token

```css
:root {
  /* 色彩 */
  --color-primary: #7C5CFF;
  --color-accent: #00E5FF;
  --color-text: #F5F7FF;
  --color-bg: #0A0B14;
  
  /* 间距 */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  
  /* 字号 */
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;
  
  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
}
```

## 主题切换

最经典的应用场景——深色/浅色模式：

```css
:root[data-theme="dark"] {
  --color-bg: #0A0B14;
  --color-text: #F5F7FF;
}

:root[data-theme="light"] {
  --color-bg: #FAFBFF;
  --color-text: #0A0B14;
}
```

切换主题只需要修改 `data-theme` 属性：

```javascript
document.documentElement.dataset.theme = 'light';
```

所有使用这些变量的元素会自动更新，无需重新计算。

## 实际应用

### 组件化样式

```css
.card {
  background: var(--color-bg-elevated);
  color: var(--color-text);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}
```

### 响应式调整

```css
:root {
  --container-width: 1200px;
}

@media (max-width: 768px) {
  :root {
    --container-width: 100%;
    --space-lg: 1.5rem;
  }
}
```

## 调试技巧

在 DevTools 中，可以实时修改 CSS 变量值来预览效果。在 Elements 面板的 `:root` 选择器上直接编辑即可。

## 注意事项

1. **命名规范**：建议用 `--类别-用途` 的格式，如 `--color-primary`、`--space-md`
2. **降级处理**：对于不支持的老浏览器，提供回退值
3. **性能**：大量使用 CSS 变量可能影响性能，但一般场景不用担心

```css
background: #0A0B14; /* 回退值 */
background: var(--color-bg);
```

## 总结

CSS Variables 不是什么新技术，但它的强大之处在于**让 CSS 具有了编程能力**。设计 Token、主题切换、响应式适配，都可以用它优雅地实现。

如果你的项目还在用硬编码的颜色值，不妨试试迁移过来。
