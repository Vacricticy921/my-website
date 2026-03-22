---
name: create-today-branch
description: "创建一个基于 main 分支的今日开发分支，遵循分支命名规范 `develope/YYYY-MM-DD`。如果远程已存在同名分支，则自动添加后缀 `-02`、`-03` 等。"
---

# 创建今日开发分支

创建一个基于 main 分支的今日开发分支，遵循分支命名规范 `develope/YYYY-MM-DD`。如果远程已存在同名分支，则自动添加后缀 `-02`、`-03` 等。

## 步骤

1. **切换到 main 分支并拉取最新代码**
   - 执行 `git checkout main`
   - 执行 `git pull origin main`

2. **确定今日日期**
   - 使用 UTC 日期，格式为 `YYYY-MM-DD`
   - 例如：2025-09-21

3. **检查远程分支是否存在**
   - 检查远程是否存在分支 `develope/YYYY-MM-DD`
   - 如果不存在，创建并推送该分支
   - 如果存在，查找最大的后缀数字（例如 `develope/YYYY-MM-DD-02`），然后递增创建新分支

4. **创建分支**
   - 基于 main 分支创建新分支
   - 推送到远程 origin
   - 切换到新分支

5. **输出结果**
   - 显示创建的分支名称
   - 提供后续操作建议

## 实现细节

请按照以下逻辑实现：

### 获取当前日期
```bash
TODAY=$(date -u +%Y-%m-%d)
echo "今日日期: $TODAY"
```

### 检查远程分支是否存在
```bash
BASE_BRANCH="develope/$TODAY"
if git ls-remote --exit-code --heads origin "$BASE_BRANCH" >/dev/null 2>&1; then
  echo "远程分支 $BASE_BRANCH 已存在，查找可用后缀..."
  # 获取所有以 BASE_BRANCH 开头的远程分支
  EXISTING_BRANCHES=$(git ls-remote --heads origin "refs/heads/$BASE_BRANCH*" | awk -F'/' '{print $3}')
  # 提取后缀数字，找到最大值
  MAX_SUFFIX=1
  for branch in $EXISTING_BRANCHES; do
    if [[ $branch =~ ^${BASE_BRANCH}-([0-9]+)$ ]]; then
      SUFFIX=${BASH_REMATCH[1]}
      if [ $SUFFIX -gt $MAX_SUFFIX ]; then
        MAX_SUFFIX=$SUFFIX
      fi
    elif [[ $branch == $BASE_BRANCH ]]; then
      # 基础分支存在，但没有后缀
      MAX_SUFFIX=1
    fi
  done
  NEW_SUFFIX=$((MAX_SUFFIX + 1))
  NEW_BRANCH="${BASE_BRANCH}-$(printf "%02d" $NEW_SUFFIX)"
else
  NEW_BRANCH="$BASE_BRANCH"
fi
```

### 切换到 main 并拉取最新代码
```bash
git checkout main
git pull origin main
```

### 创建并推送新分支
```bash
git checkout -b "$NEW_BRANCH"
git push -u origin "$NEW_BRANCH"
```

### 输出结果
```bash
echo "✅ 已创建分支: $NEW_BRANCH"
echo "🔗 远程分支: origin/$NEW_BRANCH"
echo "📋 当前分支: $(git branch --show-current)"
```

请执行上述步骤，确保每一步都成功完成。如果任何步骤失败，请报告错误并停止执行。