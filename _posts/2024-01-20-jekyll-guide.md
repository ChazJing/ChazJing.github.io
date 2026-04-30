---
layout: post
title: 使用Jekyll搭建个人网站指南
date: 2024-01-20
categories: [技术分享]
tags: [Jekyll, GitHub Pages, 教程]
excerpt: 详细介绍了如何从头开始搭建一个基于 Jekyll 和 GitHub Pages 的个人网站，包括每个步骤的说明。
---

# 使用 Jekyll 搭建个人网站

Jekyll 是一个静态网站生成器，特别适合搭建博客网站。本文将手把手教你如何搭建。

## 什么是 Jekyll？

Jekyll 是一个用于构建静态网站的工具，它可以将纯文本（Markdown）转换为漂亮的网站。

## 准备工作

1. **创建 GitHub 账号** - 访问 github.com 免费注册
2. **安装必要工具** - 需要安装 Git 和 Ruby（Jekyll 的运行环境）

## 步骤一：创建仓库

在 GitHub 上创建一个新仓库，命名为：
```
你的用户名.github.io
```

## 步骤二：本地创建网站

```bash
# 克隆仓库到本地
git clone https://github.com/你的用户名/你的用户名.github.io

# 进入目录
cd 你的用户名.github.io

# 创建必要文件
```

## 步骤三：写文章

在 `_posts` 文件夹中创建 Markdown 文件即可。

## 部署

只需将代码推送到 GitHub，网站就会自动更新！

## 常见问题

**Q: 需要编程基础吗？**  
A: 不需要！按照这个框架来操作即可。

**Q: 支持 Markdown 吗？**  
A: 完全支持！Jekyll 原生支持 Markdown。

希望这个教程对你有帮助！