const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;

const reveals = document.querySelectorAll('.section-head, .project, .about > *, .contact > *');
reveals.forEach((el) => el.classList.add('in'));

let scrollVelocity = 0;
let lastScrollY = scrollY;
let lastScrollTime = performance.now();
const trackNativeVelocity = () => {
  const now = performance.now();
  const elapsed = Math.max(1, now - lastScrollTime);
  scrollVelocity = Math.max(-2, Math.min(2, ((scrollY - lastScrollY) / elapsed) * .32));
  lastScrollY = scrollY;
  lastScrollTime = now;
};
addEventListener('scroll', trackNativeVelocity, { passive: true });
const decayVelocity = () => {
  scrollVelocity *= .9;
  requestAnimationFrame(decayVelocity);
};
decayVelocity();

const readout = document.getElementById('scrollReadout');
const stretchTitle = document.querySelector('[data-stretch]');
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  const progress = max > 0 ? scrollY / max : 0;
  if (readout) readout.textContent = String(Math.round(progress * 100)).padStart(3, '0');
  stretchTitle?.style.setProperty('--stretch', `${100 + Math.min(12, progress * 20)}%`);
}, { passive: true });

const cursor = document.querySelector('.cursor');
const cursorLabel = document.querySelector('.cursor-label');
if (!reduced && finePointer && cursor) {
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, snap = null;
  addEventListener('pointermove', (event) => { x = event.clientX; y = event.clientY; cursor.style.opacity = '1'; }, { passive: true });
  const drawCursor = () => {
    const tx = snap ? snap.left + snap.width / 2 : x;
    const ty = snap ? snap.top + snap.height / 2 : y;
    cx += (tx - cx) * (snap ? .22 : .18); cy += (ty - cy) * (snap ? .22 : .18);
    const move = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    cursor.style.transform = move; cursorLabel.style.transform = move;
    requestAnimationFrame(drawCursor);
  };
  drawCursor();
  document.querySelectorAll('.project').forEach((el) => {
    el.addEventListener('pointerenter', () => document.body.classList.add('project-hover'));
    el.addEventListener('pointerleave', () => document.body.classList.remove('project-hover'));
  });
  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('pointerenter', () => { snap = el.getBoundingClientRect(); });
    el.addEventListener('pointerleave', () => { snap = null; });
  });
}

const transitionPanel = document.querySelector('.page-transition');
document.querySelectorAll('.project').forEach((project) => project.addEventListener('click', (event) => {
  if (reduced || !transitionPanel) return;
  event.preventDefault();
  const rect = project.getBoundingClientRect();
  Object.assign(transitionPanel.style, { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
  transitionPanel.classList.add('active');
  setTimeout(() => { location.href = project.href; }, 610);
}));

const copyDiscord = document.getElementById('copyDiscord');
copyDiscord?.addEventListener('click', async () => {
  const label = copyDiscord.querySelector('strong');
  try {
    await navigator.clipboard.writeText('kp9b');
    label.textContent = 'COPIED';
    setTimeout(() => { label.textContent = 'KP9B'; }, 1200);
  } catch { label.textContent = 'KP9B'; }
});

const soundToggle = document.getElementById('soundToggle');
let soundEnabled = true;
let audioContext = null;
let lastNoteAt = 0;
const pianoScale = [130.81, 146.83, 164.81, 196, 220, 261.63, 293.66, 329.63];
const ensureAudio = () => {
  if (!soundEnabled) return null;
  audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
};
const playScrollNote = () => {
  const now = performance.now();
  if (!soundEnabled || now - lastNoteAt < 105) return;
  const context = ensureAudio();
  if (!context) return;
  lastNoteAt = now;
  const index = Math.abs(Math.floor(scrollY / 150)) % pianoScale.length;
  const master = context.createGain();
  const low = context.createBiquadFilter();
  low.type = 'lowpass'; low.frequency.value = 1800;
  master.gain.setValueAtTime(.0001, context.currentTime);
  master.gain.exponentialRampToValueAtTime(.045, context.currentTime + .008);
  master.gain.exponentialRampToValueAtTime(.0001, context.currentTime + .62);
  low.connect(master).connect(context.destination);
  [1, 2].forEach((harmonic, i) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = i ? 'sine' : 'triangle';
    osc.frequency.value = pianoScale[index] * harmonic;
    gain.gain.value = i ? .14 : .7;
    osc.connect(gain).connect(low);
    osc.start(); osc.stop(context.currentTime + .65);
  });
};
addEventListener('wheel', () => { ensureAudio(); playScrollNote(); }, { passive: true });
addEventListener('touchstart', ensureAudio, { passive: true });
addEventListener('scroll', playScrollNote, { passive: true });
soundToggle?.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundToggle.setAttribute('aria-pressed', String(soundEnabled));
  soundToggle.textContent = `SOUND / ${soundEnabled ? 'ON' : 'OFF'}`;
  if (soundEnabled) ensureAudio();
});

const canvas = document.getElementById('portraitShader');
const source = document.getElementById('portraitSource');
if (!reduced && canvas && source) {
  const initShader = () => {
    const gl = canvas.getContext('webgl', { alpha: false, antialias: true });
    if (!gl) return;
    const compile = (type, code) => { const shader = gl.createShader(type); gl.shaderSource(shader, code); gl.compileShader(shader); return shader; };
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, 'attribute vec2 p;varying vec2 v;void main(){v=(p+1.0)*.5;gl_Position=vec4(p,0.,1.);}'));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, 'precision mediump float;varying vec2 v;uniform sampler2D tex;uniform float t;uniform float vel;uniform vec2 mouse;void main(){vec2 uv=v;float force=.22+min(abs(vel),2.0);float wave=sin(uv.y*18.0+t*1.8+mouse.x*3.0)*.006*force;float wiggle=sin(t*1.25+uv.y*7.0)*.0025;float bend=(uv.y-.5)*.018*vel;uv.x+=wave+wiggle+bend+(mouse.x-.5)*.015;uv.y+=cos(uv.x*12.0+t)*.0035*force;float split=.002+(.004*abs(vel));float r=texture2D(tex,uv+vec2(split,0.)).r;float g=texture2D(tex,uv).g;float b=texture2D(tex,uv-vec2(split,0.)).b;vec3 col=vec3(r,g,b);float gray=dot(col,vec3(.299,.587,.114));col=mix(vec3(gray),col,.3+min(abs(vel),1.0)*.7);gl_FragColor=vec4(col,1.);}'));
    gl.linkProgram(program); gl.useProgram(program);
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program,'p'); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    const texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D,texture); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR); gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);
    const timeU=gl.getUniformLocation(program,'t'), velocityU=gl.getUniformLocation(program,'vel'), mouseU=gl.getUniformLocation(program,'mouse');
    let mx=.5,my=.5; canvas.parentElement.addEventListener('pointermove',(e)=>{const r=canvas.getBoundingClientRect();mx=(e.clientX-r.left)/r.width;my=1-(e.clientY-r.top)/r.height;});
    const render=(time)=>{const dpr=Math.min(devicePixelRatio,2),w=Math.round(canvas.clientWidth*dpr),h=Math.round(canvas.clientHeight*dpr);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h)}gl.uniform1f(timeU,time*.001);gl.uniform1f(velocityU,Math.max(-2,Math.min(2,scrollVelocity)));gl.uniform2f(mouseU,mx,my);gl.drawArrays(gl.TRIANGLES,0,6);requestAnimationFrame(render)};
    source.style.opacity='0'; requestAnimationFrame(render);
  };
  if (source.complete) initShader(); else source.addEventListener('load', initShader, { once: true });
}
