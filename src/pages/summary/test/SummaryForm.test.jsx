import { fireEvent, render, screen } from '@testing-library/react';
import { SummaryForm } from '../SummaryForm';

test('initial conditions', () => {
  render(<SummaryForm />);
  const checkboxElement = screen.getByRole('checkbox', {
    name: 'I agree with Terms and Conditions',
  });

  const buttonElement = screen.getByRole('button', {
    name: /confirm order/i,
  });

  expect(checkboxElement).not.toBeChecked();
  expect(buttonElement).toBeDisabled();
});

test('checking checkbox enables button first time, it disables button second click', () => {
  render(<SummaryForm />);
  const checkboxElement = screen.getByRole('checkbox', {
    name: /i agree with terms and conditions/i,
  });

  const buttonElement = screen.getByRole('button', {
    name: 'Confirm order',
  });

  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
});
