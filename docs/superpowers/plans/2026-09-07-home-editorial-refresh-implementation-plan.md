# Home Editorial Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. 本方案选择单代理顺序执行，不需要子代理，也不需要 Figma。

**Goal:** 把当前首页整理成可快速浏览、能深入阅读、具有作者存在感的研究手记，同时保留真实研究证据和原有编辑式审美。

**Architecture:** 沿用 Astro 静态首页、独立作品组件和内容集合。首页短标题与一句发现存入 work 的 home 元数据；原问题、结论和证据保留在原生 details 内。仅调整首页组合、局部 CSS、相关内容和测试，不建立详情页或新服务。

**Tech Stack:** 当前 package.json 中的 Astro、TypeScript、CSS、Vitest、Playwright；Node >=22.12.0；沿用 lockfile，不升级依赖。

**Spec:** `docs/superpowers/specs/2026-09-07-home-editorial-refresh-design.md`，执行前完整阅读。

**执行对象:** GPT‑5.6 Luna，reasoning effort `xhigh`（界面显示 Extra High）。由用户在目标任务设置，不在仓库配置模型，也不自动切换模型。

## Global Constraints

- 保留 Astro 静态页面、现有字体资源、浅深主题、4/6/12 栅格、三个项目顺序。
- 首页语言保持英文。文案采用执行方案给定版本；项目发现仅压缩现有证据。
- 不引入 Figma、图片生成、新框架、动画库、CMS、图谱或新依赖。
- 字号、间距、布局变化限定在 Home；全局 tokens、lab 和主题机制原则上不变。
- 不虚构日期、工作成果、爱好、照片、联系方式、公司案例、市场数字、因果关系或新的 Living Index ID。
- 不把私有研究链接改成公开发布动作。不要求用户提供照片；无素材时本轮仍完整交付。
- 不部署、不 push、不创建 PR。本轮在本地完成可审查 diff、截图和验证；不要把历史视觉批准当成本轮批准。
- 保留已有用户修改；不 reset、不清理他人工作、不停止不是自己启动的服务器。
- 按下面顺序连续完成：样板阶段通过自查后继续其余部分，不停在只做首屏，也不每步询问批准。
- 项目数据 TS 文件是证据源，不为适配布局改值。必要说明不可仅藏在外链或 tooltip 内。

## 0. 当前问题和执行策略

本轮解决四件事：首屏过高且介绍抽象；项目没有易扫描的标题；重复的大段问题和结论拖慢阅读；ABOUT/INDEX 名称与目的地不符。

源码还暴露一个值得直接修正的原因：桌面 hero identity 使用 `1 / span 7`，phase 使用 `7 / span 4`，并且未指定同一行，重叠列导致自动排到下一行。平板只有六列，Now 等元素却使用越界的 span。不要只缩小 padding 来掩盖这些问题；按本文明确的行列重排。

先完成内容结构、首屏、Luxury 样板和页尾，实际检查；随后完成 Olist、Competitive、Now 和整页验收。这是一个完整交付，不是要求用户审批的两个独立阶段。

## 1. 文件责任与稳定接口

| 文件 | 责任 |
|---|---|
| `src/data/home.ts` | 作者介绍、两个阅读链接、近况、作者说明；照片/档案为空 |
| `src/content.config.ts` | 给 featured work 的 home 增加短标题和短发现 |
| `src/content/work/*.md`（现有三份） | 增加标题/短发现，保留所有原始 home 字段及来源 |
| `src/pages/index.astro` | 维持主组件顺序；传递新增作者说明 |
| `src/components/home/HomeHero.astro` | 姓名、介绍、阅读链接 |
| `src/components/home/HomeNavigation.astro` | WORK / NOW，现有 ThemeToggle |
| 三个 `*Feature.astro` | 项目首层、原有可视化、完整研究笔记 |
| `src/components/home/NowSection.astro` | 近况和作者说明；保留可选照片支持 |
| `src/components/home/EditorialClosing.astro` | 真实去向与简洁署名 |
| `src/styles/home.css` | 首页组合与字体间距；修改原规则，不追加一长串覆盖补丁 |
| `src/components/home/HomeMotionController.astro` | 仅在有证据表明必须时修复交互后的 reveal；首选减少挂载目标 |
| `tests/unit/home.test.ts` | 更新过期的 movement 契约 |
| `tests/e2e/home.spec.ts`、`home-motion.spec.ts`、`home-visual.spec.ts` | 行为、内容、响应式、动态与新视觉验收 |
| `docs/decisions/2026-09-07-home-editorial-refresh-review.md` | 本轮结果、截图、运行记录、尚存限制 |

