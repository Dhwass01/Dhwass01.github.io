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

## � 第十一章：实战踩坑记录（真实案例）

> 本章记录了搭建博客过程中**真实遇到的所有 Git 问题**，每个问题都包含：症状、原因分析、解决方案、以及对应的知识点。这些是最宝贵的学习素材——因为它们都是你会真正遇到的。

---

### 11.1 问题一：`hexo` 命令提示"CommandNotFoundException"

#### 症状

```powershell
hexo server
# hexo: The term 'hexo' is not recognized as a name of a cmdlet...
```

#### 原因分析

Hexo 是通过 `npm install` 安装在项目的 `node_modules/` 目录中的（**本地安装**），而不是通过 `npm install -g hexo-cli` 安装到系统全局的。本地安装的包不会注册为系统命令。

#### 解决方案

使用 `npx` 前缀来调用本地安装的包：

```powershell
npx hexo server      # 启动本地预览
npx hexo generate     # 生成静态文件
npx hexo deploy       # 部署到 GitHub Pages
npx hexo clean        # 清理缓存
```

#### 💡 Git 知识点

- **本地安装 vs 全局安装**：`npm install hexo` 安装到 `node_modules/`（项目内），`npm install -g hexo` 安装到系统路径
- 这就是为什么 `.gitignore` 要忽略 `node_modules/`——它是依赖文件夹，别人可以通过 `npm install` 重新生成
- 类比 Git：`node_modules/` 就像 `public/` 一样，是**可再生的产物**，不需要版本控制

---

### 11.2 问题二：`git push` 提示 "Invalid username or token"

#### 症状

```powershell
git push -u origin main
# fatal: Invalid username or token.
# fatal: Authentication failed for 'https://github.com/...'
```

#### 原因分析

GitHub 在 2021 年 8 月后**不再接受密码认证**，HTTPS 推送必须使用 **Personal Access Token (PAT)** 作为凭据。

#### 解决方案

1. 在 GitHub 生成 PAT：`Settings → Developer settings → Personal access tokens → Generate new token`
2. 将 token 嵌入远程 URL：

```powershell
git remote set-url origin https://<TOKEN>@github.com/用户名/仓库名.git
```

#### 💡 Git 知识点

- **HTTPS vs SSH**：Git 推送有两种认证方式
  - **HTTPS**：用 token 认证，适合初学者
  - **SSH**：用密钥对认证，更安全，适合长期使用
- `git remote set-url` 可以修改远程仓库的地址
- **安全警告**：token 等同于密码，不要提交到代码中或分享给他人

---

### 11.3 问题三：Windows Git Credential Manager (GCM) 拦截认证

#### 症状

即使已经在 URL 中嵌入了 token，`git push` 时仍然弹出浏览器登录窗口，或者提示认证失败。

#### 原因分析

Windows 系统安装了 **Git Credential Manager (GCM)**，它会拦截所有 HTTPS 认证请求，用自己管理的凭据替代 URL 中嵌入的 token。可以用以下命令查看：

```powershell
git config --global credential.helper
# 输出：manager   ← 这就是 GCM
```

#### 解决方案

**临时禁用 GCM → 推送 → 恢复 GCM**：

```powershell
# 第一步：禁用 GCM
git config --global credential.helper ""

# 第二步：推送（URL 中已有 token，不需要密码）
git push -u origin main

# 第三步：恢复 GCM（日常使用时保留它更方便）
git config --global credential.helper manager
```

#### 💡 Git 知识点

- **credential.helper** 是 Git 的凭据管理机制，可以配置为不同的后端
  - `manager`：Windows Git Credential Manager，图形化管理
  - `store`：明文保存到文件
  - `""`（空）：不使用任何凭据助手
- GCM 的好处是记住密码不用每次输入，坏处是有时会"自作主张"
- 排查认证问题时，先检查 `git config --global credential.helper`

---

### 11.4 问题四：PowerShell 中使用 `cmd /c` 报错

#### 症状

```powershell
cmd /c "git status"
# cmd: The term 'cmd' is not recognized as a name of a cmdlet...
```

#### 原因分析

VS Code 集成终端默认使用 **PowerShell**，而 `cmd /c` 是 Windows CMD 的语法。PowerShell 中直接运行 `cmd` 可能在某些环境下报错。

#### 解决方案

在 PowerShell 环境中，**直接使用原生命令**，无需 `cmd /c` 包裹：

```powershell
# ❌ 错误写法
cmd /c "git status"

# ✅ 正确写法
git status
```

#### 💡 知识点

- Windows 有多种命令行环境：**CMD**、**PowerShell**、**Git Bash**
- PowerShell 是更现代的 shell，语法和 CMD 有区别
- 通过终端提示符可以区分：`>` 是 CMD，`PS>` 是 PowerShell

---

### 11.5 问题五：Git 终端输出"看不到结果"

#### 症状

运行 `git push`、`git fetch` 等命令后，终端没有任何输出，无法判断是否成功。

#### 原因分析

Git 的很多信息（进度、错误）输出到 **stderr**（标准错误流），而不是 **stdout**（标准输出流）。某些终端环境不显示 stderr 的内容。

#### 解决方案

将 stderr 重定向到 stdout，再输出到文件查看：

```powershell
git push -u origin main 2>&1 | Out-File -FilePath result.txt -Encoding utf8
```

