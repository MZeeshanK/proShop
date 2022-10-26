import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Home from './screens/Home';
import Product from './screens/Product';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';
import Shipping from './screens/Shipping';
import Payment from './screens/Payment';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/order/:id" element={<Order />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/:id" element={<Cart />} />
            <Route path="/products/:id" element={<Product />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
