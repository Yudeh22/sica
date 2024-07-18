// import React, { useState, useEffect, useRef } from "react";
// import { Header, Container, Sidebar, Menu, Icon, Button, MessageHeader, Message } from "semantic-ui-react";
// import CustomSidebar from "./SideExample";
// import * as tmImage from "@teachablemachine/image";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';

// const EnvivoComponent = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [webcam, setWebcam] = useState(null);
//   const [frozen, setFrozen] = useState(false);
//   const [cameraOpen, setCameraOpen] = useState(true);
//   const [, setModel] = useState(null);

//   const frozenCanvasRef = useRef(null);
//   const labelContainerRef = useRef(null);

//   const handleSidebarToggle = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

//   const navigate = useNavigate();
//   const handleIconClick = () => {
//     navigate("/dashboard");
//   };

//   const toggleFreeze = () => {
//     if (cameraOpen) {
//       setFrozen(!frozen);
//     } else {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Imágen no disponible',
//         text: 'No es posible acceder a la imágen en este momento, asegurate de tener la cámara abierta',
//       });
//     }
//   };

//   const closeCamera = () => {
//     try {
//       if (webcam) {
//         webcam.stop();
//         setCameraOpen(false);
//         clearLabels();
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: '¡La cámara ya se encuentra cerrada!',
//       });
//     }
//   };

//   const clearLabels = () => {
//     if (labelContainerRef.current) {
//       labelContainerRef.current.innerHTML = "";
//     }
//   };

//   const refreshPage = () => {
//     window.location.reload();
//   };

//   useEffect(() => {
//     async function init() {
//       const URL = "https://teachablemachine.withgoogle.com/models/HgHSKPLbt/";
//       const modelURL = URL + "model.json";
//       const metadataURL = URL + "metadata.json";

//       const loadedModel = await tmImage.load(modelURL, metadataURL);
//       setModel(loadedModel);

//       const maxPredictions = loadedModel.getTotalClasses();

//       const flip = true;
//       const webcamInstance = new tmImage.Webcam(400, 400, flip);
//       await webcamInstance.setup();
//       await webcamInstance.play();
//       setWebcam(webcamInstance);

//       const labelContainer = labelContainerRef.current;
//       if (labelContainer) {
//         for (let i = 0; i < maxPredictions; i++) {
//           labelContainer.appendChild(document.createElement("div"));
//         }
//       }

//       let requestId;
//       async function loop() {
//         if (webcamInstance) {
//           if (!frozen) {
//             webcamInstance.update();
//             await predict();
//           }
//         }
//         requestId = window.requestAnimationFrame(loop);
//       }

//       async function predict() {
//         if (webcamInstance.canvas) {
//           if (!frozen) {
//             webcamInstance.update();
//           }

//           const prediction = await loadedModel.predict(webcamInstance.canvas);
//           for (let i = 0; i < maxPredictions; i++) {
//             const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
//             if (labelContainerRef.current && labelContainerRef.current.childNodes[i]) {
//               labelContainerRef.current.childNodes[i].innerHTML = classPrediction;
//             }
//           }

//           if (frozen && frozenCanvasRef.current) {
//             const ctx = frozenCanvasRef.current.getContext("2d");
//             ctx.drawImage(webcamInstance.canvas, 0, 0, 400, 400);
//           }
//         }
//       }

//       requestId = window.requestAnimationFrame(loop);

//       return () => {
//         if (requestId) {
//           window.cancelAnimationFrame(requestId);
//         }
//       };
//     }
//     init();
//   }, [frozen]);

//   return (
//     <Sidebar.Pushable style={{ minHeight: "100vh" }}>
//       <CustomSidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
//       <Sidebar.Pusher dimmed={sidebarVisible}>
//         <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A" }}>
//           <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
//             <Icon name="sidebar" style={{ color: "#f9fafb" }} />
//             Sistema Clasificador de Atunes
//           </Menu.Item>
//           <Icon
//             name="home"
//             style={{ fontSize: '37px', color: '#f9fafb' , marginLeft: '860px' , marginTop: '18px'}}
//             onClick={handleIconClick}
//           />
//         </Menu>

