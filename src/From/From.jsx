import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill1, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const Welcome = () => {
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario enviado');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className={`auth-container ${isActive ? 'active' : ''}`} id="auth-container">
        {/* Formulario de Registro */}
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Crea una cuenta</h1>
            <span>Usa tu correo electrónico para registrarte</span>
            <input type="text" placeholder="Nombre" required />
            <input type="text" placeholder="Apellido" required />
            <input type="email" placeholder="Correo electrónico" required />
            
            {/* Campo de Contraseña con opción de mostrar/ocultar */}
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            </div>

            {/* Campo para confirmar la contraseña */}
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar contraseña"
                required
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            </div>

            <input type="date" placeholder="Fecha de nacimiento" required />
            <input type="tel" placeholder="Número de teléfono" required pattern="[0-9]{10}" />
            <select required>
              <option value="" disabled selected>Selecciona tu país</option>
              <option value="mexico">México</option>
              <option value="colombia">Colombia</option>
              <option value="argentina">Argentina</option>
              <option value="chile">Chile</option>
            </select>
            <button type="submit">Registrarse</button>
          </form>
        </div>

        {/* Formulario de Inicio de Sesión */}
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>
              1 Dollar <FontAwesomeIcon icon={faMoneyBill1} className="rotating-icon" />
            </h1>
            <span>o usa tu correo electrónico y contraseña</span>
            <input type="email" placeholder="Correo electrónico" required />
            <input type="password" placeholder="Contraseña" required />
            {/* Botón corregido para recuperación de contraseña */}
            <button type="button" onClick={() => {/* handle password recovery */}}>
              ¿Olvidaste tu contraseña?
            </button>
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>

        {/* Panel de Alternación */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>¡Bienvenido de nuevo!</h1>
              <p>Para mantenerte conectado con nosotros, por favor inicia sesión con tu información personal</p>
              <button className="hidden" onClick={() => setIsActive(false)}>Iniciar Sesión</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>¡Hola, amigo!</h1>
              <p>Ingresa tus datos personales y empieza con nosotros hoy</p>
              <button className="hidden" onClick={() => setIsActive(true)}>Registrarse</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;