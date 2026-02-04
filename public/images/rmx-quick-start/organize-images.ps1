# PowerShell Script to Help Organize RMX Quick Start Images
# This script will help you copy images from the PDF attachments to the correct folder

Write-Host "RMX Quick Start Image Organizer" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$targetFolder = "public\images\rmx-quick-start"
$fullPath = Join-Path $PSScriptRoot $targetFolder

# Create the directory if it doesn't exist
if (!(Test-Path $fullPath)) {
    New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
    Write-Host "Created folder: $fullPath" -ForegroundColor Green
}
else {
    Write-Host "Folder already exists: $fullPath" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Please save the following images from the PDF:" -ForegroundColor Yellow
Write-Host ""

$images = @(
    @{Name = "system-diagram.png"; Description = "3-oval diagram with Initialize, Schedule, Report" },
    @{Name = "enable-macros.png"; Description = "Enable Macros button" },
    @{Name = "main-screen-1.png"; Description = "Main screen with photo (Risk Free version)" },
    @{Name = "main-screen-2.png"; Description = "Main screen with navigation menu" },
    @{Name = "main-processing-menu.png"; Description = "Main Processing Menu dialog" },
    @{Name = "main-menu-options.png"; Description = "Main Menu options dialog" },
    @{Name = "scheduling-options.png"; Description = "Scheduling Options dialog" },
    @{Name = "master-operations-list.png"; Description = "Master Operations List spreadsheet" },
    @{Name = "master-product-list.png"; Description = "Master Product List dialog" },
    @{Name = "select-item.png"; Description = "Select An Item dialog" },
    @{Name = "bor-dialog.png"; Description = "Delete Original Prototype Bor? dialog" },
    @{Name = "scheduling-menu-1.png"; Description = "Scheduling menu - Initialize Forecast" },
    @{Name = "scheduling-menu-2.png"; Description = "Scheduling menu - Master Scheduling" },
    @{Name = "forecast-dialog.png"; Description = "Choose forecasting period dialog" },
    @{Name = "time-periods-dialog.png"; Description = "Time periods dialog" },
    @{Name = "date-dialog.png"; Description = "Use today's date dialog" },
    @{Name = "clear-calendar-dialog.png"; Description = "Clear resource calendar dialog" },
    @{Name = "reporting-menu.png"; Description = "Reporting menu options" },
    @{Name = "choose-item-dialog.png"; Description = "Choose an Item - To Expand dialog" },
    @{Name = "item-reports.png"; Description = "Item Reports - Products and Operations" },
    @{Name = "prototype-job-dialog.png"; Description = "Select An Item - Prototype Job" }
)

$counter = 1
foreach ($img in $images) {
    Write-Host "$counter. $($img.Name)" -ForegroundColor White
    Write-Host "   Description: $($img.Description)" -ForegroundColor Gray
    
    $imagePath = Join-Path $fullPath $img.Name
    if (Test-Path $imagePath) {
        Write-Host "   Status: FOUND ✓" -ForegroundColor Green
    }
    else {
        Write-Host "   Status: MISSING ✗" -ForegroundColor Red
    }
    Write-Host ""
    $counter++
}

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Extract images from RMXQuickStart.pdf"
Write-Host "2. Save them to: $fullPath"
Write-Host "3. Use the names listed above"
Write-Host "4. Refresh your browser to see the images"
Write-Host ""

# Check current status
$existingFiles = Get-ChildItem -Path $fullPath -Filter "*.png" -ErrorAction SilentlyContinue
$foundCount = ($existingFiles | Measure-Object).Count
$totalCount = $images.Count

Write-Host "Current Status: $foundCount of $totalCount images found" -ForegroundColor $(if ($foundCount -eq $totalCount) { "Green" } elseif ($foundCount -gt 0) { "Yellow" } else { "Red" })