//         <Container style={{ marginTop: '120px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
//           <Header as={"h1"} style={{ textAlign: 'left', marginBottom: '20px' }}>Reconocimiento en Vivo</Header>
//         </Container>

//         <Container style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div id="webcam-container" style={{ textAlign: 'center', marginLeft: '35px', marginRight: '1px', marginBottom: '20px' }}>
//               {cameraOpen && webcam && <canvas ref={(ref) => (webcam.canvas = ref)} width={400} height={400} />}
//             </div>
//             <div id="label-container" ref={labelContainerRef} style={{ textAlign: 'center', marginLeft: '50px', marginRight: '-140px',marginTop: '10px' }}></div>
//           </div>
//         </Container>

//         <Container style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <Button  color= "green" onClick={refreshPage}>Abrir Cámara</Button>
//           <Button color= "red" onClick={closeCamera}>Cerrar Cámara</Button>
//           <Button color= "blue" onClick={toggleFreeze}>{frozen ? "Descongelar" : "Congelar"}</Button>
//         </Container>

//         <Container style={{ marginTop: '20px'}}>
//         <Message warning>
//           <MessageHeader>A tener en cuenta!</MessageHeader>
//           <p>♦   La precisión del resultado del modelo va a depender en gran medida de la calidad de imágen (o fotografía) que le proporciones.
//           </p>
//           <p>♦   Si estas presentando inconvenientes siempre ten en consideración recargar la página (valido tambien para el reconocimiento por fotografía) o hacer clic en el boton Abrir Cámara.
//           </p>
//           <p>♦   Para garantizar el mejor funcionamiento del sistema, se recomienda recargar la página y oprimir el boton Cerrar Cámara en caso
//             de querer salir del reconocimiento en vivo hacia otro apartado.
//           </p>
//         </Message>
//         <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
//         </Container>
//       </Sidebar.Pusher>
//     </Sidebar.Pushable>
//   );
// };

// export default EnvivoComponent;



// import React, { useState, useEffect, useRef } from "react";
// import { Header, Container, Sidebar, Menu, Icon, Button, MessageHeader, Message } from "semantic-ui-react";
// import CustomSidebar from "./SideExample";
// import * as tmImage from "@teachablemachine/image";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';

// const EnvivoComponent = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [webcam, setWebcam] = useState(null);
//   const [frozen, setFrozen] = useState(false);
//   const [cameraOpen, setCameraOpen] = useState(true);
//   const [, setModel] = useState(null);

//   const frozenCanvasRef = useRef(null);
//   const labelContainerRef = useRef(null);

//   const handleSidebarToggle = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

//   const navigate = useNavigate();
//   const handleIconClick = () => {
//     navigate("/dashboard");
//   };

//   const toggleFreeze = () => {
//     if (cameraOpen) {
//       setFrozen(!frozen);
//     } else {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Imágen no disponible',
//         text: 'No es posible acceder a la imágen en este momento, asegurate de tener la cámara abierta',
//       });
//     }
//   };

//   const closeCamera = () => {
//     try {
//       if (webcam) {
//         webcam.stop();
//         setCameraOpen(false);
//         clearLabels();
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: '¡La cámara ya se encuentra cerrada!',
//       });
//     }
//   };

//   const clearLabels = () => {
//     if (labelContainerRef.current) {
//       labelContainerRef.current.innerHTML = "";
//     }
//   };

//   const refreshPage = () => {
//     window.location.reload();
//   };

//   useEffect(() => {
//     async function init() {
//       Swal.fire({
//         title: 'Cargando cámara...',
//         text: 'Por favor espera mientras se carga la imágen',
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         }
//       });

//       const URL = "https://teachablemachine.withgoogle.com/models/HgHSKPLbt/";
//       const modelURL = URL + "model.json";
//       const metadataURL = URL + "metadata.json";

//       const loadedModel = await tmImage.load(modelURL, metadataURL);
//       setModel(loadedModel);

//       const maxPredictions = loadedModel.getTotalClasses();

//       const flip = true;
//       const webcamInstance = new tmImage.Webcam(400, 400, flip);
//       await webcamInstance.setup();
//       await webcamInstance.play();
//       setWebcam(webcamInstance);

