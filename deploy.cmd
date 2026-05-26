@echo off
cd /d d:\BlogFile
echo === Git Status ===
git status
echo.
echo === Git Remote ===
git remote -v
echo.
echo === Staging files ===
git add -A
echo.
echo === Git Status After Add ===
git status
echo.
echo === Committing ===
git commit -m "feat: Futurism theme - complete implementation with all 9 steps"
echo.
echo === Disabling GCM ===
git config --global credential.helper ""
echo.
echo === Pushing ===
git push -u origin main 2>&1
echo.
echo === Restoring GCM ===
git config --global credential.helper manager
echo.
echo === Done ===
