---
title: Git 工作流：我常用的几个技巧
date: 2026-05-15 14:30:00
categories:
  - 工具
tags:
  - Git
  - 效率
---

整理一些日常开发中常用的 Git 技巧，帮助提升工作效率。

<!-- more -->

## 1. 交互式暂存

`git add -p` 可以逐块选择要暂存的修改，适合一个文件里有多处改动但想分开提交的场景。

```bash
git add -p
# 逐块确认：y = 暂存, n = 跳过, s = 拆分更小的块
```

## 2. 修改最后一次提交

提交后发现漏了文件或者 commit message 写错了：

```bash
# 添加遗漏的文件
git add forgotten-file.txt
git commit --amend --no-edit

# 修改提交信息
git commit --amend -m "新的提交信息"
```

## 3. 临时保存工作进度

正在开发新功能，突然需要切分支修 bug：

```bash
# 保存当前工作
git stash push -m "开发中的功能"

# 切到其他分支修 bug
git checkout main
# ... 修完 bug ...

# 回来继续开发
git checkout feature-branch
git stash pop
```

## 4. 查看漂亮的日志

默认的 `git log` 信息太多，试试这个别名：

```bash
git log --oneline --graph --all --decorate
```

可以加到 Git 别名里：

```bash
git config --global alias.lg "log --oneline --graph --all --decorate"
```

## 5. 找出谁引入了 bug

`git bisect` 用二分法帮你定位哪个提交引入了问题：

```bash
git bisect start
git bisect bad          # 当前版本有 bug
git bisect good v1.0    # v1.0 没有 bug

# Git 会自动 checkout 中间的提交，你只需要测试并标记：
git bisect good  # 或 git bisect bad

# 找到后重置
git bisect reset
```

## 6. 撤销操作

```bash
# 撤销工作区的修改（未暂存）
git checkout -- filename

# 撤销暂存（保留修改）
git reset HEAD filename

# 回退到某个提交（保留修改在工作区）
git reset --soft HEAD~1
```

## 总结

Git 的命令很多，但日常高频使用的其实就那几个。把这些技巧内化成肌肉记忆，开发效率会提升不少。

关键是：**多用 `git status`，少用 `git push --force`**。
