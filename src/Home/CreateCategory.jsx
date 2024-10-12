import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);  // Estado para almacenar el archivo de imagen

  // Manejar el cambio en el input de la imagen
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);  // Tomamos el primer archivo seleccionado
  };

  // Manejar la creación de una nueva categoría
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creamos un objeto FormData para enviar los datos del formulario, incluido el archivo
    const formData = new FormData();
    formData.append('category[name]', name);  // Anidamos el nombre
    formData.append('category[image]', image);  // Anidamos la imagen

    try {
      // Realizamos la petición POST para crear la categoría
      const response = await axios.post('http://localhost:3000/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Indicamos que enviamos datos tipo FormData
        },
      });
      console.log('Categoría creada:', response.data);
      // Aquí podrías realizar cualquier acción adicional después de la creación
    } catch (error) {
      console.error('Error al crear la categoría:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="categoryName">
        <Form.Label>Nombre de la Categoría</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el nombre de la categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="categoryImage" className="mt-3">
        <Form.Label>Imagen de la Categoría</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"  // Aceptamos solo archivos de imagen
          onChange={handleImageChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-4">
        Crear Categoría
      </Button>
    </Form>
  );
};

export default CreateCategory;
