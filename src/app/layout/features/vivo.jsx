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
//   const [prediction, setPrediction] = useState(null);

//   const frozenCanvasRef = useRef(null);

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
//         setPrediction(null);
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
//     setPrediction(null);
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
//         const URL = "https://teachablemachine.withgoogle.com/models/3-S1t9wTc/";
//         const modelURL = URL + "model.json";
//         const metadataURL = URL + "metadata.json";

//         const loadedModel = await tmImage.load(modelURL, metadataURL);
//         setModel(loadedModel);

//         const flip = true;
//         const webcamInstance = new tmImage.Webcam(400, 400, flip);
//         await webcamInstance.setup();
//         await webcamInstance.play();
//         setWebcam(webcamInstance);

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
//             const maxPrediction = prediction.reduce((max, p) => p.probability > max.probability ? p : max, prediction[0]);
//             setPrediction(`${maxPrediction.className}: ${maxPrediction.probability.toFixed(2)}`);

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
//       <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A", width: '100%', zIndex: 1000 }}>
//           <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
//             <Icon name="sidebar" style={{ color: "#f9fafb" }} />
//             Sistema Clasificador de Atunes
//           </Menu.Item>
//           <img src="/atun/logex/3.png" alt="Mi Icono" style={{ height: '54px', marginLeft: 'auto', marginTop: '10px' }} onClick={handleIconClick}/>

//         </Menu>

//         <Container style={{ marginTop: '110px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
//           <Header as={"h1"} style={{ textAlign: 'left', marginBottom: '20px' }}>Reconocimiento en Vivo</Header>
//         </Container>

//         <Container style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//           <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
//             <div id="webcam-container" style={{ textAlign: 'center', marginLeft: '35px', marginRight: '1px', marginBottom: '20px' }}>
//               {cameraOpen && webcam && <canvas ref={(ref) => (webcam.canvas = ref)} width={400} height={400} />}
//             </div>
//             {prediction && cameraOpen && (
//               <div style={{
//                 position: 'absolute',
//                 top: '10px',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                 color: '#fff',
//                 padding: '10px',
//                 borderRadius: '5px',
//                 fontSize: '18px'
//               }}>
//                 {prediction}
//               </div>
//             )}
//           </div>
//         </Container>

//         <Container style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
//           <Button color="green" onClick={refreshPage} style={{ fontSize: '17px', padding: '12px 20px' }}>Abrir Cámara</Button>
//           <Button color="red" onClick={closeCamera} style={{ fontSize: '17px', padding: '12px 20px' }}>Cerrar Cámara</Button>
//           <Button color={frozen ? "orange" : "blue"} onClick={toggleFreeze} style={{ fontSize: '17px', padding: '12px 20px' }}>
//             {frozen ? "Descongelar" : "Congelar"}
//           </Button>
//         </Container>

//         <Container style={{ marginTop: '20px'}}>
//           <Message warning>
//             <MessageHeader>A tener en cuenta!</MessageHeader>
//             <p>♦ La precisión del resultado del modelo va a depender en gran medida de la calidad de imágen (o fotografía) que le proporciones.</p>
//             <p>♦ Si estas presentando inconvenientes siempre ten en consideración recargar la página (valido tambien para el reconocimiento por fotografía) o hacer clic en el boton Abrir Cámara.</p>
//             <p>♦ Para garantizar el mejor funcionamiento del sistema, se recomienda recargar la página y oprimir el boton Cerrar Cámara en caso de querer salir del reconocimiento en vivo hacia otro apartado.</p>
//           </Message>
//           <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
//         </Container>
//       </Sidebar.Pusher>
//     </Sidebar.Pushable>
//   );
// };

// export default EnvivoComponent;






// import React, { useState, useEffect, useRef } from "react";
// import { Header, Container, Sidebar, Menu, Icon, Button, MessageHeader, Message, Image, Segment } from "semantic-ui-react";
// import CustomSidebar from "./SideExample";
// import * as tmImage from "@teachablemachine/image";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';

// const EnvivoComponent = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [webcam, setWebcam] = useState(null);
//   const [frozen, setFrozen] = useState(false);
//   const [cameraOpen, setCameraOpen] = useState(true);
//   const [model, setModel] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [history, setHistory] = useState([]); // Estado para el historial
//   const frozenCanvasRef = useRef(null);

//   const handleSidebarToggle = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

//   const navigate = useNavigate();
//   const handleIconClick = () => {
//     navigate("/dashboard");
//   };

//   const toggleFreeze = async () => {
//     if (cameraOpen) {
//       if (frozen) {
//         setFrozen(false);
//       } else {
//         await captureFreeze(); // Asegurarse de esperar a la captura
//         setFrozen(true);
//       }
//     } else {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Imágen no disponible',
//         text: 'No es posible acceder a la imágen en este momento, asegurate de tener la cámara abierta',
//       });
//     }
//   };