允许创建一个小型 `WorkResearchNotes.astro` 来承载三个相同的研究笔记块，接口如下。不抽象三种作品整体布局，不复制整个首页成第二套代码。

```ts
interface Props {
  question: string;
  outcome: string;
  evidence: Array<{ label: string; value: string; note?: string }>;
}
```

稳定选择器：保留 `data-work-slug`、市场/指标/机制各自的 data 属性。新增 `data-work-title`、`data-work-takeaway`、`data-research-notes`、`data-home-reading`、`data-author-note`。`data-work-question/outcome/evidence` 随完整研究块移动，但不要删除。

## 2. 固定内容方案

### 2.1 首页状态

`HOME_WORK_SLUGS` 不变；`HOME_STATE.now`、`personalSnapshot: null`、`archive: null` 保留。删除 `currentPhase` 和 `movements`，用下列字段替换其职责；同步更新引用，不保留两套死数据。

```ts
intro: {
  label: 'RESEARCH / SYSTEMS / NOTES',
  statement: 'I explore how businesses work, and how research can become useful systems.',
},
reading: [
  {
    title: 'How luxury brands structure price',
    href: '#work',
    label: 'PRICING RESEARCH',
  },
  {
    title: 'When marketplace growth strains delivery',
    href: '#olist',
    label: 'MARKETPLACE ANALYSIS',
  },
],
authorNote: {
  title: 'A place to keep thinking',
  body: 'This is a place for work, research, and ideas I want to return to. I’m building it to grow with my interests over time.',
},
```

介绍和作者说明是对现有定位的编辑性压缩，不暗示新经历。作者说明不写“我在旅行中发现…”之类没有来源的事实。阅读列表标题为 `START READING`，不标“Latest”、不加假日期，不使用内部审批里程碑。

近况原始三项内容沿用。可把展示标签缩短为 `NOW`、`ALSO EXPLORING`；不要新编工作结果。底部不动态显示当天日期制造更新感；本轮移除旧的固定 UPDATED 字样，仅留名字和域名。

### 2.2 三个作品的 home 新字段

在现有 `home` schema 加入必填字段（本仓库现有三项一并迁移）：

```ts
headline: z.string().min(1),
takeaway: z.string().min(1),
```

保留 canonical `title` 不变。`home.headline` 是展示 h2，`home.takeaway` 是紧随其后的普通段落，不把一段话设为 h2。

| slug | headline | takeaway |
|---|---|---|
| luxury-handbag-pricing-architecture | Luxury pricing, compared | Chanel’s observed range begins higher, with lower tiers overlapping Louis Vuitton and Dior and upper tiers overlapping Hermès. |
| olist-marketplace-analysis | Growth and delivery, in tension | GMV growth was volume-led, while on-time delivery declined—supporting different priorities for growth and repair. |
| competitive-positioning-against-giants | Smallness is not an advantage | The archive points to leverage, organizational alignment, mission-critical talent, and visible output as the mechanisms that matter. |

YAML 中字符串用引号包住，避免冒号和特殊符号解析歧义。三个原 `home.question/outcome/evidence/signals` 全保留，不替换为新短文案。不要用“利润增长”“已经改善履约”“小公司必然获胜”等更强结论。

### 2.3 链接目的地

- 顶部 WORK → `#work`，NOW → `#about`；移除顶部 INDEX。
- Luxury 继续保留 `id="work"`。
- Olist 增加 `id="olist"`；Competitive 增加 `id="competitive"`。
- Now 保留 `id="about"`；页尾保留 `id="index"`，仅为旧链接兼容，不渲染指向它自己的 INDEX。
- 页尾标题：`Keep exploring`；链接：`Selected work` → `#work`，`Luxury pricing repository` → 现有 Luxury `source.github`，`Olist analysis repository` → 现有 Olist `source.github`。
- 把两个 source 从已有 entry 传给 Closing，不额外维护硬编码 URL 副本。Closing Props 添加 `sources: Array<{label: string; href: string}>`。
- 外链普通链接即可，不预取、不 iframe、不自动打开、不请求登录。Competitive 来源现有是私有仓库：保留当前出处，但标签明确 `Source archive (access required)`；它不能成为唯一的继续阅读入口，站内研究笔记必须可读。不公开或复制额外私有材料。

