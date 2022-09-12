import { Container } from 'react-bootstrap';
import { OrderDeatilsProvider } from './contexts/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';

function App() {
  return (
    <Container>
      <OrderDeatilsProvider>
        {/** Sumary page and entry page need provider */}
        <OrderEntry />
      </OrderDeatilsProvider>
      {/**Confirmation page does not need a provider*/}
    </Container>
  );
}

export default App;
