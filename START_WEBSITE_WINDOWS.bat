@echo off
title Mr. Kinoow - Next.js Website
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Node.js is not installed. Please install it from https://nodejs.org/
 pause
 exit /b 1
)
if not exist node_modules (
 echo Installing required packages. An internet connection is required for the first run.
 call npm install
 if errorlevel 1 (
  echo npm install failed. Check your connection and try again.
  pause
  exit /b 1
 )
)
echo Opening the Mr. Kinoow Next.js development server...
echo Once ready, visit http://localhost:3000
call npm run dev
pause