## 3. 布局与视觉尺度

这些是目标范围，执行者可在范围内按实际换行调整；不得为满足高度而裁剪文字或隐藏内容。

### 首屏

- 1440×900：导航下方留 64–88px，姓名 88–112px；介绍 24–30px；姓名与介绍同一行。名字仍是视觉主点。
- 桌面 hero 左侧占 1–6 列，右侧占 8–12 列；介绍和阅读列表堆叠于右侧，不再串成三个阶梯行。
- 768–1151px 使用真正的六列：左右各三列；最窄平板若文案换行过多，可上下排列，禁止隐式创建第七列。
- 390×844：顺序是姓名、介绍、阅读入口。姓名 52–64px，介绍 22–26px。首屏须完整显示介绍和至少一个阅读链接；不能只看见名字。
- 首屏不设 `height:100vh` 或大块 min-height。1440×900 时 `#work` 顶部应在约 650–820px；390×844 时它不晚于约 1000px。字体加载后测量。

明确网格代码方向（适配实际 class）：

```css
@media (min-width: 48rem) {
  .home-hero__identity { grid-column: 1 / span 3; grid-row: 1; }
  .home-hero__context { grid-column: 4 / span 3; grid-row: 1; }
}
@media (min-width: 72rem) {
  .home-hero__identity { grid-column: 1 / span 6; grid-row: 1; }
  .home-hero__context { grid-column: 8 / span 5; grid-row: 1; }
}
```

### 作品共同层级

- 上边界间距桌面 72–112px、手机 48–64px；不要继续叠加 12rem padding 与 9rem margin。
- 类别/编号轻量一行；h2 使用现有 Cormorant editorial 字体，常规正体 36–48px 桌面、28–34px 手机；最大 24ch 左右，允许自然换行。
- takeaway 用 Newsreader 18–22px，行高 1.45–1.6，最大 60ch；正文不全大写、不大段斜体。
- 元信息和图表值最小 12px，导航至少 13px，正文至少 16px。窄屏数值换行，不能重新缩到 8px。
- 先展示发现和证据，再提供展开入口。方法和长问题放研究笔记。关键币种、时期、描述性边界在默认可见层。
- 复用现有纸色、墨色、细线；本轮不新增强调色。通过字号、结构和数据差异建立层次。

### 三种作品构图

Luxury：标题和 takeaway 在上；下方左三列简短范围说明、右八列原价格图。平板左右三列或上下排；手机上下排。美国默认展开，法国原生折叠；图的 min/max/四分位/median 算法不动。保留“France/U.S. local list prices · Descriptive only · Not FX/tax normalized”可见说明。研究笔记在图后，占满内容宽度。

Olist：标题和 takeaway 后，两项关键比较同时可見——GMV proxy R$2.99M → R$7.22M、On-time delivery 96.50% → 92.27%；在两项共同上方显示 `JAN–AUG / 2017 → 2018`。复用原 metric 面板，前两项默认 open、桌面两列、手机单列；第三项 Fix 跨整行、默认折叠。GROW / DEFEND / FIX / INVESTIGATE 改为轻量文字行，不能挤成主视觉或假按钮。保留 99.40% 分解口径、六市场、2,920 orders、R$409K exposure 原有说明；exposure 不写成 savings。

Competitive：最短、最偏文本的一段。标题和 takeaway 后保留五个机制的原生展开行，第一个默认展开；序号 01–05、机制名称、解释即可。去掉“OPEN / CLOSE”重复文案，保留明确展开符号及原生语义。现有 `INDEPENDENT COMPARATIVE ANALYSIS / NOT EMPLOYER-SPECIFIC` 默认可见，研究笔记在后。

Now：桌面主线和两支线同一区域，间距收紧；下面放作者说明。平板只用六列以内；手机自然堆叠。不要通过制造空照片位增加“个人感”。