//   const captureFreeze = async () => {
//     if (webcam && frozenCanvasRef.current) {
//       const canvas = frozenCanvasRef.current;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(webcam.canvas, 0, 0, 400, 400);

//       // Obtener la predicción actual
//       const predictions = await model.predict(webcam.canvas);
//       const maxPrediction = predictions.reduce((max, p) => p.probability > max.probability ? p : max, predictions[0]);
//       const predictionText = `${maxPrediction.className}: ${maxPrediction.probability.toFixed(2)}`;
//       setPrediction(predictionText);

//       // Obtener la imagen actual como DataURL
//       const imageData = canvas.toDataURL("image/png");

//       // Actualizar el historial con la predicción y la imagen actuales
//       setHistory((prevHistory) => [
//         ...prevHistory,
//         { prediction: predictionText, imageData, timestamp: new Date().toLocaleString() }
//       ]);
//     }
//   };

//   const closeCamera = () => {
//     try {
//       if (webcam) {
//         webcam.stop();
//         setCameraOpen(false);
//         clearLabels();
//         setPrediction(null);
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
//     setPrediction(null);
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
//         const URL = "https://teachablemachine.withgoogle.com/models/3-S1t9wTc/";
//         const modelURL = URL + "model.json";
//         const metadataURL = URL + "metadata.json";

//         const loadedModel = await tmImage.load(modelURL, metadataURL);
//         setModel(loadedModel);

//         const flip = true;
//         const webcamInstance = new tmImage.Webcam(400, 400, flip);
//         await webcamInstance.setup();
//         await webcamInstance.play();
//         setWebcam(webcamInstance);

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

//             const predictions = await loadedModel.predict(webcamInstance.canvas);
//             const maxPrediction = predictions.reduce((max, p) => p.probability > max.probability ? p : max, predictions[0]);
//             setPrediction(`${maxPrediction.className}: ${maxPrediction.probability.toFixed(2)}`);
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
//         <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A", width: '100%', zIndex: 1000 }}>
//           <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
//             <Icon name="sidebar" style={{ color: "#f9fafb" }} />
//             Sistema Clasificador de Atunes
//           </Menu.Item>
//           <img src="/atun/logex/3.png" alt="Mi Icono" style={{ height: '54px', marginLeft: 'auto', marginTop: '10px' }} onClick={handleIconClick}/>
//         </Menu>

//         <Container style={{ marginTop: '110px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
//           <Header as={"h1"} style={{ textAlign: 'left', marginBottom: '20px' }}>Reconocimiento en Vivo</Header>
//         </Container>

//         <Container style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//           <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
//             <div id="webcam-container" style={{ textAlign: 'center', marginLeft: '35px', marginRight: '1px', marginBottom: '20px' }}>
//               {cameraOpen && webcam && <canvas ref={(ref) => (webcam.canvas = ref)} width={400} height={400} />}
//               <canvas ref={frozenCanvasRef} width={400} height={400} style={{ display: 'none' }} />
//             </div>
//             {prediction && cameraOpen && (
//               <div style={{
//                 position: 'absolute',
//                 top: '10px',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                 color: '#fff',
//                 padding: '10px',
//                 borderRadius: '5px',
//                 fontSize: '18px'
//               }}>
//                 {prediction}
//               </div>
//             )}
//           </div>
//         </Container>

//         <Container style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
//           <Button color="green" onClick={refreshPage} style={{ fontSize: '17px', padding: '12px 20px' }}>Abrir Cámara</Button>
//           <Button color="red" onClick={closeCamera} style={{ fontSize: '17px', padding: '12px 20px' }}>Cerrar Cámara</Button>
//           <Button color={frozen ? "orange" : "blue"} onClick={toggleFreeze} style={{ fontSize: '17px', padding: '12px 20px' }}>
//             {frozen ? "Descongelar" : "Congelar"}
//           </Button>
//         </Container>

//         <Container style={{ marginTop: '20px' }}>
//           <Message warning>
//             <MessageHeader>A tener en cuenta!</MessageHeader>
//             <p>♦ La precisión del resultado del modelo va a depender en gran medida de la calidad de imágen (o fotografía) que le proporciones.</p>
//             <p>♦ Si estas presentando inconvenientes siempre ten en consideración recargar la página (valido tambien para el reconocimiento por fotografía) o hacer clic en el boton Abrir Cámara.</p>
//             <p>♦ Para garantizar el mejor funcionamiento del sistema, se recomienda recargar la página y oprimir el boton Cerrar Cámara en caso de querer salir del reconocimiento en vivo hacia otro apartado.</p>
//           </Message>
//         </Container>

