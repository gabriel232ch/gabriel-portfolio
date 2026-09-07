# Home editorial refresh review — 2026-09-07

本轮依据 `docs/superpowers/specs/2026-09-07-home-editorial-refresh-design.md` 与对应 implementation plan，按 Task 1–7 完成首页改版。历史审计文档 `docs/audit-2026-09-07/review.md` 保留不改写。

## 交付结论

- 首页已完成整页交付：Hero、Luxury、Olist、Competitive、Now、Closing 均已实现；没有停在 Luxury 样板。
- 保留了原有编辑式视觉、主题系统、三组研究数据、来源链接和既有 lab 页面；没有新增依赖、路由、照片或虚构经历、日期、研究成果。
- 研究正文改为可展开的 `Read the research notes`，默认入口使用方案指定的短标题与 takeaway；无 JavaScript 时研究内容仍可读。
- 已更新 Home 四张视觉基线；未更新 design-system / lab 基线。

## Task 1–7 结果

1. **Task 1 — 内容与数据契约：** 增加 Home 所需的 intro、reading、headline、takeaway、author note 字段；保留原 question、outcome、evidence、signals、价格和 GMV/交付数据。
2. **Task 2 — Hero 与导航：** 首屏使用指定研究入口，导航只保留 `WORK` 与 `NOW`，未保留虚假动态活动或自身 INDEX 导航。
3. **Task 3 — Luxury 样板：** 使用真实 France/U.S. 观察价格范围，保留 US 默认展开、France 默认收起、来源与描述性边界；完整研究内容可展开。
4. **Task 4 — Olist 与 Competitive：** Olist 同时呈现 GMV 与准时交付及六个 Fix 市场；Competitive 保留五个机制与来源访问边界，未把推断写成已验证收益。
5. **Task 5 — Now 与 Closing：** Now 使用真实工作状态和方案指定作者说明；Closing 提供 Selected work 与两个真实来源出口。
6. **Task 6 — 响应式、主题、可访问性：** 完成 390/768/1024/1440 断点检查、浅色/深色检查、键盘展开、无 JS 检查、 reduced-motion 检查及横向溢出检查。
7. **Task 7 — 视觉验收与全量验证：** 人工打开并检查修改前后整页、Hero、Luxury 截图；Home 四张视觉基线稳定通过；随后执行完整 `npm run verify`。

## 截图

修改前截图（来自本轮开始前的审计材料，未覆盖）：

- `docs/audit-2026-09-07/before/home-desktop-light.png` — 1440×9282
- `docs/audit-2026-09-07/before/home-desktop-dark.png` — 1440×9282
- `docs/audit-2026-09-07/before/home-mobile-light.png` — 390×7521
- `docs/audit-2026-09-07/before/home-mobile-dark.png` — 390×7521

修改后截图（最终代码重新生成）：

- `docs/audit-2026-09-07/after/home-desktop-light.png` — 1440×6607
- `docs/audit-2026-09-07/after/home-desktop-dark.png` — 1440×6607
- `docs/audit-2026-09-07/after/home-mobile-light.png` — 390×6239
- `docs/audit-2026-09-07/after/home-mobile-dark.png` — 390×6239
- `docs/audit-2026-09-07/after/home-desktop-light-hero.png` / `home-mobile-light-hero.png`
- `docs/audit-2026-09-07/after/home-desktop-light-luxury.png` / `home-mobile-light-luxury.png`
- 对应的 dark Hero/Luxury 截图也保存在同目录。

整页截图在 `reducedMotion: reduce`、字体加载完成后生成；截图检查过，没有空白、未加载文字或半透明内容。修改前后的整页高度变化来自移除旧的动态/冗余层级并压缩首屏，不是裁剪截图。

## 实测布局与可读性

`#work` 从文档顶部的实测位置如下（浅色/深色一致）：

| viewport | `#work` top | `scrollWidth / clientWidth` |
| --- | ---: | ---: |
| 390×844 | 641px | 390 / 390 |
| 768×844 | 531px | 768 / 768 |
| 1024×844 | 555px | 1024 / 1024 |
| 1440×844 | 663px | 1440 / 1440 |

在打开所有 research notes、各断点和两种主题的检查中未发现横向溢出。最终 computed 颜色对比度测量为：浅色正文 15.892:1、作者说明 4.985:1；深色正文 16.009:1、作者说明 7.733:1。

## 实际运行记录

- `npm run check` — 通过，0 errors / 0 warnings / 0 hints。
- `npm run lint` — 通过。
- `npm run test` — 4 个 test files、13 tests 全部通过。
- `npm run build` — 通过，4 个静态页面构建完成。
- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:4328 npx playwright test tests/e2e/home.spec.ts tests/e2e/home-motion.spec.ts tests/e2e/theme.spec.ts` — 32 tests 通过。
- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:4328 npx playwright test tests/e2e/home-visual.spec.ts` — Home 视觉 4 tests 通过，4 个由项目配置跳过。
- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:4328 npm run verify` — 64 passed、6 skipped、0 failed。

全量验证覆盖 Home 行为、主题、动效、无 JS、键盘交互、响应式溢出、数据来源、lab 和自定义 404。`check/build` 输出中的 `src/content/phases` glob warning 是仓库已有的空内容目录提示；诊断结果仍为 0 errors / 0 warnings / 0 hints，未新增产品问题。

## 环境与范围限制

- 本地预览当前为 [http://127.0.0.1:4328/](http://127.0.0.1:4328/)；由于 4321–4327 已被其他本地进程占用，Playwright 通过 `PLAYWRIGHT_BASE_URL` 使用实际预览端口，默认配置仍保留 4321。
- 本轮没有部署、push 或创建 PR。
- 视觉品味和最终内容偏好仍属于用户判断；从实现、数据完整性、响应式和自动化验证角度没有未解决阻塞项。
