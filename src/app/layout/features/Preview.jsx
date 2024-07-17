// import React, { useState, useEffect } from "react";
// import { Button, Grid, GridColumn, Image as SemanticImage } from "semantic-ui-react";
// import ShowPrediction from "./Showprediction";
// import * as tmImage from '@teachablemachine/image';

// const Preview = ({ searchState }) => {
//     const [predictedData, setPredictedData] = useState({
//         Product: "",
//         Probability: "",
//     });
//     const [model, setModel] = useState(null);
//     const [isModelLoaded, setIsModelLoaded] = useState(false);

//     useEffect(() => {
//         loadModel();
//     }, []);

//     const loadModel = async () => {
//         const URL = "https://teachablemachine.withgoogle.com/models/HgHSKPLbt/";
//         const modelURL = URL + "model.json";
//         const metadataURL = URL + "metadata.json";
        
//         try {
//             const loadedModel = await tmImage.load(modelURL, metadataURL);
//             setModel(loadedModel);
//             setIsModelLoaded(true);
//             console.log('Modelo cargado exitosamente');
//         } catch (error) {
//             console.error('Error al cargar el modelo:', error);
//             alert('Hubo un problema al cargar el modelo. Por favor, recarga la página.');
//         }
//     };

//     const handlePredict = async () => {
//         if (searchState === "") {
//             alert('Por favor, ingrese una URL de imagen o seleccione un archivo.');
//             return;
//         }
    
//         if (!isModelLoaded) {
//             alert('El modelo aún no ha terminado de cargar. Por favor, espere un momento.');
//             return;
//         }
    
//         try {
//             console.log('Cargando la imagen...', searchState);
//             let img;
//             if (typeof searchState === 'string') {
//                 img = await loadImage(searchState);
//             } else if (searchState instanceof File) {
//                 img = await loadImageFromFile(searchState);
//             } else {
//                 throw new Error('Tipo de searchState no válido');
//             }
    
//             console.log('Imagen cargada, procediendo con la predicción');
//             const predictions = await model.predict(img);
//             console.log('Predicciones obtenidas:', predictions);
    
//             const topPrediction = predictions.reduce((prev, current) => 
//                 (prev.probability > current.probability) ? prev : current
//             );
    
//             setPredictedData({
//                 Product: topPrediction.className,
//                 Probability: (topPrediction.probability * 10).toFixed(2),
//             });
//         } catch (error) {
//             console.error('Error detallado:', error);
//             if (error.message.includes('Error al cargar la imagen')) {
//                 alert('No se pudo cargar la imagen. Por favor, verifica que la URL sea correcta y accesible, o que el archivo seleccionado sea una imagen válida.');
//             } else {
//                 alert(`Ocurrió un error inesperado: ${error.message}`);
//             }
//         }
//     };

//     const loadImage = (url) => {
//         return new Promise((resolve, reject) => {
//             const img = new Image();
//             img.crossOrigin = "anonymous";
//             img.onload = () => {
//                 console.log('Imagen cargada exitosamente:', url);
//                 resolve(img);
//             };
//             img.onerror = (e) => {
//                 console.error('Error al cargar la imagen:', url, e);
//                 reject(new Error(`Error al cargar la imagen: ${url}`));
//             };
//             img.src = url;
//         });
//     };

//     const loadImageFromFile = (file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const img = new Image();
//                 img.onload = () => resolve(img);
//                 img.onerror = () => reject(new Error('Error al cargar la imagen del archivo'));
//                 img.src = e.target.result;
//             };
//             reader.onerror = () => reject(new Error('Error al leer el archivo'));
//             reader.readAsDataURL(file);
//         });
//     };

//     return (
//         <Grid>
//             <GridColumn width={10}>
//                 <h2>Previsualización de imagen</h2>
//                 <SemanticImage src={searchState} size="massive" wrapped />
//             </GridColumn>
//             <GridColumn width={6}>
//                 <br />
//                 <h2>Panel de Predicción</h2>
//                 <Button 
//                     className="predictImagenBtn" 
//                     onClick={handlePredict} 
//                     style={{ backgroundColor: "#B5CC18", color: "#f9fafb" }}
//                     disabled={!isModelLoaded}
//                 >
//                     Predecir
//                 </Button>
//                 <br />
//                 <br />
//                 <ShowPrediction predictedData={predictedData} />
//                 <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
//             </GridColumn>
//         </Grid>
//     );
// };