Closing：约 180–300px 的简洁收尾（手机由内容自然增长），标题、三条真实链接、署名；不再用大型 ABOUT/INDEX 两块占一整屏。

### 完整研究笔记块

可用如下结构形成公共组件；标题与 evidence 的数据来源始终为旧字段：

```astro
<details class="work-research-notes" data-research-notes>
  <summary>Read the research notes</summary>
  <div class="work-research-notes__body">
    <h3>Research question</h3>
    <p data-work-question>{question}</p>
    <h3>Full finding</h3>
    <p data-work-outcome>{outcome}</p>
    <h3>Evidence and scope</h3>
    <dl>
      {evidence.map((item) => (
        <div data-work-evidence>
          <dt>{item.label}</dt>
          <dd>{item.value}{item.note && <p>{item.note}</p>}</dd>
        </div>
      ))}
    </dl>
  </div>
</details>
```

组件 frontmatter 按第 1 节 Props 声明并解构 `Astro.props`。笔记默认 closed，内部不挂 `data-home-motion`，无需 JS 即可展开。不要在嵌套 details 的 summary 内放链接。

## Task 1 — 基线与内容契约

**Files:** home.ts、content.config.ts、三个 work md、tests/unit/home.test.ts。
**Consumes:** 原有 HOME_STATE、work schema。
**Produces:** intro、reading、authorNote、home.headline/takeaway。

- [ ] 阅读本设计、本计划、根目录适用 AGENTS.md、现有主题/网格和 tests。执行 `git status --short`，记录用户已有变更。
- [ ] 运行 `node --version` 和 `npm run check`。已有 node_modules 不重装；基线失败先区分环境错误和代码错误，记录，不归因于本轮。
- [ ] 浏览当前首页保存 desktop/mobile 的修改前证据；前一轮 screenshot 可用作历史补充，实际基线以本轮为准。
- [ ] 更新 unit test：保留 slug 顺序、三条真实 now、null 图片/档案；将“exactly two movements”改为两条真实阅读路径。测试应包含：

```ts
it('offers two real starting points without invented activity dates', () => {
  expect(HOME_STATE.reading.map((item) => item.href)).toEqual(['#work', '#olist']);
  expect(HOME_STATE.reading.every((item) => !('date' in item))).toBe(true);
});
```

- [ ] 运行 `npm run test -- tests/unit/home.test.ts`，确认新字段尚不存在导致预期失败。
- [ ] 按第 2 节迁移数据和 schema。组件旧引用会暂时失败，下一任务立即迁移，不用兼容假数据掩盖。
- [ ] 再运行该 unit test，应通过；三份 frontmatter 均有新必填字段。

## Task 2 — 首屏、导航、页尾与真实去向

**Files:** HomeHero、HomeNavigation、EditorialClosing、index.astro、home.css、home.spec.ts。
**Consumes:** 新 HOME_STATE；Luxury/Olist entries。
**Produces:** 紧凑首屏、WORK/NOW 导航、无自指页尾。

- [ ] HomeHero 增加 `home-hero__context` 包装 intro 和 reading；h1 仍唯一 `Gabriel Chen`；保留有用的 folio 或移除多余装饰，不保留 LIVING SIGNAL/CURRENT PHASE/建设里程碑。
- [ ] 阅读列表用普通 `<a data-home-reading href={item.href}>`，标题 START READING。首屏正文不挂初始隐藏的 motion，移除 hero ambient rule 及死 CSS，避免作者名入场前呈浅灰不可读。
- [ ] 改导航链接；ThemeToggle 原组件不改。
- [ ] index.astro 从已读取的 entry 建立 Closing sources：

```ts
const closingSources = [
  { label: 'Luxury pricing repository', href: luxury.data.source.github },
  { label: 'Olist analysis repository', href: olist.data.source.github },
].filter((item): item is { label: string; href: string } => Boolean(item.href));
```

