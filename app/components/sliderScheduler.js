const MAX_CONCURRENT = 2;
const TRANSITION_MS = 2000;
const MIN_GAP = 3000;
const MAX_GAP = 5000;

const subscribers = new Set();
let lastPicked = new Set();
let running = false;
let timer = null;
let reducedMotion = false;

if (typeof window !== 'undefined') {
  reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
}

function randomGap() {
  return MIN_GAP + Math.random() * (MAX_GAP - MIN_GAP);
}

function pickNext() {
  const eligible = [...subscribers].filter((s) => s.visible && s.imageCount > 1 && !lastPicked.has(s));
  if (eligible.length === 0) {
    lastPicked.clear();
    const fallback = [...subscribers].filter((s) => s.visible && s.imageCount > 1);
    if (fallback.length === 0) return [];
    const shuffled = fallback.sort(() => Math.random() - 0.5);
    const batch = Math.min(MAX_CONCURRENT, Math.max(1, Math.ceil(Math.random() * MAX_CONCURRENT)));
    return shuffled.slice(0, batch);
  }

  const shuffled = eligible.sort(() => Math.random() - 0.5);
  const batch = Math.min(MAX_CONCURRENT, Math.max(1, Math.ceil(Math.random() * MAX_CONCURRENT)));
  return shuffled.slice(0, batch);
}

function loop() {
  if (reducedMotion) return;

  const targets = pickNext();
  lastPicked = new Set(targets);
  targets.forEach((s) => s.advance());

  const wait = TRANSITION_MS + randomGap();
  timer = setTimeout(loop, wait);
}

function start() {
  if (running || reducedMotion) return;
  running = true;
  timer = setTimeout(loop, 2000 + Math.random() * 3000);
}

function stop() {
  running = false;
  clearTimeout(timer);
}

function checkActivity() {
  const hasVisible = [...subscribers].some((s) => s.visible && s.imageCount > 1);
  if (hasVisible && !running) start();
  if (!hasVisible && running) stop();
}

export function register(subscriber) {
  subscribers.add(subscriber);
  checkActivity();
  return () => {
    subscribers.delete(subscriber);
    lastPicked.delete(subscriber);
    checkActivity();
  };
}

export function setVisible(subscriber, isVisible) {
  subscriber.visible = isVisible;
  checkActivity();
}
