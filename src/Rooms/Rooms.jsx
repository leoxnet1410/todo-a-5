import React, { useState } from 'react';
import RoomsPrivate from './RoomsPrivate';

const Rooms = () => {
  const [isStreaming, setIsStreaming] = useState(false);

  // Función para manejar el inicio de la transmisión
  const handleStartStreaming = () => {
    setIsStreaming(true);
  };

  return (
    <div className="rooms-container">
      {/* Botón para iniciar transmisión */}
      <div className="header">
        <button className="btn start-streaming-btn" onClick={handleStartStreaming}>
          Iniciar transmisión
        </button>
      </div>

      {/* Mostrar la sección de transmisiones en vivo o el componente RoomsPrivate */}
      {isStreaming ? (
        <RoomsPrivate />
      ) : (
        <div className="live-stream-grid">
          <h3>Personas transmitiendo en vivo</h3>
          <div className="stream-grid">
            {/* Transmisiones en vivo de otros usuarios */}
            <div className="stream-box">
              <div className="video-placeholder">
                <p>Transmisión de Usuario 1</p>
              </div>
            </div>
            <div className="stream-box">
              <div className="video-placeholder">
                <p>Transmisión de Usuario 2</p>
              </div>
            </div>
            <div className="stream-box">
              <div className="video-placeholder">
                <p>Transmisión de Usuario 3</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
