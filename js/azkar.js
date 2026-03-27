// ===================== Azkar Page =====================
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
  }

  const azkarList   = document.getElementById('azkarList');
  const fontRange   = document.getElementById('fontRange');
  const fontSizeVal = document.getElementById('fontSizeVal');
  let currentCat    = 'morning';
  let tashkeelOn    = true;

  function renderAzkar(cat) {
    const data = AZKAR_DATA[cat] || [];
    if (!data.length) { azkarList.innerHTML = '<p style="text-align:center">لا توجد أذكار في هذه الفئة</p>'; return; }
    
    const harakatRegex = /[\u064B-\u065F]/g;
    
    azkarList.innerHTML = data.map((z, i) => {
      let text = z.text;
      if (!tashkeelOn) {
        text = text.replace(harakatRegex, '');
      }
      
      return `
      <div class="zikr-card" id="zk-${i}">
        <div class="zikr-counter-badge">${z.count > 1 ? z.count + ' مرات' : 'مرة'}</div>
        <p class="zikr-text" style="font-size:${fontRange.value}px" data-original="${z.text}">${text}</p>
        ${z.note ? `<p class="zikr-note">${z.note}</p>` : ''}
        <div class="zikr-actions">
          <button class="ctrl-btn zikr-copy-btn" data-idx="${i}"><i class="fas fa-copy"></i> نسخ</button>
          <button class="ctrl-btn zikr-count-btn" data-idx="${i}" data-count="${z.count}" data-current="0">
            <i class="fas fa-circle-dot"></i> تسبيح <span class="count-display">0/${z.count}</span>
          </button>
        </div>
        <div class="zikr-progress" style="display:${z.count > 1 ? 'block' : 'none'}">
          <div class="progress-fill" id="zpf-${i}" style="width:0%"></div>
        </div>
      </div>`;
    }).join('');

    // Copy buttons
    azkarList.querySelectorAll('.zikr-copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = data[btn.dataset.idx].text;
        navigator.clipboard.writeText(text).then(() => {
          btn.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
          setTimeout(() => btn.innerHTML = '<i class="fas fa-copy"></i> نسخ', 2000);
        });
      });
    });

    // Count buttons
    azkarList.querySelectorAll('.zikr-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        let cur    = parseInt(btn.dataset.current);
        const max  = parseInt(btn.dataset.count);
        const idx  = btn.dataset.idx;
        cur++;
        btn.dataset.current = cur;
        const display = btn.querySelector('.count-display');
        display.textContent = `${Math.min(cur, max)}/${max}`;
        const fill = document.getElementById(`zpf-${idx}`);
        if (fill) fill.style.width = Math.min((cur / max) * 100, 100) + '%';
        if (cur >= max) {
          btn.style.background = 'linear-gradient(135deg,#16a34a,#15803d)';
          btn.style.color = '#fff';
        }
      });
    });
  }

  // Tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.dataset.cat;
      renderAzkar(currentCat);
    });
  });

  // Font size
  if (fontRange) {
    fontRange.addEventListener('input', () => {
      fontSizeVal.textContent = fontRange.value;
      document.querySelectorAll('.zikr-text').forEach(el => {
        el.style.fontSize = fontRange.value + 'px';
      });
    });
  }

  // Tashkeel toggle (simple demo — strips harakat)
  const toggleBtn = document.getElementById('toggleTashkeel');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      tashkeelOn = !tashkeelOn;
      const harakatRegex = /[\u064B-\u065F]/g;
      document.querySelectorAll('.zikr-text').forEach(el => {
        if (!tashkeelOn) {
          el.dataset.original = el.textContent;
          el.textContent = el.textContent.replace(harakatRegex, '');
        } else if (el.dataset.original) {
          el.textContent = el.dataset.original;
        }
      });
      toggleBtn.style.background = tashkeelOn ? '' : 'var(--primary-color)';
    });
  }

  // Initial render
  renderAzkar('morning');
});
