// ===================== Tasbih Counter =====================
document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
  }

  let count       = 0;
  let total       = 0;
  let target      = 33;
  let currentPhrase = 'سبحان الله';
  const history   = [];

  const counterEl    = document.getElementById('tasbihCounter');
  const totalEl      = document.getElementById('totalCount');
  const phraseEl     = document.getElementById('phraseDisplay');
  const progressBar  = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const historyList  = document.getElementById('historyList');
  const tasbihBtn    = document.getElementById('tasbihBtn');
  const phraseSelect = document.getElementById('tasbihPhrase');
  const customInput  = document.getElementById('customPhrase');
  const soundToggle  = document.getElementById('soundToggle');
  const vibrateToggle= document.getElementById('vibrateToggle');

  // AudioContext for click sound
  let audioCtx;
  function playClick() {
    if (!soundToggle.checked) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc  = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.15);
    } catch(e) {}
  }

  function vibrate() {
    if (vibrateToggle.checked && navigator.vibrate) navigator.vibrate(30);
  }

  function updateProgress() {
    if (target > 0) {
      progressBar.style.display = 'block';
      const pct = Math.min((count / target) * 100, 100);
      progressFill.style.width = pct + '%';
    } else {
      progressBar.style.display = 'none';
    }
  }

  function addToHistory(phrase, cnt) {
    history.unshift({ phrase, count: cnt, time: new Date().toLocaleTimeString('ar-SA') });
    renderHistory();
  }

  function renderHistory() {
    historyList.innerHTML = history.slice(0, 10).map(h =>
      `<div class="history-item">
        <span class="history-phrase">${h.phrase}</span>
        <span class="history-count">${h.count}</span>
        <span class="history-time">${h.time}</span>
      </div>`
    ).join('');
  }

  function increment() {
    count++;
    total++;
    counterEl.textContent = count;
    totalEl.textContent   = total;
    updateProgress();
    playClick();
    vibrate();

    // Animate button
    tasbihBtn.style.transform = 'scale(0.93)';
    setTimeout(() => { tasbihBtn.style.transform = ''; }, 120);

    if (target > 0 && count >= target) {
      addToHistory(currentPhrase, count);
      // Flash green
      tasbihBtn.style.background = 'linear-gradient(135deg,#16a34a,#15803d)';
      setTimeout(() => {
        tasbihBtn.style.background = '';
        count = 0;
        counterEl.textContent = '0';
        updateProgress();
      }, 800);
    }
  }

  tasbihBtn.addEventListener('click', increment);

  // Keyboard spacebar support
  document.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.key === ' ') { e.preventDefault(); increment(); }
  });

  // Phrase select
  phraseSelect.addEventListener('change', () => {
    if (phraseSelect.value === 'custom') {
      customInput.style.display = 'block';
      customInput.focus();
    } else {
      customInput.style.display = 'none';
      currentPhrase = phraseSelect.value;
      phraseEl.textContent = currentPhrase;
    }
  });

  customInput.addEventListener('input', () => {
    currentPhrase = customInput.value || 'ذكر مخصص';
    phraseEl.textContent = currentPhrase;
  });

  // Target buttons
  document.querySelectorAll('.target-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.target-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      target = parseInt(btn.dataset.val);
      updateProgress();
    });
  });
  document.querySelector('.target-btn[data-val="33"]')?.classList.add('active');

  // Reset current
  document.getElementById('resetCurrent').addEventListener('click', () => {
    if (count > 0) addToHistory(currentPhrase, count);
    count = 0;
    counterEl.textContent = '0';
    updateProgress();
  });

  // Reset all
  document.getElementById('resetAll').addEventListener('click', () => {
    if (count > 0) addToHistory(currentPhrase, count);
    count = 0; total = 0;
    counterEl.textContent = '0';
    totalEl.textContent   = '0';
    updateProgress();
    history.length = 0;
    renderHistory();
  });
});
