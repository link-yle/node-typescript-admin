import { GlobalValidators } from './global-validators.service';

describe('Global Validators', () => {

    const control = { value: 'ahmed' }
    it('should check mail validity', () => {
        expect(GlobalValidators.mailFormat({ value: 'ahmed' })).not.toBe(null)
        expect(GlobalValidators.mailFormat({ value: 'ahmed@gmail' })).toBe(null)
    })


    it('should check password validity', () => {
        expect(GlobalValidators.passwordFormat({ value: '12345' })).not.toBe(null)
        expect(GlobalValidators.passwordFormat({ value: '12345r' })).toBe(null)
        expect(GlobalValidators.passwordFormat({ value: 'sffgfd2' })).toBe(null)
        expect(GlobalValidators.passwordFormat({ value: '45454545455' })).not.toBe(null)
    })

    // describe('Location validation', () => {

    //     describe('Longitude', () => {
    //         it('should not accept above range', () => {
    //             expect(GlobalValidators.longitudeFormat({ value: 181 })).not.toBe(null)
    //         })
    //         it('should not accept below range', () => {
    //             expect(GlobalValidators.longitudeFormat({ value: -181 })).not.toBe(null)
    //         })
    //         it('should accept within range', () => {
    //             expect(GlobalValidators.longitudeFormat({ value: 89 })).toBe(null)
    //             expect(GlobalValidators.longitudeFormat({ value: -89 })).toBe(null)
    //             expect(GlobalValidators.longitudeFormat({ value: 0 })).toBe(null)
    //             expect(GlobalValidators.longitudeFormat({ value: 10 })).toBe(null)
    //         })
    //         it('should accept ranges not acceptable by latitude', () => {
    //             expect(GlobalValidators.longitudeFormat({ value: 105 })).toBe(null)
    //             expect(GlobalValidators.longitudeFormat({ value: -150 })).toBe(null)
    //         })
    //     })
    //     describe('Latitude', () => {
    //         it('should not accept above range', () => {
    //             expect(GlobalValidators.latitudeFormat({ value: 91 })).not.toBe(null)
    //         })
    //         it('should not accept below range', () => {
    //             expect(GlobalValidators.latitudeFormat({ value: -91 })).not.toBe(null)
    //         })
    //         it('should accept within range', () => {
    //             expect(GlobalValidators.latitudeFormat({ value: 89 })).toBe(null)
    //             expect(GlobalValidators.latitudeFormat({ value: -89 })).toBe(null)
    //             expect(GlobalValidators.latitudeFormat({ value: 0 })).toBe(null)
    //             expect(GlobalValidators.latitudeFormat({ value: 10 })).toBe(null)
    //         })

    //     })
    // })
});


