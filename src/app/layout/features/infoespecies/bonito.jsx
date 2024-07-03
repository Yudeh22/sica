import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalHeader, ModalDescription, ModalContent, ModalActions, Button, Header, Image, Modal, Segment, Portal } from 'semantic-ui-react';

function BonitoComponent() {
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
        <ModalHeader>Sarda Orientalis</ModalHeader>
        <ModalContent image>
          <Image size='massive' src='/atun/infoespecies/bonitodos.jpg' wrapped />
          <ModalDescription>
            <Header>Nombre Común: Bonito</Header>
            <ol>
              <li>Boca grande.</li>
              <li>Aletas dorsales muy pequeñas.</li>
              <li>Aletas dorsales juntas.</li>
              <li>Aleta caudal Horquillada.</li>
              <li>Cuerpo fusiforme.</li>
            </ol>
            <h3>Biologia:</h3>
            <ul>
              <li>
                Esta especie vive en aguas de <br/>temperaturas que van desde los <br/>13,5 a 23 grados. Se 
                alimenta de clupeidos y de otros peces, de <br/>cefalópodos y de otros crustáceos decápodos
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
            Aletas dorsales con XVII-XIX espinas. Segunda aleta dorsal más baja que la primera con 15 
            a 16 radios seguida por 7 a 8 aletitas. Aleta anal con 14-16 radios seguida por 5 a 6 aletitas. 
            Radios pectorales 23 a 26 (Fischer & V.H., 1995), De 8 a 13 branquiespinas en el primer arco 
            branquial (Béarez., 2004), Pedúnculo caudal con una quilla lateral prominente entre 2 quillas 
            más pequeñas en cada lado. Dientes grandes cónicos. Sin vejiga natatoria (Béarez., 2004),
            Dorso y parte superior de los costados color azul metálico, Parte inferior de los costados y el 
            vientre plateados. Primera aleta dorsal completamente negra (Béarez., 2004)
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
      <BonitoComponent />
    </div>
  );
}

export { BonitoComponent };
export default RedirectBOComponent;
