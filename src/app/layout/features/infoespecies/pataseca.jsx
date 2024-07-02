import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalHeader, ModalDescription, ModalContent, ModalActions, Button, Header, Image, Modal, Segment, Portal } from 'semantic-ui-react';

function PatasecaComponent() {
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
        <ModalHeader>Euthynnus Lineatus</ModalHeader>
        <ModalContent image>
          <Image size='massive' src='/atun/infoespecies/pataseca.png' wrapped />
          <ModalDescription>
            <Header>Nombre Común: PataSeca</Header>
            <ol>
              <li>Boca terminal.</li>
              <li>Aleta pectoral pequeña.</li>
              <li>Primeras espinas de la aleta <br/>dorsal muy grandes a relación <br/>con las demás.</li>
              <li>Aleta caudal Horquillada.</li>
              <li>Cuerpo fusiforme.</li>
            </ol>
            <h3>Biologia:</h3>
            <ul>
              <li>
              Es un depredador oportunista <br/>que comparte el patrón de alimentación con otros atunes<br/> y 
              probablemente competir por <br/>el alimento con otras especies. se alimenta de peces y de <br/>
              invertebrados, Se lo puede <br/>encontrar en aguas que no sobrepasan los 23°C. <br/>Sus larvas son más frecuentes a 
              temperaturas superiores a 26°C
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
          Con siete aletillas después de la segunda aleta dorsal. Cuerpo desnudo después del 
          corselete de escamas. Escamas solo en la sección del corselete. Una fuerte quilla entre dos 
          quillas pequeñas a ambos lado de la base de la aleta caudal (Béarez., 2004), aletas pectorales 
          cortas, Azul oscuro en el dorso, con un área de 5-6 franjas negras horizontales en el dorso, 
          manchas variables de negro a gris por encima de las aletas pélvicas, ocasionalmente largas 
          estrías longitudinales e color gris parte inferior del costado y el vientre plateados (Fischer & 
          V.H., 1995).
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

function RedirectPTComponent() {
  return (
    <div>
      <PatasecaComponent />
    </div>
  );
}

export { PatasecaComponent };
export default RedirectPTComponent;
