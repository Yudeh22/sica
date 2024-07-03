import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalHeader, ModalDescription, ModalContent, ModalActions, Button, Header, Image, Modal, Segment, Portal } from 'semantic-ui-react';

function BarrileteComponent() {
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
        <ModalHeader>Katsuwonus Pelamis</ModalHeader>
        <ModalContent image>
          <Image size='massive' src='/atun/infoespecies/barriletedos.jpg' wrapped />
          <ModalDescription>
            <Header>Nombre Común: Barrilete</Header>
            <ol>
              <li>Aleta pectoral corta.</li>
              <li>Primera aleta dorsal más alta<br/> que la segunda.</li>
              <li>Espacio pequeño entre la<br/> primera dorsal y segunda dorsal.</li>
              <li>Aleta caudal Horquillada.</li>
              <li>Cuerpo fusiforme.</li>
            </ol>
            <h3>Biologia:</h3>
            <ul>
              <li>
              Los adultos siguen la isoterma de<br/> 15°C, mientras que sus larvas se<br/> encuentran en 
              aguas de 25°C. <br/>Forman grupos generalmente<br/> asociados con convergencias y<br/> zonas
               limítrofes entre masas de<br/> aguas frías y cálidas. El desove<br/> de esta especie es discontinuo<br/> durante 
               todo el año en aguas<br/> ecuatoriales. Su dieta se <br/>compone principalmente de peces,
               crustáceos y moluscos.
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
            Dientes de forma cónica, dispuestos en una sola serie, dos aletas la primera con XIV a XVI 
            espinas, y de 14 a 15 radios la segunda aleta, seguida de 7 a 9 aletillas, Tiene una fuerte 
            quilla entre dos quillas pequeñas a ambos lados de la base de la aleta caudal (Fischer & V.H., 
            1995), de 53 a 63 branquiespinas en el primer arco branquial (Béarez., 2004), Dorso azul 
            purpura oscuro, partes bajas de los flancos y vientres plateados. Con 4 a 6 barras 
            longitudinales oscuras muy evidentes (Béarez., 2004)
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

function RedirectBRComponent() {
  return (
    <div>
      <BarrileteComponent />
    </div>
  );
}

export { BarrileteComponent };
export default RedirectBRComponent;
