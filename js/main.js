// ===================== Navigation =====================
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Live clock
  const heroTime = document.getElementById('heroTime');
  function updateClock() {
    const now = new Date();
    if (heroTime) {
      heroTime.textContent = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Hijri date
  const hijriEl     = document.getElementById('hijriDate');
  const gregorianEl = document.getElementById('gregorianDate');
  if (hijriEl) {
    const now = new Date();
    hijriEl.textContent   = now.toLocaleDateString('ar-SA-u-ca-islamic', { year: 'numeric', month: 'long', day: 'numeric' });
    gregorianEl.textContent = now.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
  }

  // Daily Hadith (embedded fallback data)
  const hadiths = [
    { text: 'إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى', source: 'صحيح البخاري' },
    { text: 'المسلم من سلم المسلمون من لسانه ويده', source: 'صحيح البخاري' },
    { text: 'لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه', source: 'صحيح البخاري' },
    { text: 'من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت', source: 'صحيح البخاري' },
    { text: 'ابتسامتك في وجه أخيك صدقة', source: 'سنن الترمذي' },
    { text: 'الطهور شطر الإيمان', source: 'صحيح مسلم' },
    { text: 'خير الناس أنفعهم للناس', source: 'صحيح الجامع' },
    { text: 'الدين النصيحة', source: 'صحيح مسلم' },
    { text: 'من صلى الفجر فهو في ذمة الله', source: 'صحيح مسلم' },
    { text: 'اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها، وخالق الناس بخلق حسن', source: 'سنن الترمذي' },
  ];

  const dailyEl = document.getElementById('dailyHadith');
  if (dailyEl) {
    const idx = new Date().getDate() % hadiths.length;
    const h = hadiths[idx];
    dailyEl.innerHTML = `
      <blockquote style="font-family:'Amiri',serif;font-size:1.6rem;color:#fff;line-height:2;margin-bottom:1rem">
        "${h.text}"
      </blockquote>
      <cite style="color:var(--accent-color);font-size:1.1rem">رواه ${h.source}</cite>
    `;
  }

  // Quick prayer times via geolocation on index page
  const prayerQuick = document.getElementById('prayerQuick');
  if (prayerQuick && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=4`)
        .then(r => r.json())
        .then(data => {
          const t = data.data.timings;
          prayerQuick.innerHTML = `
            <div style="display:flex;gap:1.5rem;flex-wrap:wrap;justify-content:center;font-size:1rem">
              <span>🌅 الفجر ${t.Fajr}</span>
              <span>☀️ الظهر ${t.Dhuhr}</span>
              <span>🌤️ العصر ${t.Asr}</span>
              <span>🌅 المغرب ${t.Maghrib}</span>
              <span>🌙 العشاء ${t.Isha}</span>
            </div>`;
        })
        .catch(() => { prayerQuick.textContent = 'تعذر تحميل مواقيت الصلاة'; });
    }, () => { prayerQuick.textContent = 'السماح بالموقع لعرض مواقيت الصلاة'; });
  } else if (prayerQuick) {
    prayerQuick.textContent = '';
  }
});
