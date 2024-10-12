import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiClient } from '../Api/ApiClient';
import ProductCard from './ProductCard';
import FilterSidebar from '../Filter/FilterSidebar';
import { Row, Col, Spinner } from 'react-bootstrap';

const ProductList = () => {
  const { category } = useParams();
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublications = async () => {
      setLoading(true);
      setError(null); // Reset error state on new fetch
      try {
        const data = await ApiClient.Publication.getByCategoryName(category);
        setPublications(data);
        setFilteredPublications(data);
      } catch (err) {
        console.error('Error obteniendo publicaciones:', err);
        setError('No se pudieron cargar las publicaciones. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, [category]);

  const handleFilter = (filterCriteria) => {
    const filtered = publications.filter(publication => {
      const matchesPrice = filterCriteria.price ? publication.price <= filterCriteria.price : true;
      const matchesLocation = filterCriteria.location ? publication.location.includes(filterCriteria.location) : true;
      return matchesPrice && matchesLocation;
    });
    setFilteredPublications(filtered);
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        <p>Cargando publicaciones...</p>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="publication-list">
      <Row>
        <Col md={3}>
          <FilterSidebar onFilter={handleFilter} />
        </Col>
        <Col md={9}>
          <div className="d-flex justify-content-center flex-wrap">
            {filteredPublications.length > 0 ? (
              filteredPublications.map((publication) => (
                <ProductCard key={publication.id} publication={publication} />
              ))
            ) : (
              <p>No hay publicaciones para esta categoría.</p>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductList;
