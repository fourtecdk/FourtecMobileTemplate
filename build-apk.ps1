# Fourtec Mobile Factory - Artifact Generator
Write-Host "----------------------------------------------" -ForegroundColor Cyan
Write-Host "?? FOURTEC BUILD SYSTEM" -ForegroundColor Cyan
Write-Host "----------------------------------------------" -ForegroundColor Cyan

# 1. Environment Sanity Check
if (!(Test-Path ".env")) {
    Write-Host "? ERROR: No .env file found. Copy .env.example to .env and fill it out." -ForegroundColor Red
    exit
}

# 2. Select Platform
Write-Host "Select Platform to Build:" -ForegroundColor Yellow
Write-Host "1) Android (APK)"
Write-Host "2) iOS (Simulator/TestFlight)"
Write-Host "3) Both"
$Choice = Read-Host "Enter choice (1-3)"

$Platform = switch ($Choice) {
    "1" { "android" }
    "2" { "ios" }
    "3" { "all" }
    Default { "android" }
}

# 3. Trigger EAS Build
Write-Host "?? Uploading to Expo Build Servers for $Platform..." -ForegroundColor Green
eas build --platform $Platform --profile preview

Write-Host "----------------------------------------------"
Write-Host "? Build request submitted!" -ForegroundColor Green
Write-Host "Monitor the progress at the URL provided above." -ForegroundColor Cyan
