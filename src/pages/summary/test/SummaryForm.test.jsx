import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { SummaryForm } from '../SummaryForm';
import userEvent from '@testing-library/user-event';

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

  userEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  userEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
});

test('popover responds to hover', async () => {
  render(<SummaryForm />);
  // popover start out hidden
  const nullPoppover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPoppover).not.toBeInTheDocument();
  //popover appers upon mouseover of  checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);

  expect(popover).toBeInTheDocument();
  //popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
