/* Small, framework-free enhancements: theme, menu, shortcuts and article TOC. */
(function () {
  'use strict';

  var root = document.documentElement;
  var themeButton = document.querySelector('.theme-toggle');

  function syncThemeButton() {
    if (!themeButton) return;
    var dark = root.dataset.theme === 'dark';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', dark ? '切换浅色模式' : '切换深色模式');
  }

  syncThemeButton();
  if (themeButton) {
    themeButton.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('lingaoyang-theme', next); } catch (e) { /* private browsing */ }
      syncThemeButton();
    });
  }

  var menuButton = document.querySelector('.menu-toggle');
  var menu = document.getElementById('primary-navigation');
  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? '收起导航菜单' : '展开导航菜单');
    });
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        menu.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        menu.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // The desktop sidebar and the mobile expandable TOC are generated from h2/h3.
  var article = document.getElementById('article-content');
  var tocList = document.getElementById('toc-list');
  if (article && tocList) {
    var headings = Array.from(article.querySelectorAll('h2, h3'));
    if (!headings.length) {
      var panel = document.getElementById('toc-panel');
      if (panel) panel.hidden = true;
    } else {
      var mobile = document.createElement('details');
      mobile.className = 'toc-mobile';
      var summary = document.createElement('summary');
      summary.textContent = '本文目录（展开）';
      mobile.appendChild(summary);
      var mobileNav = document.createElement('nav');
      mobileNav.setAttribute('aria-label', '移动端文章目录');
      mobile.appendChild(mobileNav);
      article.insertBefore(mobile, article.firstChild);

      var idSet = new Set();
      headings.forEach(function (heading, index) {
        var base = heading.id || 'section-' + (index + 1);
        var id = base;
        var suffix = 2;
        while (idSet.has(id)) id = base + '-' + suffix++;
        heading.id = id;
        idSet.add(id);

        [tocList, mobileNav].forEach(function (container) {
          var anchor = document.createElement('a');
          anchor.href = '#' + encodeURIComponent(id);
          anchor.textContent = heading.textContent.trim();
          anchor.className = 'toc-depth-' + heading.tagName.slice(1);
          anchor.dataset.target = id;
          container.appendChild(anchor);
          if (container === mobileNav) anchor.addEventListener('click', function () { mobile.open = false; });
        });
      });

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              tocList.querySelectorAll('a').forEach(function (link) {
                link.classList.toggle('active', link.dataset.target === entry.target.id);
              });
            }
          });
        }, { rootMargin: '-100px 0px -72% 0px' });
        headings.forEach(function (heading) { observer.observe(heading); });
      }
    }
  }

  var progress = document.getElementById('reading-progress-bar');
  if (progress && article) {
    var ticking = false;
    function updateProgress() {
      var start = article.getBoundingClientRect().top + window.scrollY;
      var length = Math.max(1, article.offsetHeight - window.innerHeight * .65);
      var ratio = (window.scrollY - start) / length;
      progress.style.width = Math.max(0, Math.min(100, ratio * 100)) + '%';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(updateProgress); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  // Press / to search (unless currently typing in an editable control).
  document.addEventListener('keydown', function (event) {
    var target = event.target;
    var typing = target && (target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(target.tagName));
    if (event.key === '/' && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
      var searchInput = document.getElementById('search-input');
      if (searchInput) { event.preventDefault(); searchInput.focus(); }
      else {
        var searchLink = document.querySelector('.header-tools a[aria-label="搜索文章"]');
        if (searchLink) { event.preventDefault(); window.location.href = searchLink.href; }
      }
    }
  });
})();