// export default Preview;




// import React, { useState, useEffect } from "react";
// import { Button, Grid, GridColumn, Image as SemanticImage } from "semantic-ui-react";
// import ShowPrediction from "./Showprediction";
// import * as tmImage from '@teachablemachine/image';
// import Swal from 'sweetalert2';

// const Preview = ({ searchState }) => {
//     const [predictedData, setPredictedData] = useState({
//         Product: "",
//         Probability: "",
//     });
//     const [model, setModel] = useState(null);
//     const [isModelLoaded, setIsModelLoaded] = useState(false);

//     useEffect(() => {
//         loadModel();
//     }, []);

//     const loadModel = async () => {
//         const URL = "https://teachablemachine.withgoogle.com/models/HgHSKPLbt/";
//         const modelURL = URL + "model.json";
//         const metadataURL = URL + "metadata.json";
        
//         try {
//             const loadedModel = await tmImage.load(modelURL, metadataURL);
//             setModel(loadedModel);
//             setIsModelLoaded(true);
//             console.log('Modelo cargado exitosamente');
//         } catch (error) {
//             console.error('Error al cargar el modelo:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error al cargar el modelo',
//                 text: 'Hubo un problema al cargar el modelo. Por favor, recarga la página.',
//             });
//         }
//     };

//     const handlePredict = async () => {
//         if (searchState === "") {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Campo vacío',
//                 text: 'Por favor, ingrese una URL o carga una imágen local.',
//             });
//             return;
//         }
    
//         if (!isModelLoaded) {
//             Swal.fire({
//                 icon: 'info',
//                 title: 'Modelo cargando',
//                 text: 'El modelo aún no ha terminado de cargar. Por favor, espere un momento.',
//             });
//             return;
//         }
    
//         try {
//             console.log('Cargando la imagen...', searchState);
//             let img;
//             if (typeof searchState === 'string') {
//                 img = await loadImage(searchState);
//             } else if (searchState instanceof File) {
//                 img = await loadImageFromFile(searchState);
//             } else {
//                 throw new Error('Tipo de searchState no válido');
//             }
    
//             console.log('Imagen cargada, procediendo con la predicción');
//             const predictions = await model.predict(img);
//             console.log('Predicciones obtenidas:', predictions);
    
//             const topPrediction = predictions.reduce((prev, current) => 
//                 (prev.probability > current.probability) ? prev : current
//             );
    
//             setPredictedData({
//                 Product: topPrediction.className,
//                 Probability: (topPrediction.probability * 10).toFixed(2),
//             });
//         } catch (error) {
//             console.error('Error detallado:', error);
//             if (error.message.includes('Error al cargar la imagen')) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error de carga',
//                     text: 'No se pudo acceder a la imagen. Por favor, verifica que la URL sea correcta y accesible.',
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error inesperado',
//                     text: `Ocurrió un error inesperado: ${error.message}`,
//                 });
//             }
//         }
//     };

//     const loadImage = (url) => {
//         return new Promise((resolve, reject) => {
//             const img = new Image();
//             img.crossOrigin = "anonymous";
//             img.onload = () => {
//                 console.log('Imagen cargada exitosamente:', url);
//                 resolve(img);
//             };
//             img.onerror = (e) => {
//                 console.error('Error al cargar la imagen:', url, e);
//                 reject(new Error(`Error al cargar la imagen: ${url}`));
//             };
//             img.src = url;
//         });
//     };

//     const loadImageFromFile = (file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const img = new Image();
//                 img.onload = () => resolve(img);
//                 img.onerror = () => reject(new Error('Error al cargar la imagen del archivo'));
//                 img.src = e.target.result;
//             };
//             reader.onerror = () => reject(new Error('Error al leer el archivo'));
//             reader.readAsDataURL(file);
//         });
//     };

//     return (
//         <Grid>
//             <GridColumn width={10}>
//                 <h2>Previsualización de imagen</h2>
//                 <SemanticImage src={searchState} size="massive" wrapped />
//             </GridColumn>
//             <GridColumn width={6}>
//                 <br />
//                 <h2>Panel de Predicción</h2>
//                 <Button 
//                     className="predictImagenBtn" 
//                     onClick={handlePredict} 
//                     style={{ backgroundColor: "#B5CC18", color: "#f9fafb" }}
//                     disabled={!isModelLoaded}
//                 >
//                     Predecir
//                 </Button>
//                 <br />
//                 <br />
//                 <ShowPrediction predictedData={predictedData} />
//                 <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
//             </GridColumn>
//         </Grid>
//     );
// };

