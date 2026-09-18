(() => {
  const button = document.querySelector('#motion');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const runners = [...document.querySelectorAll('.runner')];
  let paused = preference.matches, contentContext, petContext, resizeTimer;
  function animatePets() {
    petContext?.revert();
    if (paused || !window.gsap) return;
    petContext = gsap.context(() => {
      const viewport = window.visualViewport;
      const width = viewport?.width || document.documentElement.clientWidth;
      const height = viewport?.height || document.documentElement.clientHeight;
      const size = runners[0]?.offsetWidth || 30;
      const left = (viewport?.offsetLeft || 0) + 2;
      const top = (viewport?.offsetTop || 0) + 2;
      const right = left + Math.max(0, width - size - 4);
      const bottom = top + Math.max(0, height - size - 4);
      const horizontal = Math.max(2, (right - left) / 80);
      const vertical = Math.max(2, (bottom - top) / 80);
      runners.forEach((runner, index) => {
        gsap.set(runner, {x:left, y:top, rotation:0, visibility:'visible'});
        const route = gsap.timeline({repeat:-1, defaults:{ease:'none'}});
        route.to(runner,{x:right,duration:horizontal})
          .set(runner,{rotation:90})
          .to(runner,{y:bottom,duration:vertical})
          .set(runner,{rotation:180})
          .to(runner,{x:left,duration:horizontal})
          .set(runner,{rotation:270})
          .to(runner,{y:top,duration:vertical})
          .set(runner,{rotation:0});
        route.progress(index ? .07 : 0);
      });
    });
  }
  function motion() {
    contentContext?.revert();
    petContext?.revert();
    document.body.classList.toggle('paused', paused);
    button.setAttribute('aria-pressed', String(paused));
    const label = paused ? 'Ativar todas as animações' : 'Pausar todas as animações';
    button.setAttribute('aria-label', label);
    button.title = button.getAttribute('aria-label');
    button.textContent = paused ? '▷' : 'Ⅱ';
    document.documentElement.style.scrollBehavior = paused ? 'auto' : 'smooth';
    if (paused || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    contentContext = gsap.context(() => {
      gsap.from('.hero-content h1 > *', {y:25,opacity:0,duration:1.1,stagger:.12,ease:'power3.out'});
      gsap.from('.hero-content .role,.hero-content .actions', {y:12,opacity:0,duration:.9,stagger:.12,delay:.25});
      gsap.to('.workspace', {scale:1.07,duration:16,repeat:-1,yoyo:true,ease:'sine.inOut'});
      gsap.utils.toArray('.reveal').forEach(el => gsap.from(el, {y:24,opacity:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}}));
      gsap.from('.tech-rail,.mini-line', {scaleX:0,stagger:.1,duration:1,transformOrigin:'left',ease:'power2.out',scrollTrigger:{trigger:'.tech-list',start:'top 85%',once:true}});
      gsap.from('.timeline-node', {scale:.5,opacity:0,stagger:.15,duration:.7,ease:'back.out(1.5)',scrollTrigger:{trigger:'.timeline',start:'top 85%',once:true}});
      gsap.to('.scroll-progress', {scaleX:1,ease:'none',scrollTrigger:{trigger:document.documentElement,start:'top top',end:'bottom bottom',scrub:.2}});
    });
    animatePets();
  }
  button.addEventListener('click', () => {paused=!paused;motion()});
  preference.addEventListener('change', e => {paused=e.matches;motion()});
  const updatePetBounds = () => {cancelAnimationFrame(resizeTimer);resizeTimer=requestAnimationFrame(animatePets)};
  window.addEventListener('resize', updatePetBounds);
  window.visualViewport?.addEventListener('resize', updatePetBounds);
  window.visualViewport?.addEventListener('scroll', updatePetBounds);
  if (matchMedia('(hover: hover)').matches) document.querySelectorAll('.project').forEach(card => {
    card.addEventListener('pointermove', e => {const r=card.getBoundingClientRect();card.style.setProperty('--pointer-x',`${e.clientX-r.left}px`);card.style.setProperty('--pointer-y',`${e.clientY-r.top}px`)});
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
