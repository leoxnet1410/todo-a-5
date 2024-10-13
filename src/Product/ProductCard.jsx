import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ publication }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Image URL:', publication.image_url); // Log the image URL
  }, [publication]);

  const handleConsultClick = () => {
    console.log('Navigating to product ID:', publication.id); // Verificar el ID antes de navegar
    navigate(`/product/${publication.id}`);
  };

  return (
    <Card className="product-card">
      <Card.Img
        variant="top"
        src={publication.image_url ? `http://localhost:3000${publication.image_url}` : '/images/imagen_predeterminada.jpg'}
        alt={publication.name}
        className="product-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/imagen_predeterminada.jpg';
          console.log('Error cargando la imagen, usando imagen predeterminada.');
        }}
      />
      <Card.Body>
        <Card.Title className="card-title">{publication.name}</Card.Title>
        <Card.Text><strong>Descripción:</strong> {publication.description}</Card.Text>
        <Card.Text><strong>Precio:</strong> {publication.price}</Card.Text>
        <Card.Text><strong>Ubicación:</strong> {publication.location}</Card.Text>

        <Button variant="primary" className="consultar-button" onClick={handleConsultClick}>
          Consultar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