//         <Container style={{ marginTop: '20px' }}>
//           <Header as="h2" style={{ marginBottom: '20px' }}>Historial de Predicciones</Header>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//             {history.map((entry, index) => (
//               <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '300px' }}>
//                 <Segment>
//                   <Image src={entry.imageData} size="medium" style={{ maxWidth: '100%', height: 'auto' }} />
//                 </Segment>
//                 <Segment style={{ textAlign: 'center', padding: '10px' }}>
//                   <div style={{ marginBottom: '10px' }}>
//                     <strong>Predicción:</strong> {entry.prediction}
//                   </div>
//                   <div style={{ fontSize: '16px', color: '#555' }}>
//                     <strong>Fecha:</strong> {entry.timestamp}
//                   </div>
//                 </Segment>
//               </div>
//             ))}
//           </div>
//         </Container>
//       </Sidebar.Pusher>
//     </Sidebar.Pushable>
//   );
// };

// export default EnvivoComponent;



// import React, { useState, useEffect, useRef } from "react";
// import { Header, Container, Sidebar, Menu, Icon, Button, MessageHeader, Message, Image, Segment } from "semantic-ui-react";
// import CustomSidebar from "./SideExample";
// import * as tmImage from "@teachablemachine/image";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';

// const EnvivoComponent = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [webcam, setWebcam] = useState(null);
//   const [frozen, setFrozen] = useState(false);
//   const [cameraOpen, setCameraOpen] = useState(true);
//   const [model, setModel] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [history, setHistory] = useState([]); // Estado para el historial
//   const frozenCanvasRef = useRef(null);

//   const handleSidebarToggle = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

//   const navigate = useNavigate();
//   const handleIconClick = () => {
//     navigate("/dashboard");
//   };

//   const toggleFreeze = async () => {
//     if (cameraOpen) {
//       if (frozen) {
//         setFrozen(false);
//       } else {
//         await captureFreeze(); // Asegurarse de esperar a la captura
//         setFrozen(true);
//       }
//     } else {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Imágen no disponible',
//         text: 'No es posible acceder a la imágen en este momento, asegurate de tener la cámara abierta',
//       });
//     }
//   };

//   const captureFreeze = async () => {
//     if (webcam && frozenCanvasRef.current) {
//       const canvas = frozenCanvasRef.current;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(webcam.canvas, 0, 0, 400, 400);

//       // Obtener la predicción actual
//       const predictions = await model.predict(webcam.canvas);
//       const maxPrediction = predictions.reduce((max, p) => p.probability > max.probability ? p : max, predictions[0]);
//       const predictionText = `${maxPrediction.className}: ${maxPrediction.probability.toFixed(2)}`;
//       setPrediction(predictionText);

//       // Obtener la imagen actual como DataURL
//       const imageData = canvas.toDataURL("image/png");

//       // Actualizar el historial con la predicción y la imagen actuales
//       setHistory((prevHistory) => [
//         { prediction: predictionText, imageData, timestamp: new Date().toLocaleString() },
//         ...prevHistory
//       ]);
//     }
//   };

//   const closeCamera = () => {
//     try {
//       if (webcam) {
//         webcam.stop();
//         setCameraOpen(false);
//         clearLabels();
//         setPrediction(null);
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
//     setPrediction(null);
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
//         const URL = "https://teachablemachine.withgoogle.com/models/3-S1t9wTc/";
//         const modelURL = URL + "model.json";
//         const metadataURL = URL + "metadata.json";

//         const loadedModel = await tmImage.load(modelURL, metadataURL);
//         setModel(loadedModel);

//         const flip = true;
//         const webcamInstance = new tmImage.Webcam(400, 400, flip);
//         await webcamInstance.setup();
//         await webcamInstance.play();
//         setWebcam(webcamInstance);

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

//             const predictions = await loadedModel.predict(webcamInstance.canvas);
//             const maxPrediction = predictions.reduce((max, p) => p.probability > max.probability ? p : max, predictions[0]);
//             setPrediction(`${maxPrediction.className}: ${maxPrediction.probability.toFixed(2)}`);
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
//         <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A", width: '100%', zIndex: 1000 }}>
//           <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
//             <Icon name="sidebar" style={{ color: "#f9fafb" }} />
//             Sistema Clasificador de Atunes
//           </Menu.Item>
//           <img src="/atun/logex/3.png" alt="Mi Icono" style={{ height: '54px', marginLeft: 'auto', marginTop: '10px' }} onClick={handleIconClick}/>
//         </Menu>

//         <Container style={{ marginTop: '110px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
//           <Header as={"h1"} style={{ textAlign: 'left', marginBottom: '20px' }}>Reconocimiento en Vivo</Header>
//         </Container>

//         <Container style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//           <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
//             <div id="webcam-container" style={{ textAlign: 'center', marginLeft: '35px', marginRight: '1px', marginBottom: '20px' }}>
//               {cameraOpen && webcam && <canvas ref={(ref) => (webcam.canvas = ref)} width={400} height={400} />}
//               <canvas ref={frozenCanvasRef} width={400} height={400} style={{ display: 'none' }} />
//             </div>
//             {prediction && cameraOpen && (
//               <div style={{
//                 position: 'absolute',
//                 top: '10px',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                 color: '#fff',
//                 padding: '10px',
//                 borderRadius: '5px',
//                 fontSize: '18px'
//               }}>
//                 {prediction}
//               </div>
//             )}
//           </div>
//         </Container>

