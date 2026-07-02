# TFD_Market++ Project Knowledge Base

## 项目说明
这是一个用于增强 "The First Descendant" 官方网页市场 (Nexon TFD Market) 的 Chrome 扩展程序。核心功能包括：左侧筛选器状态的保存与一键应用（预设）、单个/批量智能查询商品（特别关注）、以及基于时间的智能下拉加载。

## 关键 DOM 结构与采坑记录
1. **提取卖家名字 (Seller Name)**
   - **痛点**：卖家的 `.nickname` 标签内经常会动态插入在线状态文本（如 `• 離線`、`上线`）或被插件注入其他按钮（如“关注”按钮），导致使用 `.textContent` 获取名字时会被污染，进而使得批量查询比对失败。
   - **正确做法**：必须遍历 `sellerNode.childNodes`，仅提取 `nodeType === 3` (TEXT_NODE) 的内容，才能获得纯净的卖家游戏 ID。
2. **提取商品名字 (Item Name)**
   - **痛点**：不能使用 `.caliber` 相关的选择器（那是游戏内代币“卡利弗”的名称）。
   - **正确做法**：必须使用 `.row-wrapper .name, .module-name` 选择器来精准定位真正的商品名称（如“决意”）。
3. **智能滚动与时间比对**
   - 网页使用无限滚动（Infinite Scroll）加载较旧的商品数据。
   - 判断商品是否“已售/下架”的核心逻辑：解析商品卡片上的相对时间（如 `12 hours ago`）并存储绝对时间戳。在查询时，解析当前页面最底部商品的时间，如果最底部的时间比保存的关注时间还要老（考虑到 `hours ago` 的精度，给予 1.5 小时的容差），则断定该物品不在列表中（已售出）。
   - 触发滚动方法：`lastItem.scrollIntoView()` 并结合 `window.scrollTo(0, document.body.scrollHeight)`，并使用 2.5秒 的异步延迟等待数据加载。
4. **筛选器状态 (Filter State)**
   - 依赖捕获 `.dropdown__option.is-selected`, `.price-range__input` 以及右上角核心的 `.sort-bar__toggle-btn.is-active` (只看在线开关)。