然后用 `read_file` 或 `type result.txt` 查看结果。

#### 💡 Git 知识点

- **stdout vs stderr**：程序有两个输出流
  - `stdout`（标准输出）：正常结果
  - `stderr`（标准错误）：错误信息、警告、进度
- `2>&1` 是重定向语法：把 stderr（2）合并到 stdout（1）
- `|` 管道符：把前一个命令的输出传给后一个命令

---

### 11.6 问题六：推送被拒绝 — "fetch first"（远程分支冲突）

#### 症状

```powershell
git push -u origin main
# ! [rejected]        main -> main (fetch first)
# error: failed to push some refs to 'https://github.com/...'
# hint: Updates were rejected because the remote contains work that you do not have locally.
```

#### 原因分析

GitHub 远程仓库已经有提交（例如 Hexo 自动部署的旧提交），而本地仓库是一个全新的 `git init`，两边的提交历史**完全不同**，Git 不允许直接覆盖。

#### 解决方案

对于个人仓库，使用 **强制推送**覆盖远程：

```powershell
# 先查看远程有什么
git fetch origin

# 强制推送（覆盖远程的所有内容）
git push --force -u origin main
```

#### ⚠️ 重要警告

- `--force` 会**永久覆盖**远程仓库的内容，只在确定要替换远程时使用
- **永远不要对团队共享的仓库使用 force push**，会覆盖别人的工作
- 对于个人仓库（如博客），force push 是安全的

#### 💡 Git 知识点

- **本地仓库 vs 远程仓库**：两个仓库的提交历史是独立的
- `git fetch`：下载远程的提交记录，但不合并
- `git pull` = `git fetch` + `git merge`
- `git push --force`：强制覆盖远程，不检查是否冲突
- 遇到 "fetch first" 时的决策树：
  ```
  推送被拒绝
  ├── 远程有你需要的提交？→ git pull（合并后再推送）
  └── 远程的内容不需要？→ git push --force（强制覆盖）
  ```

---

### 11.7 问题七：GCM 弹出浏览器登录窗口

#### 症状

运行 `git push` 时，系统自动打开浏览器要求 GitHub 登录，而不是在终端中输入凭据。

#### 原因分析

Git Credential Manager 的默认行为是弹出浏览器进行 OAuth 认证。当它检测到 HTTPS 推送请求但没有已保存的凭据时，会尝试用浏览器交互方式登录。

#### 解决方案

设置环境变量禁止交互式提示：

```powershell
# 设置环境变量（当前会话有效）
$env:GIT_TERMINAL_PROMPT = "0"

# 然后再推送
git push -u origin main
```

#### 💡 Git 知识点

- `GIT_TERMINAL_PROMPT` 环境变量控制 Git 是否允许交互式提示
  - `"1"`（默认）：允许弹出提示
  - `"0"`：禁止交互式提示，没有凭据直接报错
- 在 CI/CD 自动化环境中，通常设置为 `"0"` 防止脚本卡住

---

### 11.8 问题八：TLS 证书警告

#### 症状

```powershell
git push
# warning: SSL certificate problem: unable to get local issuer certificate
```

#### 原因分析

系统的 SSL/TLS 证书配置有问题，Git 无法验证 GitHub 服务器的证书。

#### 解决方案

这通常只是一个**警告**，不影响操作。如果确实被阻止，可以临时关闭验证：

```powershell
# 仅对当前仓库关闭（推荐）
git config http.sslVerify false

# 全局关闭（不推荐，降低安全性）
git config --global http.sslVerify false
```

#### 💡 Git 知识点

- HTTPS 连接需要验证服务器的 SSL 证书，确保连接的是真正的服务器
- 关闭证书验证 = 不验证对方身份，存在中间人攻击风险
- 正确做法是更新系统的 CA 证书库，而不是关闭验证

---

### 11.9 实战问题速查表

| #   | 问题            | 原因                 | 一句话解决                     |
| --- | --------------- | -------------------- | ------------------------------ |
| 1   | hexo 命令找不到 | 本地安装，非全局     | 用 `npx hexo`                  |
| 2   | push 认证失败   | GitHub 需要 token    | 嵌入 PAT 到 URL                |
| 3   | GCM 拦截认证    | Windows GCM 覆盖凭据 | `credential.helper ""`         |
| 4   | cmd /c 报错     | PowerShell 不兼容    | 直接用原生命令                 |
| 5   | 终端看不到输出  | stderr 未捕获        | `2>&1` 重定向                  |
| 6   | push 被拒绝     | 远程有旧提交         | `git push --force`             |
| 7   | 浏览器弹窗登录  | GCM 交互式认证       | `$env:GIT_TERMINAL_PROMPT="0"` |
| 8   | TLS 证书警告    | 证书配置问题         | 通常可忽略                     |

---

### 11.10 本章核心教训

> **教训一**：环境差异是最大的坑——同样的命令在 Linux/Mac 上正常，在 Windows + PowerShell 上可能报错。
>
> **教训二**：认证问题是 Git 初学者最常见的障碍——理解 token、SSH key、credential helper 三者的关系至关重要。
>
> **教训三**：`git push --force` 不是"错误操作"，在个人仓库场景下是正常的工具。关键是理解它**什么时候安全**。
>
> **教训四**：看不懂的报错信息？用 `2>&1` 把所有输出都抓下来，然后慢慢分析。

---

## �💡 常见问题

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
