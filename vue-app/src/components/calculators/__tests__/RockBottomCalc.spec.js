import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import RockBottomCalc from '../gas/RockBottomCalc.vue'
import { useUserSettingsStore } from '../../../stores/userSettings'

describe('RockBottomCalc.vue', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('poprawnie ładuje SAC ze store Pinia', () => {
        const store = useUserSettingsStore()
        store.userSac = '15.0'

        const wrapper = mount(RockBottomCalc)
        const sacInput = wrapper.find('#rb-sac')

        expect(sacInput.element.value).toBe('15')
    })

    it('wylicza poprawnie rezerwę Rock Bottom dla domyślnych parametrów', async () => {
        const store = useUserSettingsStore()
        store.userSac = '20'

        const wrapper = mount(RockBottomCalc)

        // SAC = 20, Głębokość 30m, butla steel12 (12L)
        // Wynurzanie z 30m na 15m (1.5 min), tempo 10m/min
        // Stres 1.5 -> SAC_stress = 30
        // Nurków 2, Czas awarii 1 min.
        // Reakcja: 30 * 3.91 ATA * 1 min * 2 nurków = 234.6 litrów
        // Suma: ok, daje nam niecałe 54.

        await wrapper.vm.$nextTick()

        const finalResult = wrapper.find('.result-value-main')
        expect(finalResult.text()).toContain('54')
    })
})
