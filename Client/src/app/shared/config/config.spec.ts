import { passwordPattern } from 'app/shared/config/constants';


describe('Config', () => {
    describe('password regex', () => {
        it('should not accept small passwords', () => {
            expect(passwordPattern.test('123fd')).toBe(false)
        })
        it('should not accept only letters', () => {
            expect(passwordPattern.test('fasdfasdfas')).toBe(false)
        })
        it('should not accept only numbers', () => {
            expect(passwordPattern.test('45454545455')).toBe(false)
        })
        it('should accept long mixed passwords', () => {
            expect(passwordPattern.test('45454545dsdsd')).toBe(true)
        })
    })
});


