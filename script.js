/**
 * 問大師信託契約教學網 - 共用 JavaScript
 * 提供無障礙字型放大、配色切換與友善列印等功能
 */

document.addEventListener('DOMContentLoaded', function() {
  // === 1. 初始化與讀取本地設定 ===
  const savedFontSize = localStorage.getItem('trust-font-size') || 'md';
  const savedTheme = localStorage.getItem('trust-theme') || 'cream';
  
  setFontSize(savedFontSize);
  setTheme(savedTheme);

  // === 2. 綁定字級控制按鈕 ===
  const btnSm = document.getElementById('btn-font-sm');
  const btnMd = document.getElementById('btn-font-md');
  const btnLg = document.getElementById('btn-font-lg');
  const btnXl = document.getElementById('btn-font-xl');

  if (btnSm) btnSm.addEventListener('click', () => setFontSize('sm'));
  if (btnMd) btnMd.addEventListener('click', () => setFontSize('md'));
  if (btnLg) btnLg.addEventListener('click', () => setFontSize('lg'));
  if (btnXl) btnXl.addEventListener('click', () => setFontSize('xl'));

  // === 3. 綁定主題切換按鈕 ===
  const btnCream = document.getElementById('btn-theme-cream');
  const btnDark = document.getElementById('btn-theme-dark');
  const btnContrast = document.getElementById('btn-theme-contrast');

  if (btnCream) btnCream.addEventListener('click', () => setTheme('cream'));
  if (btnDark) btnDark.addEventListener('click', () => setTheme('dark'));
  if (btnContrast) btnContrast.addEventListener('click', () => setTheme('high-contrast'));

  // === 4. 綁定列印按鈕 ===
  const printBtn = document.getElementById('btn-print');
  if (printBtn) {
    printBtn.addEventListener('click', function() {
      window.print();
    });
  }

  // === 5. 浮動式標題列滾動自動隱藏與顯示 ===
  let lastScrollTop = 0;
  const topBar = document.querySelector('.top-bar');
  const scrollThreshold = 15; // 滾動閾值，避免極小移動觸發
  
  if (topBar) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // 避免微小滾動頻繁觸發
      if (Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) {
        return;
      }
      
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 向下滾動且已滑出頂部區 100px ➔ 隱藏標題列
        topBar.classList.add('hidden');
      } else {
        // 向上滾動 ➔ 顯示標題列
        topBar.classList.remove('hidden');
      }
      
      lastScrollTop = scrollTop;
    });
  }

  // === 函數定義：設定字級 ===
  function setFontSize(size) {
    // 移除所有字型大小 class
    document.body.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg', 'font-size-xl');
    
    // 套用對應 class
    document.body.classList.add(`font-size-${size}`);
    
    // 更新本地儲存
    localStorage.setItem('trust-font-size', size);
    
    // 更新按鈕 active 狀態
    updateActiveButton('font-controls', `btn-font-${size}`);
  }

  // === 函數定義：設定主題 ===
  function setTheme(theme) {
    if (theme === 'cream') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    
    // 更新本地儲存
    localStorage.setItem('trust-theme', theme);
    
    // 更新按鈕 active 狀態
    const btnIdMap = {
      'cream': 'btn-theme-cream',
      'dark': 'btn-theme-dark',
      'high-contrast': 'btn-theme-contrast'
    };
    updateActiveButton('theme-controls', btnIdMap[theme]);
  }

  // 輔助函數：更新同組按鈕的 active 樣式
  function updateActiveButton(containerId, activeBtnId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const buttons = container.querySelectorAll('.btn-acc');
    buttons.forEach(btn => {
      if (btn.id === activeBtnId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
});
