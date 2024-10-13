import React, { useState } from 'react';
import { Button, Image, Modal, Form } from 'react-bootstrap';
import { ApiClient } from '../Api/ApiClient';

const CreatePost = ({ showModal, handleCloseModal, categories }) => {
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        image: null, // Mantener una sola imagen
        category: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [imageInputKey, setImageInputKey] = useState(Date.now()); // Para resetear el input de imagen

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const handlePostImageUpload = (event) => {
        const file = event.target.files[0]; // Obtener el primer archivo
        setNewPost({
            ...newPost,
            image: file, // Almacenar una sola imagen
        });
    };

    const handleCreatePost = async () => {
        setErrorMessage('');

        if (!newPost.title || !newPost.description || !newPost.category) {
            setErrorMessage('Por favor completa todos los campos obligatorios.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('publication[name]', newPost.title);
            formData.append('publication[description]', newPost.description);
            formData.append('publication[price]', newPost.price);
            formData.append('publication[location]', newPost.location);
            formData.append('publication[category_id]', newPost.category);

            if (newPost.image) {
                formData.append('publication[image]', newPost.image); // Solo una imagen
            }

            await ApiClient.Publication.create(formData);
            handleCloseModal();
            setNewPost({
                title: '',
                description: '',
                price: '',
                location: '',
                image: null, // Resetear la imagen
                category: '',
            });
            setImageInputKey(Date.now()); // Resetear el input de imagen
        } catch (error) {
            const errorMsg = error.response?.data?.errors?.join(', ') || 'Error creating the publication. Please try again.';
            setErrorMessage(errorMsg);
        }
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Crear Publicación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="postTitle">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa un título"
                            name="title"
                            value={newPost.title}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="postDescription" className="mt-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Ingresa una descripción"
                            name="description"
                            value={newPost.description}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="postPrice" className="mt-3">
                        <Form.Label>Precio (opcional)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingresa un precio"
                            name="price"
                            value={newPost.price}
                            onChange={handleInputChange}
                            min="0"
                        />
                    </Form.Group>

                    <Form.Group controlId="postLocation" className="mt-3">
                        <Form.Label>Ubicación</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa una ubicación"
                            name="location"
                            value={newPost.location}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="postCategory" className="mt-3">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control
                            as="select"
                            name="category"
                            value={newPost.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="postImage" className="mt-3">
                        <Form.Label>Agregar Imagen</Form.Label>
                        <Form.Control
                            key={imageInputKey}
                            type="file"
                            accept="image/*" // Solo aceptar imágenes
                            onChange={handlePostImageUpload}
                        />
                    </Form.Group>

                    <div className="image-preview-container mt-3">
                        {newPost.image && (
                            <div className="image-preview-wrapper" style={{ display: 'inline-block', margin: '10px' }}>
                                <Image src={URL.createObjectURL(newPost.image)} style={{ width: '100px', height: '100px' }} fluid />
                            </div>
                        )}
                    </div>

                    {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleCreatePost}>
                    Publicar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePost;
