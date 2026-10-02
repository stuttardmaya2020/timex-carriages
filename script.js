document.documentElement.classList.add('js');

// If a photo fails to load, show the car's name in its frame instead of a broken image
document.querySelectorAll('.photo img').forEach(function (img) {
  var frame = img.parentElement;
  frame.setAttribute('data-label', img.alt);
  function missing() { frame.classList.add('is-missing'); }
  if (img.complete && img.naturalWidth === 0 && img.currentSrc) missing();
  img.addEventListener('error', missing);
});

// Fade sections in as they scroll into view; anything already on screen stays as is
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.remove('pre'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.section .wrap > *, .pillars-grid > div').forEach(function (el) {
    if (el.getBoundingClientRect().top > window.innerHeight) {
      el.classList.add('fade', 'pre');
      io.observe(el);
    }
  });
})();

document.getElementById('year').textContent = new Date().getFullYear();
