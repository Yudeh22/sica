

import React, { useState } from "react";
import { Header, Container, Sidebar, Menu, Icon, TabPane, Tab, Divider, List, Button, Modal, ModalHeader, ModalContent, ModalDescription, ModalActions } from "semantic-ui-react";
import CustomSidebar from "./SideExample";
import { useNavigate } from "react-router-dom";


import _ from 'lodash';
import {
  ItemImage,
  ItemHeader,
  ItemGroup,
  ItemDescription,
  ItemContent,
  Item,
} from 'semantic-ui-react'


const colors = [
  'blue',
  'black',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'red',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
]

const panes = [
  {
    menuItem: 'Descripción del Proyecto',
    render: () => 
    <TabPane attached={false}>
        <ItemGroup>
          <Item>

            <ItemContent>
              <ItemHeader as='a' style={{ marginTop: '50px'  }}>Información:</ItemHeader>
              <ItemDescription style={{ fontSize: '16px'}}>
                <p>
                  La presente pagina web fue desarrollada por Andres Yudeh estudiante de la facultad<br/> 
                  de ciencias de la vida y tecnologias (FCVT), como parte del proceso de titulación en la<br/>  
                  Universidad Laica Eloy Alfaro de Manabi (ULEAM).
                </p>
                <p>
                  El modelo de reconocimiento es capaz de diferenciar hasta ocho tipos de especies de<br/>  
                  atunes (las especies con mas presencia en nuestra región). Para probar solo el modelo<br/>  
                  haz <a href="https://teachablemachine.withgoogle.com/models/3-S1t9wTc/" target="_blank" rel="noopener noreferrer"> clic aquí.</a>
                </p>
              </ItemDescription>
            </ItemContent>
            <ItemImage size='large' src='https://nirsa.com/wp-content/uploads/2022/05/220428_DiaMundialDelAtun_NIRSA1655x1095-1024x678-1.webp' />      
          </Item>
          <br/><br/>
        </ItemGroup>
    </TabPane>,
    
  },
  {
    menuItem: 'Enfoque y Problemática',
    render: () => 
    <TabPane attached={false}>
        <ItemGroup>
          <Item>
          <ItemImage size='large' src='https://www.uleam.edu.ec/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-17-at-15.56.23.jpeg' />      

            <ItemContent>
              <ItemHeader as='a' style={{ marginTop: '60px'  }}> </ItemHeader>
              <ItemDescription style={{ fontSize: '15px',  textAlign: 'right'}}>
                <p>
                Este proyecto está dirigido a los estudiantes matriculados en la materia de Ictiología de<br/> 
                la carrera de Biología en la Universidad Laica Eloy Alfaro de Manabí (ULEAM). La<br/> 
                iniciativa surge de la necesidad de ofrecer a estos estudiantes una herramienta que les<br/>
                permita validar  y distinguir de manera eficiente entre las diversas especies de atunes.<br/>
                Dada la similitud física que frecuentemente presentan estas especies, la falta de un <br/>
                sistema de reconociento representa un desafío para el análisis y la identificación taxonómica requerida en el ámbito académico.
                </p>
              </ItemDescription>
            </ItemContent>
          </Item>
          <br/><br/>
        </ItemGroup>    
        </TabPane>,
  },
  {
    menuItem: 'Contactos',
    render: () => 
    <TabPane attached={false}>
      <Container textAlign='center' style={{ marginTop: '40px', marginBottom: '75px' }}>
        <Header as='h2' style={{ display: 'flex', justifyContent: 'center' }}>
          <Icon name='bug' />
          <Header.Content >Notifica alguna incidencia!</Header.Content> <br/><br/>
        </Header>
        <List divided relaxed size='large'>
          <List.Item>
            <List.Icon name='building' verticalAlign='middle' />
            <List.Content>
              <List.Header as='h3'>Dirección</List.Header>
              <List.Description as='p'>Av. Circunvalacion, Manta</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='mail' verticalAlign='middle' />
            <List.Content>
              <List.Header as='h3'>Correo Institucional</List.Header>
              <List.Description as='p'>
                <a href='mailto:biology@example.com'>e1315259398@live.uleam.edu.ec</a>
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='envelope outline' verticalAlign='middle' />
            <List.Content>
              <List.Header as='h3'>Correo Personal</List.Header>
              <a href='mailto:biology@example.com'>yudeh22@hotmail.com</a>            
            </List.Content>
          </List.Item>
        </List>
      </Container>

    </TabPane>,
  },
]



const InfoComponent = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [color, setColor] = useState(colors[0]);
  const [open, setOpen] = React.useState(false);


  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const navigate = useNavigate();
  const handleIconClick = () => {
    navigate("/dashboard"); // Redirige al usuario a la ruta deseada
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <Sidebar.Pushable style={{ minHeight: "100vh" }}>
      <CustomSidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
      <Sidebar.Pusher dimmed={sidebarVisible}>
        <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A" }}>
          <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
            <Icon name="sidebar" style={{ color: "#f9fafb" }} /> Sistema Clasificador de Atunes
          </Menu.Item>
          <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={<Button style={{ marginLeft: '700px',marginTop: '11px', backgroundColor: 'red', height: '40px', padding: '10px' }}><Icon name="file video" /> Guia de Uso</Button>}>
            <ModalHeader>Video Tutorial</ModalHeader>
            <ModalContent>
              <iframe width="580" height="335" src="https://www.youtube.com/embed/IPPMUAQmKnY?si=RSOYkKjzp7S1FyW6" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              <ModalDescription>
                <br/>
                <h3>Manual de Usuario</h3>
                <p>
                  Para leer el manual de usuario haz <a href="https://sica.yudeh.com/" target="_blank" rel="noopener noreferrer"> clic aquí.</a>
                </p>
              </ModalDescription>
            </ModalContent>
            <ModalActions>
              {/* <Button onClick={() => setOpen(false)}>Cancel</Button> */}
              <Button onClick={() => setOpen(false)} negative>
                Cerrar
              </Button>
            </ModalActions>
          </Modal>
          {/* <Icon name="home" style={{ fontSize: '37px', color: '#f9fafb', marginLeft: '40px', marginTop: '20px' }}onClick={handleIconClick}/> */}

          <img src="/atun/logex/3.png" alt="Mi Icono" style={{ height: '51px', marginLeft: '60px', marginTop: '10px' }} onClick={handleIconClick}/>

        </Menu>
        <Container style={{ marginLeft: "20px" }}>
          <br /><br /> <br /> <br />
          <Header as={"h1"}>Información del Proyecto</Header>
          <select onChange={handleColorChange}>
            {_.map(colors, (c) => (
              <option key={c} value={c}>
                {_.startCase(c)}
              </option>
            ))}
          </select>
          <Divider hidden />
          <Tab
            menu={{ color, inverted: true, attached: false, tabular: false }}
            panes={panes}
          />
        </Container>
        <br/><br/><br/><br/><br/><br /><br /><br /><br />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default InfoComponent;
