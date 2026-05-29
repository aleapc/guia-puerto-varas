# Generates PWA icons (volcano + lake) as PNGs. Run with Windows PowerShell (has System.Drawing):
#   powershell.exe -NoProfile -File scripts/make-icons.ps1
Add-Type -AssemblyName System.Drawing
$dir = Join-Path (Split-Path $PSScriptRoot -Parent) "static"

function New-Icon([int]$size, [string]$file, [double]$scale) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::FromArgb(255, 14, 58, 83))

  function P([double]$x, [double]$y) {
    $sx = 0.5 + ($x - 0.5) * $scale
    $sy = 0.5 + ($y - 0.5) * $scale
    New-Object System.Drawing.PointF ([single]($sx * $size)), ([single]($sy * $size))
  }

  $white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
  $glac = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 127, 198, 220))

  $tri = [System.Drawing.PointF[]]@((P 0.5 0.27), (P 0.83 0.75), (P 0.17 0.75))
  $g.FillPolygon($white, $tri)
  $cap = [System.Drawing.PointF[]]@((P 0.5 0.27), (P 0.59 0.43), (P 0.5 0.47), (P 0.41 0.43))
  $g.FillPolygon($glac, $cap)
  $lake = [System.Drawing.PointF[]]@((P 0.15 0.81), (P 0.85 0.81), (P 0.85 0.855), (P 0.15 0.855))
  $g.FillPolygon($glac, $lake)

  $g.Dispose()
  $bmp.Save((Join-Path $dir $file), [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "  OK $file"
}

New-Icon 512 "icon-512.png" 1.0
New-Icon 192 "icon-192.png" 1.0
New-Icon 512 "icon-512-maskable.png" 0.70
Write-Host "Icons done."
