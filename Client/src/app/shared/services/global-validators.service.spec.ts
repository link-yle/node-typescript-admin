import { GlobalValidatorsService } from 'app/shared/services/global-validators.service';


describe('Global Validators', () => {
    const service = new GlobalValidatorsService()
    const control = { value: 'ahmed' }
    it('should check password validity', () => {
        expect(service.passwordFormat({ value: '12345' })).not.toBe(null)
        expect(service.passwordFormat({ value: '12345r' })).toBe(null)
        expect(service.passwordFormat({ value: 'sffgfd2' })).toBe(null)
        expect(service.passwordFormat({ value: '45454545455' })).not.toBe(null)
    })

    // describe('Location validation', () => {

    //     describe('Longitude', () => {
    //         it('should not accept above range', () => {
    //             expect(service.longitudeFormat({ value: 181 })).not.toBe(null)
    //         })
    //         it('should not accept below range', () => {
    //             expect(service.longitudeFormat({ value: -181 })).not.toBe(null)
    //         })
    //         it('should accept within range', () => {
    //             expect(service.longitudeFormat({ value: 89 })).toBe(null)
    //             expect(service.longitudeFormat({ value: -89 })).toBe(null)
    //             expect(service.longitudeFormat({ value: 0 })).toBe(null)
    //             expect(service.longitudeFormat({ value: 10 })).toBe(null)
    //         })
    //         it('should accept ranges not acceptable by latitude', () => {
    //             expect(service.longitudeFormat({ value: 105 })).toBe(null)
    //             expect(service.longitudeFormat({ value: -150 })).toBe(null)
    //         })
    //     })
    //     describe('Latitude', () => {
    //         it('should not accept above range', () => {
    //             expect(service.latitudeFormat({ value: 91 })).not.toBe(null)
    //         })
    //         it('should not accept below range', () => {
    //             expect(service.latitudeFormat({ value: -91 })).not.toBe(null)
    //         })
    //         it('should accept within range', () => {
    //             expect(service.latitudeFormat({ value: 89 })).toBe(null)
    //             expect(service.latitudeFormat({ value: -89 })).toBe(null)
    //             expect(service.latitudeFormat({ value: 0 })).toBe(null)
    //             expect(service.latitudeFormat({ value: 10 })).toBe(null)
    //         })

    //     })
    // })
});


