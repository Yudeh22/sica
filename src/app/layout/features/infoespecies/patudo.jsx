import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalHeader, ModalDescription, ModalContent, ModalActions, Button, Header, Image, Modal, Segment, Portal } from 'semantic-ui-react';

function PatudoComponent() {
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
        <ModalHeader>Thunus Obesus</ModalHeader>
        <ModalContent image>
          <Image size='massive' src='/atun/infoespecies/patudodos.jpg' wrapped />
          <ModalDescription>
            <Header>Nombre Común: Patudo</Header>
            <ol>
              <li>Aletas pectorales moderadamente largas sobrepasa la de base de la segunda dorsal.</li>
              <li>Segundas aletas dorsales y anales cortas.</li>
              <li>Aleta caudal Horquillada.</li>
              <li>Cuerpo fusiforme.</li>
            </ol>
            <h3>Biologia:</h3>
            <ul>
              <li>
                Tolera donde las temperaturas del agua<br/> oscilan entre 13 ° a 29 °C, pero el óptimo<br/> está entre 
                17° y 22°C. Los juveniles y<br/> pequeños adultos forman cardúmenes en <br/>la superficie mezclado 
                con otros túnidos, <br/>se alimentan de una gran variedad de peces, cefalópodos y crustáceos 
                durante <br/>el día y por la noche
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
            primera aleta dorsal, Superficie ventral del hígado estriada. Escamas muy pequeñas. Aletas 
            pectorales moderadamente largas (Fischer & V.H., 1995), dorso azul oscuro metálico, parte 
            inferior de los costados y el vientre blanquecinos. Una banda lateral azul iridiscente a lo largo 
            del Costado en peces vivos. Primera aleta dorsal amarilla. Segunda aleta dorsal y la anal 
            amarillo pálido. Aletitas amarillo brillante, con bordes negros.
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

function RedirectPAComponent() {
  return (
    <div>
      <PatudoComponent />
    </div>
  );
}

export { PatudoComponent };
export default RedirectPAComponent;
