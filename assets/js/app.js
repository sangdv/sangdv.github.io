/* CV/DL — script tối giản, không phụ thuộc thư viện ngoài */
(function () {
  'use strict';

  /* ---- Chế độ sáng / tối -------------------------------------------- */
  var root = document.documentElement;

  function currentTheme() {
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function toggleTheme() {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  }

  var themeBtns = document.querySelectorAll('[data-action="toggle-theme"]');
  for (var i = 0; i < themeBtns.length; i++) {
    themeBtns[i].addEventListener('click', toggleTheme);
  }

  /* ---- Menu trên màn hình nhỏ ---------------------------------------- */
  var navToggle = document.querySelector('[data-action="toggle-nav"]');
  var nav = document.getElementById('site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', open ? 'false' : 'true');
      navToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.setAttribute('data-open', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Thanh tiến độ đọc bài ---------------------------------------- */
  var bar = document.querySelector('.progress');
  if (bar) {
    var onScroll = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  /* ---- Lọc theo chủ đề / thẻ ----------------------------------------- */
  var chips = document.querySelectorAll('[data-filter]');
  var groups = document.querySelectorAll('.group[data-group]');

  function applyFilter(value, push) {
    for (var g = 0; g < groups.length; g++) {
      var match = value === 'all' || groups[g].getAttribute('data-group') === value;
      groups[g].hidden = !match;
    }
    for (var c = 0; c < chips.length; c++) {
      chips[c].setAttribute('aria-selected', chips[c].getAttribute('data-filter') === value ? 'true' : 'false');
    }
    if (push && window.history.replaceState) {
      window.history.replaceState(null, '', value === 'all' ? window.location.pathname : '#' + value);
    }
  }

  if (chips.length && groups.length) {
    for (var j = 0; j < chips.length; j++) {
      chips[j].addEventListener('click', function (e) {
        e.preventDefault();
        applyFilter(this.getAttribute('data-filter'), true);
      });
    }
    var hash = decodeURIComponent((window.location.hash || '').replace(/^#/, ''));
    var known = false;
    for (var k = 0; k < groups.length; k++) {
      if (groups[k].getAttribute('data-group') === hash) known = true;
    }
    applyFilter(known ? hash : 'all', false);
  }

  /* ---- Nút sao chép cho khối mã --------------------------------------- */
  var blocks = document.querySelectorAll('.prose pre');
  for (var b = 0; b < blocks.length; b++) {
    (function (pre) {
      if (!navigator.clipboard) return;
      pre.addEventListener('dblclick', function () {
        navigator.clipboard.writeText(pre.innerText);
      });
    })(blocks[b]);
  }
  /* ---- Sao chép liên kết bài viết ------------------------------------- */
  var copyBtns = document.querySelectorAll('[data-action="copy-link"]');
  for (var m = 0; m < copyBtns.length; m++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        var url = window.location.href;
        var done = function () {
          var old = btn.textContent;
          btn.textContent = btn.getAttribute('data-done') || 'Đã sao chép';
          setTimeout(function () { btn.textContent = old; }, 1800);
        };
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(done, function () {});
        } else {
          var tmp = document.createElement('input');
          tmp.value = url; document.body.appendChild(tmp); tmp.select();
          try { document.execCommand('copy'); done(); } catch (e) {}
          document.body.removeChild(tmp);
        }
      });
    })(copyBtns[m]);
  }
})();
