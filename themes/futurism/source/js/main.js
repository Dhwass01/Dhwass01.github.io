/**
 * main.js — 主入口脚本
 * 负责初始化各模块和全局交互
 */
(function () {
  "use strict";

  // 代码块复制功能 + 语言标签
  function initCodeCopy() {
    document.querySelectorAll("pre").forEach(function (pre) {
      // 包裹容器
      var wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // 语言标签
      var langMatch = pre.className.match(/language-(\w+)/);
      if (langMatch) {
        var label = document.createElement("span");
        label.className = "code-lang-label";
        label.textContent = langMatch[1];
        wrapper.appendChild(label);
      }

      // 复制按钮
      var btn = document.createElement("button");
      btn.className = "code-copy-btn";
      btn.textContent = "复制";
      btn.setAttribute("aria-label", "复制代码");
      wrapper.appendChild(btn);

      btn.addEventListener("click", function () {
        var code = pre.querySelector("code");
        var text = code ? code.textContent : pre.textContent;
        navigator.clipboard
          .writeText(text)
          .then(function () {
            btn.textContent = "✓ 已复制";
            btn.classList.add("copied");
            setTimeout(function () {
              btn.textContent = "复制";
              btn.classList.remove("copied");
            }, 2000);
          })
          .catch(function () {
            btn.textContent = "失败";
            setTimeout(function () {
              btn.textContent = "复制";
            }, 2000);
          });
      });
    });
  }

  // 外部链接新窗口打开
  function initExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(function (a) {
      if (a.hostname !== window.location.hostname) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  // DOM 就绪
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }

  function ready() {
    initCodeCopy();
    initExternalLinks();
  }
})();
