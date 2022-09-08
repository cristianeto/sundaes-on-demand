import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

describe('Subtotals', () => {
  it('should render the scoops subtotal', async () => {
    //render the Scoop Component
    render(<Options optionType='scoops' />);

    // make sure the scoops subtotal start with $0.00
    const scoopsSubtotal = screen.getByText('Scoops subtotal: $', {
      exact: false,
    });

    expect(scoopsSubtotal).toHaveTextContent('0.00');

    //  update the quantity of vanilla scoop , check subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopsSubtotal).toHaveTextContent('2.00');

    // update the quantioty o chocolate , check new subtotal

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });

    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(scoopsSubtotal).toHaveTextContent('6.00');
  });
});
