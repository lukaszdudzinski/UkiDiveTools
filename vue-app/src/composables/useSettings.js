import { ref, watch, onMounted } from 'vue';

export function useSettings() {
    const isDarkTheme = ref(true);
    const globalWaterType = ref('fresh');
    const defaultTank = ref('steel15');
    const hasSavedSac = ref(false);
    const isProActive = ref(false);

    const initSettings = () => {
        // Theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') isDarkTheme.value = false;

        // Water Type
        const savedWater = localStorage.getItem('uki-water-type');
        if (savedWater) globalWaterType.value = savedWater;

        // Default Tank
        const savedTank = localStorage.getItem('uki-default-tank');
        if (savedTank) defaultTank.value = savedTank;

        // SAC
        if (localStorage.getItem('uki-user-sac')) hasSavedSac.value = true;

        // PRO Check (Basic code-expiry check mimicking old AppUI behavior)
        const expiry = localStorage.getItem('uki-pro-expiry');
        if (expiry) {
            const expiryDate = new Date(parseInt(expiry, 10));
            if (expiryDate > new Date()) {
                isProActive.value = true;
            } else {
                localStorage.removeItem('uki-pro-expiry');
            }
        }
    };

    // Apply Theme to body dynamically
    watch(isDarkTheme, (isDark) => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if (isDark) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });

    watch(globalWaterType, (type) => {
        localStorage.setItem('uki-water-type', type);
    });

    watch(defaultTank, (tank) => {
        localStorage.setItem('uki-default-tank', tank);
    });

    const resetSac = () => {
        localStorage.removeItem('uki-user-sac');
        hasSavedSac.value = false;
    };

    const activatePro = (days = 30) => {
        const expiryDate = new Date(Date.now() + (days * 24 * 60 * 60 * 1000));
        localStorage.setItem('uki-pro-expiry', expiryDate.getTime().toString());
        isProActive.value = true;
        return expiryDate;
    };

    const deactivatePro = () => {
        localStorage.removeItem('uki-pro-expiry');
        isProActive.value = false;
    };

    onMounted(initSettings);

    return {
        isDarkTheme,
        globalWaterType,
        defaultTank,
        hasSavedSac,
        isProActive,
        resetSac,
        activatePro,
        deactivatePro
    };
}
