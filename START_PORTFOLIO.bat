@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 echo Install Node.js 22 LTS dari https://nodejs.org & pause & exit /b 1
if not exist node_modules call npm install
if errorlevel 1 pause & exit /b 1
start "" http://localhost:3000
call npm run dev
pause
