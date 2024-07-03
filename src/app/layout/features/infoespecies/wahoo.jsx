import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalHeader, ModalDescription, ModalContent, ModalActions, Button, Header, Image, Modal, Segment, Portal } from 'semantic-ui-react';

function WahooComponent({ onClose }) {
  const [open, setOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose();
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
        <ModalHeader>Acanthocybium  Solandri</ModalHeader>
        <ModalContent image>
          <Image size='massive' src='/atun/infoespecies/wahoo2.jpg' wrapped />
          <ModalDescription>
            <Header>Nombre Común: Wahoo</Header>
            <ol>
              <li>Boca grande y terminal con dientes fuertes.</li>
              <li>Rayas de color azul en el cuerpo.</li>
              <li>Aleta caudal horquillada</li>
              <li>Cuerpo largo, fusiforme y moderadamente comprimido.</li>
            </ol>
            <h3>Biologia:</h3>
            <ul>
              <li>Esta especie es frecuentemente solitarios o formando <br/>
                pequeños agregados sueltos en lugar de escuelas compactos, <br/>
                se alimentan de peces y calamares.</li>
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
            // positive
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
          <Header>Descripción de la especie </Header>
          <p>Dientes triangulares, comprimidos y finamente aserrados. Hocico de longitud 
            aproximadamente igual al resto de la cabeza, arcos branquiales sin branquiespinas. Parte 
            posterior del maxilar totalmente oculto por el hueso preorbitario Máxima de 35 cm de 
            longitud total y común de 20 cm (Béarez., 2004), aleta Dorsal con base larga, XXIII a XXVII 
            espinas, 11 a 16 + 8 o 9 aletitas.
          </p>
          <p> Radios anales 11 a 14 seguidos de 7 a 9 aletitas, Cuerpo 
            cubierto con escamas pequeñas, Sin el corsé anterior desarrollado, pedúnculo caudal 
            pequeño (Fischer & V.H., 1995), Color verde azulado iridiscente en el dorso; costados 
            plateados con 24-30 barras azul cobalto, algunas veces doble o con forma de "Y" (Fischer & 
            V.H., 1995)
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

function RedirectComponent() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/especies');
  };

  return (
    <div>
      <WahooComponent onClose={handleClose} />
    </div>
  );
}

export { WahooComponent };
export default RedirectComponent;
