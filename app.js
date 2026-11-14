// Animações em JavaScript puro (IntersectionObserver + Web Animations API), sem bibliotecas externas.
(() => {
  const button = document.querySelector('#motion');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const runners = [...document.querySelectorAll('.runner')];
  const progress = document.querySelector('.scroll-progress');
  let paused = preference.matches, petAnimations = [], resizeTimer, progressScheduled = false;

  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }), {rootMargin: '0px 0px -6% 0px'})
    : null;

  function stopPets() {
    petAnimations.forEach(animation => animation.cancel());
    petAnimations = [];
    runners.forEach(runner => {runner.style.visibility = ''});
  }

  // Os mascotes percorrem as bordas da janela em sentido horário.
  function animatePets() {
    stopPets();
    if (paused || !runners.length || !runners[0].animate) return;
    const viewport = window.visualViewport;
    const width = viewport?.width || document.documentElement.clientWidth;
    const height = viewport?.height || document.documentElement.clientHeight;
    const size = runners[0].offsetWidth || 30;
    const left = (viewport?.offsetLeft || 0) + 2;
    const top = (viewport?.offsetTop || 0) + 2;
    const right = left + Math.max(0, width - size - 4);
    const bottom = top + Math.max(0, height - size - 4);
    const horizontal = Math.max(2, (right - left) / 80);
    const vertical = Math.max(2, (bottom - top) / 80);
    const total = 2 * (horizontal + vertical);
    const at = (x, y, rotation, offset) => ({transform: `translate(${x}px,${y}px) rotate(${rotation}deg)`, offset});
    const a = horizontal / total, b = (horizontal + vertical) / total, c = (2 * horizontal + vertical) / total;
    const route = [
      at(left, top, 0, 0), at(right, top, 0, a),
      at(right, top, 90, a), at(right, bottom, 90, b),
      at(right, bottom, 180, b), at(left, bottom, 180, c),
      at(left, bottom, 270, c), at(left, top, 270, 1)
    ];
    runners.forEach((runner, index) => {
      runner.style.visibility = 'visible';
      const animation = runner.animate(route, {duration: total * 1000, iterations: Infinity, easing: 'linear'});
      if (index) animation.currentTime = total * 1000 * .07;
      petAnimations.push(animation);
    });
  }

  function updateProgress() {
    progressScheduled = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${paused || max <= 0 ? 0 : Math.min(1, scrollY / max)})`;
  }

  function motion() {
    document.body.classList.toggle('paused', paused);
    document.body.classList.toggle('motion-on', !paused);
    button.setAttribute('aria-pressed', String(paused));
    const label = paused ? 'Ativar todas as animações' : 'Pausar todas as animações';
    button.setAttribute('aria-label', label);
    button.title = label;
    button.textContent = paused ? '▷' : 'Ⅱ';
    document.documentElement.style.scrollBehavior = paused ? 'auto' : 'smooth';
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => {
      if (paused || !revealObserver) revealObserver?.unobserve(el);
      else revealObserver.observe(el);
    });
    if (!revealObserver) document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    updateProgress();
    animatePets();
  }

  button.addEventListener('click', () => {paused = !paused; motion()});
  preference.addEventListener('change', e => {paused = e.matches; motion()});
  const updatePetBounds = () => {cancelAnimationFrame(resizeTimer); resizeTimer = requestAnimationFrame(animatePets)};
  const scheduleProgress = () => {if (!progressScheduled) {progressScheduled = true; requestAnimationFrame(updateProgress)}};
  addEventListener('scroll', scheduleProgress, {passive: true});
  addEventListener('resize', () => {updatePetBounds(); scheduleProgress()});
  window.visualViewport?.addEventListener('resize', updatePetBounds);
  window.visualViewport?.addEventListener('scroll', updatePetBounds);
  if (matchMedia('(hover: hover)').matches) document.querySelectorAll('.project').forEach(card => {
    card.addEventListener('pointermove', e => {const r = card.getBoundingClientRect(); card.style.setProperty('--pointer-x', `${e.clientX - r.left}px`); card.style.setProperty('--pointer-y', `${e.clientY - r.top}px`)});
  });
  motion();
})();
(() => {
  const sections = [...document.querySelectorAll('main > section[id]')];
  const links = [...document.querySelectorAll('.site-header a')];
  let scheduled = false;
  function updateNavigation() {
    const threshold = Math.min(160, innerHeight * .25);
    let active = sections[0]?.id;
    for (const section of sections) if (section.getBoundingClientRect().top <= threshold) active = section.id;
    links.forEach(link => {
      if (link.hash === '#' + active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  }
  addEventListener('scroll', () => {if (!scheduled) {scheduled = true; requestAnimationFrame(updateNavigation)}}, {passive:true});
  addEventListener('resize', updateNavigation);
  addEventListener('load', updateNavigation);
  updateNavigation();
})();
