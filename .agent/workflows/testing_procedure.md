---
description: Procedura testowania aplikacji przed większymi zmianami
---

# Procedura Testowania i Zabezpieczenia Aplikacji

## 🎯 Cel
Ten workflow zapewnia systematyczne testowanie aplikacji przed wprowadzeniem większych zmian oraz procedury rollback w przypadku problemów.

## 📋 Przed Rozpoczęciem Zmian

### 1. Tworzenie Backupu
```powershell
# Utworzenie kopii zapasowej z datą
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupDir = "BACKUP_$timestamp"
Copy-Item -Path "." -Destination "../$backupDir" -Recurse -Exclude @(".git", "node_modules", "BACKUP_*")
Write-Host "✅ Backup utworzony: $backupDir"
```

### 2. Commit Obecnego Stanu (Git)
```powershell
git add .
git commit -m "Before major changes: [opis planowanych zmian]"
git tag "backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
Write-Host "✅ Commit i tag utworzone"
```

## ✅ Checklist Testów Funkcjonalności

Po wprowadzeniu zmian **MUST** przetestować wszystkie poniższe funkcje:

### Podstawowa Nawigacja
- [ ] Menu boczne (desktop) otwiera się i zamyka poprawnie
- [ ] Menu hamburger (mobile) działa poprawnie
- [ ] Przełączanie między zakładkami działa
- [ ] Powrót do ekranu głównego (logo/home) działa

### Strefa PRO
- [ ] Dashboard PRO wyświetla się poprawnie
- [ ] Wszystkie kalkulatory PRO otwierają się
- [ ] Powrót z kalkulatorów do dashboardu działa
- [ ] Gas Blender - obliczenia działają
- [ ] Trimix Calculator - obliczenia działają
- [ ] Bailout Calculator - obliczenia działają
- [ ] PRO Gas Calculator - obliczenia działają

### Kalkulatory Podstawowe
- [ ] **Kalkulator SAC** - obliczenia poprawne
- [ ] **Kalkulator Nitrox** - wszystkie 4 pod-zakładki:
  - [ ] MOD działa
  - [ ] EAD działa
  - [ ] Best Mix działa
  - [ ] CNS% działa
- [ ] **Planowanie Gazu (Basic)**:
  - [ ] Rock Bottom działa
  - [ ] Zużycie Gazu działa
- [ ] **Kalkulator Balastu** - obliczenia poprawne

### Narzędzia Divemastera
- [ ] Zakładka "Odprawa" wyświetla się poprawnie
- [ ] Wszystkie checkboxy w "Odprawa" działają
- [ ] Zakładka "Pre-Dive Checklist" wyświetla się poprawnie
- [ ] Wszystkie checkboxy w "Pre-Dive Checklist" działają
- [ ] Przycisk "Wyczyść Listę" działa dla obu zakładek

### Wiedza Nurkowa
- [ ] Wszystkie pod-zakładki (SAC, Nitrox, Gazy, Balast, Wykłady) działają
- [ ] Formuły wyświetlają się poprawnie
- [ ] Lista wykładów ładuje się
- [ ] Otwieranie pojedynczego wykładu działa
- [ ] Przycisk powrotu z wykładu działa
- [ ] **Quiz** - system quizów działa poprawnie

### Ustawienia
- [ ] Przełącznik trybu ciemnego/jasnego działa
- [ ] Przełącznik efektu szklanego (Liquid Glass) działa
- [ ] Zmiana tapety działa
- [ ] Zmiana rodzaju wody (domyślna) działa
- [ ] Wersja aplikacji wyświetla się poprawnie

### Funkcje Specjalne
- [ ] Tooltip'y (znaki "?") działają i wyświetlają poprawne informacje
- [ ] Przycisk SOS/KOMORA wyświetla awaryjne informacje
- [ ] Link do donacji działa
- [ ] LocalStorage zapisuje ustawienia (reload strony zachowuje ustawienia)

## 🔄 Procedura Rollback

Jeśli po zmianach aplikacja **nie działa poprawnie**:

### Opcja 1: Rollback Git (Szybki)
```powershell
# Wyświetlenie ostatnich tagów
git tag -l "backup-*" | Sort-Object -Descending | Select-Object -First 5

# Rollback do ostatniego working taga
git reset --hard [TAG_NAME]
git clean -fd

Write-Host "✅ Rollback wykonany"
```

### Opcja 2: Przywrócenie z Backupu
```powershell
# Lista backupów
Get-ChildItem ..\ -Directory -Filter "BACKUP_*" | Sort-Object Name -Descending

# Przywrócenie z konkretnego backupu
$backupToRestore = "BACKUP_20241206_164500"  # Zmień na właściwy
Remove-Item -Path ".\*" -Recurse -Force -Exclude ".git"
Copy-Item -Path "..\$backupToRestore\*" -Destination "." -Recurse

Write-Host "✅ Aplikacja przywrócona z backupu: $backupToRestore"
```

## 🚨 Alert - Utrata Funkcjonalności

**ZAWSZE**, gdy wprowadzasz większe zmiany:
1. ✅ Utwórz backup (krok 1)
2. ✅ Zrób commit Git z tagiem (krok 2)
3. ✅ Wprowadź zmiany
4. ✅ Przetestuj WSZYSTKIE funkcje z checklisty
5. ✅ Jeśli coś nie działa - ROLLBACK natychmiast
6. ✅ Dopiero po pełnym teście - commit końcowy

## 📝 Szablon Commit Message

```
feat/fix/refactor: [Krótki opis]

Zmiany:
- [lista zmian]

Przetestowano:
- [✅/❌] Wszystkie kalkulatory
- [✅/❌] Narzędzia Divemastera
- [✅/❌] Nawigacja
- [✅/❌] Ustawienia

Backup: [TAG lub FOLDER]
```

## 💡 Najlepsze Praktyki

1. **Małe kroki** - wprowadzaj zmiany stopniowo, testuj często
2. **Jeden feature = jeden commit** - łatwiejszy rollback
3. **Backup przed każdą większą zmianą** - bezpieczeństwo przede wszystkim
4. **Test lokalnie przed push** - upewnij się, że wszystko działa
5. **Dokumentuj zmiany** - jasne commit messages

## 🔧 Skrypty Pomocnicze

### Szybki Test Wszystkich Funkcji
Otwórz konsolę przeglądarki (F12) i uruchom:

```javascript
console.log("🧪 Testing Application Functions...");

// Test nawigacji
const tabs = ['sac-calculator', 'nitrox-calculator', 'gas-planning-calculator', 
              'ballast-calculator', 'divemaster-tools', 'science-of-diving', 'settings-panel'];
console.log("Tabs configured:", tabs.length);

// Test local storage
console.log("Theme:", localStorage.getItem('theme'));
console.log("Liquid Glass:", localStorage.getItem('liquidGlass'));
console.log("Wallpaper:", localStorage.getItem('wallpaper'));

console.log("✅ Basic tests passed - continue manual testing");
```

---

**PAMIĘTAJ**: Lepiej poświęcić 5 minut na backup niż stracić godziny na odtwarzanie kodu!
