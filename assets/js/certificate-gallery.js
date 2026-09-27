(() => {
  const gallery = document.querySelector('[data-certificate-gallery]');
  if (!gallery) return;
  const track = gallery.querySelector('.certificate-track');
  const cards = [...track.querySelectorAll('[data-certificate]')];
  const links = cards.map(card => card.querySelector('.certificate-open'));
  const play = gallery.querySelector('[data-gallery-play]');
  const status = gallery.querySelector('[data-gallery-status]');
  const announcement = gallery.querySelector('[data-gallery-announcement]');
  const dialog = document.querySelector('.certificate-dialog');
  const stage = dialog.querySelector('.certificate-image-stage');
  const image = dialog.querySelector('[data-viewer-image]');
  const zoom = dialog.querySelector('[data-viewer-zoom]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, viewerIndex = 0, timer = null, visible = false, hovering = false;
  let userPaused = false, focused = false, drag = null, suppressClick = false, returnFocus = null;
  gallery.classList.add('is-enhanced');
  const motionPaused = () => reduced.matches || document.documentElement.classList.contains('motion-paused');
  const position = card => card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft - 4;
  function show(next, announce = false) {
    index = (next + cards.length) % cards.length;
    track.scrollTo({left: Math.max(0, position(cards[index])), behavior: motionPaused() ? 'auto' : 'smooth'});
    if (status) status.textContent = `${index + 1} / ${cards.length}`;
    if (announce && announcement) announcement.textContent = `${index + 1} / ${cards.length}，${links[index].dataset.title}`;
  }
  function refreshTimer() {
    clearTimeout(timer);
    const paused = userPaused || motionPaused();
    if (play) { play.textContent = motionPaused() ? '动效已暂停' : paused ? '播放轮播' : '暂停轮播'; play.disabled = motionPaused(); play.setAttribute('aria-pressed', String(paused)); }
    if (!paused && visible && !hovering && !focused && !dialog.open && !document.hidden && !drag) {
      timer = setTimeout(() => {
        const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 5;
        show(atEnd ? 0 : index + 1);
        refreshTimer();
      }, 1000);
    }
  }
  function manual(next) { userPaused = true; show(next, true); refreshTimer(); }
  gallery.querySelector('[data-gallery-prev]')?.addEventListener('click', () => manual(index - 1));
  gallery.querySelector('[data-gallery-next]')?.addEventListener('click', () => manual(track.scrollLeft >= track.scrollWidth - track.clientWidth - 5 ? 0 : index + 1));
  play?.addEventListener('click', () => {
    if (motionPaused()) {
      userPaused = true;
      if (announcement) announcement.textContent = '全站动效或系统减少动态效果已开启，可继续手动翻阅证书。';
    } else userPaused = !userPaused;
    refreshTimer();
  });
  let scrollFrame;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      let nearest = 0, distance = Infinity;
      cards.forEach((card, i) => { const delta = Math.abs(position(card) - track.scrollLeft); if (delta < distance) { distance = delta; nearest = i; } });
      index = nearest;if (status) status.textContent = `${index + 1} / ${cards.length}`;
    });
  }, {passive: true});
  track.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 5;
    manual(event.key === 'Home' ? 0 : event.key === 'End' ? cards.length - 1 : event.key === 'ArrowRight' && atEnd ? 0 : index + (event.key === 'ArrowRight' ? 1 : -1));
    if (event.target.closest('.certificate-open')) links[index].focus({preventScroll: true});
  });
  track.addEventListener('wheel', () => {userPaused = true;refreshTimer();}, {passive: true});
  track.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    userPaused = true;refreshTimer();suppressClick = false;
    if (event.pointerType === 'mouse') drag = {x:event.clientX,left:track.scrollLeft,id:event.pointerId,moved:false};
  });
  track.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const delta = event.clientX - drag.x;
    if (Math.abs(delta) > 6 && !drag.moved) {drag.moved = true;track.setPointerCapture(drag.id);track.classList.add('is-dragging');}
    if (drag.moved) {track.scrollLeft = drag.left - delta;event.preventDefault();}
  });
  function stopDrag() {
    if (!drag) return;
    suppressClick = drag.moved;
    if (track.hasPointerCapture(drag.id)) track.releasePointerCapture(drag.id);
    drag = null;track.classList.remove('is-dragging');refreshTimer();
    if (suppressClick) {show(index);setTimeout(() => {suppressClick = false;}, 0);}
  }
  track.addEventListener('pointerup', stopDrag);track.addEventListener('pointercancel', stopDrag);
  track.addEventListener('dragstart', event => event.preventDefault());
  gallery.addEventListener('pointerenter', event => {if (event.pointerType === 'mouse') {hovering = true;refreshTimer();}});
  gallery.addEventListener('pointerleave', () => {hovering = false;refreshTimer();});
  gallery.addEventListener('focusin', () => {focused = true;refreshTimer();});
  gallery.addEventListener('focusout', event => {focused = gallery.contains(event.relatedTarget);refreshTimer();});
  new IntersectionObserver(entries => {visible = entries[0].isIntersecting;refreshTimer();}, {threshold:.15}).observe(gallery);
  new MutationObserver(refreshTimer).observe(document.documentElement, {attributes:true,attributeFilter:['class']});
  reduced.addEventListener('change', refreshTimer);document.addEventListener('visibilitychange', refreshTimer);
  function resetZoom() {stage.classList.remove('is-zoomed');zoom.textContent = '放大细看';zoom.setAttribute('aria-pressed','false');stage.scrollTo(0,0);}
  function setImage(next) {
    viewerIndex = (next + links.length) % links.length;
    const link = links[viewerIndex];resetZoom();
    image.src = link.href;image.alt = `${link.dataset.period} · ${link.dataset.title}`;
    image.style.setProperty('--certificate-zoom-width', `${Math.max(1200, Math.min(2200, Number(link.querySelector('img').getAttribute('width')) || 1600))}px`);
    dialog.querySelector('#certificate-dialog-title').textContent = link.dataset.title;
    dialog.querySelector('#certificate-dialog-meta').textContent = `${link.dataset.period} · ${link.dataset.kind}`;
    dialog.querySelector('[data-viewer-count]').textContent = `${viewerIndex + 1} / ${links.length}`;
    dialog.querySelector('[data-viewer-original]').href = link.href;
  }
  links.forEach((link, i) => link.addEventListener('click', event => {
    if (suppressClick) {event.preventDefault();return;}
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
    event.preventDefault();returnFocus = link;setImage(i);dialog.showModal();document.body.classList.add('certificate-viewer-open');
    dialog.querySelector('[data-viewer-close]').focus();refreshTimer();
  }));
  dialog.querySelector('[data-viewer-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {if (event.target === dialog) {const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close', () => {document.body.classList.remove('certificate-viewer-open');resetZoom();if(returnFocus)returnFocus.focus({preventScroll:true});refreshTimer();});
  dialog.querySelector('[data-viewer-prev]').addEventListener('click', () => setImage(viewerIndex - 1));
  dialog.querySelector('[data-viewer-next]').addEventListener('click', () => setImage(viewerIndex + 1));
  dialog.addEventListener('keydown', event => {if(stage.classList.contains('is-zoomed'))return;if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();setImage(viewerIndex+(event.key==='ArrowRight'?1:-1));}});
  function toggleZoom() {const expanded=stage.classList.toggle('is-zoomed');zoom.textContent=expanded?'适应屏幕':'放大细看';zoom.setAttribute('aria-pressed',String(expanded));}
  zoom.addEventListener('click', toggleZoom);image.addEventListener('click', toggleZoom);
  refreshTimer();
})();

