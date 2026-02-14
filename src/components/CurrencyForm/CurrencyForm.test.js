import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';

describe('Component CurrencyForm', () => {
	it('should render without crashing', () => {
		render(<CurrencyForm action={() => {}} />);
		cleanup();
	});

	it('should run action callback on form submit', () => {
		const action = jest.fn();
		render(<CurrencyForm action={action} />);
		const submitButton = screen.getByText('Convert');
		userEvent.click(submitButton);
		expect(action).toHaveBeenCalledTimes(1);
		cleanup();
	});

	it('should pass proper data to action callback', () => {
		const action = jest.fn();
		render(<CurrencyForm action={action} />);
		const amountField = screen.getByTestId('amount');
		const fromField = screen.getByTestId('from');
		const toField = screen.getByTestId('to');
		const submitButton = screen.getByText('Convert');
		userEvent.type(amountField, '100');
		userEvent.selectOptions(fromField, 'PLN');
		userEvent.selectOptions(toField, 'USD');
		userEvent.click(submitButton);
		expect(action).toHaveBeenCalledWith({
			amount: 100,
			from: 'PLN',
			to: 'USD',
		});
		cleanup();
	});
	it('should handle multiple test cases', () => {
		const testCases = [
			{ amount: '100', from: 'PLN', to: 'USD' },
			{ amount: '20', from: 'USD', to: 'PLN' },
			{ amount: '200', from: 'PLN', to: 'USD' },
			{ amount: '345', from: 'USD', to: 'PLN' },
		];

		for (const testObj of testCases) {
			const action = jest.fn();
			render(<CurrencyForm action={action} />);

			const amountField = screen.getByTestId('amount');
			const fromField = screen.getByTestId('from');
			const toField = screen.getByTestId('to');
			const submitButton = screen.getByText('Convert');

			userEvent.type(amountField, testObj.amount);
			userEvent.selectOptions(fromField, testObj.from);
			userEvent.selectOptions(toField, testObj.to);
			userEvent.click(submitButton);

			expect(action).toHaveBeenCalledWith({
				amount: parseInt(testObj.amount),
				from: testObj.from,
				to: testObj.to,
			});

			cleanup();
		}
	});
});
