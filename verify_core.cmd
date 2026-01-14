@echo off
setlocal
echo ===========================================
echo  Uki's Dive Tools - Safety Check (CMD)
echo ===========================================

set "MISSING=0"

:: 1. Check Core Files
if not exist "index.html" (
    echo [FAIL] Missing index.html
    set /a MISSING+=1
) else (
    echo [OK] index.html found.
)

if not exist "style.css" (
    echo [FAIL] Missing style.css
    set /a MISSING+=1
) else (
    echo [OK] style.css found.
)

if not exist "src\modules\ui\AppUI.js" (
    echo [FAIL] Missing src\modules\ui\AppUI.js
    set /a MISSING+=1
) else (
    echo [OK] AppUI.js found.
)

:: 2. Check for Critical Content in index.html
findstr /C:"id=\"emergency-btn\"" index.html >nul
if %errorlevel% neq 0 (
    echo [FAIL] Critical button 'emergency-btn' missing in index.html
    set /a MISSING+=1
)

findstr /C:"id=\"donation-link\"" index.html >nul
if %errorlevel% neq 0 (
    echo [FAIL] Critical button 'donation-link' missing in index.html
    set /a MISSING+=1
)

:: 3. Summary
if %MISSING% gtr 0 (
    echo.
    echo -------------------------------------------
    echo  [DANGER] FOUND %MISSING% CRITICAL ERRORS!
    echo  DO NOT COMMIT THIS VERSION.
    echo -------------------------------------------
    exit /b 1
) else (
    echo.
    echo -------------------------------------------
    echo  [SUCCESS] All checks passed. Code seems safe.
    echo -------------------------------------------
    exit /b 0
)
