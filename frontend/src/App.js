import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
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
import UserList from './screens/UserList';
import UserEdit from './screens/UserEdit';
import ProductList from './screens/ProductList';
import ProductEdit from './screens/ProductEdit';
import OrderList from './screens/OrderList';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function App() {
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    const generateId = async () => {
      const { data } = await axios.get(`${URL}/api/config/paypal`);

      setClientId(data);
    };
    generateId();
  }, []);

  return (
    <PayPalScriptProvider options={{ 'client-id': clientId }}>
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
              <Route path="/admin/productlist" element={<ProductList />} />
              <Route
                path="/admin/productlist/:pageNumber"
                element={<ProductList />}
              />
              <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
              <Route path="/admin/userlist" element={<UserList />} />
              <Route path="/admin/user/:id/edit" element={<UserEdit />} />
              <Route path="/admin/orderlist" element={<OrderList />} />
              <Route path="/search/:keyword" element={<Home />} />
              <Route path="/page/:pageNumber" element={<Home />} />
              <Route
                path="/search/:keyword/page/:pageNumber"
                element={<Home />}
              />
              <Route exact path="/" element={<Home />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
