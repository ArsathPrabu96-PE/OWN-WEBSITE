# NEXFLARE TECH Website Launcher
# PowerShell script to start both frontend and backend servers

Write-Host "🚀 Starting NEXFLARE TECH Website..." -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan

# Function to start backend
function Start-Backend {
    Write-Host "🔧 Starting Backend Server..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\Arshath Prabhu\OneDrive\Desktop\OWN\backend'; npm run start:dev"
}

# Function to start frontend
function Start-Frontend {
    Write-Host "🌐 Starting Frontend Server..." -ForegroundColor Green
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\Arshath Prabhu\OneDrive\Desktop\OWN\frontend'; npm run dev"
}

# Function to check if port is in use
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    }
    catch {
        return $false
    }
}

# Start backend server
Start-Backend
Write-Host "⏳ Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

# Start frontend server
Start-Frontend
Write-Host "⏳ Waiting for frontend to initialize..." -ForegroundColor Green
Start-Sleep -Seconds 5

# Check which port frontend is using and open browser
Write-Host "🌍 Opening website in browser..." -ForegroundColor Magenta

if (Test-Port -Port 3000) {
    Start-Process "http://localhost:3000"
    Write-Host "✅ Website opened at: http://localhost:3000" -ForegroundColor Green
} elseif (Test-Port -Port 3001) {
    Start-Process "http://localhost:3001"
    Write-Host "✅ Website opened at: http://localhost:3001" -ForegroundColor Green
} else {
    Write-Host "⚠️  Please wait a moment and manually open: http://localhost:3000" -ForegroundColor Yellow
}

Write-Host "`n🎉 NEXFLARE TECH Website is launching!" -ForegroundColor Green
Write-Host "📊 Backend API: http://localhost:3002" -ForegroundColor Cyan
Write-Host "🌐 Frontend: http://localhost:3000 (or 3001)" -ForegroundColor Cyan
Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")