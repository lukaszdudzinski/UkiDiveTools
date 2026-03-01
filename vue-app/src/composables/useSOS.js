import { ref } from 'vue';

export function useSOS() {
    const isSosModalOpen = ref(false);
    const isLocating = ref(false);
    const locationError = ref(null);
    const position = ref(null); // { lat, lon, acc, mapLink, shareText }

    const openSOS = () => {
        isSosModalOpen.value = true;
    };

    const closeSOS = () => {
        isSosModalOpen.value = false;
        // Optional: clear state on close, or keep it if they reopen quickly
    };

    const getGPSLocation = () => {
        isLocating.value = true;
        locationError.value = null;
        position.value = null;

        if (!navigator.geolocation) {
            locationError.value = 'Twoja przeglądarka nie wspiera GPS.';
            isLocating.value = false;
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude.toFixed(5);
                const lon = pos.coords.longitude.toFixed(5);
                const acc = Math.round(pos.coords.accuracy);
                const mapLink = `https://www.google.com/maps?q=${lat},${lon}`;
                const shareText = `SOS! Moja pozycja: ${lat}, ${lon} (dokładność: ${acc}m).`;

                position.value = { lat, lon, acc, mapLink, shareText };
                isLocating.value = false;
            },
            (err) => {
                console.error("GPS Error", err);
                isLocating.value = false;
                switch (err.code) {
                    case 1: locationError.value = 'Brak zgody na lokalizację.'; break;
                    case 2: locationError.value = 'Brak sygnału GPS. Spróbuj wyjść na zewnątrz.'; break;
                    case 3: locationError.value = 'Upłynął czas żądania.'; break;
                    default: locationError.value = 'Nieznany błąd systemu GPS.'; break;
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const shareLocation = async () => {
        if (!position.value) return;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'SOS - Moja Lokalizacja',
                    text: position.value.shareText,
                    url: position.value.mapLink
                });
            } catch (err) {
                console.error("Share failed", err);
            }
        } else {
            // Fallback for desktop/unsupported browsers: open SMS intent
            // Note: on desktop this might try to open a connected phone app or do nothing
            window.location.href = `sms:?body=${encodeURIComponent(position.value.shareText + ' Mapa: ' + position.value.mapLink)}`;
        }
    };

    return {
        isSosModalOpen,
        isLocating,
        locationError,
        position,
        openSOS,
        closeSOS,
        getGPSLocation,
        shareLocation
    };
}