- [ ] 给 Closing 传 `sources={closingSources}`，仍传 `archive`；移除 INDEX 自指、Editorial closing、HOME V1、旧更新日期。返回作品使用 `#work`。
- [ ] 按第 3 节替换 hero 与 closing 的原 CSS，所有断点避免交叉覆盖；给相关 section 加约 24px scroll-margin-top。
- [ ] 在 Olist 根 section 加 `id="olist"` 使首屏链接立即可用；Competitive 加 `id="competitive"`。
- [ ] 修改 home.spec.ts 顶部导航契约为 WORK/NOW；移除旧 CURRENT PHASE/movement 检查，增加两个阅读链接、有效目的地和无 INDEX 自指的断言。
- [ ] 运行 `npm run check`，再运行 `npx playwright test tests/e2e/home.spec.ts -g 'navigation'`。失败按实际原因修复，不删除功能断言。

## Task 3 — Luxury 样板与完整笔记

**Files:** LuxuryFeature、可选新增 WorkResearchNotes、home.css、home.spec.ts。
**Consumes:** home.headline/takeaway + 旧证据；价格计算不变。
**Produces:** 可以扫描、有默认数据证据、可深入阅读的第一个作品。

- [ ] 用 `h2#luxury-feature-title[data-work-title]` 展示 headline；`p[data-work-takeaway]` 展示 takeaway。原 outcome h2 删除其标题角色，旧内容移到笔记内。
- [ ] 用第 3 节完整笔记组件保存 question/outcome/三条 evidence 与 note；删除原首层重复的 QUESTION/OUTCOME/EVIDENCE 标题和重复文段。
- [ ] 保留原价格图、FR/US 控件、格式化和来源；把图标题简化为 `Observed price ranges`。去掉 `BUILD-TIME SNAPSHOT` 实现术语，保留数据描述性边界。
- [ ] 调整局部布局和字体；图表是内容，不另生成图片替换它。价格图大容器不挂 data-home-motion；默认 open 的数据无需等待进入动画才可见。
- [ ] 修改 Luxury 相关测试：首层看 title/takeaway；点击研究笔记再检查 question/outcome/三条 evidence 可见；FR 默认关闭、US 默认打开以及币种/数值断言继续保留。
- [ ] 运行 `npx playwright test tests/e2e/home.spec.ts -g 'Luxury'`。
- [ ] 在 1440×900 与 390×844 实际看首屏、Luxury 和页尾，记录截图；修复重叠、字小、留白断层和链接无目标。完成样板后继续 Task 4，不等待新批准。

## Task 4 — Olist 与 Competitive 全量迁移

**Files:** OlistFeature、CompetitiveFeature、home.css、home.spec.ts。
**Consumes:** 同一笔记接口和各自原数据。
**Produces:** 三种构图、统一阅读层级。

- [ ] Olist h2 改 headline，takeaway 独立段落，旧长文移到笔记；各 `data-olist-*` 契约保留。
- [ ] 前两个原 metric 默认 open：在现有 map/render 条件中将判断改为前两项（读取当前实现后用实际 index/metric key，不猜变量名）。第三项仍 closed。
- [ ] metric 父容器桌面两列，第三项 `grid-column:1/-1`；手机单列。保持原曲线比例、数值、时期说明与 source；不要把不同单位放在共享数量轴上。
- [ ] GROW 等改轻量四项列表，保留可访问文本，不加点击行为。
- [ ] Competitive 同样迁移 headline/takeaway/notes；保留五机制原说明和第一项默认展开；来源文案说明访问限制。保留研究边界可见。
- [ ] 清理三作品过期的 question/outcome 顶层定位 CSS，用明确各区块列范围代替旧阶梯式 margin；不要改全局 editorial-grid。
- [ ] home.spec.ts 更新三作品共同契约为首层短内容、笔记展开后完整证据；更新 Olist 第二项默认 open 的操作（不能盲点把它关闭后断言打开）。保留所有数值/五机制/市场顺序断言。
- [ ] 运行 `npx playwright test tests/e2e/home.spec.ts`。

## Task 5 — Now 与作者说明

**Files:** NowSection、index.astro、home.css、home.spec.ts。
**Consumes:** HOME_STATE.now、authorNote、personalSnapshot。
**Produces:** 紧凑近况和真实作者说明。

