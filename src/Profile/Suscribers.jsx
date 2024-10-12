import React, { useState } from 'react';
import { Card, ListGroup, Image, Form } from 'react-bootstrap';

const Subscribers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Lista manual de suscriptores (ejemplo)
  const subscribers = [
    {
      name: 'Juan Pérez',
      profilePic: 'https://via.placeholder.com/50', // Puedes reemplazar con URLs reales
    },
    {
      name: 'María López',
      profilePic: 'https://via.placeholder.com/50',
    },
    {
      name: 'Carlos García',
      profilePic: 'https://via.placeholder.com/50',
    },
  ];

  // Filtrar suscriptores según el término de búsqueda
  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card style={{ width: '100%', padding: '20px', marginTop: '20px' }}>
      <Card.Body>
        <h3>Suscriptores</h3>

        {/* Buscador */}
        <Form.Control
          type="text"
          placeholder="Buscar suscriptor..."
          className="mb-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Lista de suscriptores */}
        {filteredSubscribers.length > 0 ? (
          <ListGroup>
            {filteredSubscribers.map((subscriber, index) => (
              <ListGroup.Item key={index} className="d-flex align-items-center">
                <Image
                  src={subscriber.profilePic}
                  roundedCircle
                  style={{ width: '50px', height: '50px', marginRight: '15px' }}
                />
                <span>{subscriber.name}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No se encontraron suscriptores.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default Subscribers;

