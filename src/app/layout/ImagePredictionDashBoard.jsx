// import React, { useState } from "react";
// import { Header, Container, Sidebar, Menu, Icon, Button, Modal, ModalHeader, ModalContent, ModalDescription, ModalActions } from "semantic-ui-react";
// import Preview from "./features/Preview";
// import SearchBox from "./features/SearchBox";
// import CustomSidebar from "./features/SideExample";

// const ImagePredictionDashBoard = () => {
//   const [searchState, setSearchState] = useState("");
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [open, setOpen] = React.useState(false);

//   const handleSidebarToggle = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

//   return (
//     <Sidebar.Pushable style={{ minHeight: "100vh" }}>
//       <CustomSidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
//       <Sidebar.Pusher dimmed={sidebarVisible}>
//         <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A" }}>
//           <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
//             <Icon name="sidebar" style={{ color: "#f9fafb" }} /> Sistema Clasificador de Atunes
//           </Menu.Item>
//           <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={<Button style={{ marginLeft: '700px',marginTop: '11px', backgroundColor: 'red', height: '40px', padding: '10px' }}><Icon name="file video" /> Guia de Uso</Button>}>
//             <ModalHeader>Video Tutorial</ModalHeader>
//             <ModalContent>
//               <iframe width="580" height="335" src="https://www.youtube.com/embed/IPPMUAQmKnY?si=RSOYkKjzp7S1FyW6" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
//               <ModalDescription>
//                 <br/>
//                 <h3>Manual de Usuario</h3>
//                 <p>
//                   Para leer el manual de usuario haz <a href="https://sica.yudeh.com/" target="_blank" rel="noopener noreferrer"> clic aquí.</a>
//                 </p>
//               </ModalDescription>
//             </ModalContent>
//             <ModalActions>
//               {/* <Button onClick={() => setOpen(false)}>Cancel</Button> */}
//               <Button onClick={() => setOpen(false)} negative>
//                 Cerrar
//               </Button>
//             </ModalActions>
//           </Modal>
//           <Icon name="home" style={{ fontSize: '37px', color: '#f9fafb', marginLeft: '40px', marginTop: '20px' }} />
//         </Menu>
//         <Container style={{ marginLeft: "20px" }}>
//           <br /><br />
//           <br /><br />
//           <Header as={"h1"}>Clasificación por Imagen</Header>
//           <SearchBox setSearchState={setSearchState} />
//           <Preview searchState={searchState}></Preview>
//           <br /><br /><br /><br /><br /><br /><br /><br />
//         </Container>
//       </Sidebar.Pusher>
//     </Sidebar.Pushable>
//   );
// };

// export default ImagePredictionDashBoard;





import React, { useState } from "react";
import { Header, Container, Sidebar, Menu, Icon, Button, Modal, ModalHeader, ModalContent, ModalDescription, ModalActions } from "semantic-ui-react";
import Preview from "./features/Preview";
import SearchBox from "./features/SearchBox";
import CustomSidebar from "./features/SideExample";

const ImagePredictionDashBoard = () => {
  const [searchState, setSearchState] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <Sidebar.Pushable style={{ minHeight: "100vh" }}>
      <CustomSidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
      <Sidebar.Pusher dimmed={sidebarVisible}>
        <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A" }}>
          <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
            <Icon name="sidebar" style={{ color: "#f9fafb" }} /> Sistema Clasificador de Atunes
          </Menu.Item>
          <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={<Button style={{ marginLeft: '700px',marginTop: '11px', backgroundColor: 'red', height: '40px', padding: '10px' }}><Icon name="file video" /> Guía de uso</Button>}>
            <ModalHeader>Video Tutorial</ModalHeader>
            <ModalContent>
              <iframe width="580" height="335" src="https://www.youtube.com/embed/IPPMUAQmKnY?si=RSOYkKjzp7S1FyW6" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              <ModalDescription>
                {/* <br/>
                <h3>Manual de Usuario</h3>
                <p>
                  Para leer el manual de usuario haz <a href="https://sica.yudeh.com/" target="_blank" rel="noopener noreferrer"> clic aquí.</a>
                </p> */}
              </ModalDescription>
            </ModalContent>
            <ModalActions>
              {/* <Button onClick={() => setOpen(false)}>Cancel</Button> */}
              <Button onClick={() => setOpen(false)} negative>
                Cerrar
              </Button>
            </ModalActions>
          </Modal>
          <img src="/atun/logex/3.png" alt="Mi Icono" style={{ height: '51px', marginLeft: '62px', marginTop: '10px' }} />
          {/* <Icon name="home" style={{ fontSize: '37px', color: '#f9fafb', marginLeft: '40px', marginTop: '20px' }} /> */}
        </Menu>
        <Container style={{ marginLeft: "20px" }}>
          <br /><br />
          <br /><br />
          <Header as={"h1"}>Clasificación por Imágen</Header>
          <SearchBox setSearchState={setSearchState} />
          <Preview searchState={searchState}></Preview>
          <br /><br /><br /><br /><br /><br /><br /><br />
        </Container>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default ImagePredictionDashBoard;