//       const labelContainer = labelContainerRef.current;
//       if (labelContainer) {
//         for (let i = 0; i < maxPredictions; i++) {
//           labelContainer.appendChild(document.createElement("div"));
//         }
//       }

//       Swal.close();

//       let requestId;
//       async function loop() {
//         if (webcamInstance) {
//           if (!frozen) {
//             webcamInstance.update();
//             await predict();
//           }
//         }
//         requestId = window.requestAnimationFrame(loop);
//       }

//       async function predict() {
//         if (webcamInstance.canvas) {
//           if (!frozen) {
//             webcamInstance.update();
//           }

//           const prediction = await loadedModel.predict(webcamInstance.canvas);
//           for (let i = 0; i < maxPredictions; i++) {
//             const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
//             if (labelContainerRef.current && labelContainerRef.current.childNodes[i]) {
//               labelContainerRef.current.childNodes[i].innerHTML = classPrediction;
//             }
//           }

//           if (frozen && frozenCanvasRef.current) {
//             const ctx = frozenCanvasRef.current.getContext("2d");
//             ctx.drawImage(webcamInstance.canvas, 0, 0, 400, 400);
//           }
//         }
//       }

//       requestId = window.requestAnimationFrame(loop);

//       return () => {
//         if (requestId) {
//           window.cancelAnimationFrame(requestId);
//         }
//       };
//     }
//     init();
//   }, [frozen]);

//   return (
//     <Sidebar.Pushable style={{ minHeight: "100vh" }}>
//       <CustomSidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
//       <Sidebar.Pusher dimmed={sidebarVisible}>
//         <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A" }}>
//           <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
//             <Icon name="sidebar" style={{ color: "#f9fafb" }} />
//             Sistema Clasificador de Atunes
//           </Menu.Item>
//           <Icon
//             name="home"
//             style={{ fontSize: '37px', color: '#f9fafb' , marginLeft: '860px' , marginTop: '18px'}}
//             onClick={handleIconClick}
//           />
//         </Menu>

//         <Container style={{ marginTop: '120px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
//           <Header as={"h1"} style={{ textAlign: 'left', marginBottom: '20px' }}>Reconocimiento en Vivo</Header>
//         </Container>

//         <Container style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div id="webcam-container" style={{ textAlign: 'center', marginLeft: '35px', marginRight: '1px', marginBottom: '20px' }}>
//               {cameraOpen && webcam && <canvas ref={(ref) => (webcam.canvas = ref)} width={400} height={400} />}
//             </div>
//             <div id="label-container" ref={labelContainerRef} style={{ textAlign: 'center', marginLeft: '50px', marginRight: '-140px',marginTop: '10px' }}></div>
//           </div>
//         </Container>

//         <Container style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <Button  color= "green" onClick={refreshPage}>Abrir Cámara</Button>
//           <Button color= "red" onClick={closeCamera}>Cerrar Cámara</Button>
//           <Button color= "blue" onClick={toggleFreeze}>{frozen ? "Descongelar" : "Congelar"}</Button>
//         </Container>

//         <Container style={{ marginTop: '20px'}}>
//         <Message warning>
//           <MessageHeader>A tener en cuenta!</MessageHeader>
//           <p>♦   La precisión del resultado del modelo va a depender en gran medida de la calidad de imágen (o fotografía) que le proporciones.
//           </p>
//           <p>♦   Si estas presentando inconvenientes siempre ten en consideración recargar la página (valido tambien para el reconocimiento por fotografía) o hacer clic en el boton Abrir Cámara.
//           </p>
//           <p>♦   Para garantizar el mejor funcionamiento del sistema, se recomienda recargar la página y oprimir el boton Cerrar Cámara en caso
//             de querer salir del reconocimiento en vivo hacia otro apartado.
//           </p>
//         </Message>
//         <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
//         </Container>
//       </Sidebar.Pusher>
//     </Sidebar.Pushable>
//   );
// };

// export default EnvivoComponent;


// import React, { useState, useEffect, useRef } from "react";
// import { Header, Container, Sidebar, Menu, Icon, Button, MessageHeader, Message } from "semantic-ui-react";
// import CustomSidebar from "./SideExample";
// import * as tmImage from "@teachablemachine/image";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';

