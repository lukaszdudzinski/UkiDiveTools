@echo off
setlocal

:: Przejdź do nowo wygenerowanego folderu Vue
cd /d "%~dp0vue-app"

:: Sprawdź czy zależności są zainstalowane (brak folderu node_modules)
if not exist "node_modules\" (
    echo [Uki's Dive Tools V3] Instalowanie pakietow npm... Pierwsze uruchomienie!
    call npm install
)

:: Uruchom deweloperski serwer Vite Vue 3
echo [Uki's Dive Tools V3] Uruchamianie serwera Vue 3...
echo ---------------------------------------------------
echo Otworz w przegladarce: http://localhost:5173
echo ---------------------------------------------------
call npm run dev

pause