//         <Container style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
//           <Button color="green" onClick={refreshPage} style={{ fontSize: '17px', padding: '12px 20px' }}>Abrir Cámara</Button>
//           <Button color="red" onClick={closeCamera} style={{ fontSize: '17px', padding: '12px 20px' }}>Cerrar Cámara</Button>
//           <Button color={frozen ? "orange" : "blue"} onClick={toggleFreeze} style={{ fontSize: '17px', padding: '12px 20px' }}>
//             {frozen ? "Descongelar" : "Congelar"}
//           </Button>
//         </Container>

//         <Container style={{ marginTop: '20px' }}>
//           <Message warning>
//             <MessageHeader>A tener en cuenta!</MessageHeader>
//             <p>♦ La precisión del resultado del modelo va a depender en gran medida de la calidad de imágen (o fotografía) que le proporciones.</p>
//             <p>♦ Si estas presentando inconvenientes siempre ten en consideración recargar la página (valido tambien para el reconocimiento por fotografía) o hacer clic en el boton Abrir Cámara.</p>
//             <p>♦ Para garantizar el mejor funcionamiento del sistema, se recomienda recargar la página y oprimir el boton Cerrar Cámara en caso de querer salir del reconocimiento en vivo hacia otro apartado.</p>
//           </Message>
//         </Container>

//         <Container style={{ marginTop: '20px' }}>
//           <Header as="h2" style={{ marginBottom: '20px' }}>Historial de Predicciones</Header>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//             {history.map((entry, index) => (
//               <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '300px' }}>
//                 <Segment>
//                   <Image src={entry.imageData} size="medium" style={{ maxWidth: '100%', height: 'auto' }} />
//                 </Segment>
//                 <Segment style={{ textAlign: 'center', padding: '10px' }}>
//                   <div style={{ marginBottom: '10px' }}>
//                     <strong>Predicción:</strong> {entry.prediction}
//                   </div>
//                   <div style={{ fontSize: '16px', color: '#555' }}>
//                     <strong>Fecha:</strong> {entry.timestamp}
//                   </div>
//                 </Segment>
//               </div>
//             ))}
//           </div>
//         </Container>
//       </Sidebar.Pusher>
//     </Sidebar.Pushable>
//   );
// };

// export default EnvivoComponent;







// import React, { useState, useEffect, useRef } from "react";
// import { Header, Container, Sidebar, Menu, Icon, Button, MessageHeader, Message, Image, Segment } from "semantic-ui-react";
// import CustomSidebar from "./SideExample";
// import * as tmImage from "@teachablemachine/image";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';

// const EnvivoComponent = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [webcam, setWebcam] = useState(null);
//   const [frozen, setFrozen] = useState(false);
//   const [cameraOpen, setCameraOpen] = useState(true);
//   const [model, setModel] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [history, setHistory] = useState([]); // Estado para el historial
//   const [nextId, setNextId] = useState(1); // Contador para los IDs
//   const frozenCanvasRef = useRef(null);

//   const handleSidebarToggle = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

//   const navigate = useNavigate();
//   const handleIconClick = () => {
//     navigate("/dashboard");
//   };

//   const toggleFreeze = async () => {
//     if (cameraOpen) {
//       if (frozen) {
//         setFrozen(false);
//       } else {
//         await captureFreeze(); // Asegurarse de esperar a la captura
//         setFrozen(true);
//       }
//     } else {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Imágen no disponible',
//         text: 'No es posible acceder a la imágen en este momento, asegurate de tener la cámara abierta',
//       });
//     }
//   };

//   const captureFreeze = async () => {
//     if (webcam && frozenCanvasRef.current) {
//       const canvas = frozenCanvasRef.current;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(webcam.canvas, 0, 0, 400, 400);

//       // Obtener la predicción actual
//       const predictions = await model.predict(webcam.canvas);
//       const maxPrediction = predictions.reduce((max, p) => p.probability > max.probability ? p : max, predictions[0]);
//       const predictionText = `${maxPrediction.className}: ${maxPrediction.probability.toFixed(2)}`;
//       setPrediction(predictionText);

//       // Obtener la imagen actual como DataURL
//       const imageData = canvas.toDataURL("image/png");

//       // Actualizar el historial con la predicción y la imagen actuales
//       setHistory((prevHistory) => [
//         { id: nextId, prediction: predictionText, imageData, timestamp: new Date().toLocaleString() },
//         ...prevHistory // Asegura que las imágenes más recientes aparezcan al principio
//       ]);
//       setNextId(prevId => prevId + 1); // Incrementar el contador de ID
//     }
//   };

