document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // ============================================================
    // 3. USTAWIENIA (MOTYW, SZKŁO, TAPETA, WODA)
    // ============================================================
    const themeToggle = document.getElementById('theme-toggle');
    const glassToggle = document.getElementById('glass-toggle');
    const wallpaperThumbs = document.querySelectorAll('.wallpaper-thumb');
    const defaultWallpaper = "url('background_uki.jpg')";
    const globalWaterTypeSelect = document.getElementById('global-water-type');
    const sacWaterType = document.getElementById('waterType');
    const ballastWaterType = document.getElementById('ballastWater');

    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-theme');
            if (themeToggle) themeToggle.checked = true;
        } else {
            body.classList.remove('dark-theme');
            if (themeToggle) themeToggle.checked = false;
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    if (themeToggle) {
        themeToggle.addEventListener('change', () => setTheme(themeToggle.checked));
    }

    function setWallpaper(wallpaperUrl) {
        body.style.backgroundImage = wallpaperUrl;
        localStorage.setItem('uki-wallpaper', wallpaperUrl);
        wallpaperThumbs.forEach(thumb => {
            thumb.classList.toggle('active', thumb.getAttribute('data-wallpaper') === wallpaperUrl);
        });
    }
    wallpaperThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => setWallpaper(thumb.getAttribute('data-wallpaper')));
    });

    function setLiquidGlass(isEnabled) {
        if (isEnabled) {
            body.classList.remove('glass-off');
            if (glassToggle) glassToggle.checked = true;
        } else {
            body.classList.add('glass-off');
            if (glassToggle) glassToggle.checked = false;
        }
        localStorage.setItem('uki-liquid-glass', isEnabled ? 'on' : 'off');
    }
    if (glassToggle) {
        glassToggle.addEventListener('change', () => setLiquidGlass(glassToggle.checked));
    }

    function setWaterType(water) {
        if (globalWaterTypeSelect) globalWaterTypeSelect.value = water;
        if (sacWaterType) sacWaterType.value = water;
        if (ballastWaterType) ballastWaterType.value = water;
        localStorage.setItem('uki-water-type', water);
    }

    if (globalWaterTypeSelect) globalWaterTypeSelect.addEventListener('change', () => setWaterType(globalWaterTypeSelect.value));
    if (sacWaterType) sacWaterType.addEventListener('change', () => setWaterType(sacWaterType.value));
    if (ballastWaterType) ballastWaterType.addEventListener('change', () => setWaterType(ballastWaterType.value));

    // Inicjalizacja przy starcie
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark' || savedTheme === null);
    const savedWallpaper = localStorage.getItem('uki-wallpaper');
    setWallpaper(savedWallpaper || defaultWallpaper);
    const savedGlass = localStorage.getItem('uki-liquid-glass');
    setLiquidGlass(savedGlass === 'on' || savedGlass === null);
    const savedWater = localStorage.getItem('uki-water-type');
    setWaterType(savedWater || 'fresh');
});
