// import React, { useState } from "react";
// import { Header, Container, Sidebar, Menu, Icon, Button, Modal, ModalHeader, ModalContent, ModalActions } from "semantic-ui-react";
// import Preview from "./features/Preview";
// import SearchBox from "./features/SearchBox";
// import CustomSidebar from "./features/SideExample";

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const ImagePredictionDashBoard = () => {
//   const [searchState, setSearchState] = useState("");
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [open, setOpen] = React.useState(false);

//   const handleSidebarToggle = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

//   const videos = [
//     {
//       url: "https://www.youtube.com/embed/IPPMUAQmKnY?si=RSOYkKjzp7S1FyW6",
//       thumbnail: "https://img.youtube.com/vi/IPPMUAQmKnY/hqdefault.jpg"
//     },
//     {
//       url: "https://www.youtube.com/embed/IPPMUAQmKnY?si=RSOYkKjzp7S1FyW6",
//       thumbnail: "https://img.youtube.com/vi/IPPMUAQmKnY/hqdefault.jpg"
//     }
//   ];

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: false,
//     arrows: true,
//     adaptiveHeight: true,
//     cssEase: "linear"
//   };

//   const handleThumbnailClick = (url) => {
//     window.open(url, '_blank');
//   };

//   return (
//     <Sidebar.Pushable style={{ minHeight: "100vh" }}>
//       <CustomSidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
//       <Sidebar.Pusher dimmed={sidebarVisible}>
//         <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A" }}>
//           <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
//             <Icon name="sidebar" style={{ color: "#f9fafb" }} /> Sistema Clasificador de Atunes
//           </Menu.Item>
//           <Modal 
//             onClose={() => setOpen(false)} 
//             onOpen={() => setOpen(true)} 
//             open={open} 
//             trigger={
//               <Button style={{ marginLeft: '700px', marginTop: '11px', backgroundColor: 'red', height: '40px', padding: '10px' }}>
//                 <Icon name="file video" /> Guía de uso
//               </Button>
//             }
//           >
//             <ModalHeader >Videos Tutoriales</ModalHeader>
//             <ModalContent style={{ padding: '30px', backgroundColor: '#e7dfe9' }}>
//               <Slider {...settings}>
//                 {videos.map((video, index) => (
//                   <div key={index} style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
//                     <iframe 
//                       width="100%" 
//                       height="400" 
//                       src={video.url} 
//                       title={`YouTube video player ${index + 1}`} 
//                       frameBorder="0" 
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//                       allowFullScreen
//                       style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
//                     ></iframe>
//                   </div>
//                 ))}
//               </Slider>
//               <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//                 {videos.map((video, index) => (
//                   <img 
//                     key={index} 
//                     src={video.thumbnail} 
//                     alt={`Thumbnail ${index + 1}`} 
//                     onClick={() => handleThumbnailClick(video.url)} 
//                     style={{ 
//                       cursor: 'pointer', 
//                       width: '120px', 
//                       height: '67px', 
//                       margin: '0 10px', 
//                       border: '3px solid #14539A', 
//                       borderRadius: '5px', 
//                       boxShadow: '0 2px 6px rgba(0,0,0,0.2)', 
//                       transition: 'transform 0.3s'
//                     }} 
//                     onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} 
//                     onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
//                   />
//                 ))}
//               </div>
//             </ModalContent>
//             <ModalActions>
//               <Button onClick={() => setOpen(false)} negative>
//                 Cerrar
//               </Button>
//             </ModalActions>
//           </Modal>
//           <img src="/atun/logex/3.png" alt="Mi Icono" style={{ height: '51px', marginLeft: '62px', marginTop: '10px' }} />
//           {/* <Icon name="home" style={{ fontSize: '37px', color: '#f9fafb', marginLeft: '40px', marginTop: '20px' }} /> */}
//         </Menu>
//         <Container style={{ marginLeft: "20px" }}>
//           <br /><br />
//           <br /><br />
//           <Header as={"h1"}>Clasificación por Imágen</Header>
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
import { Header, Container, Sidebar, Menu, Icon, Button, Modal, ModalHeader, ModalContent, ModalActions } from "semantic-ui-react";
import Preview from "./features/Preview";
import SearchBox from "./features/SearchBox";
import CustomSidebar from "./features/SideExample";

import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const ImagePredictionDashBoard = () => {
  const [searchState, setSearchState] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const videos = [
    {
      url: "https://www.youtube.com/embed/IPPMUAQmKnY?si=RSOYkKjzp7S1FyW6",
      thumbnail: "https://img.youtube.com/vi/IPPMUAQmKnY/hqdefault.jpg"
    },
    {
      url: "https://www.youtube.com/embed/IPPMUAQmKnY?si=RSOYkKjzp7S1FyW6",
      thumbnail: "https://img.youtube.com/vi/IPPMUAQmKnY/hqdefault.jpg"
    }
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    adaptiveHeight: true,
    cssEase: "linear"
  };

  const handleThumbnailClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Sidebar.Pushable style={{ minHeight: "100vh" }}>
      <CustomSidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
      <Sidebar.Pusher dimmed={sidebarVisible}>
        <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A", width: '100%', zIndex: 1000  }}>
          <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
            <Icon name="sidebar" style={{ color: "#f9fafb" }} /> Sistema Clasificador de Atunes
          </Menu.Item>
          <Modal 
            onClose={() => setOpen(false)} 
            onOpen={() => setOpen(true)} 
            open={open} 
            trigger={
              <Button style={{ marginLeft: 'auto', marginTop: '11px', marginRight: '20px', backgroundColor: 'red', height: '40px', padding: '10px' }}>
                <Icon name="file video" /> Guía de uso
              </Button>
            }
          >
            <ModalHeader >Videos Tutoriales</ModalHeader>
            <ModalContent style={{ padding: '30px', backgroundColor: '#e7dfe9' }}>
              <Slider {...settings}>
                {videos.map((video, index) => (
                  <div key={index} style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
                    <iframe 
                      width="100%" 
                      height="400" 
                      src={video.url} 
                      title={`YouTube video player ${index + 1}`} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                      style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
                    ></iframe>
                  </div>
                ))}
              </Slider>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {videos.map((video, index) => (
                  <img 
                    key={index} 
                    src={video.thumbnail} 
                    alt={`Thumbnail ${index + 1}`} 
                    onClick={() => handleThumbnailClick(video.url)} 
                    style={{ 
                      cursor: 'pointer', 
                      width: '120px', 
                      height: '67px', 
                      margin: '0 10px', 
                      border: '3px solid #14539A', 
                      borderRadius: '5px', 
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)', 
                      transition: 'transform 0.3s'
                    }} 
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} 
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ))}
              </div>
            </ModalContent>
            <ModalActions>
              <Button onClick={() => setOpen(false)} negative>
                Cerrar
              </Button>
            </ModalActions>
          </Modal>
          <img src="/atun/logex/3.png" alt="Mi Icono" style={{ height: '54px', marginLeft: '30px', marginTop: '10px' }} />
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

