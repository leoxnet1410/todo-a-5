import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl } from 'react-bootstrap';
import PerfilImage from "../img/img-category/perfil.jpg"

const MyNavbar = ({ userImage }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">1 Dollar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100">
          {/* Campo de búsqueda en el centro */}
          <Form className="d-flex mx-auto" style={{ width: '300px' }}>
            <FormControl
              type="search"
              placeholder="Buscar..."
              className="me-2"
              aria-label="Buscar"
            />
          </Form>
          <Nav className="ms-auto"> {/* Dropdown con la imagen del usuario */}
            <NavDropdown
              title={
                <img
                  src={PerfilImage}
                  alt="User"
                  style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                />
              }
              id="user-nav-dropdown"
            >
              <NavDropdown.Item href="/">Inicio</NavDropdown.Item>
              <NavDropdown.Item href="Category">Categorias</NavDropdown.Item>
              <NavDropdown.Item href="Rooms">Salas</NavDropdown.Item>
              <NavDropdown.Item href="Profile">Perfil</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
