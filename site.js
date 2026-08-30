const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.section-head, .project, .about > *, .contact > *');

revealItems.forEach((item) => item.classList.add('reveal-motion'));

if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in'));
}

const cursor = document.querySelector('.cursor');
const cursorLabel = document.querySelector('.cursor-label');
if (!reduceMotion && matchMedia('(pointer: fine)').matches) {
  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let cx = x;
  let cy = y;
  addEventListener('pointermove', (event) => {
    x = event.clientX;
    y = event.clientY;
    cursor.style.opacity = '1';
  }, { passive: true });
  const draw = () => {
    cx += (x - cx) * 0.18;
    cy += (y - cy) * 0.18;
    const position = `translate(${cx}px, ${cy}px)`;
    cursor.style.transform = `${position} translate(-50%, -50%)`;
    cursorLabel.style.transform = `${position} translate(-50%, -50%)`;
    requestAnimationFrame(draw);
  };
  draw();
  document.querySelectorAll('.project').forEach((project) => {
    project.addEventListener('pointerenter', () => document.body.classList.add('project-hover'));
    project.addEventListener('pointerleave', () => document.body.classList.remove('project-hover'));
  });
}
