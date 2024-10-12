import React, { useState } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import CreateCategory from '../Home/CreateCategory';  // Importa el formulario

const Admin = () => {
  const [show, setShow] = useState(false);

  // Funciones para manejar el estado del modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card style={{ width: '18rem' }}>  {/* Define el ancho de la tarjeta */}
      <Card.Body>
        <Card.Title>Administración de Categorías</Card.Title>
        <Card.Text>
          Crea nuevas categorías para tu sistema utilizando el siguiente botón.
        </Card.Text>

        {/* Botón más pequeño dentro de la tarjeta */}
        <Button
          variant="primary"
          size="sm"
          onClick={handleShow}
          style={{ width: '150px' }}  
        >
          Crear Nueva Categoría
        </Button>

        {/* Modal que contiene el formulario CreateCategory */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Categoría</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateCategory />  {/* Aquí se muestra el formulario */}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleClose}
              style={{ width: '100px' }}  
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default Admin;
