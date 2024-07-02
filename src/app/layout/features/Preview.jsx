// import React, { useState } from "react";
// import {Button, Grid, GridColumn, Image} from "semantic-ui-react";
// import ShowPrediction from "./Showprediction";


// const Preview = ({searchState}) => {
//     const [predictedData, setPredictedData] = useState({
//         Product: "",
//         Probability:"", 
//     });
//     const handlePredict = function () {
//         if (searchState === "") {
//             return;
//         }
//         console.log(searchState);
    
//         const data = {
//             ImageUrl: searchState,
//         };
    
//         const requestOptions = {
//             method: "POST",
//             Accept: "application/json",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data),
//             mode: "cors",
//         };
    
//         fetch("http://localhost:5000/image/classify", requestOptions).then(
//             (response) => {
//                 if (response.status !== 200) {
//                     setPredictedData({
//                         Product: "No entendí, intentalo de nuevo! :(  ",
//                         Probability: 0,
//                     });
//                     console.log("Something went wrong");
//                 } else {
//                     response.json().then((data) => {
//                         debugger;
//                         setPredictedData({
//                             Product: data[0].class,
//                             Probability: data[0].score,
//                         });
//                     });
//                 }
//             });
//     };
//     return (
//         <Grid>
//             <GridColumn width={10}>
//                 <h2>Previsualización de imágen</h2>
//                 <Image src={searchState}  size='massive' wrapped />
//             </GridColumn>
//             <GridColumn width={6}>
//                 <br/>
//                <h2> Panel de Predicción</h2> 
//                <Button className= 'predictImagenBtn' onClick={handlePredict}>
//                     Predecir
//                 </Button>
//                 <br/><br/>
//                 <ShowPrediction predictedData={predictedData} />
//             </GridColumn>
//         </Grid>
//     );
// };

// export default Preview;




// import React, { useState } from "react";
// import { Button, Grid, GridColumn, Image } from "semantic-ui-react";
// import ShowPrediction from "./Showprediction";

// const Preview = ({ searchState }) => {
//     const [predictedData, setPredictedData] = useState({
//         Product: "",
//         Probability: "",
//     });

//     const handlePredict = function () {
//         if (searchState === "") {
//             return;
//         }
//         console.log(searchState);

//         const data = {
//             ImageUrl: searchState,
//         };

//         const requestOptions = {
//             method: "POST",
//             Accept: "application/json",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data),
//             mode: "cors",
//         };

//         fetch("http://localhost:5000/", requestOptions)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setPredictedData({
//                     Product: data[0].class,
//                     Probability: data[0].score,
//                 });
//             })
//             .catch((error) => {
//                 if (error.message === 'Failed to fetch') {
//                     // alert('Ocurrió un error al procesar la imagen. Por favor, asegurate de cargar una imagen y que no exceda el tamaño permitido.');
//                     alert('Ocurrió un error al procesar la imagen. Por favor, asegúrate de cargar una imagen y que no exceda el tamaño permitido.\n\n El tamaño recomendado es de 650*361 px o 311*450 px.');

//                 } else {
//                     console.error('Ups ah ocurrido un error:', error);
//                 }
//             });
//     };

//     return (
//         <Grid>
//             <GridColumn width={10}>
//                 <h2>Previsualización de imágen</h2>
//                 <Image src={searchState} size="massive" wrapped />
//             </GridColumn>
//             <GridColumn width={6}>
//                 <br />
//                 <h2>Panel de Predicciónn</h2>
//                 <Button className="predictImagenBtn" onClick={handlePredict} style={{ backgroundColor: "#B5CC18", color: "#f9fafb" }}>
//                     Predecir
//                 </Button>
//                 <br />
//                 <br />
//                 <ShowPrediction predictedData={predictedData} />
//             </GridColumn>
//             <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
//             <br/><br/><br/><br/><br/><br/><br/><br/>



//         </Grid>
        
//     );
// };

// export default Preview;



import React, { useState, useEffect } from "react";
import { Button, Grid, GridColumn, Image as SemanticImage } from "semantic-ui-react";
import ShowPrediction from "./Showprediction";
import * as tmImage from '@teachablemachine/image';

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
            alert('Hubo un problema al cargar el modelo. Por favor, recarga la página.');
        }
    };

    const handlePredict = async () => {
        if (searchState === "") {
            alert('Por favor, ingrese una URL de imagen o seleccione un archivo.');
            return;
        }
    
        if (!isModelLoaded) {
            alert('El modelo aún no ha terminado de cargar. Por favor, espere un momento.');
            return;
        }
    
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
        } catch (error) {
            console.error('Error detallado:', error);
            if (error.message.includes('Error al cargar la imagen')) {
                alert('No se pudo cargar la imagen. Por favor, verifica que la URL sea correcta y accesible, o que el archivo seleccionado sea una imagen válida.');
            } else {
                alert(`Ocurrió un error inesperado: ${error.message}`);
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
//             let img;
//             if (typeof searchState === 'string') {
//                 img = await loadImage(searchState);
//             } else if (searchState instanceof File) {
//                 img = await loadImageFromFile(searchState);
//             } else {
//                 throw new Error('Tipo de searchState no válido');
//             }

//             const predictions = await model.predict(img);
//             const topPrediction = predictions.reduce((prev, current) => 
//                 (prev.probability > current.probability) ? prev : current
//             );

//             setPredictedData({
//                 Product: topPrediction.className,
//                 Probability: (topPrediction.probability * 100).toFixed(2),
//             });
//         } catch (error) {
//             console.error('Error al procesar la imagen:', error);
//             alert('Ocurrió un error al procesar la imagen. Por favor, asegúrate de que la URL de la imagen sea válida y accesible, o que el archivo seleccionado sea una imagen válida.');
//         }
//     };

//     const loadImage = (url) => {
//         return new Promise((resolve, reject) => {
//             const img = new Image();
//             img.crossOrigin = "anonymous";
//             img.onload = () => resolve(img);
//             img.onerror = () => reject(new Error('Error al cargar la imagen'));
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
//             </GridColumn>
//         </Grid>
//     );
// };

// export default Preview;