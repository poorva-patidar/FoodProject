import "./App.css";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Cart from "./components/cart/Cart";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} exact/>
            <Route path="/eats/stores/:id/menus" element={ <Menu />} exact />
            <Route path="/cart" element={<Cart/>} exact></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
