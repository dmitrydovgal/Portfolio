(() => {
  const screen = document.querySelector('#site-preloader');
  if (!screen) return;

  const cameFromCasePage = (() => {
    try {
      return new URL(document.referrer).pathname.toLowerCase().endsWith('/case.html');
    } catch {
      return false;
    }
  })();
  const skipForThisVisit = new URLSearchParams(window.location.search).has('skipPreloader') || cameFromCasePage;
  if (skipForThisVisit) {
    screen.remove();
    return;
  }

  const visitKey = 'portfolio-preloader-seen';
  let hasSeenPreloader = false;
  try {
    hasSeenPreloader = sessionStorage.getItem(visitKey) === '1';
    if (!hasSeenPreloader) sessionStorage.setItem(visitKey, '1');
  } catch {
    // The preloader still works if browser storage is unavailable.
  }

  if (hasSeenPreloader) {
    screen.remove();
    return;
  }

  document.body.classList.add('is-preloading');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const holdMs = reducedMotion ? 300 : 1200;
  const openMs = reducedMotion ? 100 : 800;

  window.setTimeout(() => {
    screen.classList.add('is-opening');
    window.setTimeout(() => {
      screen.remove();
      document.body.classList.remove('is-preloading');
    }, openMs);
  }, holdMs);
})();
