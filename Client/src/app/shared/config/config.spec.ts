import { passwordPattern } from 'app/shared/config/constants';


describe('Config', () => {
    describe('password regex', () => {
        it('should check password validity', () => {
            expect(passwordPattern.test('12345')).toBe(false)
            expect(passwordPattern.test('12345r')).toBe(false)
            expect(passwordPattern.test('sffgfd2')).toBe(true)
            expect(passwordPattern.test('45454545455')).toBe(false)
        })
    })
});


