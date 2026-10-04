# Chanel 主页对齐与官网发布

用户认可 `0eded1c3` 案例 Preview，并要求保留该页，调整主页对应描述后发布。沿用已选 Native；本次是已认可论证的主页摘要对齐，不重新设计完整案例。

## 执行范围

- [x] 保留真实 Bocconi/Milan 开篇、passing conversation 项目缘起及标题。
- [x] 将后续叙述改为经营恢复 → 地区/渠道与业务范围 → 产品/价格/体验的有限解释。
- [x] 首页首个数据块使用 FY2023–FY2025 窗口；显示两年的可比收入增长及 FY2025 收入/利润/FCF 相对 FY2023 的恢复程度，采用案例已有数据。
- [x] 首页移除先行价格/历史图，其完整证据仍在已认可案例页；组件文件保留。
- [x] humanize-ai 与 writing-analyst-prose 审阅。
- [ ] 类型、构建、桌面/窄屏及详情入口核对；不添加或运行自动化测试。
- [ ] 可审阅提交、最终独立审阅及 PR 更新。
- [ ] 发布同一构建至官网，核对实际主页与案例页。

## 决定与边界

最新用户要求替代 2026-09-17 主页设计中价格先行的叙事顺序。保留其真实项目缘起、自然滚动、低干扰动效与首页/完整研究两层结构。2026-10-04 用户已认可案例，生产发布授权在本次主页对齐后生效。

继续复用 `codex/chanel-slowdown-case-study` 和 PR #4；文件职责限于 home.ts、ChanelChapter、ChanelBusinessSignal 与对应样式。案例页不得改动。官网上线前提交与审阅；所有增长口径、集团范围、未识别策略贡献保持明确。

## 语言审阅与核对

writing-analyst-prose：以部分恢复为主张，使用相同财务窗口和三个恢复比例；地区、渠道定位恢复，业务范围引出候选解释。可比增长与报告美元基期比例分开标注。CHANEL 25 用途归于选定公开自述；策略贡献与营销因果没有升级为已测量结论。

humanize-ai：按个人项目介绍处理，保护 Bocconi/Milan 与 passing conversation 真实缘起。删去旧的“visible explanations → pricing complete → something missing”转折，保留自然第一人称和具体发现，没有新增经历或情绪。商业规范措辞不因去 AI 味而被口语化或夸大。

初次渲染发现原 .chanel-business-signal 桌面 grid-column 被嵌套继承，导致隐式列。已为 .chanel-chapter__visible 的直接子块显式限定同一列，按实际 computed styles 确认：标题、段落和数据块均为 1 / -1。

- `npm run check`：59 files，0 errors / warnings / hints。
- `npm run build`：7 routes 成功；已有 phases 空目录警告。
- 桌面：三个新标题顺序正确；当前价格与价格历史图不再出现在首页；FY2023–FY2025 数据块明确标注可比增长及报告美元基期。
- 390×844：页面宽与 viewport 均 390；恢复比例显示单列，文字与数字可读。
- Results and sources 入口实际跳到已认可案例 #performance，标题和经营图保持一致。
- 案例 Astro、案例元数据、价格与财务证据输入均无本轮改动。

待完成最终提交、独立审阅及发布结果登记。
