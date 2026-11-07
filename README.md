# Lingaoyang · 个人博客

一套从零写成的 Jekyll 中文个人博客主题，适合通过 **GitHub Pages 免费公开部署**。无需购买服务器、数据库、搜索服务或付费主题。

## ✨ 目前具备的功能

| 功能 | 说明 |
| --- | --- |
| 中文文章 | 使用 Markdown 写作，支持中文标题、引用、列表与代码块 |
| 分类浏览 | 自动从文章 `categories` 生成分类页 |
| 全文搜索 | 根据构建时生成的 `search.json` 检索标题、分类、摘要、正文；不依赖第三方服务 |
| 深色模式 | 点击顶部月亮／太阳按钮切换，自动跟随系统偏好并记住手动选择 |
| 文章目录 | 自动提取文章二级、三级标题，桌面端侧边栏 / 手机端折叠目录 |
| 移动端适配 | 响应式布局与触控导航 |
| 归档、RSS、404 | 按日期归档、Atom 订阅、定制 404 页面 |
| 自动部署 | 推送到 GitHub 的 `main` 分支后，GitHub Actions 自动构建与发布 |

> 提醒：`_posts` 中的四篇文章、`about.md` 中的自我介绍都是**演示内容**，不代表站长真实发表的作品。正式公开前请逐篇修改或删除。

## 🚀 第一次上线（最推荐：GitHub Desktop，适合新手）

### 1. 准备账号和文件

