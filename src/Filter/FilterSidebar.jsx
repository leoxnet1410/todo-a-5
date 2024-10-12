import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faLaptop, faLanguage, faCalculator, faUsers, faPalette, faCogs, faChartLine, faStethoscope, faUser } from '@fortawesome/free-solid-svg-icons';

const FilterSidebar = ({ onCategorySelect }) => {
  const categories = [
    { icon: faGraduationCap, name: 'Educación' },
    { icon: faLaptop, name: 'Cursos Online' },
    { icon: faLanguage, name: 'Idiomas' },
    { icon: faCalculator, name: 'Ciencias Exactas' },
    { icon: faUsers, name: 'Ciencias Sociales' },
    { icon: faPalette, name: 'Artes y Humanidades' },
    { icon: faCogs, name: 'Tecnología e Ingeniería' },
    { icon: faChartLine, name: 'Marketing y Negocios' },
    { icon: faStethoscope, name: 'Salud y Medicina' },
    { icon: faUser, name: 'Desarrollo Personal' }
  ];

  return (
    <div className="filter-sidebar">
      <h5 className="sidebar-title">Categorías</h5>
      <ListGroup variant="flush" className="education-style">
        {categories.map((category) => (
          <ListGroup.Item
            key={category.name}
            className="d-flex align-items-center filter-item"
            onClick={() => onCategorySelect(category.name)} // Llamamos a la función al hacer clic
          >
            <FontAwesomeIcon icon={category.icon} />
            <span className="ms-3 category-text">{category.name}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default FilterSidebar;
