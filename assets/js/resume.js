(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.getElementById('motion-toggle');
  let paused = reduced.matches;
  const reveals = [...document.querySelectorAll('.reveal')];
  function applyMotion() {
    root.classList.toggle('motion-paused', paused);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? '开启动效' : '暂停动效';
    if (paused) reveals.forEach(el => el.classList.add('visible'));
  }
  toggle.addEventListener('click', () => { paused = !paused; applyMotion(); });
  reduced.addEventListener('change', e => { paused = e.matches; applyMotion(); });
  if ('IntersectionObserver' in window) {
    root.classList.add('js-motion');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    reveals.forEach(el => observer.observe(el));
  }
  applyMotion();
  const light = document.querySelector('.pointer-light');
  const fine = matchMedia('(pointer:fine)');
  addEventListener('pointermove', e => {
    if (paused || !fine.matches) return;
    light.style.setProperty('--px', e.clientX + 'px');
    light.style.setProperty('--py', e.clientY + 'px');
  }, { passive: true });
  const progress = document.querySelector('.reading-progress');
  const chapters = [...document.querySelectorAll('.chapter')];
  const links = [...document.querySelectorAll('.chapter-nav a')];
  let scheduled = false;
  function updateScroll() {
    scheduled = false;
    const max = root.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
    let active = chapters[0];
    for (const section of chapters) if (section.getBoundingClientRect().top <= innerHeight * .45) active = section;
    links.forEach(a => { if (a.hash === '#' + active.id) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
  }
  addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
  addEventListener('resize', updateScroll);
  updateScroll();
  const count = document.querySelector('[data-count]');
  if (count && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      if (paused) return;
      const target = Number(count.dataset.count), start = performance.now();
      function frame(now) {
        const p = Math.min((now - start) / 1200, 1);
        count.textContent = paused ? target : Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1 && !paused) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }, { threshold: .6 });
    observer.observe(count);
  }
})();
