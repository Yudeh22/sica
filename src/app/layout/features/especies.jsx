import React, { useState } from "react";
import { Header, Container, Sidebar, Menu, Icon, Grid} from "semantic-ui-react";
import CustomSidebar from "./SideExample";
import { useNavigate, Link } from "react-router-dom";
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Image,
} from 'semantic-ui-react'

import { RevealContent, Reveal } from 'semantic-ui-react'


const EspeciesComponent = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };
  
  const navigate = useNavigate();
  const handleIconClick = () => {
    navigate("/dashboard"); 
  };

  return (
    <Sidebar.Pushable style={{ minHeight: "100vh" }}>
      <CustomSidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
      <Sidebar.Pusher dimmed={sidebarVisible}>
        <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A" }}>
        <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
          <Icon name="sidebar" style={{ color: "#f9fafb" }} />
          Sistema Clasificador de Atunes                   
        </Menu.Item>
        {/* <Icon
            name="home"
            style={{ fontSize: '37px', color: '#f9fafb' , marginLeft: '860px' , marginTop: '18px'}}
            onClick={handleIconClick}
        /> */}

      <img src="/atun/logex/3.png" alt="Mi Icono" style={{ height: '51px', marginLeft: '880px', marginTop: '10px' }} onClick={handleIconClick}/>

        </Menu>

        <Container style={{ marginLeft: "20px" }}>
          <br /><br /> <br /><br />
          <Header as={"h1"}>Catálogo de Especies</Header>
          <br/>
        </Container>

        <Container style={{ marginLeft: "20px" }}>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Card>
                  <Reveal animated='fade' >
                    <RevealContent visible>
                      <Image src='https://inaturalist-open-data.s3.amazonaws.com/photos/247966949/large.jpeg' size='big' />
                    </RevealContent>
                    <RevealContent hidden>
                      <Image src='/atun/wahoodos.jpg' size='big' />
                    </RevealContent>
                  </Reveal>
                    <CardContent>
                      <CardHeader>Acanthocybium  Solandri</CardHeader>
                      <CardMeta>Nombre común: Wahoo</CardMeta>
                      <CardDescription>
                        <p>» Habitad: Zona oceánica, epipelágica y costera</p>
                        <p>» Tamaño: 150 cm - 210 cm.</p>
                        <p>» Pesquería: Redes de cerco, enmalle y anzuelos</p>               
                      </CardDescription>
                    </CardContent>
                    <CardContent extra>
                    <Link to="/especies/wahoo">
                      <Icon name='info' />
                      Para más información de esta especie haz clic aquí
                    </Link>
                    </CardContent>
                  </Card>
              </Grid.Column>

              <Grid.Column>
                <Card>
                  <Reveal animated='fade'>
                    <RevealContent visible>
                      <Image src='/atun/pataseca.jpg' size='big' />
                    </RevealContent>
                    <RevealContent hidden>
                      <Image src='/atun/pataseca3.png' size='big' />
                    </RevealContent>
                  </Reveal>
                    <CardContent>
                      <CardHeader>Euthynnus Lineatus</CardHeader>
                      <CardMeta>Nombre común: Bonito PataSeca</CardMeta>
                      <CardDescription>
                        <p>» Habitad: Zona epipelágica, costera y oceánica </p>
                        <p>» Tamaño: 50 cm - 80 cm.</p>
                        <p>» Pesquería: Redes de enmalle de cerco y anzuelos</p> 
                      </CardDescription>
                    </CardContent>
                    <CardContent extra>
                    <Link to="/especies/pataseca">
                      <Icon name='info' />
                      Para más información de esta especie haz clic aquí
                    </Link>
                    </CardContent>
                  </Card>
              </Grid.Column>


              <Grid.Column>
                <Card>
                  <Reveal animated='fade'>
                    <RevealContent visible>
                      <Image src='/atun/bonitobarrilete.jpeg' size='big' />
                    </RevealContent>
                    <RevealContent hidden>
                      <Image src='/atun/bonitobarriletedos.jpg' size='big' />
                    </RevealContent>
                  </Reveal>
                    <CardContent>
                      <CardHeader>Katsuwonus Pelamis</CardHeader>
                      <CardMeta>Nombre común: Bonito Barrilete</CardMeta>
                      <CardDescription>
                        <p>» Habitad: Zona epipelágica y oceánica (260mt de profundidad.)</p>
                        <p>» Tamaño: 70 cm - 100 cm.</p>
                        <p>» Pesquería: Redes de enmalle de cerco y anzuelos</p> 
                      </CardDescription>
                    </CardContent>
                    <CardContent extra>
                    <Link to="/especies/bonitobarrilete">
                      <Icon name='info' />
                      Para más información de esta especie haz clic aquí
                    </Link>
                    </CardContent>
                  </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>


          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Card>
                  <Reveal animated='fade'>
                    <RevealContent visible>
                      <Image src='/atun/bonito.jpeg' size='big' />
                    </RevealContent>
                    <RevealContent hidden>
                      <Image src='/atun/bonitodos.jpg' size='big' />
                    </RevealContent>
                  </Reveal>
                    <CardContent>
                      <CardHeader>Sarda Orientalis </CardHeader>
                      <CardMeta>Nombre común: Bonito</CardMeta>
                      <CardDescription>
                        <p>» Habitad: Zona epipelágica y costera</p>
                        <p>» Tamaño: 55 cm - 100 cm.</p>
                        <p>» Pesquería: Redes de enmalle de cerco y anzuelos</p>                   
                      </CardDescription>
                    </CardContent>
                    <CardContent extra>
                    <Link to="/especies/bonito">
                      <Icon name='info' />
                      Para más información de esta especie haz clic aquí
                    </Link>
                    </CardContent>
                  </Card>
              </Grid.Column>

              <Grid.Column>
                <Card>
                  <Reveal animated='fade'>
                    <RevealContent visible>
                      <Image src='/atun/sierra.jpg' size='big' />
                    </RevealContent>
                    <RevealContent hidden>
                      <Image src='/atun/sierrados.jpg' size='big' />
                    </RevealContent>
                  </Reveal>
                    <CardContent>
                      <CardHeader>Scombrerimorus Sierra </CardHeader>
                      <CardMeta>Nombre común: Sierra</CardMeta>
                      <CardDescription>
                        <p>» Habitad: Zona costera</p>
                        <p>» Tamaño: 60 cm - 95 cm.</p>
                        <p>» Pesquería: Redes de enmalle de cerco y anzuelos</p>   
                      </CardDescription>
                    </CardContent>
                    <CardContent extra>
                    <Link to="/especies/sierra">
                      <Icon name='info' />
                      Para más información de esta especie haz clic aquí
                    </Link>
                    </CardContent>
                  </Card>
              </Grid.Column>


              <Grid.Column>
                <Card>
                  <Reveal animated='fade'>
                    <RevealContent visible>
                      <Image src='/atun/botella.jpg' size='big' />
                    </RevealContent>
                    <RevealContent hidden>
                      <Image src='/atun/botellados.jpg' size='big' />
                    </RevealContent>
                  </Reveal>
                    <CardContent>
                      <CardHeader>Auxis Thazard Brachydorax</CardHeader>
                      <CardMeta>Nombre común: Botella Grande</CardMeta>
                      <CardDescription>
                        <p>» Habitad: Zona epipelágica</p>
                        <p>» Tamaño: 35 cm - 40 cm.</p>
                        <p>» Pesquería: Redes de enmalle de cerco y anzuelos</p>   
                      </CardDescription>
                    </CardContent>
                    <CardContent extra>
                    <Link to="/especies/botellagrande">
                      <Icon name='info' />
                      Para más información de esta especie haz clic aquí
                    </Link>
                    </CardContent>
                  </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Card>
                  <Reveal animated='fade'>
                    <RevealContent visible>
                      <Image src='/atun/aamarilla.jpg' size='big' />
                    </RevealContent>
                    <RevealContent hidden>
                      <Image src='/atun/aamarillados.jpg' size='big' />
                    </RevealContent>
                  </Reveal>
                    <CardContent>
                      <CardHeader>Thunus Albacares</CardHeader>
                      <CardMeta>Nombre común: Aleta Amarilla</CardMeta>
                      <CardDescription>
                        <p>» Habitad: Zona epipelágica y oceánica</p>
                        <p>» Tamaño: 150 cm - 239 cm.</p>
                        <p>» Pesquería: Redes de enmalle de cerco y anzuelos</p>                     
                      </CardDescription>
                    </CardContent>
                    <CardContent extra>
                    <Link to="/especies/aletaamarilla">
                      <Icon name='info' />
                      Para más información de esta especie haz clic aquí
                    </Link>
                    </CardContent>
                  </Card>
              </Grid.Column>

              <Grid.Column>
                <Card>
                  <Reveal animated='fade'>
                    <RevealContent visible>
                      <Image src='/atun/ojogrande.png' size='big' />
                    </RevealContent>
                    <RevealContent hidden>
                      <Image src='/atun/ojograndedos.jpg' size='big' />
                    </RevealContent>
                  </Reveal>
                    <CardContent>
                      <CardHeader>Thunus Obesus</CardHeader>
                      <CardMeta>Nombre común: Ojo Grande</CardMeta>
                      <CardDescription>
                        <p>» Habitad: Zona pelágica y mesopelágica</p>
                        <p>» Tamaño: 180 cm - 250 cm.</p>
                        <p>» Pesquería: Redes de enmalle de cerco y anzuelos</p>
                      </CardDescription>
                    </CardContent>
                    <CardContent extra>
                    <Link to="/especies/patudo">
                      <Icon name='info' />
                      Para más información de esta especie haz clic aquí
                    </Link>
                    </CardContent>
                  </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br/>


        </Container>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};
export default EspeciesComponent;






