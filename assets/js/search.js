/* Local, offline-indexed search. No service, API key or tracking required. */
(function () {
  'use strict';
  var page = document.querySelector('[data-search-index]');
  if (!page) return;
  var input = document.getElementById('search-input');
  var status = document.getElementById('search-status');
  var results = document.getElementById('search-results');
  var form = document.getElementById('search-form');
  var posts = [];
  var timer;

  function normalize(value) { return String(value || '').toLocaleLowerCase().replace(/\s+/g, ' ').trim(); }
  function termsFor(query) { return normalize(query).split(/\s+/).filter(Boolean).slice(0, 8); }

  function score(post, terms) {
    var title = normalize(post.title);
    var category = normalize(post.category);
    var description = normalize(post.description);
    var body = normalize(post.content);
    var total = 0;
    for (var i = 0; i < terms.length; i++) {
      var term = terms[i];
      if (title.includes(term)) total += 12;
      else if (category.includes(term)) total += 8;
      else if (description.includes(term)) total += 5;
      else if (body.includes(term)) total += 1;
      else return 0;
    }
    return total;
  }

  function snippet(post, terms) {
    var value = String(post.description || post.content || '').replace(/\s+/g, ' ').trim();
    var normalized = normalize(value);
    var match = terms.map(function (term) { return normalized.indexOf(term); }).filter(function (x) { return x >= 0; });
    var first = match.length ? Math.min.apply(null, match) : 0;
    var start = Math.max(0, first - 35);
    var end = Math.min(value.length, start + 125);
    return (start ? '…' : '') + value.slice(start, end) + (end < value.length ? '…' : '');
  }

  function node(tag, className, value) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (value !== undefined) element.textContent = value;
    return element;
  }

  function render() {
    var query = input.value.trim();
    var terms = termsFor(query);
    results.replaceChildren();
    if (!terms.length) {
      status.textContent = '输入关键词后，将在全部 ' + posts.length + ' 篇文章中搜索。';
      return;
    }
    var matches = posts.map(function (post) { return { post: post, rank: score(post, terms) }; })
      .filter(function (entry) { return entry.rank > 0; })
      .sort(function (a, b) { return b.rank - a.rank; });

    status.textContent = '找到 ' + matches.length + ' 篇与「' + query + '」相关的文章';
    if (!matches.length) {
      results.appendChild(node('p', 'search-empty', '没有找到匹配的内容。可以试试更短的关键词，或换一种说法。'));
      return;
    }
    matches.slice(0, 50).forEach(function (entry) {
      var post = entry.post;
      var item = node('article', 'search-result');
      var meta = node('div', 'search-result-meta');
      meta.appendChild(node('span', '', post.category));
      meta.appendChild(node('time', '', post.date));
      var heading = node('h2');
      var anchor = node('a', '', post.title);
      anchor.href = post.url;
      heading.appendChild(anchor);
      item.appendChild(meta);
      item.appendChild(heading);
      item.appendChild(node('p', '', snippet(post, terms)));
      results.appendChild(item);
    });
  }

  input.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(render, 110);
  });
  form.addEventListener('submit', function (event) { event.preventDefault(); render(); });

  fetch(page.dataset.searchIndex)
    .then(function (response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(function (data) {
      posts = Array.isArray(data) ? data : [];
      var query = new URLSearchParams(window.location.search).get('q');
      if (query) input.value = query;
      render();
      input.focus();
    })
    .catch(function () {
      status.textContent = '搜索索引加载失败。请通过网站地址访问搜索页；若在本地开发，请先启动 Jekyll 服务。';
    });
})();