//   const closeCamera = () => {
//     try {
//       if (webcam) {
//         webcam.stop();
//         setCameraOpen(false);
//         clearLabels();
//         setPrediction(null);
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
//     setPrediction(null);
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
//         const URL = "https://teachablemachine.withgoogle.com/models/3-S1t9wTc/";
//         const modelURL = URL + "model.json";
//         const metadataURL = URL + "metadata.json";

//         const loadedModel = await tmImage.load(modelURL, metadataURL);
//         setModel(loadedModel);

//         const flip = true;
//         const webcamInstance = new tmImage.Webcam(400, 400, flip);
//         await webcamInstance.setup();
//         await webcamInstance.play();
//         setWebcam(webcamInstance);

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

//             const predictions = await loadedModel.predict(webcamInstance.canvas);
//             const maxPrediction = predictions.reduce((max, p) => p.probability > max.probability ? p : max, predictions[0]);
//             setPrediction(`${maxPrediction.className}: ${maxPrediction.probability.toFixed(2)}`);
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
//         <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A", width: '100%', zIndex: 1000 }}>
//           <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
//             <Icon name="sidebar" style={{ color: "#f9fafb" }} />
//             Sistema Clasificador de Atunes
//           </Menu.Item>
//           <img src="/atun/logex/3.png" alt="Mi Icono" style={{ height: '54px', marginLeft: 'auto', marginTop: '10px' }} onClick={handleIconClick}/>
//         </Menu>

//         <Container style={{ marginTop: '110px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
//           <Header as={"h1"} style={{ textAlign: 'left', marginBottom: '20px' }}>Reconocimiento en Vivo</Header>
//         </Container>

//         <Container style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//           <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
//             <div id="webcam-container" style={{ textAlign: 'center', marginLeft: '35px', marginRight: '1px', marginBottom: '20px' }}>
//               {cameraOpen && webcam && <canvas ref={(ref) => (webcam.canvas = ref)} width={400} height={400} />}
//               <canvas ref={frozenCanvasRef} width={400} height={400} style={{ display: 'none' }} />
//             </div>
//             {prediction && cameraOpen && (
//               <div style={{
//                 position: 'absolute',
//                 top: '10px',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                 color: '#fff',
//                 padding: '10px',
//                 borderRadius: '5px',
//                 fontSize: '18px'
//               }}>
//                 {prediction}
//               </div>
//             )}
//           </div>
//         </Container>

//         <Container style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
//           <Button color="green" onClick={refreshPage} style={{ fontSize: '17px', padding: '12px 20px' }}>Abrir Cámara</Button>
//           <Button color="red" onClick={closeCamera} style={{ fontSize: '17px', padding: '12px 20px' }}>Cerrar Cámara</Button>
//           <Button color={frozen ? "orange" : "blue"} onClick={toggleFreeze} style={{ fontSize: '17px', padding: '12px 20px' }}>
//             {frozen ? "Descongelar" : "Congelar"}
//           </Button>
//         </Container>

//         <Container style={{ marginTop: '20px' }}>
//           <Message warning>
//             <MessageHeader>A tener en cuenta!</MessageHeader>
//             <p>♦ La precisión del resultado del modelo va a depender en gran medida de la calidad de imágen (o fotografía) que le proporciones.</p>
//             <p>♦ Si estas presentando inconvenientes siempre ten en consideración recargar la página (valido tambien para el reconocimiento por fotografía) o hacer clic en el boton Abrir Cámara.</p>
//             <p>♦ Para garantizar el mejor funcionamiento del sistema, se recomienda recargar la página y oprimir el boton Cerrar Cámara en caso de querer salir del reconocimiento en vivo hacia otro apartado.</p>
//           </Message>
//         </Container>

//         <Container style={{ marginTop: '30px' }}>
//           <Header as="h2" textAlign="center">Historial de Predicciones</Header>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
//             {history.map((item) => (
//               <div key={item.id} style={{ flex: '1 0 21%', boxSizing: 'border-box', marginBottom: '20px' }}>
//                 <Segment>
//                   <Image src={item.imageData} size="medium" rounded />
//                 </Segment>
//                 <Segment>
//                   <p><strong>ID:</strong> {item.id}</p>
//                   <p><strong>Predicción:</strong> {item.prediction}</p>
//                   <p><strong>Fecha:</strong> {item.timestamp}</p>
//                 </Segment>
//               </div>
//             ))}
//           </div>
//         </Container>
//       </Sidebar.Pusher>
//     </Sidebar.Pushable>
//   );
// };

// export default EnvivoComponent;






// import React, { useState, useEffect, useRef } from "react";
// import { Header, Container, Sidebar, Menu, Icon, Button, MessageHeader, Message, Image, Segment } from "semantic-ui-react";
// import CustomSidebar from "./SideExample";
// import * as tmImage from "@teachablemachine/image";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';

