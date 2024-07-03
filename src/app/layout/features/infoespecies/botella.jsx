import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalHeader, ModalDescription, ModalContent, ModalActions, Button, Header, Image, Modal, Segment, Portal } from 'semantic-ui-react';

function BotellaComponent() {
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
        <ModalHeader>Auxis Thazard Brachydorax</ModalHeader>
        <ModalContent image>
          <Image size='massive' src='/atun/infoespecies/botellados.jpg' wrapped />
          <ModalDescription>
            <Header>Nombre Común: Botella Grande</Header>
            <ol>
              <li>Boca terminal.</li>
              <li>Aletas dorsales bien separadas.</li>
              <li>Aletas pectorales cortas.</li>
              <li>Aleta caudal Horquillada.</li>
              <li>Cuerpo fusiforme.</li>
            </ol>
            <h3>Biologia:</h3>
            <ul>
              <li>
              En el pacifico oriental se observa ejemplares maduros durante<br/> todo el año, aunque en Costa 
              Rica<br/> el desove es más intenso <br/>desde diciembre hasta abril, se <br/>alimenta 
              principalmente de peces y de invertebrados.
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
            Aletas dorsales con X-XII espinas. Segunda aleta dorsal seguida por 8 aletitas. Aletas 
            pectorales cortas, pero alcanzan la línea vertical desde el margen anterior del área sin 
            escamas en el dorso. Aleta anal seguida por 7 aletitas. Cuerpo sin escamas excepto por el 
            corsé bien desarrollado, extensión posterior del corsé es angosta (Fischer & V.H., 1995), 
            Dorso azulado oscuro cambiando de purpura a casi negro en la cabeza. Con 15 o más 
            líneas oscuras onduladas y angostas, oblicuas o casi horizontales, Vientre blanco. Aletas 
            pectorales y pélvicas purpura, negras en su lado interno (Fischer & V.H., 1995)
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

function RedirectBOComponent() {
  return (
    <div>
      <BotellaComponent />
    </div>
  );
}

export { BotellaComponent };
export default RedirectBOComponent;