- [ ] NowSection Props 加 `authorNote: typeof HOME_STATE.authorNote`，index 传入；既有 now.primary/side 内容不变。
- [ ] 在支线之后加入 `<aside class="home-now__author-note" data-author-note>`，h3 与 p 使用给定 title/body。
- [ ] 移除过大的上下 padding/阶梯 margin；平板 primary `1 / span 3`、side `4 / span 3`，桌面 primary `1 / span 6`、side `8 / span 5`；作者说明后置、跨内容宽度。
- [ ] 保留 null 照片和 archive 的无占位表现，不删除可选支持。
- [ ] 更新测试验证作者说明存在、三条近况仍在、无图片占位；NOW 点击后滚到 #about。
- [ ] 执行 `npm run check` 和 `npx playwright test tests/e2e/home.spec.ts`。

## Task 6 — 阅读、动态和响应式完整性

**Files:** home.css、必要时 HomeMotionController、home-motion.spec.ts、home.spec.ts。
**Consumes:** 整页最终 DOM。
**Produces:** 四主题/设备组合可读、折叠不依赖动画、键盘可操作。

- [ ] 保留少量小型块的 data-home-motion，移除整个高图表/高 section/笔记内部的该属性。理由：当前 observer threshold 0.22 对很高元素可能永远触发不了；隐藏 details 后代也无法 scrollIntoView。
- [ ] 动态测试只遍历可见的小型 motion 节点；不要为了绿测隐藏问题：额外验证展开的笔记文字 opacity=1，且 no-JS 展开可读。
- [ ] 删除 home-motion.spec.ts 对已删除 ambient rule 的旧断言；保留 reduced-motion 与无 IntersectionObserver 情况的内容可读断言。
- [ ] 检查 390、768、1024、1440px，不能在六列阶段创建隐式第七列。检查页面及展开后的所有图表没有横向溢出。
- [ ] 首页主要文本、数据标签、来源文字按第 3 节最小字号；source/focus 不靠颜色变化作唯一提示。链接和 summary 明确 `:focus-visible`，轮廓不能被裁切。目标可点击高度约 44px，行内来源链接留足行高。
- [ ] 深色模式复用主题变量；普通文字对比度目标 4.5:1，较大标题和必要图形 3:1。用最终 computed 颜色测量，不能只凭截图声称通过。工具不可用则记录“未测量”，不要写完全符合 WCAG。
- [ ] 200% zoom 或等效窄视口检查不裁切；不能以缩字体修溢出。

加入以下有意义的行为用例到 home.spec.ts（与旧重复用例合并，避免只堆测试）：

```ts
test('research remains readable with JavaScript disabled', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  try {
    await page.goto('/');
    for (const work of await page.locator('[data-work-slug]').all()) {
      await expect(work.locator('[data-work-title]')).toBeVisible();
      await expect(work.locator('[data-work-takeaway]')).toBeVisible();
      await work.locator('[data-research-notes] > summary').click();
      await expect(work.locator('[data-work-question]')).toBeVisible();
      await expect(work.locator('[data-work-outcome]')).toBeVisible();
      for (const evidence of await work.locator('[data-work-evidence]').all()) {
        await expect(evidence).toBeVisible();
      }
    }
  } finally {
    await context.close();
  }
});

test('reading links resolve and no viewport overflows', async ({ page }) => {
  await page.goto('/');
  for (const link of await page.locator('[data-home-reading]').all()) {
    const href = await link.getAttribute('href');
    expect(href).toMatch(/^#/);
    await expect(page.locator(href!)).toHaveCount(1);
  }
  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow, `overflow at ${width}px`).toBe(false);
  }
});

test('research notes can be opened with a keyboard', async ({ page }) => {
  await page.goto('/');
  const notes = page.locator('[data-research-notes]').first();
  await notes.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(notes).toHaveAttribute('open', '');
  await expect(notes.locator('[data-work-question]')).toBeVisible();
});
```

该 no-JS 用例显式传入 `baseURL`，因为手动 `browser.newContext()` 不会自动继承测试上下文的全部配置。

- [ ] 为溢出用例再打开全部笔记与可展开数据后检查一次。不要用 `overflow-x:hidden` 掩盖超宽元素。
- [ ] 运行 `npx playwright test tests/e2e/home.spec.ts tests/e2e/home-motion.spec.ts tests/e2e/theme.spec.ts`。

## Task 7 — 整页视觉验收与全量验证

