import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ApiClient } from '../Api/ApiClient';
import CreateCategory from './CreateCategory';
import ProductCard from '../Product/ProductCard';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [publications, setPublications] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchPublicationsByCategory(selectedCategory);
    } else {
      setPublications([]);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const data = await ApiClient.Category.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Error obteniendo las categorías:', error);
    }
  };
  const fetchPublicationsByCategory = async (categoryName) => {
    try {
      const data = await ApiClient.Publication.getByCategory(categoryName);
      setPublications(data);
    } catch (error) {
      console.error('Error obteniendo publicaciones por categoría:', error);
    }
  };
  

  return (
    <Row className="my-4">
      <Col>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center">Materias Educativas Destacadas</h2>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Nueva Categoría</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateCategory onCategoryCreated={(newCategory) => setCategories([...categories, newCategory])} />
          </Modal.Body>
        </Modal>

        <div className="d-flex justify-content-center flex-wrap category-section">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Card
                key={category.id}
                className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Card.Img
                  variant="top"
                  src={category.image_url ? `http://localhost:3000${category.image_url}` : '/ruta/a/imagen/predeterminada.jpg'}
                />
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <Link to={`/products/${category.name}`}>
                    <button className="category-button">Ver Cursos</button>
                  </Link>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No hay categorías disponibles.</p>
          )}
        </div>

        <div className="d-flex justify-content-center flex-wrap publication-section mt-4">
          {publications.length > 0 ? (
            publications.map((publication) => (
              <ProductCard key={publication.id} publication={publication} />
            ))
          ) : (
            <p>No hay publicaciones para la categoría seleccionada.</p>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Categories;