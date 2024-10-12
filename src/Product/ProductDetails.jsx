import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import { ApiClient } from '../Api/ApiClient'; // Importamos correctamente el ApiClient

const ProductDetails = () => {
  const { id } = useParams(); // Obtenemos el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await ApiClient.Publication.getById(id); // Llamada a la API con getById
        setProduct(data);
      } catch (err) {
        console.error('Error obteniendo detalles del producto:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Image src={`http://localhost:3000${product.image_url}`} alt={product.name} fluid className="main-image" />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <h4 className="text-success">${product.price}</h4>

          <ListGroup className="mb-3">
            <ListGroup.Item>
              <strong>Descripción:</strong>
            </ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>

          <ListGroup className="mb-3">
            <ListGroup.Item>
              <strong>Ubicación:</strong>
            </ListGroup.Item>
            <ListGroup.Item>{product.location}</ListGroup.Item>
          </ListGroup>

          <Button variant="primary" block>
            Añadir al carrito
          </Button>
          <Button variant="outline-secondary" block>
            Comprar ahora
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
