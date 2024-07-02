import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalHeader, ModalDescription, ModalContent, ModalActions, Button, Header, Image, Modal, Segment, Portal } from 'semantic-ui-react';

function AletaComponent() {
  const [open, setOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate('/especies');
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Modal onClose={handleClose} open={open}>
        <ModalHeader>Thunus Albacares</ModalHeader>
        <ModalContent image>
          <Image size='massive' src='/atun/infoespecies/aletamarilla.png' wrapped />
          <ModalDescription>
            <Header>Nombre Común: Aleta Amarilla</Header>
            <ol>
              <li>La aleta pectoral larga, llegando <br/>más allá del origen de la segunda aleta dorsal.</li>
              <li>Segundas aletas dorsales y anales muy largas.</li>
              <li>Aleta caudal Horquillada.</li>
              <li>Cuerpo fusiforme.</li>
            </ol>
            <h3>Biologia:</h3>
            <ul>
              <li>
                Los peces más grandes con frecuencia <br/>forman cardúmenes con delfines, <br/>también se asocian con 
                objetos flotantes y otros objetos.<br/>Se alimentan de peces, crustáceos y <br/>calamares, el desove 
                lo realiza durante todo el año aunque más intenso durante el verano 
              </li>
            </ul>
          </ModalDescription>
        </ModalContent>
        <ModalActions>
          <Button color='grey' onClick={handleClose}>
            Regresar
          </Button>
          <Button
            content="Más información"
            labelPosition='right'
            color='blue'
            icon='info'
            onClick={handleOpenModal}
          />
        </ModalActions>
      </Modal>

      <Portal onClose={handleCloseModal} open={modalOpen}>
        <Segment
          style={{
            left: '50%',
            position: 'fixed',
            top: '52%',
            zIndex: 10000,
          }}
        >
          <Header>Descripción de la especie</Header>
          <p>
            Especie de gran talla, altura máxima del cuerpo situada a nivel de la mitad de la base de la 
            primera aleta dorsal, superficie del hígado sin estrías. Espinas dorsales XIII o XIV, de 26 
            a 34 branquiespinas en el primer arco branquial  (Fischer & V.H., 1995), Dorso azul oscuro metálico,
            llegando a amarillo y plateado en los costados y el vientre. Aletas dorsal y anal, incluyendo las
            aletitas, amarillo brillante, las aletitas con un borde negro.
          </p>
          <Button
            content='Cerrar'
            negative
            onClick={handleCloseModal}
          />
        </Segment>
      </Portal>
    </>
  );
}

function RedirectAAComponent() {
  return (
    <div>
      <AletaComponent />
    </div>
  );
}

export { AletaComponent };
export default RedirectAAComponent;
