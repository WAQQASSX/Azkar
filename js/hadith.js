// ===================== Hadith Page =====================
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
  }

  const hadithDisplay = document.getElementById('hadithDisplay');
  let currentBook     = 'bukhari';
  
  // Adjusted max counts for common books in this API
  const maxHadiths    = { 
    bukhari: 7000, 
    muslim: 3000, 
    tirmidhi: 3800, 
    abudawud: 4500, 
    ibnmajah: 4300, 
    nasai: 5600 
  };
  
  const bookNames     = {
    bukhari: 'صحيح البخاري', muslim: 'صحيح مسلم',
    tirmidhi: 'سنن الترمذي', abudawud: 'سنن أبي داود',
    ibnmajah: 'سنن ابن ماجه', nasai: 'سنن النسائي'
  };

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentBook = btn.dataset.book;
      loadRandom();
    });
  });

  function loadHadith(book, num) {
    hadithDisplay.innerHTML = '<div style="text-align:center;padding:3rem"><i class="fas fa-spinner fa-spin fa-2x" style="color:var(--accent-color)"></i></div>';
    
    // Using a more reliable open source Arabic Hadith API
    fetch(`https://hadith-api-azhar.vercel.app/api/hadith/${book}/${num}`)
      .then(r => {
        if (!r.ok) throw new Error('Network response was not ok');
        return r.json();
      })
      .then(data => {
        // The API returns the hadith directly or in a specific structure
        const h = data;
        if (!h || !h.hadith) throw new Error('not found');
        
        hadithDisplay.innerHTML = `
          <div class="hadith-result">
            <div class="hadith-book-badge">${bookNames[book]} — حديث رقم ${num}</div>
            <blockquote class="hadith-arabic" style="font-size:1.5rem; line-height:2.2; font-family:'Amiri', serif;">
              ${h.hadith}
            </blockquote>
            <div style="display:flex;gap:1rem;justify-content:flex-end;margin-top:1.5rem">
              <button class="ctrl-btn" id="copyHadithBtn">
                <i class="fas fa-copy"></i> نسخ
              </button>
              <button class="ctrl-btn" onclick="loadRandom()"><i class="fas fa-random"></i> عشوائي</button>
            </div>
          </div>`;
          
          document.getElementById('copyHadithBtn').addEventListener('click', function() {
            navigator.clipboard.writeText(h.hadith).then(() => {
              this.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
              setTimeout(() => this.innerHTML = '<i class="fas fa-copy"></i> نسخ', 2000);
            });
          });
      })
      .catch(() => {
        hadithDisplay.innerHTML = `
          <div style="text-align:center;padding:2rem">
            <p style="color:#ef4444;margin-bottom:1rem">تعذر تحميل الحديث رقم ${num} من ${bookNames[book]}.</p>
            <button class="btn-secondary" onclick="loadRandom()">جرب حديثاً آخر</button>
          </div>`;
      });
  }

  window.loadRandom = function() {
    const max = maxHadiths[currentBook] || 1000;
    const num = Math.floor(Math.random() * max) + 1;
    document.getElementById('hadithNum').value = num;
    loadHadith(currentBook, num);
  };

  document.getElementById('loadHadith').addEventListener('click', () => {
    const numValue = document.getElementById('hadithNum').value;
    const num = parseInt(numValue);
    if (num && num > 0) {
      loadHadith(currentBook, num);
    } else {
      loadRandom();
    }
  });

  document.getElementById('randomHadith').addEventListener('click', loadRandom);

  document.getElementById('hadithNum').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('loadHadith').click();
  });

  // Initial load
  loadRandom();
});
