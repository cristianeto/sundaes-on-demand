import { render } from '@testing-library/react';
import App from './App';

test('<App />', () => {
  const { baseElement } = render(<App />);

  expect(baseElement).toMatchSnapshot();
  expect(baseElement).toBeInTheDocument();
});
