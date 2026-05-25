# 🎓 Git 学习指南 — 以 Hexo 博客项目为实战

> 📌 学习策略：**边搭建博客，边学 Git**，每个 Git 概念都对应一个实际操作

---

## 📚 第一章：Git 基础概念

### 1.1 Git 是什么？

Git 是一个**版本控制系统**，就像游戏的**存档系统**：

- 你可以随时保存当前进度（commit）
- 可以回到任何一个存档点（checkout）
- 可以同时开多个存档线程（branch）

### 1.2 三个区域

```
┌─────────────┐    git add     ┌─────────────┐    git commit    ┌─────────────┐
│  工作区      │  ──────────►  │  暂存区      │  ──────────►    │  本地仓库    │
│ (Working)    │               │ (Staging)    │                 │ (Repository) │
│              │  ◄──────────  │              │                 │              │
│  你的文件    │   git restore  │  准备提交的  │                 │  提交历史    │
└─────────────┘               └─────────────┘                 └──────┬──────┘
                                                                     │
                                                               git push
                                                                     ▼
                                                              ┌─────────────┐
                                                              │  远程仓库    │
                                                              │ (Remote)     │
                                                              │  GitHub      │
                                                              └─────────────┘
```

### 1.3 核心概念对照表

| Git 概念          | 博客项目中的对应          | 通俗理解     |
| ----------------- | ------------------------- | ------------ |
| Repository (仓库) | 整个 `d:\BlogFile` 文件夹 | 你的博客项目 |
| Commit (提交)     | 保存一次博客修改          | 游戏存档     |
| Branch (分支)     | 开发新功能的副本          | 平行宇宙     |
| Remote (远程)     | GitHub 仓库               | 云端备份     |
| Push (推送)       | 把本地博客上传到 GitHub   | 上传到云端   |
| Pull (拉取)       | 从 GitHub 下载最新版本    | 从云端同步   |

---

## 📚 第二章：初始化仓库（Git Init）

### 2.1 概念

`git init` 是 Git 的**起点命令**，它在你的文件夹里创建一个隐藏的 `.git` 文件夹，用来记录所有版本信息。

### 2.2 实战操作

```bash
# 进入博客项目目录
cd d:\BlogFile

# 初始化 Git 仓库
git init

# 查看是否成功（应该能看到 .git 文件夹）
ls -la    # Linux/Mac
dir /a    # Windows
```

### 2.3 验证

```bash
# 检查当前 Git 状态
git status
```

你应该会看到类似：

```
On branch master
No commits yet
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        _config.yml
        package.json
        source/
        ...
```

### 2.4 知识点总结

- `git init` 只需要执行一次
- `.git` 文件夹是隐藏的，不要手动修改它
- 执行后，Git 开始追踪这个文件夹的变化

---

## 📚 第三章：追踪文件（Git Add）

### 3.1 概念

`git add` 告诉 Git："这些文件我准备好了，可以保存了"。这叫做**暂存（staging）**。

### 3.2 实战操作

```bash
# 查看当前状态（会显示哪些文件未追踪）
git status

# 方法1：添加单个文件
git add _config.yml

# 方法2：添加多个文件
git add package.json source/

# 方法3：添加所有文件（最常用）
git add .

# 再次查看状态（文件变成绿色，表示已暂存）
git status
```

### 3.3 为什么需要暂存？

想象你要发布博客，但有个草稿文件还没写完：

```bash
git add source/_posts/       # 只添加写好的文章
# 草稿文件不会被提交
```

### 3.4 知识点总结

| 命令               | 作用         |
| ------------------ | ------------ |
| `git add <文件名>` | 暂存指定文件 |
| `git add .`        | 暂存所有修改 |
| `git status`       | 查看文件状态 |

---

## 📚 第四章：提交修改（Git Commit）

### 4.1 概念

`git commit` 是**创建存档点**。每次 commit 都会记录：

- 修改了什么文件
- 修改了哪些内容
- 谁在什么时间修改的
- 你写的备注信息（commit message）

### 4.2 实战操作

```bash
# 第一次提交：初始化博客项目
git add .
git commit -m "feat: 初始化 Hexo 博客项目"

# 查看提交历史
git log --oneline
```

