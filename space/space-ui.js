(() => {
  const menu = document.getElementById('mobileMenu');
  menu.setAttribute('aria-label', window.spaceI18n?.lang === 'ar' ? 'أدوات العرض' : 'View controls');
  menu.addEventListener('click', () => {
    const open = document.body.classList.toggle('mobile-controls-open');
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? '×' : '☰';
  });
  const closeMobileMenu = () => {
    document.body.classList.remove('mobile-controls-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.textContent = '☰';
  };
  document.getElementById('bodies').addEventListener('click', closeMobileMenu);
  document.getElementById('c').addEventListener('pointerdown', closeMobileMenu);
  const info = document.getElementById('info');
  const toggle = document.getElementById('infoToggle');
  function compact(collapsed) {
    info.classList.toggle('collapsed', collapsed);
    toggle.setAttribute('aria-expanded', String(!collapsed));
    const label = collapsed ? 'Show planet details' : 'Collapse planet details';
    toggle.setAttribute('aria-label', window.spaceI18n?.t(label) || label);
    toggle.textContent = collapsed ? '+' : '−';
  }
  compact(true);
  toggle.addEventListener('click', () => compact(!info.classList.contains('collapsed')));
  document.getElementById('restoreUI').addEventListener('click', () => document.body.classList.remove('hide-ui'));
  document.querySelectorAll('button[title]').forEach(button => button.setAttribute('aria-label', button.title));
  const help = document.getElementById('help');
  const touchHint = document.createElement('div');
  touchHint.textContent = window.spaceI18n?.lang === 'ar' ? 'اسحب للدوران، وباعد بين إصبعين للتكبير، واضغط على كوكب للانتقال إليه.' : 'On touch screens: drag to orbit, pinch to zoom, and tap a planet below to travel.';
  touchHint.className = 'note';
  help.prepend(touchHint);
})();
