@echo off
echo Starting NEXFLARE TECH Website...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d C:\Users\Arshath Prabhu\OneDrive\Desktop\OWN\backend && npm run start:dev"

echo Waiting for backend to initialize...
timeout /t 10 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d C:\Users\Arshath Prabhu\OneDrive\Desktop\OWN\frontend && npm run dev"

echo.
echo Website is starting...
echo Backend will be available at: http://localhost:3000
echo Frontend will be available at: http://localhost:3001
echo.
echo Press any key to open the website in your browser...
pause >nul

start http://localhost:3001

echo Website launched successfully!
pause