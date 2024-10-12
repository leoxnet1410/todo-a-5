import React, { useState } from 'react';
import { Button, Image, Modal, Form } from 'react-bootstrap';
import { ApiClient } from '../Api/ApiClient';

const CreatePost = ({ showModal, handleCloseModal, categories }) => {
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        images: [],
        category: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [imageInputKey, setImageInputKey] = useState(Date.now()); // To reset file input

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const handlePostImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setNewPost({
            ...newPost,
            images: [...newPost.images, ...files],
        });
    };

    const handleRemoveImage = (index) => {
        setNewPost({
            ...newPost,
            images: newPost.images.filter((_, i) => i !== index),
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

            newPost.images.forEach((image, index) => {
                formData.append(`publication[images][${index}]`, image);
            });

            await ApiClient.Publication.create(formData);
            handleCloseModal();
            setNewPost({
                title: '',
                description: '',
                price: '',
                location: '',
                images: [],
                category: '',
            });
            setImageInputKey(Date.now()); // Reset file input
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
                        <Form.Label>Agregar Imágenes</Form.Label>
                        <Form.Control
                            key={imageInputKey}
                            type="file"
                            accept="image/*,video/*"
                            onChange={handlePostImageUpload}
                            multiple
                        />
                    </Form.Group>

                    <div className="image-preview-container mt-3">
                        {newPost.images.map((image, index) => (
                            <div key={index} className="image-preview-wrapper" style={{ display: 'inline-block', margin: '10px', position: 'relative' }}>
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        padding: '2px 6px',
                                        fontSize: '12px',
                                    }}
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    x
                                </span>
                                {image.type.startsWith('image/') ? (
                                    <Image src={URL.createObjectURL(image)} style={{ width: '100px', height: '100px' }} fluid />
                                ) : (
                                    <video src={URL.createObjectURL(image)} style={{ width: '100px', height: '100px' }} controls />
                                )}
                            </div>
                        ))}
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
