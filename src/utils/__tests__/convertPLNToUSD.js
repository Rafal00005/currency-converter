import { convertPLNToUSD } from './../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
	it('should return proper value when good input', () => {
		expect(convertPLNToUSD(1)).toBe('$0.29');
		expect(convertPLNToUSD(2)).toBe('$0.57');
		expect(convertPLNToUSD(20)).toBe('$5.71');
		expect(convertPLNToUSD(12)).toBe('$3.43');
	});

	it('should return NaN when argument is a string', () => {
		expect(convertPLNToUSD('6')).toBe(NaN);
	});

	it('should return NaN when no argument', () => {
		expect(convertPLNToUSD()).toBe(NaN);
	});
	it('should return $0.00 when argument is negative', () => {
		expect(convertPLNToUSD(-10)).toBe('$0.00');
	});

	it('should return Error when argument is not string or number', () => {
		expect(convertPLNToUSD({})).toBe('Error');
	});
});
