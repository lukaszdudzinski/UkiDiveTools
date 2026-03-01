import { ref, computed } from 'vue';
import { lecturesData } from '@/modules/data/LecturesData.js';

export function useLectures() {
    const lectures = ref(lecturesData);
    const activeLectureId = ref(null);

    const activeLecture = computed(() => {
        if (!activeLectureId.value) return null;
        return lectures.value.find(l => l.id === activeLectureId.value) || null;
    });

    function selectLecture(id) {
        activeLectureId.value = id;
    }

    function clearSelection() {
        activeLectureId.value = null;
    }

    return {
        lectures,
        activeLectureId,
        activeLecture,
        selectLecture,
        clearSelection
    };
}