// const EnvivoComponent = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [webcam, setWebcam] = useState(null);
//   const [frozen, setFrozen] = useState(false);
//   const [cameraOpen, setCameraOpen] = useState(true);
//   const [model, setModel] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [history, setHistory] = useState([]); // Estado para el historial
//   const [nextId, setNextId] = useState(1); // Contador para los IDs
//   const frozenCanvasRef = useRef(null);

//   const handleSidebarToggle = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

//   const navigate = useNavigate();
//   const handleIconClick = () => {
//     navigate("/dashboard");
//   };

//   const toggleFreeze = async () => {
//     if (cameraOpen) {
//       if (frozen) {
//         setFrozen(false);
//       } else {
//         await captureFreeze(); // Asegurarse de esperar a la captura
//         setFrozen(true);
//       }
//     } else {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Imágen no disponible',
//         text: 'No es posible acceder a la imágen en este momento, asegurate de tener la cámara abierta',
//       });
//     }
//   };

//   const captureFreeze = async () => {
//     if (webcam && frozenCanvasRef.current) {
//       const canvas = frozenCanvasRef.current;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(webcam.canvas, 0, 0, 400, 400);

//       // Obtener la predicción actual
//       const predictions = await model.predict(webcam.canvas);
//       const maxPrediction = predictions.reduce((max, p) => p.probability > max.probability ? p : max, predictions[0]);
//       const predictionText = `${maxPrediction.className}: ${maxPrediction.probability.toFixed(2)}`;
//       setPrediction(predictionText);

//       // Obtener la imagen actual como DataURL
//       const imageData = canvas.toDataURL("image/png");

//       // Actualizar el historial con la predicción y la imagen actuales
//       setHistory((prevHistory) => [
//         { id: nextId, prediction: predictionText, imageData, timestamp: new Date().toLocaleString() },
//         ...prevHistory // Asegura que las imágenes más recientes aparezcan al principio
//       ]);
//       setNextId(prevId => prevId + 1); // Incrementar el contador de ID
//     }
//   };

//   const closeCamera = () => {
//     try {
//       if (webcam) {
//         webcam.stop();
//         setCameraOpen(false);
//         clearLabels();
//         setPrediction(null);
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
//     setPrediction(null);
//   };

//   const refreshPage = () => {
//     window.location.reload();
//   };

//   const downloadCSV = () => {
//     if (history.length === 0) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Sin Datos',
//         text: 'No hay ninguna imagen en el historial para descargar.',
//       });
//       return;
//     }

//     const headers = ["ID", "Especie", "Probabilidad", "Fecha"];
//     const rows = history.map(item => {
//       const [species, probability] = item.prediction.split(": ");
//       return [item.id, species, probability, item.timestamp];
//     });

//     let csvContent = "data:text/csv;charset=utf-8," 
//       + headers.join(",") + "\n" 
//       + rows.map(row => row.join(",")).join("\n");

//     // Crear un enlace temporal para la descarga
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "historial_de_predicciones.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
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
//         const URL = "https://teachablemachine.withgoogle.com/models/3-S1t9wTc/";
//         const modelURL = URL + "model.json";
//         const metadataURL = URL + "metadata.json";

//         const loadedModel = await tmImage.load(modelURL, metadataURL);
//         setModel(loadedModel);

//         const flip = true;
//         const webcamInstance = new tmImage.Webcam(400, 400, flip);
//         await webcamInstance.setup();
//         await webcamInstance.play();
//         setWebcam(webcamInstance);

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

//             const predictions = await loadedModel.predict(webcamInstance.canvas);
//             const maxPrediction = predictions.reduce((max, p) => p.probability > max.probability ? p : max, predictions[0]);
//             setPrediction(`${maxPrediction.className}: ${maxPrediction.probability.toFixed(2)}`);
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
//         <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A", width: '100%', zIndex: 1000 }}>
//           <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
//             <Icon name="sidebar" style={{ color: "#f9fafb" }} />
//             Sistema Clasificador de Atunes
//           </Menu.Item>
//           <img src="/atun/logex/3.png" alt="Mi Icono" style={{ height: '54px', marginLeft: 'auto', marginTop: '10px' }} onClick={handleIconClick}/>
//         </Menu>

//         <Container style={{ marginTop: '110px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
//           <Header as={"h1"} style={{ textAlign: 'left', marginBottom: '20px' }}>Reconocimiento en Vivo</Header>
//         </Container>

//         <Container style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//           <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
//             <div id="webcam-container" style={{ textAlign: 'center', marginLeft: '35px', marginRight: '1px', marginBottom: '20px' }}>
//               {cameraOpen && webcam && <canvas ref={(ref) => (webcam.canvas = ref)} width={400} height={400} />}
//               <canvas ref={frozenCanvasRef} width={400} height={400} style={{ display: 'none' }} />
//             </div>
//             {prediction && cameraOpen && (
//               <div style={{
//                 position: 'absolute',
//                 top: '10px',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                 color: '#fff',
//                 padding: '10px',
//                 borderRadius: '5px',
//                 fontSize: '18px'
//               }}>
//                 {prediction}
//               </div>
//             )}
//           </div>
//         </Container>

