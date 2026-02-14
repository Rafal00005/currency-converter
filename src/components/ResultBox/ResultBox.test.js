import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom';

describe('Component ResultBox', () => {
	it('should render without crashing', () => {
		render(<ResultBox from='PLN' to='USD' amount={100} />);
		cleanup();
	});

	it('should render proper conversion PLN to USD', () => {
		const testCases = [
			{ amount: 100, from: 'PLN', to: 'USD', expected: 'PLN 100.00 = $28.57' },
			{ amount: 50, from: 'PLN', to: 'USD', expected: 'PLN 50.00 = $14.29' },
			{ amount: 200, from: 'PLN', to: 'USD', expected: 'PLN 200.00 = $57.14' },
		];

		for (const testObj of testCases) {
			render(
				<ResultBox
					from={testObj.from}
					to={testObj.to}
					amount={testObj.amount}
				/>,
			);
			const output = screen.getByTestId('result-box');
			expect(output).toHaveTextContent(testObj.expected);
			cleanup();
		}
	});

	it('should render proper conversion USD to PLN', () => {
		const testCases = [
			{ amount: 100, from: 'USD', to: 'PLN', expected: '$100.00 = PLN 350.00' },
			{ amount: 50, from: 'USD', to: 'PLN', expected: '$50.00 = PLN 175.00' },
			{ amount: 200, from: 'USD', to: 'PLN', expected: '$200.00 = PLN 700.00' },
		];

		for (const testObj of testCases) {
			render(
				<ResultBox
					from={testObj.from}
					to={testObj.to}
					amount={testObj.amount}
				/>,
			);
			const output = screen.getByTestId('result-box');
			expect(output).toHaveTextContent(testObj.expected);
			cleanup();
		}
	});

	it('should render same value when from equals to', () => {
		render(<ResultBox from='PLN' to='PLN' amount={100} />);
		const output = screen.getByTestId('result-box');
		expect(output).toHaveTextContent('PLN 100.00 = PLN 100.00');
		cleanup();
	});

	it('should render error message for negative amount', () => {
		render(<ResultBox from='PLN' to='USD' amount={-100} />);
		const output = screen.getByTestId('result-box');
		expect(output).toHaveTextContent('Wrong value…');
		cleanup();
	});
});
