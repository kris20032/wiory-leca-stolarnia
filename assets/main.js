// STOLBASZ — drobna interaktywność (nav mobile + reveal)
(function () {
  // mobilne menu
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // reveal przy scrollu
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { io.observe(el); });

  // lightbox dla galerii realizacji
  var lb = document.getElementById('lb');
  if (lb) {
    var lbimg = lb.querySelector('img');
    document.querySelectorAll('.gallery').forEach(function (g) {
      g.addEventListener('click', function (e) {
        var t = e.target.closest('.tile'); if (!t) return;
        var im = t.querySelector('img'); if (!im) return;
        lbimg.src = im.getAttribute('src'); lb.hidden = false; document.body.style.overflow = 'hidden';
      });
    });
    lb.addEventListener('click', function () { lb.hidden = true; lbimg.src = ''; document.body.style.overflow = ''; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lb.hidden) { lb.hidden = true; lbimg.src = ''; document.body.style.overflow = ''; } });
  }
})();
