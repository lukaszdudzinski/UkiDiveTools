import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import GasConsumptionCalc from '../gas/GasConsumptionCalc.vue'
import { useUserSettingsStore } from '../../../stores/userSettings'

describe('GasConsumptionCalc.vue', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('poprawnie ładuje SAC ze store Pinia', () => {
        const store = useUserSettingsStore()
        store.userSac = '18.5'

        const wrapper = mount(GasConsumptionCalc)
        const sacInput = wrapper.find('#gc-sac')

        expect(sacInput.element.value).toBe('18.5')
    })

    it('przeprowadza poprawne kalkulacje dla domyślnych wartości - wymóg rezerwy', async () => {
        const store = useUserSettingsStore()
        store.userSac = '20'

        const wrapper = mount(GasConsumptionCalc)

        // Zymulujemy standardowe, proste nurkowanie dla stalowej 12L (co daje nam 12L volume)
        // SAC = 20
        // Głębokość 20m, dno 30min, start 200bar (2400L total)
        // Opadanie 20 (1 min), Wynurzanie 10 (1.5 min), Przystanek 5m przez 3 min
        // Słodka woda (fresh)
        // Rezerwa 50 bar

        // Czekamy na przeliczenie reaktywne w Vue
        await wrapper.vm.$nextTick()

        // Total Liters = Descent(20*1.97*1) + Bottom(20*2.94*30) + AscentToStop(20*2.25*1.5) + Stop(20*1.5*3) + AscentToSurf(20*1.25*0.5)
        // Obliczony ręcznie (z silnika vue z offsetem)
        // Wyniesie około ~ 1972 litrów

        const resultTexts = wrapper.findAll('.result-value-main')

        // Pierwszy wynik to Total Zapotrzebowanie
        expect(resultTexts[0].text()).toContain('1972')

        // Drugi wynik to Zapas Po (2400L - 1972L = 428L)
        expect(resultTexts[1].text()).toContain('428')

        // Status badge
        const badge = wrapper.find('.status-badge')
        expect(badge.text()).toContain('RYZYKO (Naruszenie Rezerwy)')
        expect(badge.classes()).toContain('danger')
    })

    it('wyświetla ryzyko naruszenia rezerwy przy zbyt długim nurkowaniu', async () => {
        const store = useUserSettingsStore()
        store.userSac = '20'

        const wrapper = mount(GasConsumptionCalc)

        // Ustawiamy absurdalnie długi czas na dnie, np 80 minut.
        const timeInput = wrapper.find('#gc-time')
        await timeInput.setValue(80)

        // Status badge powinien zmienić się na danger, gdyż wejdziemy w żelazną rezerwę 50 bar (wymagane 600L minimum)
        const badge = wrapper.find('.status-badge')
        expect(badge.text()).toContain('RYZYKO (Naruszenie Rezerwy)')
        expect(badge.classes()).toContain('danger')
    })
})