1. 注册或登录 [GitHub](https://github.com/)。
2. 下载这个项目的 ZIP，解压后进入 `lingaoyang` 文件夹；**这个文件夹内应能直接看到 `_config.yml`、`index.html`、`_posts` 和 `.github`**。
3. 安装 [GitHub Desktop](https://desktop.github.com/) 并登录 GitHub。

### 2. 用 GitHub Desktop 上传

1. 打开 GitHub Desktop，选择 **File → Add local repository**，选中解压的 `lingaoyang` 文件夹。
2. 如果提示 *This directory does not appear to be a Git repository*，点击 **Create a repository here**；仓库名称建议写 `lingaoyang`。
3. 在左下角填写提交说明 `Initial Lingaoyang blog`，点击 **Commit to main**。
4. 点击顶部的 **Publish repository**。仓库名保持 `lingaoyang`，**取消勾选 Keep this code private**，公开仓库，然后点击 Publish。

> 如果 GitHub Desktop 给你创建的是 `master` 分支，请先通过 **Branch → Rename** 改成 `main` 再上传。工作流监听 `main` 分支。

### 3. 启用 GitHub Pages

1. 打开浏览器，访问你刚刚上传的 GitHub 仓库。
2. 进入 **Settings → Pages**。
3. 在 **Build and deployment → Source** 中选择 **GitHub Actions**，不是 `Deploy from a branch`。
4. 回到仓库的 **Actions** 标签，找到 **Deploy Jekyll blog to GitHub Pages**。
5. 如果上传后没有自动成功部署，打开该工作流并点击 **Run workflow → Run workflow**，等状态变绿。
6. 打开 `https://你的GitHub用户名.github.io/lingaoyang/`，就能看到博客。

有时 GitHub Pages 需要几分钟更新。也可以在 Settings → Pages 查看 GitHub 给出的实际网址。

**额外方便的设计：** 部署脚本会自动识别仓库名称，生成正确的页面路径。即使以后把仓库命名为 `你的GitHub用户名.github.io`，脚本也会自动部署到网站根路径，不用手动修改 `baseurl`。

### 不想装 GitHub Desktop？

也能在 [GitHub 新建仓库](https://github.com/new) 后，使用仓库页面的 **uploading an existing file** 上传**解压后项目文件夹里的所有文件和子文件夹**。请确认隐藏目录 `.github/workflows/pages.yml` 一并上传；**不能只上传 ZIP 文件**，GitHub 不会自动解压它。然后照第 3 步启用 Pages。

## ✍️ 怎样发表新文章？

进入 `_posts`，新建一个 Markdown 文件，命名为：

```text
2026-11-08-my-first-article.md
```

文件名必须以 `年-月-日-` 开头；后半段建议用英文字母、数字和连字符，避免文章 URL 不易分享。

复制下面的内容并修改：

```markdown
---
title: "我的第一篇文章"
date: 2026-11-08 00:00:00 +0800
categories: [学习方法]
description: "用一句话介绍这篇文章。"
---

这里是文章的开头。

<!--more-->

## 第一个章节

这是正文。可以使用 **加粗**、列表、引用。

### 一个小标题

二级标题 `##` 和三级标题 `###` 会自动加入文章目录。
```

然后在 GitHub Desktop 中点击 **Commit to main → Push origin**。或者直接在 GitHub 网页上进入 `_posts`，点击 **Add file → Create new file**，写完后点击 **Commit changes**。

约几分钟后文章会自动出现在首页、归档、分类和搜索里。日期不要填写未来的时间，否则 Jekyll 默认会暂时隐藏这篇文章。

### 常用修改位置

| 想修改什么 | 文件 |
| --- | --- |
| 博客名称、简介、作者、语言 | `_config.yml` |
| 首页标题、介绍文字、关注主题 | `index.html` |
| 关于我的介绍 | `about.md` |
| 添加、编辑、删除文章 | `_posts/*.md` |
| 网站色彩、字距、卡片布局 | `assets/css/style.css` |
| 顶部导航、底部信息 | `_includes/header.html` / `_includes/footer.html` |
| 深色模式、文章目录 | `assets/js/main.js` |
| 搜索逻辑 | `assets/js/search.js` |

删除示例文章时，直接删除对应的 `.md` 文件；分类和搜索索引会在下次构建时自动更新。**尽量不要直接修改 `_site` 目录**：它是自动生成的，会被下一次构建覆盖。

## 🧪 在自己的电脑上预览（可选）

先安装 Ruby（建议 3.3）和 Bundler，然后进入这个项目文件夹运行：

```bash
gem install bundler
bundle install
bundle exec jekyll serve --livereload
```

打开 `http://127.0.0.1:4000/` 即可。修改文章通常会自动刷新。停止预览时按 `Ctrl+C`。

如果只想写作和发布，**完全可以跳过本地 Ruby 安装**，直接使用 GitHub Desktop 或 GitHub 网页编辑文章。

## 🗂️ 文件结构

```text
lingaoyang/
├── .github/workflows/pages.yml   # 自动部署到 GitHub Pages
├── _config.yml                   # Jekyll 配置
├── Gemfile                       # Ruby 依赖
├── _includes/                    # 导航、页脚、文章卡片
├── _layouts/                     # 页面和文章布局
├── _posts/                       # Markdown 文章
├── assets/css/style.css          # 所有样式
├── assets/js/main.js             # 主题、菜单、目录、阅读进度
├── assets/js/search.js           # 站内全文搜索
├── assets/img/favicon.svg        # 网站图标
├── index.html                    # 首页
├── archive.html                  # 文章归档
├── categories.html               # 分类页
├── search.html + search.json     # 搜索页和索引模板
├── about.md                      # 关于页面
├── feed.xml                      # Atom 订阅
└── 404.html                      # 找不到页面
```

## ❓ 常见问题

**上传后打开网页显示 404？**

检查 `Settings → Pages → Source` 是否为 **GitHub Actions**；检查 **Actions** 里的构建是否成功；确认网址最后有 `/lingaoyang/`（如果仓库叫 `lingaoyang`）。

**网站能否完全免费？**

使用 GitHub Free 的**公开仓库**和 GitHub Pages 可以免费托管。GitHub Pages 主要用于静态网站，需遵守 GitHub 的使用限制。私人域名不是必需的；如果你以后购买域名，则域名需要另外付费。

**博客能否只让我登录后才看见？**

这份方案是公开博客，访问者不用登录也能阅读。GitHub Pages 本身不提供针对单篇文章的私密登录功能。未准备公开的草稿请留在电脑里或放到私有位置，不要上传到公开仓库。

**文章会不会永久保存？**

文章以 Markdown 源文件保存在你的 GitHub 仓库里，并能通过 Git 历史回看修改。只要仓库、账号和服务持续可用，就能长期保留。但任何线上平台都无法承诺绝对永久；建议每月备份一份完整的项目文件夹。

**全文搜索需要付费接口吗？**

不需要。构建网站时，Jekyll 自动生成 `search.json`，访客搜索时只在本地浏览器里匹配关键词。文章很多时，索引体积可能变大；数百篇以内的个人博客通常足以使用。

## 技术说明

- 基于 Jekyll 4.4、Liquid、纯 CSS 和原生 JavaScript。
- 不依赖 CDN、第三方字体、数据库或 JavaScript 框架。
- GitHub Actions 使用 `ruby/setup-ruby`、`actions/configure-pages`、`actions/upload-pages-artifact` 和 `actions/deploy-pages` 自动发布。
- RSS/Atom Feed、搜索 JSON、分类归档都在构建时生成。
- 文章目录仅为二级和三级标题创建锚点；同时保留了键盘和屏幕阅读器的基本可用性。

---

愿你写下的每一篇文字，都成为未来值得回看的一个坐标。
