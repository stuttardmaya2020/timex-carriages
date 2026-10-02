document.documentElement.classList.add('js');

// Live London clock in the hero
(function () {
  var hm = document.getElementById('clock-hm');
  var sec = document.getElementById('clock-s');
  var zone = document.getElementById('clock-zone');
  if (!hm) return;
  var fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZoneName: 'short'
  });
  function tick() {
    var parts = {};
    fmt.formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    hm.textContent = parts.hour + ':' + parts.minute;
    sec.textContent = parts.second;
    if (parts.timeZoneName) zone.textContent = parts.timeZoneName;
  }
  tick();
  setInterval(tick, 1000);
})();

// Header background once the page scrolls
(function () {
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 20); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Fleet filter
(function () {
  var buttons = document.querySelectorAll('.fleet-filter button');
  var cars = document.querySelectorAll('.car');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.dataset.filter;
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      cars.forEach(function (car) {
        var types = car.dataset.type.split(' ');
        var show = f === 'all' || types.indexOf(f) > -1 || types.indexOf('request') > -1;
        car.classList.toggle('is-hidden', !show);
      });
    });
  });
})();

// Gentle entrance for sections below the fold; anything already on screen stays put
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.remove('pre'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (el) {
    if (el.getBoundingClientRect().top > window.innerHeight) {
      el.classList.add('pre');
      io.observe(el);
    }
  });
})();

document.getElementById('year').textContent = new Date().getFullYear();
