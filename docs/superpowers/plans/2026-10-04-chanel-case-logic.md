# Chanel Case Logic Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Chanel 项目页改为从行业疑问逐步进入经营诊断和有限解释的案例，并交付可审阅提交及 Preview。

**Architecture:** 复用 Astro 页面、现有数据与财务附录。先完成中文证据整合，再调整英文正文、目录和项目摘要；保留交互及来源，新增内容限于与已确认窗口相容的证据。

**Tech Stack:** Astro、TypeScript、现有 report.css、Cloudflare Workers 版本预览。

**Spec:** `docs/superpowers/specs/2026-10-04-chanel-case-logic-design.md`

## Global Constraints

- 研究窗口：FY2023–FY2025。价格快照和历史面板保留各自窗口；2026 年材料只用于说明后续发展或排除错误时点归因。
- 研究对象限定 Chanel，同行仅作背景参照，不新增 Gucci 等品牌的完整研究。
- 价格是待检验的解释之一，不能担任研究起点。
- 先完成整合研究稿，再重写英文页面。语言继续使用 humanize-ai 与 writing-analyst-prose。
- 长财务/价格资料保留可展开附录；证据边界与来源链接完整保留。
- 最终仍只发布 preview，官网部署须等用户认可 preview。
- 按本会话开发指令，不添加或运行自动化测试；实施后使用构建、类型检查及页面人工核对记录结果。

## Review Focus

- 报告汇率与可比增长：每个表保留单位、报告范围和增长定义，地区桥不能被当作纯需求贡献。
- 多窗口材料：FY2026 商品不能解释 FY2025 销售；价格观察日期不变成交易日期。
- 多业务集团：美妆规模估计不升级为审计占比，不计算手袋残差；渠道不映射成品类。
- 客户与服务资料：公开自述保留反例和选择方式，管理层评价与营销效果分开。
- 长页与窄屏：六个阅读节点顺序一致；数据表可横向滚动；附录可展开且旧证据可找到。

---

## File Map

| 文件 | 责任 |
|---|---|
| `docs/research/chanel/2026-10-04-public-evidence-review.md` | 补充来源与缺口登记 |
| `docs/research/chanel/2026-10-04-integrated-case-cn.md` | 六步中文完整论证 |
| `docs/research/chanel/2026-10-04-selected-mechanism-evidence.md`（新增） | 正文选用自述/活动的日期、原始链接、事实与推断 |
| `src/pages/work/luxury-handbag-pricing-architecture.astro` | 页面正文、导航、主图与来源 |
| `src/data/luxury.ts` | 来源常量、主表数据；仅补充 FCF 及新来源 |
| `src/data/luxury-evidence.ts` | 复用地区/渠道及价格带输入，不重采样 |
| `src/components/editorial/LuxuryFinancialAppendix.astro` | 保留长财务证据及同行旧资料 |
| `src/content/work/luxury-handbag-pricing-architecture.md`、`src/data/home.ts` | 项目元数据与首页摘要 |
| `src/styles/report.css` | 仅处理本轮布局必要调整 |
| `docs/progress/2026-10-04-chanel-logic-preview.md`（新增） | 语言审阅、构建核对、提交和预览记录 |

### Task 1: 完成解释所需的证据登记

**Interfaces:** 消费 approved spec、现有公共证据审计及 GitHub 原稿；产出六节中文论证和选用机制表。机制表列为：`案例 / 财年或日期 / 来源类型 / 原始链接 / 可确认事实 / 解释用途 / 反例或测量缺口`。

- [x] 写出 `2026-10-04-integrated-case-cn.md` 六节初稿；结论区分经营发现和未测量贡献。
- [ ] 从 `CUSTOMER_BEAUTY_REVIEW_CN.md` 追溯正文选用的用途、购买与退换反例，将原始链接和日期记入机制表；无法追溯的具体陈述不进入正文。
- [ ] 将三年官方业务/服务表与同窗口产品记录关联到机制表；后期材料明确排除 FY2025 销售归因。
- [ ] 按 Review Focus 前四项逐条核对中文稿，修正缺失来源和措辞；不存在公开贡献数字的地方保留未测量。
- [ ] 提交研究文档，提交信息 `docs: consolidate Chanel slowdown evidence and explanation`。