// const EnvivoComponent = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [webcam, setWebcam] = useState(null);
//   const [frozen, setFrozen] = useState(false);
//   const [cameraOpen, setCameraOpen] = useState(true);
//   const [, setModel] = useState(null);

//   const frozenCanvasRef = useRef(null);
//   const labelContainerRef = useRef(null);

//   const handleSidebarToggle = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

//   const navigate = useNavigate();
//   const handleIconClick = () => {
//     navigate("/dashboard");
//   };

//   const toggleFreeze = () => {
//     if (cameraOpen) {
//       setFrozen(!frozen);
//     } else {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Imágen no disponible',
//         text: 'No es posible acceder a la imágen en este momento, asegurate de tener la cámara abierta',
//       });
//     }
//   };

//   const closeCamera = () => {
//     try {
//       if (webcam) {
//         webcam.stop();
//         setCameraOpen(false);
//         clearLabels();
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: '¡La cámara ya se encuentra cerrada!',
//       });
//     }
//   };

//   const clearLabels = () => {
//     if (labelContainerRef.current) {
//       labelContainerRef.current.innerHTML = "";
//     }
//   };

//   const refreshPage = () => {
//     window.location.reload();
//   };

//   useEffect(() => {
//     async function init() {
//       Swal.fire({
//         title: 'Cargando cámara...',
//         text: 'Por favor espera mientras se carga la imágen',
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         }
//       });

//       try {
//         const URL = "https://teachablemachine.withgoogle.com/models/HgHSKPLbt/";
//         const modelURL = URL + "model.json";
//         const metadataURL = URL + "metadata.json";

//         const loadedModel = await tmImage.load(modelURL, metadataURL);
//         setModel(loadedModel);

//         const maxPredictions = loadedModel.getTotalClasses();

//         const flip = true;
//         const webcamInstance = new tmImage.Webcam(400, 400, flip);
//         await webcamInstance.setup();
//         await webcamInstance.play();
//         setWebcam(webcamInstance);

//         const labelContainer = labelContainerRef.current;
//         if (labelContainer) {
//           for (let i = 0; i < maxPredictions; i++) {
//             labelContainer.appendChild(document.createElement("div"));
//           }
//         }

//         Swal.close();

//         let requestId;
//         async function loop() {
//           if (webcamInstance) {
//             if (!frozen) {
//               webcamInstance.update();
//               await predict();
//             }
//           }
//           requestId = window.requestAnimationFrame(loop);
//         }

//         async function predict() {
//           if (webcamInstance.canvas) {
//             if (!frozen) {
//               webcamInstance.update();
//             }

//             const prediction = await loadedModel.predict(webcamInstance.canvas);
//             for (let i = 0; i < maxPredictions; i++) {
//               const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
//               if (labelContainerRef.current && labelContainerRef.current.childNodes[i]) {
//                 labelContainerRef.current.childNodes[i].innerHTML = classPrediction;
//               }
//             }

//             if (frozen && frozenCanvasRef.current) {
//               const ctx = frozenCanvasRef.current.getContext("2d");
//               ctx.drawImage(webcamInstance.canvas, 0, 0, 400, 400);
//             }
//           }
//         }

//         requestId = window.requestAnimationFrame(loop);

//         return () => {
//           if (requestId) {
//             window.cancelAnimationFrame(requestId);
//           }
//         };

//       } catch (error) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error de acceso a la cámara',
//           text: 'No se pudo acceder a la cámara. Por favor, asegúrate de que tu dispositivo tiene una cámara y que has dado los permisos necesarios.',
//         });
//         console.error("Error accessing camera:", error);
//       }
//     } 
//     init();
//   }, [frozen]);

//   return (
//     <Sidebar.Pushable style={{ minHeight: "100vh" }}>
//       <CustomSidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
//       <Sidebar.Pusher dimmed={sidebarVisible}>
//         <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A" }}>
//           <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
//             <Icon name="sidebar" style={{ color: "#f9fafb" }} />
//             Sistema Clasificador de Atunes
//           </Menu.Item>
//           <Icon
//             name="home"
//             style={{ fontSize: '37px', color: '#f9fafb' , marginLeft: '860px' , marginTop: '18px'}}
//             onClick={handleIconClick}
//           />
//         </Menu>

