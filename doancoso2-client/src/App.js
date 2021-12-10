import './App.css';
import * as React from 'react';
import "react-toastify/dist/ReactToastify.css";
import store from './redux/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { Provider } from 'react-redux';

import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Erro404 from './Components/Erro404/Erro404';

const About = React.lazy(() => import('./Components/About/About'));
const Checkout = React.lazy(() => import('./Components/Checkout/Checkout'));
const Contact = React.lazy(() => import('./Components/Contact/Contact'));
const DetailProduct = React.lazy(() => import('./Components/DetailProduct/DetailProduct'));
const Product = React.lazy(() => import('./Components/Product/Product'));
const Login = React.lazy(() => import('./Components/User/MainLogin'));
const Register = React.lazy(() => import('./Components/User/MainRegister'));
const Viewcart = React.lazy(() => import('./Components/Cart/Cart'))
const SuccessCheckout = React.lazy(() => import('./Components/Checkout/SuccessCheckout'))
const DanhMucProduct = React.lazy(() => import('./Components/Product/DanhMucProduct'));
const Home = React.lazy(() => import('./Components/Home/Home'));

function App() {
  return (
    <Router>
      <Provider store={store}>
        <ToastContainer />
        <div id="home4">
          <Header />
          <Switch>
            <React.Suspense fallback={
              <div className="loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            }>
              <Route exact path="/"> <Home /> </Route>
              <Route exact path="/Product"> <Product /> </Route>
              <Route exact path="/About"> <About /> </Route>
              <Route exact path="/Checkout"> <Checkout /> </Route>
              <Route exact path="/Contact"> <Contact /> </Route>
              <Route exact path="/DetailProduct/:id"> <DetailProduct /></Route>
              <Route exact path="/Viewcart"> <Viewcart /> </Route>
              <Route exact path="/Products/:id"> <DanhMucProduct /> </Route>
              {/* ------------------- */}
              <Route exact path="/Register"> <Register /> </Route>
              <Route exact path="/Login"> <Login /> </Route>
              <Route exact path="/Success"> <SuccessCheckout /> </Route>
            </React.Suspense>
            <Route> <Erro404 /> </Route>
          </Switch>
          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

export default App;
