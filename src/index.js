// import React from 'react';
// // import './index.css';
// // import App from './App';
// import ReactDOM from 'react-dom';
// import App from './app/layout/App.jsx';
// import reportWebVitals from './reportWebVitals';
// // import "semantic-ui-react";
// import 'semantic-ui-css/semantic.min.css';


// const rootEl = document.getElementById("root");
// function render(){
//   ReactDOM.render(<App/>, rootEl);
// }


// if (module.hot) {
//   module.hot.accept("./app/layout/App.jsx", ()=>{
//     setTimeout(render);
//   });
// }
// render();


// // const root = ReactDOM.createRoot(document.getElementById('root'));

// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );



// reportWebVitals();



import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';  
import App from './app/layout/App.jsx';

// Envolver App con BrowserRouter
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, 
  document.getElementById('root')
);

// Resto del código...

if (module.hot) {
  module.hot.accept("./app/layout/App.jsx", () => {
    // renderizar de nuevo al hacer cambios
  }); 
}