### Task 2: 按六个节点重写英文页面

**Interfaces:** 消费 Task 1 两份研究稿以及现有 `LUXURY_SLOWDOWN_CHANEL`、地区/渠道和价格数组。产出同一路由的正文；目录锚点固定为 `context`、`performance`、`recovery`、`products-pricing`、`experience`、`conclusion`，随后 `appendix`、`sources`。

- [ ] 将 Hero 与第一节改为行业疑问；同行增长简表放在背景，报告收入同行指数移入可展开背景资料。
- [ ] 在 `luxury.ts` 的三条 Chanel 年度记录补充 `freeCashFlow: number`：3755、1842、2646（USDm）；经营表现主表显示收入、经营利润、FCF，保留精度与基期说明。
- [ ] 将地区/渠道桥与利润桥组织在诊断段，补充三大业务的连续评论；说明每个拆分的用途，后接产品问题。
- [ ] 将现有价格端点、法国历史、价格带研究移至 `products-pricing`，与 CHANEL 25 时点和经登记的用途/反例连接；每图保留原窗口、样本与来源。
- [ ] 从 Task 1 机制表写 `experience`；使用行动、管理层评价、公开自述的各自证据级别，明确 FY2024 活动与下滑并存。
- [ ] 写 `conclusion`，先回答恢复程度和位置，再概括有限机制及贡献缺口；附录复用原组件，新增来源常量直接链接 Bain 与三年公司发布稿。
- [ ] 同步目录/脚本所用锚点；逐个定位既有图表、表格与来源，记录新位置，防止再次丢失证据。

### Task 3: 对齐摘要与完成语言审阅

**Interfaces:** 消费 Task 2 正文；产出同一研究问题的 Hero、SEO、work 元数据及首页摘要，不新增个人经历。

- [ ] 统一详情页/项目元数据题为 `How Chanel Navigated the Luxury Slowdown`；首页保留既有真实个人开篇，摘要转向部分恢复及解释范围。
- [ ] 使用 writing-analyst-prose 审阅各段的主张、证据和含义，检查归因词与来源等级；具体修改写入 progress 文档。
- [ ] 使用 humanize-ai 审阅重复转折、机械边界标签和空泛结语；保留必要的局部限定，用具体事实接续下一问。
- [ ] 对照中文论证核对英文六节、主表数值、日期和所有选用案例；记录 Review Focus 前四项的人工核对结果。

### Task 4: 提交可审阅变更并发布 Preview

**Interfaces:** 消费 Task 2–3 的完整改动；产出本地提交、现有 PR #4 更新、Cloudflare 新版本 URL、progress 记录。生产部署和合并均不在本任务中。

- [ ] 运行 `npm run check`，记录类型/内容诊断；运行 `npm run build`，确认输出成功，区分已有空 phases 警告。
- [ ] 在本地构建或新版本页面人工核对：桌面/窄屏顺序、目录跳转、图表交互、表格滚动、两层附录展开、来源链接及所有原证据位置；记录 Review Focus 第五项结果。
- [ ] 查阅 diff，将页面、数据、摘要、研究和 progress 的指定文件提交为 `feat: rebuild Chanel case around its slowdown question`；推送当前 `codex/chanel-slowdown-case-study` 分支，更新现有 PR #4 的说明。
- [ ] 通过 `npm run deploy:preview` 上传 Cloudflare 版本，记录版本 ID/URL；禁止使用 `npm run deploy`。
- [ ] 从新版本 URL 核对构建内容与提交一致，记录截图和必要的人工修正；向用户提供 PR、Preview 和一句话概括，并等待 Preview 认可。

## Self-review

六个阅读节点由 Task 2 全覆盖；有限补研究及来源追溯由 Task 1 覆盖；首页、语言、证据保留和 Preview 约束由 Tasks 2–4 覆盖。Review Focus 五项分别有明确人工核对步骤。只扩展既有年度记录的 FCF 字段，不新增数据框架或依赖。

## Execution Handoff

推荐 Native：四项任务沿同一论证连续推进，复用现有页面和数据，适合在本会话由主代理实施。用户需按 Superpowers 审阅此计划并选择 Native 或 Subagent-driven，随后调用对应执行 skill。当前已完成中文初稿，产品代码与 Preview 未变更。
