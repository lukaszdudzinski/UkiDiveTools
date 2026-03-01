import { ref, watch } from 'vue';

export function useChecklist(storageKey) {
    const checklistState = ref({});

    // Load initial state from LocalStorage
    const loadState = () => {
        try {
            const saved = localStorage.getItem(`uki_checklist_${storageKey}`);
            if (saved) {
                checklistState.value = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load checklist state', e);
        }
    };

    loadState();

    // Setup watcher to automatically save on changes
    watch(checklistState, (newState) => {
        try {
            localStorage.setItem(`uki_checklist_${storageKey}`, JSON.stringify(newState));
        } catch (e) {
            console.error('Failed to save checklist state', e);
        }
    }, { deep: true });

    const toggleItem = (itemId) => {
        checklistState.value[itemId] = !checklistState.value[itemId];
    };

    const isChecked = (itemId) => {
        return !!checklistState.value[itemId];
    };

    const resetChecklist = () => {
        checklistState.value = {};
    };

    return {
        checklistState,
        toggleItem,
        isChecked,
        resetChecklist
    };
}
