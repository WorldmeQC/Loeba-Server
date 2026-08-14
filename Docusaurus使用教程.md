# Docusaurus 使用教程

> 本教程整理自 Docusaurus 默认初始化教程，供 Loeba 列巴工坊服主后续维护网站时查阅。

---

## 1. 常用命令

```bash
# 本地开发预览
npm run start

# 构建生产站点
npm run build

# 本地预览构建结果
npm run serve

# 清理缓存
npm run clear

# 类型检查
npm run typecheck
```

开发服务器默认运行在 `http://localhost:3000/`，保存文件后会自动刷新。

---

## 2. 修改服务器信息

服务器地址和版本写在 `docusaurus.config.ts` 的 `customFields` 中：

```ts
customFields: {
  serverIp: 'x54.minekuai.com:13050',
  serverVersion: '26.2',
},
```

首页标题、副标题、导航栏等也在 `docusaurus.config.ts` 中修改。

---

## 3. 添加文档页面

文档页面放在 `docs/` 目录下，Docusaurus 会自动根据文件生成侧边栏。

### 新建一篇文档

1. 在 `docs/` 下新建文件，例如 `docs/规则.mdx`。
2. 顶部加上 front matter：

```mdx
---
sidebar_position: 2
---

# 服务器规则

这里是规则内容。
```

- `sidebar_position` 数字越小，在侧边栏越靠前。
- 文件名会决定 URL，例如 `docs/规则.mdx` 对应 `/docs/规则`。

### 创建文档分类

在子目录下创建 `_category_.json`：

```json
{
  "label": "新手入门",
  "position": 1,
  "link": {
    "type": "generated-index",
    "description": "新人必读"
  }
}
```

---

## 4. 添加独立页面

除了文档，也可以创建独立页面，例如公告页、关于页等。

1. 在 `src/pages/` 下新建文件，例如 `src/pages/about.mdx`：

```mdx
# 关于我们

这里是关于服务器的内容。
```

2. 页面会自动对应 `/about` 路径。
3. 如需导航栏入口，编辑 `docusaurus.config.ts` 的 `navbar.items`：

```ts
items: [
  {
    type: 'docSidebar',
    sidebarId: 'tutorialSidebar',
    position: 'left',
    label: '文档',
  },
  {
    to: '/about',
    label: '关于',
    position: 'left',
  },
],
```

---

## 5. 替换首页 Banner 背景图

当前首页 Banner 使用渐变背景，后续替换为图片的步骤：

1. 准备一张背景图，放入 `static/img/`，例如 `static/img/banner.jpg`。
2. 编辑 `src/pages/index.module.css`，找到 `.heroBanner` 类，将：

```css
background: linear-gradient(...);
```

替换为：

```css
background: url('/img/banner.jpg') center/cover no-repeat;
```

3. 如需叠加暗色遮罩，可再加一层伪元素或使用 `linear-gradient` 叠加：

```css
background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
  url('/img/banner.jpg') center/cover no-repeat;
```

---

## 6. 添加服务器展示图片

首页有一个自动滚动的图片展示区域，图片会自动从 `static/img/showcase/` 读取。

1. 把截图或宣传图放入 `static/img/showcase/`。
2. 支持格式：`png`、`jpg`、`jpeg`、`webp`、`gif`、`svg`。
3. 建议文件名用英文或数字，例如 `spawn.png`、`city.jpg`。
4. 重新运行 `npm run start` 或 `npm run build` 即可看到更新。

图片会自动横向无限滚动，鼠标悬停时会暂停。如果文件夹为空，首页会显示提示文字。

---

## 7. 替换 Logo 和 Favicon

- `static/img/logo.svg`：导航栏左侧的 Logo。
- `static/img/favicon.ico`：浏览器标签页图标。

直接替换同名文件即可，刷新浏览器缓存后生效。

---

## 8. 修改主题颜色

全局颜色在 `src/css/custom.css` 的 `:root` 和 `[data-theme='dark']` 中修改。

关键变量：

- `--ifm-color-primary`：主题主色
- `--hero-gradient-start/mid/end`：首页 Banner 渐变
- `--ifm-card-background-color`：卡片背景色

---

## 9. 常用 Markdown 语法

Docusaurus 支持标准 Markdown 和 MDX。

```md
# 一级标题
## 二级标题

- 列表项
- 列表项

1. 有序列表
2. 有序列表

**加粗**、*斜体*、`代码`

[链接文字](https://example.com)

![图片说明](/img/xxx.png)

```bash
echo "代码块"
```

> 引用文字
```

---

## 10. 构建并部署

```bash
npm run build
```

构建产物在 `build/` 目录下，可以直接部署到任何静态托管服务（如 Nginx、GitHub Pages、Vercel 等）。

---

## 11. 更多资源

- Docusaurus 官方文档：https://docusaurus.io/docs
- MDX 语法：https://mdxjs.com/

祝维护愉快！