//         <Container style={{ marginTop: '120px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
//           <Header as={"h1"} style={{ textAlign: 'left', marginBottom: '20px' }}>Reconocimiento en Vivo</Header>
//         </Container>

//         <Container style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div id="webcam-container" style={{ textAlign: 'center', marginLeft: '35px', marginRight: '1px', marginBottom: '20px' }}>
//               {cameraOpen && webcam && <canvas ref={(ref) => (webcam.canvas = ref)} width={400} height={400} />}
//             </div>
//             <div id="label-container" ref={labelContainerRef} style={{ textAlign: 'center', marginLeft: '50px', marginRight: '-140px',marginTop: '10px' }}></div>
//           </div>
//         </Container>

//         <Container style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <Button  color= "green" onClick={refreshPage}>Abrir Cámara</Button>
//           <Button color= "red" onClick={closeCamera}>Cerrar Cámara</Button>
//           <Button color= "blue" onClick={toggleFreeze}>{frozen ? "Descongelar" : "Congelar"}</Button>
//         </Container>

//         <Container style={{ marginTop: '20px'}}>
//         <Message warning>
//           <MessageHeader>A tener en cuenta!</MessageHeader>
//           <p>♦   La precisión del resultado del modelo va a depender en gran medida de la calidad de imágen (o fotografía) que le proporciones.
//           </p>
//           <p>♦   Si estas presentando inconvenientes siempre ten en consideración recargar la página (valido tambien para el reconocimiento por fotografía) o hacer clic en el boton Abrir Cámara.
//           </p>
//           <p>♦   Para garantizar el mejor funcionamiento del sistema, se recomienda recargar la página y oprimir el boton Cerrar Cámara en caso
//             de querer salir del reconocimiento en vivo hacia otro apartado.
//           </p>
//         </Message>
//         <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
//         </Container>
//       </Sidebar.Pusher>
//     </Sidebar.Pushable>
//   );
// };

// export default EnvivoComponent;