### 4.3 Commit Message 规范（推荐）

好的 commit message 能让你快速了解每次修改的目的：

```
<类型>: <简短描述>

类型包括：
- feat:     新功能（第一次提交、新增文章）
- fix:      修复问题（修复配置错误）
- docs:     文档（修改 README）
- style:    样式（修改主题配置）
- refactor: 重构（调整项目结构）
- chore:    杂项（更新依赖）
```

**示例：**

```bash
# 写了一篇新文章
git add source/_posts/my-first-post.md
git commit -m "feat: 添加第一篇博客文章"

# 修改了博客主题配置
git add _config.landscape.yml
git commit -m "style: 更新博客主题配置"

# 修复了配置错误
git add _config.yml
git commit -m "fix: 修正 URL 配置错误"
```

### 4.4 查看提交历史

```bash
# 简洁模式
git log --oneline

# 详细模式
git log

# 图形化模式（推荐，能看到分支）
git log --oneline --graph --all
```

### 4.5 知识点总结

- 每次 commit 都是一个**不可变的存档点**
- commit message 要写清楚**做了什么**
- 先 `add` 再 `commit`，两步完成一次保存

---

## 📚 第五章：分支管理（Git Branch）

### 5.1 概念

分支就像**平行宇宙**：

- `main`（主分支）：正式发布的博客版本
- `dev`（开发分支）：正在开发的新功能
- `feature-xxx`（功能分支）：开发特定功能

```
main:     A ──── B ──── E ──── F
                   \         /
dev:                 C ─── D
```

### 5.2 实战场景

假设你想给博客换一个新主题，但不确定效果好不好：

```bash
# 创建并切换到新分支
git checkout -b feature/new-theme

# 在这个分支上随意修改、测试
# ... 修改主题配置、更换样式 ...

# 如果效果好，合并回主分支
git checkout main
git merge feature/new-theme

# 如果效果不好，删除这个分支（回到原来的样子）
git branch -d feature/new-theme
```

### 5.3 常用命令

```bash
# 查看所有分支
git branch

# 创建新分支
git branch feature/new-theme

# 切换分支
git checkout feature/new-theme

# 创建并切换（二合一）
git checkout -b feature/new-theme

# 合并分支到当前分支
git merge feature/new-theme

# 删除分支
git branch -d feature/new-theme
```

### 5.4 博客项目中的分支策略

```
main (主分支)
  ├── 内容：正式发布的博客
  ├── 用途：部署到 GitHub Pages
  └── 操作：只接受合并，不直接修改

dev (开发分支)
  ├── 内容：正在开发的内容
  ├── 用途：测试新功能
  └── 操作：日常开发在这里进行

feature/xxx (功能分支)
  ├── 内容：特定功能的开发
  ├── 用途：开发完成后合并到 dev
  └── 操作：一个功能一个分支
```

### 5.5 知识点总结

- 分支让你可以**安全地尝试新想法**
- `main` 分支保持稳定，用于部署
- 开发在其他分支进行，完成后合并

---

## 📚 第六章：远程仓库（Git Remote）

### 6.1 概念

远程仓库是**云端的备份**，通常是 GitHub、GitLab 等平台。你的本地仓库和远程仓库可以**双向同步**。

### 6.2 关联远程仓库

```bash
# 添加远程仓库（GitHub 仓库地址）
git remote add origin https://github.com/Dhwass01/Dhwass01.github.io.git

# 查看远程仓库信息
git remote -v

# 应该显示：
# origin  https://github.com/Dhwass01/Dhwass01.github.io.git (fetch)
# origin  https://github.com/Dhwass01/Dhwass01.github.io.git (push)
```

### 6.3 知识点总结

| 概念         | 说明               |
| ------------ | ------------------ |
| `origin`     | 远程仓库的默认名称 |
| `remote add` | 关联远程仓库       |
| `remote -v`  | 查看远程仓库信息   |

---

## 📚 第七章：推送与拉取（Push & Pull）

### 7.1 Push — 推送到远程

把本地的提交**上传**到 GitHub：

```bash
# 第一次推送（-u 设置上游分支）
git push -u origin main

# 后续推送
git push
```

### 7.2 Pull — 从远程拉取

从 GitHub **下载**最新版本到本地：