//         <Container style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
//           <Button color="green" onClick={refreshPage} style={{ fontSize: '17px', padding: '12px 20px' }}>Abrir Cámara</Button>
//           <Button color="red" onClick={closeCamera} style={{ fontSize: '17px', padding: '12px 20px' }}>Cerrar Cámara</Button>
//           <Button color={frozen ? "orange" : "blue"} onClick={toggleFreeze} style={{ fontSize: '17px', padding: '12px 20px' }}>
//             {frozen ? "Descongelar" : "Congelar"}
//           </Button>
//         </Container>

//         <Container style={{ marginTop: '20px' }}>
//           <Message warning>
//             <MessageHeader>A tener en cuenta!</MessageHeader>
//             <p>♦ La precisión del resultado del modelo va a depender en gran medida de la calidad de imágen (o fotografía) que le proporciones.</p>
//             <p>♦ Si estas presentando inconvenientes siempre ten en consideración recargar la página (valido tambien para el reconocimiento por fotografía) o hacer clic en el boton Abrir Cámara.</p>
//             <p>♦ Para garantizar el mejor funcionamiento del sistema, se recomienda recargar la página y oprimir el boton Cerrar Cámara en caso de querer salir del reconocimiento en vivo hacia otro apartado.</p>
//           </Message>
//         </Container>

//         <Container style={{ marginTop: '30px' }}>
//           <Header as="h2" textAlign="left">Historial de Predicciones</Header>
//           <Button primary onClick={downloadCSV} style={{ marginTop: '20px' }}>Descargar historial</Button>
//           <br /><br />
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
//             {history.length > 0 ? (
//               history.map(item => (
//                 <Segment key={item.id} style={{ flex: '1 0 21%', boxSizing: 'border-box', marginBottom: '20px' }}>
//                   <Image src={item.imageData} size="small" />
//                   <p><strong>ID:</strong> {item.id}</p>
//                   <p><strong>Especie:</strong> {item.prediction.split(": ")[0]}</p>
//                   <p><strong>Probabilidad:</strong> {item.prediction.split(": ")[1]}</p>
//                   <p><strong>Fecha:</strong> {item.timestamp}</p>
//                 </Segment>
//               ))
//             ) : (
//               <Message color='yellow'>No hay predicciones en el historial.</Message>
//             )}
//           </div>
//         </Container>
//       </Sidebar.Pusher>
//     </Sidebar.Pushable>
//   );
// };

// export default EnvivoComponent;




