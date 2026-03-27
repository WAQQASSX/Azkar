// ===================== Quran Page =====================
document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
  }

  const surahListEl   = document.getElementById('surahList');
  const surahSearch   = document.getElementById('surahSearch');
  const ayatContainer = document.getElementById('ayatContainer');
  const surahHeader   = document.getElementById('surahHeader');
  const qFontRange    = document.getElementById('qFontRange');
  const qFontVal      = document.getElementById('qFontVal');
  const qPlayBtn      = document.getElementById('qPlayBtn');
  const quranAudio    = document.getElementById('quranAudio');
  let allSurahs       = [];
  let currentSurah    = null;
  let showTafsir      = false;

  // Fetch surah list
  fetch('https://api.alquran.cloud/v1/surah')
    .then(r => r.json())
    .then(data => {
      allSurahs = data.data;
      renderSurahList(allSurahs);
    })
    .catch(() => {
      surahListEl.innerHTML = '<p style="color:#ef4444;padding:1rem">تعذر تحميل قائمة السور. تحقق من الإنترنت.</p>';
    });

  function renderSurahList(surahs) {
    surahListEl.innerHTML = surahs.map(s => `
      <div class="surah-item" data-num="${s.number}" id="si-${s.number}">
        <span class="surah-number">${s.number}</span>
        <div class="surah-meta">
          <strong>${s.name}</strong>
          <small>${s.englishName} — ${s.numberOfAyahs} آية</small>
        </div>
      </div>`).join('');

    surahListEl.querySelectorAll('.surah-item').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.surah-item').forEach(x => x.classList.remove('active'));
        el.classList.add('active');
        loadSurah(parseInt(el.dataset.num));
      });
    });
  }

  function loadSurah(num) {
    currentSurah = num;
    ayatContainer.innerHTML = '<div style="text-align:center;padding:3rem"><i class="fas fa-spinner fa-spin fa-2x" style="color:var(--accent-color)"></i></div>';
    surahHeader.innerHTML   = '';

    // Load verse-by-verse in Arabic
    fetch(`https://api.alquran.cloud/v1/surah/${num}/ar.alafasy`)
      .then(r => r.json())
      .then(data => {
        const s = data.data;
        surahHeader.innerHTML = `
          <h2 style="font-family:'Amiri',serif;font-size:2rem">${s.name}</h2>
          <p style="color:var(--text-secondary)">${s.englishName} — ${s.numberOfAyahs} آية — ${s.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</p>`;

        const bismillah = (num !== 1 && num !== 9)
          ? '<div style="text-align:center;font-family:Amiri,serif;font-size:2.5rem;color:var(--gold-accent);margin:1.5rem 0">﷽</div>'
          : '';

        ayatContainer.innerHTML = bismillah + s.ayahs.map(a => `
          <div class="ayah-block" id="a-${a.numberInSurah}">
            <span class="ayah-num">${a.numberInSurah}</span>
            <span class="ayah-text" style="font-size:${qFontRange.value}px">${a.text}</span>
          </div>`).join('');
      })
      .catch(() => {
        ayatContainer.innerHTML = '<p style="color:#ef4444;padding:2rem">تعذر تحميل السورة.</p>';
      });

    // Audio
    const padded = String(num).padStart(3, '0');
    quranAudio.src = `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${padded}.mp3`;
    quranAudio.style.display = 'block';
  }

  // Font size control
  if (qFontRange) {
    qFontRange.addEventListener('input', () => {
      qFontVal.textContent = qFontRange.value;
      document.querySelectorAll('.ayah-text').forEach(el => {
        el.style.fontSize = qFontRange.value + 'px';
      });
    });
  }

  // Play button
  if (qPlayBtn) {
    qPlayBtn.addEventListener('click', () => {
      if (quranAudio.paused) { quranAudio.play(); qPlayBtn.innerHTML = '<i class="fas fa-pause"></i> إيقاف'; }
      else { quranAudio.pause(); qPlayBtn.innerHTML = '<i class="fas fa-play"></i> تلاوة'; }
    });
  }

  // Surah search
  if (surahSearch) {
    surahSearch.addEventListener('input', () => {
      const q = surahSearch.value.trim();
      const filtered = allSurahs.filter(s => s.name.includes(q) || s.englishName.toLowerCase().includes(q.toLowerCase()));
      renderSurahList(filtered);
    });
  }
});
