/**
 * command-palette.js — Cmd+K 命令面板
 * 纯原生 JS，基于静态搜索索引
 */
;(function() {
  'use strict';

  var overlay, input, resultsContainer, items;
  var activeIndex = -1;
  var isOpen = false;

  function init() {
    overlay = document.getElementById('command-palette-overlay');
    input = document.getElementById('command-palette-input');
    resultsContainer = document.getElementById('command-palette-results');

    if (!overlay || !input || !resultsContainer) return;

    // 快捷键: Cmd+K / Ctrl+K
    document.addEventListener('keydown', function(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    });

    // 搜索图标触发
    var trigger = document.getElementById('search-trigger');
    if (trigger) {
      trigger.addEventListener('click', function() {
        toggle();
      });
    }

    // 点击遮罩关闭
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) close();
    });

    // 输入搜索
    input.addEventListener('input', function() {
      search(input.value.trim());
    });

    // 键盘导航
    input.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveActive(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        moveActive(-1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        navigateToActive();
      }
    });
  }

  function toggle() {
    isOpen ? close() : open();
  }

  function open() {
    isOpen = true;
    overlay.classList.add('is-open');
    input.value = '';
    input.focus();
    search('');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    isOpen = false;
    overlay.classList.remove('is-open');
    activeIndex = -1;
    document.body.style.overflow = '';
  }

  /**
   * 模糊搜索
   */
  function search(query) {
    var index = window.__searchIndex || [];
    var results;

    if (!query) {
      results = index.slice(0, 10);
    } else {
      var q = query.toLowerCase();
      results = index.filter(function(item) {
        return item.title.toLowerCase().indexOf(q) !== -1
          || (item.summary && item.summary.toLowerCase().indexOf(q) !== -1)
          || item.tags.some(function(t) { return t.toLowerCase().indexOf(q) !== -1; })
          || item.categories.some(function(c) { return c.toLowerCase().indexOf(q) !== -1; });
      }).slice(0, 12);
    }

    renderResults(results, query);
  }

  /**
   * 渲染搜索结果
   */
  function renderResults(results, query) {
    activeIndex = -1;

    if (results.length === 0) {
      resultsContainer.innerHTML = '<div class="command-palette__empty">没有找到相关结果</div>';
      items = [];
      return;
    }

    var html = results.map(function(item, i) {
      var titleHtml = query ? highlightMatch(item.title, query) : escapeHtml(item.title);
      var typeLabel = item.type === 'post' ? '文章' : '页面';
      return '<div class="command-palette__item" data-url="' + escapeHtml(item.url) + '" data-index="' + i + '">'
        + '<span class="result-title">' + titleHtml + '</span>'
        + (item.date ? '<span class="result-date">' + item.date + '</span>' : '')
        + '<span class="result-type">' + typeLabel + '</span>'
        + '</div>';
    }).join('');

    resultsContainer.innerHTML = html;
    items = Array.from(resultsContainer.querySelectorAll('.command-palette__item'));

    // 点击跳转
    items.forEach(function(el) {
      el.addEventListener('click', function() {
        window.location.href = el.getAttribute('data-url');
      });
    });
  }

  /**
   * 高亮匹配文字
   */
  function highlightMatch(text, query) {
    var idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return escapeHtml(text);
    var before = escapeHtml(text.substring(0, idx));
    var match = escapeHtml(text.substring(idx, idx + query.length));
    var after = escapeHtml(text.substring(idx + query.length));
    return before + '<mark>' + match + '</mark>' + after;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /**
   * 键盘移动高亮
   */
  function moveActive(direction) {
    if (!items || items.length === 0) return;
    items.forEach(function(el) { el.classList.remove('is-active'); });
    activeIndex += direction;
    if (activeIndex < 0) activeIndex = items.length - 1;
    if (activeIndex >= items.length) activeIndex = 0;
    items[activeIndex].classList.add('is-active');
    items[activeIndex].scrollIntoView({ block: 'nearest' });
  }

  /**
   * 跳转到当前高亮项
   */
  function navigateToActive() {
    if (activeIndex >= 0 && items[activeIndex]) {
      window.location.href = items[activeIndex].getAttribute('data-url');
    }
  }

  // DOM 就绪后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