**Files:** home-visual.spec.ts、Home 截图基线、本轮 review 文档。
**Consumes:** 全部改动。
**Produces:** 可审查结果与真实验证记录。

- [ ] 先确认预览对应当前 checkout。当前 Astro CLI 可能启动后台服务并返回另一个端口；读终端实际 URL，不能假定 4321 正常。检查现有 playwright.config.ts 的 webServer/baseURL 一致；不要测试到旧服务。
- [ ] 如果固定端口被自己的旧预览占用，可停止该实例再启动；他人进程不停止。必要时为测试 URL 加一个明确环境变量并同步 baseURL/webServer.url，默认保持原 4321；这属于测试环境修复，不改生产路由。
- [ ] 视觉截图前等待字体加载：`await page.evaluate(() => document.fonts.ready)`。静态视觉基线使用 `page.emulateMedia({ reducedMotion: 'reduce' })` 确保长页全部文字显示；另用正常 motion 模式实际滚动验证，不能只看 reduced-motion。
- [ ] 在 1440×900、390×844 各检查 light/dark，另检查 768 与 1024 宽度。按真实页面检查顺序：Hero → Luxury → Olist → Competitive → Now → Closing。
- [ ] 每个组合保存整页截图，再保存 Hero 和关键作品的视口截图到 `docs/audit-2026-09-07/after/`；打开检查截图，拒绝空白/未加载/动画半透明状态。
- [ ] 对照修改前证据确认：首屏出现具体介绍和阅读入口；作品先短内容后长笔记；Olist 两指标默认可见；Now 不再占满空白整屏；页尾每条链接有去向。
- [ ] 运行 `npm run check`、`npm run lint`、`npm run test`、`npm run build`。修复本轮问题；不改数据或删断言迎合测试。
- [ ] 修改前后截图明显不同是预期。只有人工/代理实际打开并检查新截图后，才执行 `npx playwright test tests/e2e/home-visual.spec.ts --update-snapshots`；只更新 Home 四张相关基线，不更新 lab/design-system 基线。
- [ ] 最后执行 `npm run verify`。已有 verify 包含 check/lint/unit/build/e2e，不重复无意义循环；若因截图平台缺失等环境问题失败，记录准确失败项，不能称全绿。
- [ ] 检查 `git diff --check` 和 `git diff --stat`；确认无新依赖、无 source 数据值变更、无意外 lab/global token 改动。
- [ ] 新建 review 文档，写实际命令、通过/失败数量、截图路径、首屏 #work 坐标、主题/键盘/no-JS结果、环境限制和未解决问题。历史 PASS 文档保留。
- [ ] 最终给用户：可打开的本地预览、首屏及作品前后截图、简短改动说明、完整测试结果、尚需用户判断的视觉细节。不要说“用户已批准”或“已上线”。

## 完成标准（全部勾选后才交付）

- [ ] 整页完成，包含三个作品和 Now，不只交付样板。
- [ ] 首屏手机能读完介绍，桌面姓名和介绍不再因重叠列被推到两行。
- [ ] 三个作品均有短标题、短发现、默认可见的实质证据和可展开的完整笔记。
- [ ] 全部原研究数字和来源范围保持；默认可见层保留必要口径。
- [ ] 无假动态日期、个人经历、照片、联系方式或新公开私有内容。
- [ ] WORK/NOW 与两条阅读路径可用；无 INDEX 自指控件。
- [ ] 深浅色、手机、平板、桌面均无溢出或遮挡；正文和数据可读。
- [ ] no-JS、reduced-motion、键盘和主题交互通过实际检查。
- [ ] 新截图已打开复核，Home 基线合理更新，全部验证结果如实记录。
- [ ] 代码改动在本地可审查；没有部署或推送。

## 交接给 Luna 的指令

请直接执行本方案，不重新开展开放式风格探索。先读同日设计规格和执行方案，再按 Task 1–7 顺序完成。样板只是内部阶段，不需要每一步询问确认。允许为明确的布局、可读性和测试问题做小幅实现调整，并在 review 中解释；不扩大为新路由、新框架或重新设计全站。缺少照片或个人经历时按方案的真实作者说明完成，不阻塞。最终交付整个本地可用首页、截图和实际测试结果。
