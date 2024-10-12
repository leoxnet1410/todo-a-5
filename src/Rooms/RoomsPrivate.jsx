import React from 'react';

const RoomsPrivate = () => {
  return (
    <div className="room-container">
      <div className="video-section">
        <div className="video-placeholder">
          {/* Aquí aparecería el video en vivo */}
          <p>Transmisión en vivo</p>
        </div>
    
      </div>

      <div className="chat-section">
        <h3>Chat en Vivo</h3>
        <div className="chat-messages">
          {/* Mensajes de chat se renderizarían aquí */}
          <div className="message">Usuario 1: Hola!</div>
          <div className="message">Usuario 2: ¿Cómo están?</div>
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Escribe un mensaje..." />
          <button className="btn">Enviar</button>
        </div>
      </div>

      <div className="user-list">
        <h4>Usuarios Conectados</h4>
        <ul>
          <li>Usuario 1</li>
          <li>Usuario 2</li>
          <li>Usuario 3</li>
        </ul>
      </div>
    </div>
  );
};

export default RoomsPrivate;
