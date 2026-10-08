/* Reveal-on-scroll fallback + menu close. Content is fully visible without this file. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var native = window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');

  document.addEventListener('DOMContentLoaded', function () {
    var menu = document.getElementById('menu');
    if (menu && menu.hidePopover) {
      menu.addEventListener('click', function (e) {
        if (e.target.closest('a')) menu.hidePopover();
      });
    }

    if (native || reduce || !('IntersectionObserver' in window)) return;
    root.classList.add('js');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });
  });
})();