// export default Preview;



import React, { useState, useEffect } from "react";
import { Button, Grid, GridColumn, Image as SemanticImage } from "semantic-ui-react";
import ShowPrediction from "./Showprediction";
import * as tmImage from '@teachablemachine/image';
import Swal from 'sweetalert2';

const Preview = ({ searchState }) => {
    const [predictedData, setPredictedData] = useState({
        Product: "",
        Probability: "",
    });
    const [model, setModel] = useState(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);

    useEffect(() => {
        loadModel();
    }, []);

    const loadModel = async () => {
        const URL = "https://teachablemachine.withgoogle.com/models/HgHSKPLbt/";
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        
        try {
            const loadedModel = await tmImage.load(modelURL, metadataURL);
            setModel(loadedModel);
            setIsModelLoaded(true);
            console.log('Modelo cargado exitosamente');
        } catch (error) {
            console.error('Error al cargar el modelo:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar el modelo',
                text: 'Hubo un problema al cargar el modelo. Por favor, recarga la página.',
            });
        }
    };

    const handlePredict = async () => {
        if (searchState === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Campo vacío',
                text: 'Por favor, ingrese una URL o carga una imágen local.',
            });
            return;
        }
    
        if (!isModelLoaded) {
            Swal.fire({
                icon: 'info',
                title: 'Modelo cargando',
                text: 'El modelo aún no ha terminado de cargar. Por favor, espere un momento.',
            });
            return;
        }
    
        // Mostrar alerta de carga
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor, espere mientras se procesa la imagen.',
            icon: 'success',
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        // Esperar un breve tiempo antes de comenzar la predicción
        await new Promise(resolve => setTimeout(resolve, 600)); // Retraso de 500 ms
        
        try {
            console.log('Cargando la imagen...', searchState);
            let img;
            if (typeof searchState === 'string') {
                img = await loadImage(searchState);
            } else if (searchState instanceof File) {
                img = await loadImageFromFile(searchState);
            } else {
                throw new Error('Tipo de searchState no válido');
            }
    
            console.log('Imagen cargada, procediendo con la predicción');
            const predictions = await model.predict(img);
            console.log('Predicciones obtenidas:', predictions);
    
            const topPrediction = predictions.reduce((prev, current) => 
                (prev.probability > current.probability) ? prev : current
            );
    
            setPredictedData({
                Product: topPrediction.className,
                Probability: (topPrediction.probability * 10).toFixed(2),
            });

            // Cerrar la alerta de carga
            Swal.close();
        } catch (error) {
            console.error('Error detallado:', error);
            // Cerrar la alerta de carga
            Swal.close();
            
            if (error.message.includes('Error al cargar la imagen')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de carga',
                    text: 'No se pudo acceder a la imagen. Por favor, verifica que la URL sea correcta y accesible.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error inesperado',
                    text: `Ocurrió un error inesperado: ${error.message}`,
                });
            }
        }
    };

    const loadImage = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                console.log('Imagen cargada exitosamente:', url);
                resolve(img);
            };
            img.onerror = (e) => {
                console.error('Error al cargar la imagen:', url, e);
                reject(new Error(`Error al cargar la imagen: ${url}`));
            };
            img.src = url;
        });
    };

    const loadImageFromFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error('Error al cargar la imagen del archivo'));
                img.src = e.target.result;
            };
            reader.onerror = () => reject(new Error('Error al leer el archivo'));
            reader.readAsDataURL(file);
        });
    };

    return (
        <Grid>
            <GridColumn width={10}>
                <h2>Previsualización de imagen</h2>
                <SemanticImage src={searchState} size="massive" wrapped />
            </GridColumn>
            <GridColumn width={6}>
                <br />
                <h2>Panel de Predicción</h2>
                <Button 
                    className="predictImagenBtn" 
                    onClick={handlePredict} 
                    style={{ backgroundColor: "#B5CC18", color: "#f9fafb" }}
                    disabled={!isModelLoaded}
                >
                    Predecir
                </Button>
                <br />
                <br />
                <ShowPrediction predictedData={predictedData} />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </GridColumn>
        </Grid>
    );
};

export default Preview;