import React, { useState, useEffect, useRef } from "react";
import { Header, Container, Sidebar, Menu, Icon, Button, MessageHeader, Message, Image, Segment } from "semantic-ui-react";
import CustomSidebar from "./SideExample";
import * as tmImage from "@teachablemachine/image";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const EnvivoComponent = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [webcam, setWebcam] = useState(null);
  const [frozen, setFrozen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(true);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]);
  const [nextId, setNextId] = useState(1);
  const frozenCanvasRef = useRef(null);

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const navigate = useNavigate();
  const handleIconClick = () => {
    navigate("/dashboard");
  };

  const toggleFreeze = async () => {
    if (cameraOpen) {
      if (frozen) {
        setFrozen(false);
      } else {
        await captureFreeze();
        setFrozen(true);
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Imágen no disponible',
        text: 'No es posible acceder a la imágen en este momento, asegurate de tener la cámara abierta',
      });
    }
  };

  const captureFreeze = async () => {
    if (webcam && frozenCanvasRef.current) {
      const canvas = frozenCanvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(webcam.canvas, 0, 0, 400, 400);

      const predictions = await model.predict(webcam.canvas);
      const maxPrediction = predictions.reduce((max, p) => p.probability > max.probability ? p : max, predictions[0]);
      const predictionText = `${maxPrediction.className}: ${maxPrediction.probability.toFixed(2)}`;
      setPrediction(predictionText);

      const imageData = canvas.toDataURL("image/png");

      setHistory((prevHistory) => [
        { id: nextId, prediction: predictionText, imageData, timestamp: new Date().toLocaleString() },
        ...prevHistory
      ]);
      setNextId(prevId => prevId + 1);
    }
  };

  const closeCamera = () => {
    try {
      if (webcam) {
        webcam.stop();
        setCameraOpen(false);
        clearLabels();
        setPrediction(null);
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
    setPrediction(null);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const downloadCSV = () => {
    if (history.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin Datos',
        text: 'No hay ninguna imagen en el historial para descargar.',
      });
      return;
    }

    const headers = ["ID", "Especie", "Probabilidad", "Fecha"];
    const rows = history.map(item => {
      const [species, probability] = item.prediction.split(": ");
      return [item.id, species, probability, item.timestamp];
    });

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(row => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "historial_de_predicciones.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    async function init() {
      Swal.fire({
        title: 'Cargando cámara...',
        text: 'Por favor espera mientras se carga la imágen',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        const URL = "https://teachablemachine.withgoogle.com/models/3-S1t9wTc/";
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);

        const flip = true;
        const webcamInstance = new tmImage.Webcam(400, 400, flip);
        await webcamInstance.setup();
        await webcamInstance.play();
        setWebcam(webcamInstance);

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

            const predictions = await loadedModel.predict(webcamInstance.canvas);
            const maxPrediction = predictions.reduce((max, p) => p.probability > max.probability ? p : max, predictions[0]);
            setPrediction(`${maxPrediction.className}: ${maxPrediction.probability.toFixed(2)}`);
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
  }, [frozen]);

  return (
    <Sidebar.Pushable style={{ minHeight: "100vh" }}>
      <CustomSidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />
      <Sidebar.Pusher dimmed={sidebarVisible}>
        <Menu fixed="top" style={{ backgroundColor: "#14539A", borderBottom: "5px solid #14539A", width: '100%', zIndex: 1000 }}>
          <Menu.Item onClick={handleSidebarToggle} style={{ fontSize: '20px', color: '#f9fafb' }}>
            <Icon name="sidebar" style={{ color: "#f9fafb" }} />
            Sistema Clasificador de Atunes
          </Menu.Item>
          <img src="/atun/logex/3.png" alt="Mi Icono" style={{ height: '54px', marginLeft: 'auto', marginTop: '10px' }} onClick={handleIconClick}/>
        </Menu>

        <Container style={{ marginTop: '110px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
          <Header as={"h1"} style={{ textAlign: 'left', marginBottom: '20px' }}>Reconocimiento en Vivo</Header>
        </Container>

        <Container style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <div id="webcam-container" style={{ textAlign: 'center', marginLeft: '35px', marginRight: '1px', marginBottom: '20px' }}>
              {cameraOpen && webcam && <canvas ref={(ref) => (webcam.canvas = ref)} width={400} height={400} />}
              <canvas ref={frozenCanvasRef} width={400} height={400} style={{ display: 'none' }} />
            </div>
            {prediction && cameraOpen && (
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '18px'
              }}>
                {prediction}
              </div>
            )}
          </div>
        </Container>

        <Container style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <Button color="green" onClick={refreshPage} style={{ fontSize: '17px', padding: '12px 20px' }}>Abrir Cámara</Button>
          <Button color="red" onClick={closeCamera} style={{ fontSize: '17px', padding: '12px 20px' }}>Cerrar Cámara</Button>
          <Button color={frozen ? "orange" : "blue"} onClick={toggleFreeze} style={{ fontSize: '17px', padding: '12px 20px' }}>
            {frozen ? "Descongelar" : "Congelar"}
          </Button>
        </Container>

        <Container style={{ marginTop: '20px' }}>
          <Message warning>
            <MessageHeader>A tener en cuenta!</MessageHeader>
            <p>♦ La precisión del resultado del modelo va a depender en gran medida de la calidad de imágen (o fotografía) que le proporciones.</p>
            <p>♦ Si estas presentando inconvenientes siempre ten en consideración recargar la página (valido tambien para el reconocimiento por fotografía) o hacer clic en el boton Abrir Cámara.</p>
            <p>♦ Para garantizar el mejor funcionamiento del sistema, se recomienda recargar la página y oprimir el boton Cerrar Cámara en caso de querer salir del reconocimiento en vivo hacia otro apartado.</p>
          </Message>
        </Container>

        <Container style={{ marginTop: '30px' }}>
          <Header as="h2" textAlign="left">Historial de Predicciones</Header>
          <Button primary onClick={downloadCSV} style={{ marginTop: '20px', marginBottom: '20px' }}>Descargar historial</Button>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {history.length > 0 ? (
              history.map((item) => (
                <div key={item.id} style={{ 
                  width: 'calc(25% - 20px)', 
                  minWidth: '250px', 
                  marginBottom: '20px'
                }}>
                  <Segment style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Image src={item.imageData} size="medium" rounded style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div style={{ marginTop: 'auto' }}>
                      <p><strong>ID:</strong> {item.id}</p>
                      <p><strong>Especie:</strong> {item.prediction.split(": ")[0]}</p>
                      <p><strong>Probabilidad:</strong> {item.prediction.split(": ")[1]}</p>
                      <p><strong>Fecha:</strong> {item.timestamp}</p>
                    </div>
                  </Segment>
                </div>
              ))
            ) : (
              <Message color='yellow'>No hay predicciones en el historial.</Message>
            )}
            
          </div>

          <br /><br /><br /><br /><br /><br /><br />
        </Container>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default EnvivoComponent;