
import React, { useState } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí puedes agregar la lógica para autenticar al usuario
    // Por ejemplo, haciendo una petición HTTP a tu servidor

    // Aquí solo se muestra un ejemplo simple de validación
    if (email === 'ictiologia' && password === '123456') {
      // Si las credenciales son correctas, redirige al dashboard
      navigate('/dashboard');
    } else {
      // Si las credenciales son incorrectas, mostramos un mensaje de error
      setError('Usuario o contraseña incorrectas');
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* Fondo desenfocado */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '105%',
          backgroundImage: 'url("/atun/fondo/images (1).jpg")', // Ruta de la imagen desenfocada
          opacity: 0.4,
          filter: 'blur(5px)', // Ajusta el valor de desenfoque según lo necesites
          zIndex: -1,
          backgroundSize: 'cover', // Ajusta para cubrir todo el fondo sin repetirse
        }}
      />
      
      {/* Contenido del formulario */}
      <Grid
        textAlign="center"
        style={{ height: '100%', paddingTop: 100 }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color="blue" textAlign="center">
            Iniciar Sesión en SICA
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Usuario"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Contraseña"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p style={{ color: 'red' }}>{error}</p>}

              <Button color="blue" fluid size="large" onClick={handleLogin}>
                Ingresar
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default LoginForm;