import React, { useState, useEffect, useRef } from "react";
import { Header, Container, Sidebar, Menu, Icon, Button, MessageHeader, Message, Dropdown } from "semantic-ui-react";
import CustomSidebar from "./SideExample";
import * as tmImage from "@teachablemachine/image";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const EnvivoComponent = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [webcam, setWebcam] = useState(null);
  const [frozen, setFrozen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(true);
  const [, setModel] = useState(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const frozenCanvasRef = useRef(null);
  const labelContainerRef = useRef(null);

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const navigate = useNavigate();
  const handleIconClick = () => {
    navigate("/dashboard");
  };

  const toggleFreeze = () => {
    if (cameraOpen) {
      setFrozen(!frozen);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Imágen no disponible',
        text: 'No es posible acceder a la imágen en este momento, asegurate de tener la cámara abierta',
      });
    }
  };

  const closeCamera = () => {
    try {
      if (webcam) {
        webcam.stop();
        setCameraOpen(false);
        clearLabels();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: '¡La cámara ya se encuentra cerrada!',
      });
    }
  };

  const clearLabels = () => {
    if (labelContainerRef.current) {
      labelContainerRef.current.innerHTML = "";
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const getVideoDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setVideoDevices(videoDevices.map((device, index) => ({
        key: device.deviceId,
        text: device.label || `Camera ${index + 1}`,
        value: device.deviceId
      })));
      if (videoDevices.length > 0) {
        setSelectedDevice(videoDevices[0].deviceId);
      }
    } catch (error) {
      console.error('Error getting video devices:', error);
    }
  };

  useEffect(() => {
    getVideoDevices();
  }, []);

  useEffect(() => {
    async function init() {
      if (!selectedDevice) return;

      Swal.fire({
        title: 'Cargando cámara...',
        text: 'Por favor espera mientras se carga la imágen',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        const URL = "https://teachablemachine.withgoogle.com/models/HgHSKPLbt/";
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);

        const maxPredictions = loadedModel.getTotalClasses();

        const flip = true;
        const webcamInstance = new tmImage.Webcam(400, 400, flip);
        await webcamInstance.setup({ deviceId: selectedDevice });
        await webcamInstance.play();
        setWebcam(webcamInstance);

        const labelContainer = labelContainerRef.current;
        if (labelContainer) {
          for (let i = 0; i < maxPredictions; i++) {
            labelContainer.appendChild(document.createElement("div"));
          }
        }

        Swal.close();

        let requestId;
        async function loop() {
          if (webcamInstance) {
            if (!frozen) {
              webcamInstance.update();
              await predict();
            }
          }
          requestId = window.requestAnimationFrame(loop);
        }

        async function predict() {
          if (webcamInstance.canvas) {
            if (!frozen) {
              webcamInstance.update();
            }

            const prediction = await loadedModel.predict(webcamInstance.canvas);
            for (let i = 0; i < maxPredictions; i++) {
              const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
              if (labelContainerRef.current && labelContainerRef.current.childNodes[i]) {
                labelContainerRef.current.childNodes[i].innerHTML = classPrediction;
              }
            }

            if (frozen && frozenCanvasRef.current) {
              const ctx = frozenCanvasRef.current.getContext("2d");
              ctx.drawImage(webcamInstance.canvas, 0, 0, 400, 400);
            }
          }
        }

        requestId = window.requestAnimationFrame(loop);

        return () => {
          if (requestId) {
            window.cancelAnimationFrame(requestId);
          }
        };

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error de acceso a la cámara',
          text: 'No se pudo acceder a la cámara. Por favor, asegúrate de que tu dispositivo tiene una cámara y que has dado los permisos necesarios.',
        });
        console.error("Error accessing camera:", error);
      }
    } 
    init();
  }, [frozen, selectedDevice]);

  return (
    <Sidebar.Pushable style={{ minHeight: "100vh" }}>
      <CustomSidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
      <Sidebar.Pusher dimmed={sidebarVisible}>
        <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A" }}>
          <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
            <Icon name="sidebar" style={{ color: "#f9fafb" }} />
            Sistema Clasificador de Atunes
          </Menu.Item>
          <Icon
            name="home"
            style={{ fontSize: '37px', color: '#f9fafb' , marginLeft: '860px' , marginTop: '18px'}}
            onClick={handleIconClick}
          />
        </Menu>

        <Container style={{ marginTop: '120px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
          <Header as={"h1"} style={{ textAlign: 'left', marginBottom: '20px' }}>Reconocimiento en Vivo</Header>
        </Container>

        <Container style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ marginBottom: '20px' }}>
            <Dropdown
              placeholder='Selecciona una cámara'
              fluid
              selection
              options={videoDevices}
              value={selectedDevice}
              onChange={(_, data) => setSelectedDevice(data.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div id="webcam-container" style={{ textAlign: 'center', marginLeft: '35px', marginRight: '1px', marginBottom: '20px' }}>
              {cameraOpen && webcam && <canvas ref={(ref) => (webcam.canvas = ref)} width={400} height={400} />}
            </div>
            <div id="label-container" ref={labelContainerRef} style={{ textAlign: 'center', marginLeft: '50px', marginRight: '-140px',marginTop: '10px' }}></div>
          </div>
        </Container>

        <Container style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button  color= "green" onClick={refreshPage}>Abrir Cámara</Button>
          <Button color= "red" onClick={closeCamera}>Cerrar Cámara</Button>
          <Button color= "blue" onClick={toggleFreeze}>{frozen ? "Descongelar" : "Congelar"}</Button>
        </Container>

        <Container style={{ marginTop: '20px'}}>
        <Message warning>
          <MessageHeader>A tener en cuenta!</MessageHeader>
          <p>♦   La precisión del resultado del modelo va a depender en gran medida de la calidad de imágen (o fotografía) que le proporciones.
          </p>
          <p>♦   Si estas presentando inconvenientes siempre ten en consideración recargar la página (valido tambien para el reconocimiento por fotografía) o hacer clic en el boton Abrir Cámara.
          </p>
          <p>♦   Para garantizar el mejor funcionamiento del sistema, se recomienda recargar la página y oprimir el boton Cerrar Cámara en caso
            de querer salir del reconocimiento en vivo hacia otro apartado.
          </p>
        </Message>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </Container>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default EnvivoComponent;