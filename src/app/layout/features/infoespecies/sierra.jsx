import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalHeader, ModalDescription, ModalContent, ModalActions, Button, Header, Image, Modal, Segment, Portal } from 'semantic-ui-react';

function SierraComponent() {
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
        <ModalHeader>Scombrerimorus Sierra</ModalHeader>
        <ModalContent image>
          <Image size='massive' src='/atun/infoespecies/sierra.png' wrapped />
          <ModalDescription>
            <Header>Nombre Común: Sierra</Header>
            <ol>
              <li>Aleta pectoral pequeña.</li>
              <li>Segunda aleta dorsal más alta que la primera</li>
              <li>Aleta anal similar en forma y altura a la segunda dorsal</li>
              <li>Aleta caudal Horquillada.</li>
              <li>Cuerpo alargado y comprimido.</li>
            </ol>
            <h3>Biologia:</h3>
            <ul>
              <li>
                Especie epipelágica nerítica. Forma cardúmenes, desova cerca<br/> de las costas en toda su 
                área de distribución, se alimenta de peces.
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
            Extremo posterior del maxilar expuesto, situado a nivel del borde posterior del ojo, aleta 
            dorsal con XV a XVIII espinas, segunda dorsal con 16 a 19 radios seguida por 7 a 10 
            aletitas, aleta anal similar en forma y altura a la segunda dorsal, con 16-21 radios seguida 
            por 7 a 10 aletitas, de 9 a 14 branquiespinas en la rama inferior del primer arco branquial. 
            Línea lateral gradualmente curva hacia abajo y hacia el pedúnculo caudal (Fischer & V.H., 
            1995), Color azul verdusco en el dorso Blanco plateado en la parte inferior de los costados y 
            en el vientre, Series de manchas café amarillo en los costados, Mitad anterior de la primera 
            aleta dorsal negra intenso, mitad posterior color blanco. Aletas pectorales cenizas.
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

function RedirectSIComponent() {
  return (
    <div>
      <SierraComponent />
    </div>
  );
}

export { SierraComponent };
export default RedirectSIComponent;
