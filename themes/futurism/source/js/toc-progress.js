/**
 * toc-progress.js — TOC 高亮 + 阅读进度条
 * 基于 IntersectionObserver，无第三方依赖
 */
(function () {
  "use strict";

  var progressBar = null;
  var tocLinks = [];
  var headings = [];
  var activeClass = "is-active";

  function init() {
    progressBar = document.getElementById("reading-progress");
    var postContent = document.getElementById("post-content");
    if (!postContent) return;

    // 收集文章标题
    headings = Array.from(postContent.querySelectorAll("h2, h3, h4"));
    if (headings.length === 0) return;

    // 收集 TOC 链接
    tocLinks = Array.from(document.querySelectorAll(".toc-list a, .toc a"));

    // 阅读进度
    if (progressBar) {
      window.addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();
    }

    // TOC 高亮 (IntersectionObserver)
    if (tocLinks.length > 0) {
      initTocObserver();
    }
  }

  /**
   * 更新阅读进度条
   */
  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    var percent = Math.min((scrollTop / docHeight) * 100, 100);
    progressBar.style.width = percent + "%";
  }

  /**
   * TOC IntersectionObserver
   */
  function initTocObserver() {
    var observerOptions = {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0,
    };

    var visibleHeadings = new Set();

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          visibleHeadings.add(entry.target.id);
        } else {
          visibleHeadings.delete(entry.target.id);
        }
      });

      // 找到第一个可见标题并高亮对应 TOC
      if (visibleHeadings.size > 0) {
        var firstVisible = null;
        for (var i = 0; i < headings.length; i++) {
          if (visibleHeadings.has(headings[i].id)) {
            firstVisible = headings[i];
            break;
          }
        }
        if (firstVisible) {
          highlightTocLink(firstVisible.id);
        }
      }
    }, observerOptions);

    headings.forEach(function (h) {
      if (!h.id) {
        h.id = h.textContent
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w\u4e00-\u9fff-]/g, "");
      }
      observer.observe(h);
    });
  }

  /**
   * 高亮指定 TOC 链接
   */
  function highlightTocLink(id) {
    tocLinks.forEach(function (link) {
      link.classList.remove(activeClass);
      if (link.getAttribute("href") === "#" + id) {
        link.classList.add(activeClass);
        // 滚动 TOC 侧边栏使高亮项可见
        var sidebar = document.getElementById("tocSidebar");
        if (sidebar) {
          var linkRect = link.getBoundingClientRect();
          var sidebarRect = sidebar.getBoundingClientRect();
          if (
            linkRect.top < sidebarRect.top ||
            linkRect.bottom > sidebarRect.bottom
          ) {
            link.scrollIntoView({ block: "center", behavior: "smooth" });
          }
        }
      }
    });
  }

  // DOM 就绪后初始化
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
