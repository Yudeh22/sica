// import React, { useState } from 'react';
// import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Aquí puedes agregar la lógica para autenticar al usuario
//     // Por ejemplo, haciendo una petición HTTP a tu servidor

//     // Aquí solo se muestra un ejemplo simple de validación
//     if (email === 'ictiologia' && password === 'ictio2024') {
//       // Si las credenciales son correctas, redirige al dashboard
//       navigate('/dashboard');
//     } else {
//       // Si las credenciales son incorrectas, mostramos un mensaje de error
//       setError('Usuario o contraseña incorrectas');
//     }
//   };

//   return (
//     <div style={{ position: 'relative', height: '100vh' }}>
//       {/* Fondo desenfocado */}
//       <div
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '105%',
//           backgroundImage: 'url("/atun/fondo/images (1).jpg")', // Ruta de la imagen desenfocada
//           opacity: 0.4,
//           filter: 'blur(5px)', // Ajusta el valor de desenfoque según lo necesites
//           zIndex: -1,
//           backgroundSize: 'cover', // Ajusta para cubrir todo el fondo sin repetirse
//         }}
//       />
      
//       {/* Contenido del formulario */}
//       <Grid
//         textAlign="center"
//         style={{ height: '100%', paddingTop: 100 }}
//         verticalAlign="middle"
//       >
//         <Grid.Column style={{ maxWidth: 450 }}>
//           <Header as="h1" color="blue" textAlign="center">
//             Iniciar Sesión en SICA
//           </Header>
//           <Form size="large">
//             <Segment stacked>
//               <Form.Input
//                 fluid
//                 icon="user"
//                 iconPosition="left"
//                 placeholder="Usuario"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <Form.Input
//                 fluid
//                 icon="lock"
//                 iconPosition="left"
//                 placeholder="Contraseña"
//                 type="password"
//                 onChange={(e) => setPassword(e.target.value)}
//               />

//               {error && <p style={{ color: 'red' }}>{error}</p>}

//               <Button color="blue" fluid size="large" onClick={handleLogin}>
//                 Ingresar
//               </Button>
//             </Segment>
//           </Form>
//         </Grid.Column>
//       </Grid>
//     </div>
//   );
// };

// export default LoginForm;






import React, { useState, useEffect } from 'react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
    
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);

  const validateForm = () => {
    if (!username.trim() || !password.trim()) {
      setError('Por favor, complete todos los campos.');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    // Simulamos una petición al servidor
    setTimeout(() => {
      if (username === 'ictiologia' && password === 'ictio2024') {
        if (rememberMe) {
          localStorage.setItem('rememberedUsername', username);
        } else {
          localStorage.removeItem('rememberedUsername');
        }
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard');
      } else {
        setError('Usuario o contraseña incorrectas');
      }
      setIsLoading(false);
    }, 1000);
  };

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(15deg, #0575E6, #ffffff)',
    animation: 'fadeIn 2s ease-in',
  };

  const containerStyle = {
    position: 'relative',
    height: '100vh',
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div>
      
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color="blue" textAlign="center" style={{ color: 'white' }}>
            {greeting}, bienvenido al SICA
          </Header>
          <Form size="large" onSubmit={handleLogin} loading={isLoading}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-label="Usuario"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Contraseña"
              />

              {error && <Message negative content={error} />}

              <Button color="blue" fluid size="large" type="submit">
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