```bash
# 拉取远程更新
git pull
```

### 7.3 工作流程图

```
你的电脑 (本地仓库)          GitHub (远程仓库)
     │                           │
     │    git push (推送)        │
     │ ────────────────────────► │
     │                           │
     │    git pull (拉取)        │
     │ ◄──────────────────────── │
     │                           │
```

### 7.4 博客项目的典型工作流

```bash
# 1. 写新文章
echo "# 我的新文章" > source/_posts/new-post.md

# 2. 暂存并提交
git add source/_posts/new-post.md
git commit -m "feat: 添加新文章《我的新文章》"

# 3. 推送到 GitHub
git push

# 4. GitHub Actions 自动部署，文章上线！
```

### 7.5 知识点总结

- `push` = 上传到云端
- `pull` = 从云端下载
- 写完文章后 `commit` + `push` = 发布文章

---

## 📚 第八章：查看状态与差异（Status & Diff）

### 8.1 Git Status — 查看状态

```bash
git status
```

显示的信息：

```
On branch main
Changes to be committed:        # 已暂存（绿色）
  modified:   _config.yml

Changes not staged for commit:  # 未暂存（红色）
  modified:   source/_posts/hello-world.md

Untracked files:                # 未追踪（新增文件）
  source/_posts/new-post.md
```

### 8.2 Git Diff — 查看修改内容

```bash
# 查看未暂存的修改
git diff

# 查看已暂存的修改
git diff --staged

# 查看某次提交的修改
git diff <commit-id>
```

### 8.3 实战场景

修改了 `_config.yml`，想看看改了什么：

```bash
git diff _config.yml
```

输出：

```diff
- url: http://example.com
+ url: https://dhwass01.github.io
```

### 8.4 知识点总结

- `git status` 随时查看当前状态
- `git diff` 查看具体改了什么
- 养成修改后先 `status` 再 `commit` 的习惯

---

## 📚 第九章：撤销与回退（Undo）

### 9.1 撤销未暂存的修改

```bash
# 文件修改后，想恢复原样
git restore _config.yml
```

### 9.2 撤销已暂存的修改

```bash
# 文件已经 add 了，想取消暂存
git restore --staged _config.yml

# 然后可以 restore 恢复原样
git restore _config.yml
```

### 9.3 回退到某个提交

```bash
# 查看提交历史
git log --oneline

# 回退到某个版本（保留修改）
git revert <commit-id>

# 回退到某个版本（丢弃修改，危险！）
git reset --hard <commit-id>
```

### 9.4 博客场景示例

```bash
# 场景：修改了主题配置，效果不好，想恢复
git diff                      # 先看看改了什么
git restore _config.landscape.yml  # 恢复原样

# 场景：提交了一个错误的修改
git log --oneline             # 查看历史
git revert HEAD               # 撤销最近一次提交
```

### 9.5 知识点总结

| 命令                          | 作用             | 安全性  |
| ----------------------------- | ---------------- | ------- |
| `git restore <文件>`          | 撤销未暂存的修改 | ✅ 安全 |
| `git restore --staged <文件>` | 取消暂存         | ✅ 安全 |
| `git revert <commit>`         | 撤销某次提交     | ✅ 安全 |
| `git reset --hard <commit>`   | 回退到某版本     | ⚠️ 危险 |

---

## 📚 第十章：.gitignore 文件

### 10.1 概念

`.gitignore` 告诉 Git："这些文件不用追踪"。

### 10.2 博客项目需要忽略的文件

创建 `.gitignore` 文件：

```gitignore
# Hexo 生成的文件（可以重新生成）
public/
.deploy*/

# 依赖文件夹（可以通过 npm install 重新安装）
node_modules/

# 日志文件
*.log

# 系统文件
.DS_Store
Thumbs.db

# 编辑器配置
.vscode/
.idea/
```

### 10.3 为什么需要 .gitignore？

| 文件                 | 是否应该追踪 | 原因                                          |
| -------------------- | ------------ | --------------------------------------------- |
| `source/_posts/*.md` | ✅ 是        | 你的文章内容                                  |
| `_config.yml`        | ✅ 是        | 博客配置                                      |
| `node_modules/`      | ❌ 否        | 几万个小文件，可以用 npm install 重新安装     |
| `public/`            | ❌ 否        | 生成的静态文件，可以用 hexo generate 重新生成 |

