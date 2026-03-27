// ===================== Prayer Times Page =====================
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
  }

  const prayerGrid     = document.getElementById('prayerGrid');
  const locationLabel  = document.getElementById('locationLabel');
  const nextPrayerBox  = document.getElementById('nextPrayerBox');
  const nextPrayerName = document.getElementById('nextPrayerName');
  const countdownEl    = document.getElementById('countdown');
  const cityInput      = document.getElementById('cityInput');
  let countdownInterval;

  const prayerNames = {
    Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر',
    Asr: 'العصر', Sunset: 'الغروب', Maghrib: 'المغرب', Isha: 'العشاء'
  };
  const prayerIcons = {
    Fajr: '🌙', Sunrise: '🌅', Dhuhr: '☀️', Asr: '🌤️',
    Sunset: '🌇', Maghrib: '🌆', Isha: '🌙'
  };

  function showTimes(timings, cityName) {
    locationLabel.textContent = `📍 ${cityName}`;
    const keys = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    prayerGrid.innerHTML = keys.map(k => `
      <div class="prayer-card" id="pc-${k}">
        <div class="prayer-icon">${prayerIcons[k] || '🕌'}</div>
        <div class="prayer-label">${prayerNames[k]}</div>
        <div class="prayer-time">${timings[k]}</div>
      </div>`).join('');
    highlightNext(timings);
    startCountdown(timings);
  }

  function timeToMins(t) {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  }

  function highlightNext(timings) {
    const now  = new Date();
    const nowM = now.getHours() * 60 + now.getMinutes();
    const keys = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    let nextKey = null, nextMins = Infinity;

    keys.forEach(k => {
      const m = timeToMins(timings[k]);
      if (m > nowM && m < nextMins) { nextMins = m; nextKey = k; }
    });
    if (!nextKey) nextKey = 'Fajr'; // next day

    if (nextKey) {
      const card = document.getElementById(`pc-${nextKey}`);
      if (card) card.classList.add('next-prayer');
      nextPrayerBox.style.display = 'flex';
      nextPrayerName.textContent = prayerNames[nextKey];
    }
  }

  function startCountdown(timings) {
    clearInterval(countdownInterval);
    const keys = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    countdownInterval = setInterval(() => {
      const now  = new Date();
      const nowM = now.getHours() * 60 + now.getMinutes();
      let nextMins = Infinity;
      keys.forEach(k => {
        const m = timeToMins(timings[k]);
        if (m > nowM && m < nextMins) nextMins = m;
      });
      if (nextMins === Infinity) nextMins = timeToMins(timings['Fajr']) + 1440;
      const diff = (nextMins - nowM) * 60 - now.getSeconds();
      const h = Math.floor(diff / 3600), m = Math.floor((diff % 3600) / 60), s = diff % 60;
      countdownEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }, 1000);
  }

  function fetchByCoords(lat, lon) {
    fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=4`)
      .then(r => r.json())
      .then(d => showTimes(d.data.timings, d.data.meta.timezone))
      .catch(() => { prayerGrid.innerHTML = '<p style="color:#ef4444">تعذر جلب المواقيت</p>'; });
  }

  function fetchByCity(city) {
    fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=&method=4`)
      .then(r => r.json())
      .then(d => showTimes(d.data.timings, city))
      .catch(() => { prayerGrid.innerHTML = '<p style="color:#ef4444">المدينة غير موجودة</p>'; });
  }

  // Auto-detect location
  document.getElementById('detectLocation').addEventListener('click', () => {
    prayerGrid.innerHTML = '<p style="text-align:center"><i class="fas fa-spinner fa-spin"></i> جارٍ التحديد...</p>';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        p => fetchByCoords(p.coords.latitude, p.coords.longitude),
        () => fetchByCity('Mecca')
      );
    } else {
      fetchByCity('Mecca');
    }
  });

  document.getElementById('searchCity').addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchByCity(city);
  });

  cityInput.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('searchCity').click(); });

  // Qibla
  function drawQibla(angle) {
    const canvas = document.getElementById('qiblaCanvas');
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 85;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Circle
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, 2*Math.PI);
    ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 3; ctx.stroke();

    // Compass points
    ctx.fillStyle = '#94a3b8'; ctx.font = '14px Cairo'; ctx.textAlign = 'center';
    ctx.fillText('ش', cx, cy - r + 20);
    ctx.fillText('ج', cx, cy + r - 10);
    ctx.fillText('غ', cx - r + 15, cy + 5);
    ctx.fillText('ق', cx + r - 15, cy + 5);

    // Kaaba arrow
    const rad = (angle - 90) * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(rad) * (r - 15), cy + Math.sin(rad) * (r - 15));
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 4;
    ctx.lineTo(cx + Math.cos(rad - 0.3) * (r - 35), cy + Math.sin(rad - 0.3) * (r - 35));
    ctx.stroke();

    document.getElementById('qiblaAngle').textContent = `اتجاه القبلة: ${Math.round(angle)}° من الشمال`;
  }

  function calcQibla(lat, lon) {
    const kLat = 21.4225 * Math.PI / 180;
    const kLon = 39.8262 * Math.PI / 180;
    const uLat = lat * Math.PI / 180;
    const dLon = kLon - (lon * Math.PI / 180);
    const y = Math.sin(dLon) * Math.cos(kLat);
    const x = Math.cos(uLat) * Math.sin(kLat) - Math.sin(uLat) * Math.cos(kLat) * Math.cos(dLon);
    return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(p => {
      const angle = calcQibla(p.coords.latitude, p.coords.longitude);
      drawQibla(angle);
      // Also load prayer times automatically
      fetchByCoords(p.coords.latitude, p.coords.longitude);
    }, () => {
      fetchByCity('Mecca');
      drawQibla(0);
    });
  } else {
    fetchByCity('Mecca');
    drawQibla(0);
  }
});
