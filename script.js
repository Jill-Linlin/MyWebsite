function showSection(sectionId) {
  const sections = document.querySelectorAll(".content-section");
  const target = document.getElementById(sectionId);

  // 1. 檢查頁面上是否存在這些區塊 (主頁邏輯)
  if (sections.length > 0) {
    // 移除所有區塊的 active 狀態
    sections.forEach((sec) => sec.classList.remove("active"));

    // 2. 如果找到了目標區塊 (例如 id="home" 或 id="about")
    if (target) {
      target.classList.add("active");

      // 3. 重點：這行會強制更新網址列顯示 #sectionId
      window.location.hash = sectionId;

      // 同時滾動到頁面頂部，防止切換時卡在中間
      window.scrollTo(0, 0);
    }
  }
  // 4. 如果在詳情頁 (如 project4.html)，就跳轉回首頁
  else {
    window.location.href = `../index.html#${sectionId}`;
  }
}

// 5. 處理頁面載入時的 Hash 偵測 (讓重新整理也有效)
window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    showSection(hash);
  }
});

// 2. 切換語言 (全站共用)
function toggleLang() {
  const html = document.documentElement;
  html.lang = html.lang === "zh-TW" ? "en" : "zh-TW";
  // 建議：將語言偏好存入 localStorage，切換頁面時才不會重置
  localStorage.setItem("preferred-lang", html.lang);
}

// 3. 切換深淺模式 (全站共用)
// 1. 切換主題的 Function
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.dataset.theme === "dark" ? "light" : "dark";
  html.dataset.theme = currentTheme;
  localStorage.setItem("preferred-theme", currentTheme);
}

// 2. [關鍵] 頁面載入時自動套用主題
function initTheme() {
  const savedTheme = localStorage.getItem("preferred-theme");
  // 如果 localStorage 有存，就用存的；沒有的話可以預設跟隨系統或 Light
  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
  }
}

// 在 DOM 載入後立刻執行
document.addEventListener("DOMContentLoaded", initTheme);
// 4. 頁面載入時自動套用先前的設定
window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferred-lang");
  const savedTheme = localStorage.getItem("preferred-theme");

  if (savedLang) document.documentElement.lang = savedLang;
  if (savedTheme) document.documentElement.theme = savedTheme;
});
