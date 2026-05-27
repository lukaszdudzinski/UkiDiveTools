#!/bin/bash
cd "$(dirname "$0")"
echo "Starting Uki's Dive Tools v2026.2.19.01..."
echo "Otwieranie serwera lokalnego w katalogu: $(pwd) (wymagane dla modulow ES6)..."
open "http://localhost:8081/index.html"
python3 -m http.server 8081
