import React, { useState, useEffect } from 'react';
import { Button, Image, Row, Col } from 'react-bootstrap';
import { ApiClient } from '../Api/ApiClient';
import CreatePost from './CreatePost';
import Subscribers from './/Suscribers'; // Importa el componente de suscriptores

const Profile = ({ name, username, followersCount, followingCount }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [activeTab, setActiveTab] = useState('publicaciones');
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await ApiClient.Category.getAll();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'publicaciones':
        return (
          <Row className="gallery">
            {[...Array(6)].map((_, index) => (
              <Col key={index} xs={4} className="gallery-item">
                <Image src="https://via.placeholder.com/200" alt="Post" fluid />
              </Col>
            ))}
          </Row>
        );
      case 'suscritos':
        return <Subscribers />; // Muestra el componente Subscribers cuando está activa la pestaña
      case 'salas':
        return <div>Salas: Aquí mostrarás las salas activas o creadas por el usuario.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="profile-container" style={{ padding: '20px', color: '#000' }}>
      <h1>{name}</h1>

      <Row className="justify-content-start align-items-center">
        <Col xs={12} md={2} className="text-center">
          <label htmlFor="upload-photo">
            <Image
              src={profilePic || 'https://via.placeholder.com/150'}
              roundedCircle
              className="profile-image"
              alt="Profile"
              style={{ width: '150px', height: '150px', border: '2px solid #ccc' }}
            />
          </label>
          <input
            type="file"
            id="upload-photo"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
            accept="image/*"
          />
        </Col>

        <Col xs={12} md={4} className="d-flex flex-column justify-content-center">
          <h2>{name}</h2>
          <div className="profile-stats mt-3">
            <strong>{followersCount}</strong> seguidores &nbsp;&nbsp;
            <strong>{followingCount}</strong> seguidos
          </div>
          <br />
          <div className="d-flex justify-content-start gap-2 mt-2">
            <Button variant="outline-secondary" size="sm" onClick={() => setShowModal(true)}>
              Crear Publicación
            </Button>
            <Button variant="outline-secondary" size="sm">
              Editar perfil
            </Button>
          </div>
        </Col>
      </Row>

      <div className="profile-tabs mt-4">
        <Button
          variant={activeTab === 'publicaciones' ? 'dark' : 'light'}
          onClick={() => setActiveTab('publicaciones')}
        >
          Publicaciones
        </Button>
        <Button
          variant={activeTab === 'suscritos' ? 'dark' : 'light'}
          onClick={() => setActiveTab('suscritos')}
        >
          Suscritos
        </Button>
      </div>

      <div className="profile-content mt-3">{renderContent()}</div>

      <CreatePost
        showModal={showModal}
        handleCloseModal={() => setShowModal(false)}
        categories={categories}
      />
    </div>
  );
};

export default Profile;
