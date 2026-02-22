@echo off
cd /d "%~dp0"
echo Starting Uki's Dive Tools v2026.2.19.01...
echo Otwieranie serwera lokalnego w katalogu: %CD% (wymagane dla modulow ES6)...
start "" "http://localhost:8081/index.html"
python -m http.server 8081
pause