---

## 📚 综合实战：从零到部署的完整 Git 流程

把前面学到的知识串起来，完成一次完整的博客发布：

```bash
# ========== 第一步：初始化 ==========
cd d:\BlogFile
git init

# ========== 第二步：配置 .gitignore ==========
# 创建 .gitignore 文件（参考第十章）

# ========== 第三步：第一次提交 ==========
git add .
git commit -m "feat: 初始化 Hexo 博客项目"

# ========== 第四步：关联远程仓库 ==========
git remote add origin https://github.com/Dhwass01/Dhwass01.github.io.git

# ========== 第五步：推送到 GitHub ==========
git push -u origin main

# ========== 第六步：日常写文章 ==========
# 写一篇新文章
hexo new "我的第一篇文章"

# 编辑文章内容...
# vim source/_posts/我的第一篇文章.md

# 暂存并提交
git add source/_posts/我的第一篇文章.md
git commit -m "feat: 添加新文章《我的第一篇文章》"

# 推送到 GitHub
git push

# ========== 完成！GitHub Pages 自动部署 ==========
```

---

## 📝 Git 命令速查表

### 基础命令

| 命令                  | 作用         | 使用频率   |
| --------------------- | ------------ | ---------- |
| `git init`            | 初始化仓库   | ⭐ 一次    |
| `git add .`           | 暂存所有修改 | ⭐⭐⭐⭐⭐ |
| `git commit -m "msg"` | 提交修改     | ⭐⭐⭐⭐⭐ |
| `git status`          | 查看状态     | ⭐⭐⭐⭐⭐ |
| `git log --oneline`   | 查看历史     | ⭐⭐⭐⭐   |

### 远程操作

| 命令                          | 作用         | 使用频率   |
| ----------------------------- | ------------ | ---------- |
| `git remote add origin <url>` | 关联远程仓库 | ⭐ 一次    |
| `git push`                    | 推送到远程   | ⭐⭐⭐⭐⭐ |
| `git pull`                    | 从远程拉取   | ⭐⭐⭐⭐   |

### 分支操作

| 命令                     | 作用           | 使用频率 |
| ------------------------ | -------------- | -------- |
| `git branch`             | 查看分支       | ⭐⭐⭐   |
| `git checkout -b <name>` | 创建并切换分支 | ⭐⭐⭐   |
| `git merge <name>`       | 合并分支       | ⭐⭐⭐   |

### 撤销操作

| 命令                  | 作用     | 使用频率 |
| --------------------- | -------- | -------- |
| `git restore <file>`  | 撤销修改 | ⭐⭐     |
| `git revert <commit>` | 撤销提交 | ⭐       |

---

## 🎯 学习路线图

```
第一阶段：基础操作（第1-4章）
├── git init        ← 你在这里
├── git add
├── git commit
└── git status / diff

第二阶段：远程协作（第5-7章）
├── git remote
├── git push
└── git pull

第三阶段：进阶技巧（第8-10章）
├── git branch
├── git merge
└── .gitignore
```

---

## 💡 常见问题

### Q1: push 时提示输入用户名密码？

**A**: GitHub 现在需要用 **Personal Access Token** 代替密码：

1. 访问 GitHub → Settings → Developer settings → Personal access tokens
2. 生成新 token，勾选 `repo` 权限
3. push 时用 token 作为密码

### Q2: 提交错了怎么办？

**A**:

- 如果还没 push：`git reset --soft HEAD~1`（撤销提交但保留修改）
- 如果已经 push：`git revert <commit-id>`（创建一个新的撤销提交）

### Q3: 想看看某次提交改了什么？

**A**: `git show <commit-id>` 或 `git diff <commit-id>~1 <commit-id>`

### Q4: 两个分支有冲突怎么办？

**A**:

```bash
git merge feature-branch
# 如果有冲突，Git 会提示你手动解决
# 编辑冲突文件，保留想要的内容
git add .
git commit -m "fix: 合并冲突"
```

---

> 📌 **学习建议**：不要试图一次记住所有命令，先掌握基础操作（add、commit、push），在实际使用中逐渐学习进阶技巧。
