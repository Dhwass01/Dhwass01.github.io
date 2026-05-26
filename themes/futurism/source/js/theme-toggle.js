/**
 * theme-toggle.js — 深浅色主题切换
 * 最先加载，防止页面闪烁 (FOUC)
 */
;(function() {
  'use strict';

  var STORAGE_KEY = 'theme';
  var DARK = 'dark';
  var LIGHT = 'light';

  /**
   * 读取保存的主题偏好，无则默认 dark
   */
  function getSavedTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === DARK || saved === LIGHT) return saved;
    } catch (e) { /* localStorage 不可用 */ }
    return DARK;
  }

  /**
   * 应用主题到 <html>
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // 同步 Giscus iframe 主题
    if (typeof window.__updateGiscusTheme === 'function') {
      window.__updateGiscusTheme(theme);
    }
  }

  /**
   * 切换主题
   */
  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || DARK;
    var next = current === DARK ? LIGHT : DARK;
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) { /* ignore */ }
  }

  // ---- 初始化 ----
  // 立即应用保存的主题 (此脚本应放在 <head> 或 body 最前面)
  applyTheme(getSavedTheme());

  // DOM 就绪后绑定按钮事件
  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', toggleTheme);
    }
  });

  // 暴露全局方法供其他模块调用
  window.ThemeToggle = {
    get: getSavedTheme,
    set: function(t) { applyTheme(t); try { localStorage.setItem(STORAGE_KEY, t); } catch(e){} },
    toggle: toggleTheme
  };
})();
