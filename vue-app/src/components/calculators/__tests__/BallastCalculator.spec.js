import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BallastCalculator from '../BallastCalculator.vue'

describe('BallastCalculator', () => {
    it('renders correctly', () => {
        const wrapper = mount(BallastCalculator)
        expect(wrapper.text()).toContain('Kalkulator Balastu')
    })

    it('calculates total ballast correctly', async () => {
        const wrapper = mount(BallastCalculator)

        // Ustawienie początkowych warunków
        await wrapper.find('input[type="number"]').setValue(80) // 80kg

        const selects = wrapper.findAll('select')

        // Index 0: Budowa (average)
        await selects[0].setValue('average')
        // Index 1: Skafander
        await selects[1].setValue('dryCrash')
        // Index 2: Docieplenie (brak)
        await selects[2].setValue('vest')
        // Index 3: Ocieplacz (pojawia się bo suchy skafander - 'thick')
        await wrapper.vm.$nextTick()
        const expandedSelects = wrapper.findAll('select')
        await expandedSelects[3].setValue('thick')

        // Index 4: Butla ('twin7_300')
        await expandedSelects[4].setValue('twin7_300')

        // Oczekiwanie na przeliczenie reaktywne
        await wrapper.vm.$nextTick()

        // Total ballast to 0.5 wg wcześniejszych ręcznych testów E2E
        const totalBallastValue = wrapper.find('.result-value-main').text()
        expect(totalBallastValue).toContain('0.5')
    })
})
