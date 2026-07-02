(function() {
  // ================= 检查是否是目标网页 =================
  if (!document.querySelector('.filter-panel') && !document.title.toUpperCase().includes('DESCENDANT')) {
    return; // 如果不是我们要找的网页，直接退出
  }

  // ================= 插入 CSS 样式 =================
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@500;700;900&family=Oswald:wght@500;700&display=swap');

    #tfd-filter-saver {
      display: flex;
      flex-direction: column;
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999999;
      background: rgba(10, 10, 10, 0.95);
      backdrop-filter: blur(8px);
      color: #eaeaea;
      padding: 16px;
      border-radius: 4px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.8), 0 0 1px rgba(255,255,255,0.2) inset;
      font-family: "Oswald", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Microsoft YaHei", "PingFang SC", "Segoe UI", sans-serif !important;
      width: 400px;
      min-width: 320px;
      max-width: 800px;
      height: auto;
      min-height: 200px;
      max-height: 90vh;
      resize: both;
      overflow: hidden;
      transition: box-shadow 0.3s ease, background 0.3s ease;
    }
    #tfd-filter-saver button, 
    #tfd-filter-saver input, 
    #tfd-filter-saver select {
      font-family: "Oswald", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Microsoft YaHei", "PingFang SC", "Segoe UI", sans-serif !important;
    }
    .tfd-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
    }
    .tfd-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .tfd-brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tfd-logo {
      height: 18px;
      width: auto;
      object-fit: contain;
      filter: drop-shadow(0 0 2px rgba(255,255,255,0.2));
    }
    #header-title {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.5px;
      color: #fff;
      text-transform: uppercase;
    }
    /* btn-op group */
    .op-btn-group { display: flex; }
    .op-btn {
      background: rgba(0,0,0,0.5);
      color: #888;
      border: 1px solid rgba(255,255,255,0.15);
      padding: 6px 8px;
      cursor: pointer;
      font-size: 10px;
      transition: all 0.2s;
      outline: none;
    }
    .op-btn:hover { color: #fff; }
    .op-btn:first-child { border-radius: 2px 0 0 2px; border-right: none; }
    .op-btn:last-child { border-radius: 0 2px 2px 0; }
    .op-btn.active { background: #00a8ff; color: #fff; border-color: #00a8ff; z-index: 1; }
    
    .tfd-tabs {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 12px;
    }
    .tfd-tab {
      flex: 1;
      text-align: center;
      padding: 6px 0;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      color: #777;
      transition: all 0.2s;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
    }
    .tfd-tab:hover {
      color: #ccc;
    }
    .tfd-tab.active {
      color: #00a8ff;
      border-bottom: 2px solid #00a8ff;
      text-shadow: 0 0 8px rgba(0, 168, 255, 0.4);
    }
    
    /* 修复官方网页过度的断字行为 */
    .item .option-name {
      word-break: normal !important;
      overflow-wrap: break-word !important;
    }

    .tfd-tab-content { display: none; flex-direction: column; flex: 1; overflow: hidden; }
    .tfd-tab-content.active { display: flex; animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

    #tfd-filter-saver button.primary-btn {
      background: linear-gradient(135deg, #005f99 0%, #00a8ff 100%);
      color: white;
      border: none;
      padding: 10px 14px;
      border-radius: 2px;
      cursor: pointer;
      width: 100%;
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      box-shadow: 0 2px 8px rgba(0, 168, 255, 0.3);
      transition: all 0.2s;
      text-align: center;
    }
    #tfd-filter-saver button.primary-btn:hover { 
      background: linear-gradient(135deg, #0077c2 0%, #33baff 100%);
      box-shadow: 0 4px 12px rgba(0, 168, 255, 0.5);
      transform: translateY(-1px);
    }
    #tfd-filter-saver button.primary-btn.secondary-btn {
      background: rgba(255,255,255,0.05);
      box-shadow: none;
      border: 1px solid rgba(255,255,255,0.1);
      color: #aaa;
    }
    #tfd-filter-saver button.primary-btn.secondary-btn:hover {
      background: rgba(255,255,255,0.1);
      color: #fff;
    }

    .preset-list, .watchlist {
      flex: 1;
      overflow-y: auto;
      margin-top: 10px;
      padding-right: 4px;
      min-height: 150px;
    }
    .preset-list::-webkit-scrollbar, .watchlist::-webkit-scrollbar { width: 4px; }
    .preset-list::-webkit-scrollbar-track, .watchlist::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
    .preset-list::-webkit-scrollbar-thumb, .watchlist::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }
    .preset-list::-webkit-scrollbar-thumb:hover, .watchlist::-webkit-scrollbar-thumb:hover { background: #00a8ff; }
    
    .list-item {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.03);
      padding: 10px;
      margin-bottom: 8px;
      border-radius: 2px;
      border: 1px solid rgba(255, 255, 255, 0.06);
      transition: border-color 0.2s;
    }
    .list-item:hover { border-color: rgba(0, 168, 255, 0.4); }
    .item-title { font-size: 13px; font-weight: 500; margin-bottom: 6px; word-break: break-all; color: #eee; line-height: 1.3;}
    .item-status { font-size: 11px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;}
    .status-online { color: #4ade80; }
    .status-offline { color: #f87171; }
    .status-sold { color: #666; text-decoration: line-through; }
    .status-unknown { color: #fbbf24; }

    .item-actions { display: flex; gap: 6px; }
    .item-actions button {
      flex: 1;
      border: none;
      border-radius: 2px;
      color: white;
      padding: 6px 4px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
    }
    .btn-apply { background: #10b981; color: #fff; border: none; font-weight: 600; }
    .btn-apply:hover { background: #059669; box-shadow: 0 0 8px rgba(16, 185, 129, 0.4); }
    .btn-query { background: #00a8ff; color: #fff; border: none; font-weight: 600; }
    .btn-query:hover { background: #0097e6; box-shadow: 0 0 8px rgba(0, 168, 255, 0.4); }
    .btn-del { background: #ef4444; color: #fff; border: none; font-weight: 600; }
    .btn-del:hover { background: #dc2626; box-shadow: 0 0 8px rgba(239, 68, 68, 0.4); }
    
    .tfd-ext-fav-btn {
      background: transparent;
      color: #fbbf24;
      border: 1px solid #fbbf24;
      border-radius: 2px;
      padding: 2px 6px;
      font-size: 11px;
      cursor: pointer;
      margin-left: 10px;
      font-weight: 600;
      transition: all 0.2s;
    }
    .tfd-ext-fav-btn:hover { background: rgba(251, 191, 36, 0.15); }
    
    .attr-rule { display: flex; gap: 6px; margin-bottom: 8px; align-items: center; }
    .attr-rule input[type="text"], .attr-rule input[type="number"], .attr-rule select, #preset-name, #max-price-input {
      background: rgba(0,0,0,0.5); 
      color: #eee; 
      border: 1px solid rgba(255,255,255,0.15); 
      border-radius: 2px; 
      padding: 6px 8px; 
      font-size: 12px; 
      outline: none;
      transition: border-color 0.2s;
      width: 100%;
      box-sizing: border-box;
    }
    .attr-rule input[type="text"]:focus, .attr-rule input[type="number"]:focus, .attr-rule select:focus, #preset-name:focus, #max-price-input:focus {
      border-color: #00a8ff;
    }
    .attr-rule input[type="text"] { flex: 2; min-width: 0; }
    .attr-rule select { flex: 1; min-width: 0; }
    .attr-rule input[type="number"] { flex: 1; width: 50px; min-width: 0; }
    .attr-rule .btn-remove-rule { 
      background: rgba(248, 113, 113, 0.15); 
      color: #f87171; 
      border: 1px solid rgba(248, 113, 113, 0.3); 
      border-radius: 2px; 
      cursor: pointer; 
      padding: 6px; 
      font-weight: bold; 
      line-height: 1;
      transition: all 0.2s;
    }
    .attr-rule .btn-remove-rule:hover { background: rgba(248, 113, 113, 0.3); }

    .attr-section {
      background: rgba(255,255,255,0.02); 
      padding: 10px; 
      border-radius: 2px; 
      margin-bottom: 12px; 
      border: 1px solid rgba(255,255,255,0.05);
    }
    .attr-section-title {
      font-size: 12px; 
      font-weight: 600; 
      margin-bottom: 10px; 
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .custom-checkbox-label {
      font-size: 11px; 
      color: #aaa; 
      display: flex; 
      align-items: center; 
      cursor: pointer;
      margin-top: 8px;
      user-select: none;
      line-height: 1;
    }
    #attr-filter-hide {
      appearance: none;
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 2px;
      background: rgba(0, 0, 0, 0.5);
      margin: 0 6px 0 0;
      cursor: pointer;
      position: relative;
      outline: none;
      transition: all 0.2s;
      flex-shrink: 0;
      transform: translateY(1px);
    }
    #attr-filter-hide:checked {
      background: #00a8ff;
      border-color: #00a8ff;
    }
    #attr-filter-hide:checked::after {
      content: '';
      position: absolute;
      top: 1px;
      left: 4px;
      width: 4px;
      height: 7px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    #tfd-overlay {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.85);
      backdrop-filter: blur(5px);
      z-index: 9999998;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      font-family: 'Inter', 'Roboto', sans-serif;
    }
    #tfd-overlay h2 { margin: 0 0 10px 0; font-weight: 300; font-size: 28px; color: #00a8ff; text-shadow: 0 0 20px rgba(0, 168, 255, 0.5); }
    #tfd-overlay p { font-size: 14px; color: #aaa; letter-spacing: 1px; text-transform: uppercase; }

    #tfd-preset-panel {
      position: fixed;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
      z-index: 9999999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-family: "Oswald", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Microsoft YaHei", "PingFang SC", "Segoe UI", sans-serif !important;
      max-height: 90vh;
      overflow-y: auto;
      padding: 10px;
    }
    #tfd-preset-panel::-webkit-scrollbar { width: 4px; }
    #tfd-preset-panel::-webkit-scrollbar-track { background: transparent; }
    #tfd-preset-panel::-webkit-scrollbar-thumb { background: rgba(0,168,255,0.5); border-radius: 2px; }

    .tfd-preset-card {
      display: flex;
      background: rgba(30, 30, 30, 0.85);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      overflow: hidden;
      width: 260px;
      height: 80px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4);
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
    }
    .tfd-preset-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.5);
      border-top: 1px solid rgba(255, 255, 255, 0.3);
    }
    .tfd-preset-left {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .tfd-preset-name {
      padding: 8px 12px;
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      letter-spacing: 0.5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: linear-gradient(90deg, rgba(20,20,20,0.8) 0%, rgba(40,40,40,0.4) 100%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      flex: 1;
      display: flex;
      align-items: center;
      text-shadow: 0 1px 2px rgba(0,0,0,0.8);
    }
    .tfd-preset-actions {
      display: flex;
      height: 40px;
    }
    .tfd-preset-btn {
      flex: 1;
      border: none;
      color: #fff;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 1px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }
    .tfd-preset-btn::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(255,255,255,0.1);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .tfd-preset-btn:hover::after { opacity: 1; }
    .tfd-preset-btn:active { transform: scale(0.96); }
    
    .tfd-preset-del { 
      background: linear-gradient(135deg, #f43f5e 0%, #be123c 100%);
      border-right: 1px solid rgba(0,0,0,0.3);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
    }
    .tfd-preset-apply { 
      background: linear-gradient(135deg, #10b981 0%, #047857 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
    }
    .tfd-preset-right {
      width: 80px;
      background: radial-gradient(circle at 50% 50%, #7f2222 0%, #300c0c 70%, #150000 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid rgba(0,0,0,0.5);
      box-shadow: inset 0 0 10px rgba(255, 80, 80, 0.15);
      position: relative;
    }
    .tfd-preset-right::after {
      content: '';
      position: absolute;
      top: 0; left: 0; width: 1px; height: 100%;
      background: rgba(255,255,255,0.05);
    }
    .tfd-preset-icon {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
    }
  `;
  document.head.appendChild(style);

  // ================= 插入 HTML 结构 =================
  const container = document.createElement('div');
  container.id = 'tfd-filter-saver';
  container.innerHTML = `
    <div class="tfd-header">
      <div class="tfd-brand">
        <img src="${chrome.runtime.getURL('logo_v2.png')}" alt="Logo" class="tfd-logo">
        <span id="header-title">助手模块</span>
      </div>
    </div>
    <div class="tfd-content">
      
      <div class="tfd-tabs">
        <div class="tfd-tab active" data-target="tab-presets">过滤器预设</div>
        <div class="tfd-tab" data-target="tab-watchlist">特别关注</div>
      </div>

      <!-- 预设 Tab -->
      <div id="tab-presets" class="tfd-tab-content active">
        <div class="attr-section">
          <div class="attr-section-title">价格过滤</div>
          <div style="display: flex; gap: 8px; align-items: center;">
             <input type="number" id="max-price-input" placeholder="最高价 (为空则不限)" style="width: 100%; box-sizing: border-box;">
          </div>
        </div>
        <div class="attr-section">
          <div class="attr-section-title">自定义属性过滤</div>
          <div id="attr-rules-container" style="max-height: 150px; overflow-y: auto; margin-bottom: 5px; padding-right: 4px;"></div>
          <button class="primary-btn secondary-btn" id="btn-add-attr-rule" style="margin-bottom: 8px; padding: 6px; font-size: 11px;">+ 添加属性条件</button>
          <label class="custom-checkbox-label">
            <input type="checkbox" id="attr-filter-hide" checked>不符合时完全隐藏 (否则变暗)
          </label>
          <button class="primary-btn" id="btn-sort-cost" style="margin-top: 10px; margin-bottom: 0; padding: 8px; font-size: 12px; background: linear-gradient(135deg, #d97706 0%, #fbbf24 100%); color: #000; box-shadow: 0 2px 8px rgba(251, 191, 36, 0.3);">按性价比排序</button>
        </div>
        
        <input type="text" id="preset-name" placeholder="输入预设名称..." style="width: 100%; box-sizing: border-box; padding: 8px; margin-bottom: 10px; background: #333; color: white; border: 1px solid #555; border-radius: 4px; outline: none;">
        <button class="primary-btn" id="btn-save-preset">保存当前所有条件(网页+自定义)</button>
      </div>

      <!-- 关注 Tab -->
      <div id="tab-watchlist" class="tfd-tab-content">
        <button class="primary-btn" id="btn-refresh-watchlist">批量查询关注物品</button>
        <div class="watchlist" id="watchlist-list"></div>
      </div>

    </div>
  `;
  document.body.appendChild(container);

  const overlay = document.createElement('div');
  overlay.id = 'tfd-overlay';
  overlay.style.display = 'none';
  overlay.innerHTML = `
    <h2 id="overlay-title">正在后台查询物品...</h2>
    <p id="overlay-desc">正在应用筛选器并滚动加载... 请勿操作</p>
  `;
  document.body.appendChild(overlay);

  const presetPanel = document.createElement('div');
  presetPanel.id = 'tfd-preset-panel';
  document.body.appendChild(presetPanel);

  // ================= 基础逻辑 & UI 切换 =================
  const presetListEl = document.getElementById('tfd-preset-panel');
  const watchlistEl = document.getElementById('watchlist-list');
  const nameInput = document.getElementById('preset-name');
  
  // 最小化功能已移除

  document.querySelectorAll('.tfd-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tfd-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tfd-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.getAttribute('data-target')).classList.add('active');
    });
  });

  // ================= Toast 提示 =================
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 168, 255, 0.9);
      color: #fff;
      padding: 10px 20px;
      border-radius: 4px;
      z-index: 9999999;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      transition: opacity 0.3s ease, top 0.3s ease;
      pointer-events: none;
      font-weight: 500;
      opacity: 0;
    `;
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.top = '40px';
      });
    });

    // Animate out
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.top = '20px';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ================= 时间转换工具 =================
  function parseRelativeTime(str) {
    if (!str) return Date.now();
    str = str.toLowerCase();
    let val = parseInt(str);
    if (isNaN(val)) return Date.now();
    
    if (str.includes('sec')) return Date.now() - val * 1000;
    if (str.includes('min')) return Date.now() - val * 60000;
    if (str.includes('hour')) return Date.now() - val * 3600000;
    if (str.includes('day')) return Date.now() - val * 86400000;
    if (str.includes('week')) return Date.now() - val * 604800000;
    if (str.includes('month')) return Date.now() - val * 2592000000;
    return Date.now();
  }

  // ================= 提取与恢复筛选器状态 =================
  function captureFilterState() {
    const state = {};
    document.querySelectorAll('.dropdown').forEach((dropdown, index) => {
      const name = dropdown.getAttribute('data-name') || ('idx_' + index);
      let selectedIndex = -1;
      dropdown.querySelectorAll('.dropdown__option').forEach((opt, i) => {
        if (opt.classList.contains('is-selected')) selectedIndex = i;
      });
      state['dropdown_' + name] = selectedIndex;
    });
    document.querySelectorAll('.price-range__input').forEach((input, index) => {
      state['price_' + index] = input.value;
    });
    const onlineBtn = document.querySelector('.sort-bar__toggle-btn');
    if (onlineBtn) state['online_toggle'] = onlineBtn.classList.contains('is-active');
    
    // Save attribute rules
    state['attr_rules'] = JSON.parse(JSON.stringify(attrRulesData));
    state['attr_filter_active'] = isAttrFilterActive;
    state['attr_hide_unmatched'] = document.getElementById('attr-filter-hide') ? document.getElementById('attr-filter-hide').checked : true;
    state['max_price_ext'] = document.getElementById('max-price-input') ? document.getElementById('max-price-input').value : '';
    
    const iconImg = document.querySelector('img.module-icon.ancestor') || document.querySelector('img.ancestor') || document.querySelector('.dropdown__option.is-selected img');
    state['iconSrc'] = iconImg ? iconImg.src : '';

    return state;
  }

  async function applyFilterState(state) {
    async function applyDropdowns() {
      let changed = false;
      const dropdownCount = document.querySelectorAll('.dropdown').length;
      for (let index = 0; index < dropdownCount; index++) {
        const currentDropdowns = document.querySelectorAll('.dropdown');
        if (index >= currentDropdowns.length) break;
        const dropdown = currentDropdowns[index];
        
        const name = dropdown.getAttribute('data-name') || ('idx_' + index);
        const selectedIndex = state['dropdown_' + name];
        if (selectedIndex !== undefined && selectedIndex !== -1) {
           const targetOption = dropdown.querySelectorAll('.dropdown__option')[selectedIndex];
           if (targetOption && !targetOption.classList.contains('is-selected')) {
             targetOption.click();
             changed = true;
             await new Promise(r => setTimeout(r, 100)); // 等待基本渲染
           }
        }
      }
      return changed;
    }

    const hasChanges = await applyDropdowns();
    if (hasChanges) {
      // 网页自身可能有延迟更长的级联重置逻辑 (比如切换继承者后, 500ms才清空属性)
      // 我们等待一段较长的时间后, 再强行套用一次来覆盖它
      await new Promise(r => setTimeout(r, 600));
      await applyDropdowns();
    }
    
    document.querySelectorAll('.price-range__input').forEach((input, index) => {
      const val = state['price_' + index];
      if (val !== undefined && input.value !== val) {
         input.value = val;
         input.dispatchEvent(new Event('input', { bubbles: true }));
         input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    const onlineBtn = document.querySelector('.sort-bar__toggle-btn');
    if (onlineBtn && state['online_toggle'] !== undefined) {
      const isActive = onlineBtn.classList.contains('is-active');
      if (isActive !== state['online_toggle']) onlineBtn.click();
    }
    
    // Restore attribute rules
    if (state['attr_rules']) {
      attrRulesData = JSON.parse(JSON.stringify(state['attr_rules']));
      isAttrFilterActive = !!state['attr_filter_active'];
      if (document.getElementById('attr-filter-hide')) {
        document.getElementById('attr-filter-hide').checked = !!state['attr_hide_unmatched'];
      }
      if (document.getElementById('max-price-input') && state['max_price_ext'] !== undefined) {
        document.getElementById('max-price-input').value = state['max_price_ext'];
      }
      renderAttrRules();
      if (isAttrFilterActive || state['max_price_ext']) {
        filterStateVersion++;
        applyAttrFiltersToAll();
      }
    }
  }

  // ================= 预设功能 =================
  function loadPresets(callback) { chrome.storage.local.get(['tfd_presets'], (res) => callback(res.tfd_presets || {})); }
  function savePresetsToStorage(presets, callback) { chrome.storage.local.set({ tfd_presets: presets }, callback); }

  function renderPresets() {
    loadPresets(function(presets) {
      presetListEl.innerHTML = '';
      const keys = Object.keys(presets).reverse();
      if (keys.length === 0) {
        presetListEl.innerHTML = '<div style="color: #888; text-align: center; font-size: 12px; margin-top: 10px;">暂无保存的预设</div>';
        return;
      }
      for (const name of keys) {
        const state = presets[name];
        const item = document.createElement('div');
        item.className = 'tfd-preset-card';
        
        const leftCol = document.createElement('div');
        leftCol.className = 'tfd-preset-left';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'tfd-preset-name';
        nameDiv.title = name;
        nameDiv.textContent = name;
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'tfd-preset-actions';
        
        const delBtn = document.createElement('button');
        delBtn.className = 'tfd-preset-btn tfd-preset-del';
        delBtn.textContent = '删除';
        delBtn.onclick = () => {
          delete presets[name];
          savePresetsToStorage(presets, renderPresets);
        };
        
        const applyBtn = document.createElement('button');
        applyBtn.className = 'tfd-preset-btn tfd-preset-apply';
        applyBtn.textContent = '应用条件';
        applyBtn.onclick = async () => {
          await applyFilterState(state);
          const refreshBtn = document.querySelector('.sort-bar__refresh');
          if (refreshBtn) refreshBtn.click();
        };
        
        actionsDiv.appendChild(delBtn);
        actionsDiv.appendChild(applyBtn);
        leftCol.appendChild(nameDiv);
        leftCol.appendChild(actionsDiv);
        
        const rightCol = document.createElement('div');
        rightCol.className = 'tfd-preset-right';
        if (state.iconSrc) {
           const iconImg = document.createElement('img');
           iconImg.className = 'tfd-preset-icon';
           iconImg.src = state.iconSrc;
           rightCol.appendChild(iconImg);
        } else {
           rightCol.style.background = '#111'; // Empty placeholder
        }
        
        item.appendChild(leftCol);
        item.appendChild(rightCol);
        
        presetListEl.appendChild(item);
      }
    });
  }

  document.getElementById('btn-save-preset').addEventListener('click', () => {
    let name = nameInput.value.trim();
    if (!name) name = '预设 ' + new Date().toLocaleTimeString();
    const state = captureFilterState();
    loadPresets(presets => {
      presets[name] = state;
      savePresetsToStorage(presets, () => {
        nameInput.value = '';
        renderPresets();
      });
    });
  });

  // ================= 关注列表 (Watchlist) =================
  function loadWatchlist(callback) { chrome.storage.local.get(['tfd_watchlist'], (res) => callback(res.tfd_watchlist || [])); }
  function saveWatchlist(list, callback) { chrome.storage.local.set({ tfd_watchlist: list }, callback); }

  function renderWatchlist() {
    loadWatchlist(list => {
      watchlistEl.innerHTML = '';
      if (list.length === 0) {
        watchlistEl.innerHTML = '<div style="color: #888; text-align: center; font-size: 12px; margin-top: 10px;">暂无关注，去网页里点击物品上的⭐️关注吧！</div>';
        return;
      }
      list.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'list-item';
        
        let statusHtml = '<span class="status-unknown">状态: 未查询</span>';
        if (item.status === 'online') statusHtml = '<span class="status-online">状态: 在售 (卖家在线)</span>';
        if (item.status === 'offline') statusHtml = '<span class="status-offline">状态: 在售 (卖家离线)</span>';
        if (item.status === 'sold') statusHtml = '<span class="status-sold">状态: 没找到 (已售/下架)</span>';

        div.innerHTML = `
          <div class="item-title">${item.itemName} (${item.seller})</div>
          <div class="item-status">${statusHtml}</div>
        `;
        
        const btnContainer = document.createElement('div');
        btnContainer.className = 'item-actions';
        
        // 单个查询按钮
        const queryBtn = document.createElement('button');
        queryBtn.textContent = '单查';
        queryBtn.className = 'btn-query';
        queryBtn.onclick = () => {
          overlay.style.display = 'flex';
          document.getElementById('overlay-desc').textContent = `正在查询: ${item.itemName}`;
          executeSearchForItem(item, () => {
            overlay.style.display = 'none';
            saveWatchlist(list, renderWatchlist);
            showToast('查询完成！');
          });
        };

        const delBtn = document.createElement('button');
        delBtn.textContent = '删除';
        delBtn.className = 'btn-del';
        delBtn.onclick = () => {
          list.splice(index, 1);
          saveWatchlist(list, renderWatchlist);
        };
        
        btnContainer.appendChild(queryBtn);
        btnContainer.appendChild(delBtn);
        div.appendChild(btnContainer);
        watchlistEl.appendChild(div);
      });
    });
  }

  // ================= 属性筛选逻辑 (Attribute Filter) =================
  let attrRulesData = [];
  let isAttrFilterActive = false;
  let filterStateVersion = 0;

  const attrRulesContainer = document.getElementById('attr-rules-container');
  
  function triggerAutoApply() {
    isAttrFilterActive = attrRulesData.some(r => r.keyword.trim() !== '');
    filterStateVersion++;
    applyAttrFiltersToAll();
  }

  function renderAttrRules() {
    attrRulesContainer.innerHTML = '';
    attrRulesData.forEach((rule, index) => {
      const div = document.createElement('div');
      div.className = 'attr-rule';
      
      const inputKw = document.createElement('input');
      inputKw.type = 'text';
      inputKw.placeholder = '如: 最大體力';
      inputKw.value = rule.keyword;
      inputKw.oninput = e => { rule.keyword = e.target.value.trim(); triggerAutoApply(); };
      
      const opGroup = document.createElement('div');
      opGroup.className = 'op-btn-group';
      
      const btnUp = document.createElement('button');
      btnUp.innerHTML = '&#9650;'; // Up arrow
      btnUp.title = '大于';
      btnUp.className = 'op-btn ' + (rule.operator === '>' ? 'active' : '');
      btnUp.onclick = () => { rule.operator = '>'; triggerAutoApply(); renderAttrRules(); };

      const btnDown = document.createElement('button');
      btnDown.innerHTML = '&#9660;'; // Down arrow
      btnDown.title = '小于';
      btnDown.className = 'op-btn ' + (rule.operator === '<' ? 'active' : '');
      btnDown.onclick = () => { rule.operator = '<'; triggerAutoApply(); renderAttrRules(); };

      opGroup.appendChild(btnUp);
      opGroup.appendChild(btnDown);
      
      const inputVal = document.createElement('input');
      inputVal.type = 'number';
      inputVal.step = 'any';
      inputVal.value = rule.value;
      inputVal.oninput = e => { rule.value = parseFloat(e.target.value) || 0; triggerAutoApply(); };
      
      const btnDel = document.createElement('button');
      btnDel.className = 'btn-remove-rule';
      btnDel.textContent = 'x';
      btnDel.onclick = () => {
        attrRulesData.splice(index, 1);
        renderAttrRules();
        triggerAutoApply();
      };
      
      div.appendChild(inputKw);
      div.appendChild(opGroup);
      div.appendChild(inputVal);
      div.appendChild(btnDel);
      attrRulesContainer.appendChild(div);
    });
  }

  document.getElementById('btn-add-attr-rule').addEventListener('click', () => {
    attrRulesData.push({ keyword: '', operator: '>', value: 0 });
    renderAttrRules();
  });

  document.getElementById('max-price-input').addEventListener('input', () => {
    filterStateVersion++;
    applyAttrFiltersToAll();
  });

  document.getElementById('attr-filter-hide').addEventListener('change', () => {
    filterStateVersion++;
    applyAttrFiltersToAll();
  });

  document.getElementById('btn-sort-cost').addEventListener('click', () => {
    const items = Array.from(document.querySelectorAll('.item'));
    if (items.length === 0) return showToast('没有找到任何物品');
    
    // Sort items
    items.sort((a, b) => {
      const matchA = a.style.opacity !== '0.15' && a.style.display !== 'none';
      const matchB = b.style.opacity !== '0.15' && b.style.display !== 'none';
      
      if (matchA && !matchB) return -1;
      if (!matchA && matchB) return 1;

      const costA = parseFloat(a.dataset.costPerPt) || Infinity;
      const costB = parseFloat(b.dataset.costPerPt) || Infinity;
      return costA - costB;
    });
    
    // Re-append to their parent container
    const parent = items[0].parentNode;
    items.forEach(item => parent.appendChild(item));
    showToast('已按性价比排序！');
  });
  
  // init with one empty rule
  attrRulesData.push({ keyword: '', operator: '>', value: 0 });
  renderAttrRules();

  function applyAttrFiltersToAll() {
    document.querySelectorAll('.item').forEach(itemNode => {
      itemNode.dataset.filterVersion = String(filterStateVersion);
      evaluateItemAttr(itemNode);
    });
  }

  function evaluateItemAttr(itemNode) {
    // 每次重新计算前清除旧的 badge 和数据
    itemNode.querySelectorAll('.attr-diff-badge').forEach(el => el.remove());
    itemNode.querySelectorAll('.value-origin[data-original-text]').forEach(el => {
      el.textContent = el.dataset.originalText;
      delete el.dataset.originalText;
    });
    delete itemNode.dataset.costPerPt;

    const maxPriceInput = document.getElementById('max-price-input');
    const maxPriceVal = maxPriceInput && maxPriceInput.value !== '' ? parseInt(maxPriceInput.value) : NaN;
    const isPriceFilterActive = !isNaN(maxPriceVal) && maxPriceVal > 0;

    const activeRules = attrRulesData.filter(r => r.keyword !== '');

    if (!isAttrFilterActive && activeRules.length === 0 && !isPriceFilterActive) {
      itemNode.style.display = '';
      itemNode.style.opacity = '1';
      itemNode.style.pointerEvents = 'auto';
      return;
    }

    const hideUnmatched = document.getElementById('attr-filter-hide').checked;
    let isMatch = true;

    let itemPrice = NaN;
    const priceNode = itemNode.querySelector('.price');
    if (priceNode) {
      itemPrice = parseInt(priceNode.textContent.replace(/[^0-9]/g, ''), 10);
    }

    if (isPriceFilterActive) {
      if (!isNaN(itemPrice) && itemPrice > maxPriceVal) {
        isMatch = false;
      }
    }

    if (activeRules.length > 0 && isMatch) {
      for (const rule of activeRules) {
        let foundOption = false;
        const optionNodes = itemNode.querySelectorAll('.option');
        for (const opt of optionNodes) {
          const nameNode = opt.querySelector('.option-name');
          if (nameNode && nameNode.textContent.includes(rule.keyword)) {
            foundOption = true;
            const valNode = opt.querySelector('.value-current') || opt.querySelector('.value-origin') || opt.querySelector('.option-value');
            if (valNode) {
              let valText = valNode.textContent;
              let match = valText.match(/-?\d+(\.\d+)?/);
              if (match) {
                let num = parseFloat(match[0]);
                
                let diff = num - rule.value;
                let diffStr = (diff > 0 ? '+' : '') + parseFloat(diff.toFixed(2));
                
                let diffColor = '#4ade80'; // Bright green for pass
                let passed = true;

                if (rule.operator === '>') {
                  if (num <= rule.value) passed = false;
                } else if (rule.operator === '<') {
                  if (num >= rule.value) passed = false;
                }

                if (passed && Math.abs(diff) > 0 && !isNaN(itemPrice) && itemPrice > 0) {
                  let costPerPt = parseFloat((itemPrice / Math.abs(diff)).toFixed(1));
                  
                  const originValNode = opt.querySelector('.value-origin');
                  if (originValNode) {
                    if (!originValNode.dataset.originalText) {
                      originValNode.dataset.originalText = originValNode.textContent;
                    }
                    originValNode.innerHTML = `<span style="background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%); color: white; padding: 1px 6px; border-radius: 4px; font-weight: bold; font-family: 'Oswald', sans-serif; letter-spacing: 0.5px; box-shadow: 0 2px 4px rgba(13, 148, 136, 0.3); border: 1px solid rgba(20, 184, 166, 0.5); display: inline-block; transform: translateY(-1px);">${costPerPt}/c</span>`;
                  } else {
                    diffStr += `(${costPerPt}/c)`;
                  }
                  
                  const currentCost = parseFloat(itemNode.dataset.costPerPt);
                  if (isNaN(currentCost) || costPerPt < currentCost) {
                    itemNode.dataset.costPerPt = costPerPt;
                  }
                }
                
                if (!passed) {
                  isMatch = false;
                  diffColor = '#ff6b6b'; // Bright red for fail
                }

                // Append difference badge
                let badge = document.createElement('span');
                badge.className = 'attr-diff-badge';
                badge.style.cssText = `margin-right: 6px; font-weight: 800; color: ${diffColor}; font-size: 13px; background: rgba(20,20,20,0.85); padding: 2px 6px; border-radius: 4px; display: inline-block; vertical-align: baseline; border: 1px solid ${diffColor}40; letter-spacing: 0.5px; box-shadow: 0 1px 3px rgba(0,0,0,0.5);`;
                badge.textContent = diffStr;
                nameNode.insertBefore(badge, nameNode.firstChild);
                
              } else {
                isMatch = false; 
              }
            } else {
              isMatch = false;
            }
            break; // found the targeted attribute, move to next rule
          }
        }
        
        if (!foundOption) {
          isMatch = false; // item does not have this attribute
        }
        // removed early break to ensure all badges are rendered
      }
    }

    if (isMatch) {
      itemNode.style.display = '';
      itemNode.style.opacity = '1';
      itemNode.style.pointerEvents = 'auto';
    } else {
      if (hideUnmatched) {
        itemNode.style.display = 'none';
      } else {
        itemNode.style.display = '';
        itemNode.style.opacity = '0.15';
        itemNode.style.pointerEvents = 'none';
      }
    }
  }

  // 注入关注按钮 & 监听DOM变化以应用属性筛选
  const observer = new MutationObserver((mutations) => {
    document.querySelectorAll('.item').forEach(itemNode => {
      
      if (itemNode.dataset.filterVersion !== String(filterStateVersion)) {
        itemNode.dataset.filterVersion = String(filterStateVersion);
        evaluateItemAttr(itemNode);
      }

      if (!itemNode.querySelector('.tfd-ext-fav-btn')) {
        const sellerNode = itemNode.querySelector('.seller .nickname');
        if (sellerNode) {
          const btn = document.createElement('button');
          btn.className = 'tfd-ext-fav-btn';
          btn.textContent = '⭐️ 关注此物品';
          btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const sellerName = Array.from(sellerNode.childNodes)
              .filter(n => n.nodeType === 3) // Node.TEXT_NODE
              .map(n => n.textContent)
              .join('')
              .trim();
              
            const itemNameNode = itemNode.querySelector('.row-wrapper .name, .module-name');
            const itemName = itemNameNode ? itemNameNode.textContent.trim() : '未知物品';
            const currentState = captureFilterState();
            
            // 提取时间并转为绝对时间戳
            const dateNode = itemNode.querySelector('.date span');
            let postTimeStr = dateNode ? dateNode.textContent.trim() : '';
            const absolutePostTime = parseRelativeTime(postTimeStr);
            
            loadWatchlist(list => {
              if (list.length >= 20) return showToast('关注列表已满 (最多20个)');
              if (list.find(i => i.seller === sellerName && i.itemName === itemName)) return showToast('该物品已经在关注列表中了！');
              
              list.push({ 
                seller: sellerName, 
                itemName: itemName, 
                status: 'unknown',
                filterState: currentState,
                postTime: absolutePostTime // 保存时间戳
              });
              saveWatchlist(list, () => {
                btn.textContent = '已关注';
                btn.style.background = '#28a745';
                btn.style.color = '#fff';
                renderWatchlist();
              });
            });
          };
          sellerNode.appendChild(btn);
        }
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // ================= 智能异步查询逻辑 =================
  
  // 核心查询单个物品逻辑（带自动下拉翻页）
  async function executeSearchForItem(item, callback) {
    await applyFilterState(item.filterState);
    const refreshBtn = document.querySelector('.sort-bar__refresh');
    if (!refreshBtn) {
      showToast('页面未找到筛选器的刷新按钮！');
      callback();
      return;
    }
    
    // 点击刷新加载第一页
    setTimeout(() => { refreshBtn.click(); }, 500);

    let scrollAttempts = 0;
    
    function checkPage() {
      let found = false;
      let isOnline = false;
      
      const itemNodes = document.querySelectorAll('.item');
      if (itemNodes.length === 0) {
        // 无数据，直接售出
        item.status = 'sold';
        return callback();
      }

      // 遍历当前列表
      itemNodes.forEach(itemNode => {
        const sellerNode = itemNode.querySelector('.seller .nickname');
        if (sellerNode) {
          const currentSellerName = Array.from(sellerNode.childNodes)
            .filter(n => n.nodeType === 3)
            .map(n => n.textContent)
            .join('').trim();
          
          if (currentSellerName === item.seller) {
            found = true;
            const stateNode = sellerNode.querySelector('.state');
            if (stateNode && (stateNode.classList.contains('on') || stateNode.textContent.includes('線上') || stateNode.textContent.includes('上线') || stateNode.textContent.includes('在线'))) {
              isOnline = true;
            }
          }
        }
      });

      if (found) {
        item.status = isOnline ? 'online' : 'offline';
        return callback();
      }

      // 没找到，检查最后一个物品的时间
      const lastItem = itemNodes[itemNodes.length - 1];
      const lastDateNode = lastItem.querySelector('.date span');
      const lastPostTimeStr = lastDateNode ? lastDateNode.textContent.trim() : '';
      const lastAbsolutePostTime = parseRelativeTime(lastPostTimeStr);
      
      // 时间容差 (1.5小时)，因为 "X hours ago" 的精度只到小时，我们要允许一点误差
      const tolerance = 90 * 60 * 1000;
      
      // 如果当前页面最老（最下面）的物品发布时间，比我们当时关注物品的时间还要老，说明已经翻过去了
      if (lastAbsolutePostTime < item.postTime - tolerance) {
        item.status = 'sold';
        return callback();
      }
      
      // 否则，说明还在比较新的数据里，还没翻到该物品，触发加载更多！
      document.getElementById('overlay-desc').textContent = `[${item.itemName}] 没在当前页，正在向下滚动加载 (第 ${scrollAttempts+1} 次)...`;
      
      // 模拟滚动到底部触发加载
      lastItem.scrollIntoView();
      window.scrollTo(0, document.body.scrollHeight);
      
      scrollAttempts++;
      // 等待新数据加载出来
      setTimeout(checkPage, 2500);
    }
    
    // 给首次刷新 3 秒加载时间
    setTimeout(checkPage, 3000);
  }

  // 批量查询逻辑
  document.getElementById('btn-refresh-watchlist').addEventListener('click', () => {
    loadWatchlist(list => {
      if (list.length === 0) return showToast('关注列表为空！');
      
      overlay.style.display = 'flex';
      let currentIndex = 0;

      function processQueue() {
        if (currentIndex >= list.length) {
          overlay.style.display = 'none';
          saveWatchlist(list, renderWatchlist);
          showToast('批量查询完成！');
          return;
        }

        const item = list[currentIndex];
        document.getElementById('overlay-desc').textContent = `正在应用筛选器查询 (${currentIndex + 1}/${list.length}) : ${item.itemName}`;

        executeSearchForItem(item, () => {
          currentIndex++;
          processQueue();
        });
      }

      processQueue();
    });
  });

  // 初始渲染
  renderPresets();
  renderWatchlist();

})();
