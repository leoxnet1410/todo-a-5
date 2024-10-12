import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MyNavbar from "./Navbar/navbar";
import Categories from "./Home/Category";
import ProductList from "./Product/ProductList";
import ProductDetails from "./Product/ProductDetails";
import { Welcome } from "./From/From";
import Profile from "./Profile/Profile";
import Rooms from "./Rooms/Rooms";
import MainLayout from "./Prueba.jsx/Main";
import Admin from "./admin/admin";
import "./scss/App.scss";

function App() {
  return (
    <BrowserRouter>
      <Container fluid className="main">
        <Row>
          <Col xs={12} className="px-0">
            <MyNavbar />
          </Col>
        </Row>
        <Row className="p-5">
          <Routes>
            <Route path="Category" element={<Categories />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/" element={<Welcome />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="Rooms" element={<Rooms />} />
            <Route path="Main" element={<MainLayout />} />
            <Route path="admin" element={<Admin />} />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
