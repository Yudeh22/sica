// import React from 'react';
// import CustomSidebar from './features/SideExample';
// import { Routes, Route } from 'react-router-dom';
// import ImagePredictionDashBoard from './ImagePredictionDashBoard';
// import InfoComponent from './features/info';
// import EnvivoComponent from './features/vivo';
// import EspeciesComponent from './features/especies';
// import WahooComponent from './features/infoespecies/wahoo';
// import { PatasecaComponent } from './features/infoespecies/pataseca';
// import { BarrileteComponent } from './features/infoespecies/barrilete';
// import { BonitoComponent } from './features/infoespecies/bonito';
// import { SierraComponent } from './features/infoespecies/sierra';
// import { BotellaComponent } from './features/infoespecies/botella';
// import { AletaComponent } from './features/infoespecies/aletamarilla';
// import { PatudoComponent } from './features/infoespecies/patudo';
// import LoginForm from './Sesion' 



// function App() {
//   return (
//     <div>
//       <CustomSidebar />
//       <Routes>
//         <Route exact path="/" element={<ImagePredictionDashBoard />} />
//         <Route path="/info" element={<InfoComponent />} />
//         <Route path="/envivo" element={<EnvivoComponent />} />
//         <Route path="/especies" element={<EspeciesComponent />} />
//         <Route path="/wahoo" element={<WahooComponent />} />
//         <Route path="/pataseca" element={<PatasecaComponent />} />
//         <Route path="/bonitobarrilete" element={<BarrileteComponent />} />
//         <Route path="/bonito" element={<BonitoComponent />} />
//         <Route path="/sierra" element={<SierraComponent />} />
//         <Route path="/botellagrande" element={<BotellaComponent />} />
//         <Route path="/aletaamarilla" element={<AletaComponent />} />
//         <Route path="/patudo" element={<PatudoComponent />} />
//         <Route path="/sesion" element={<LoginForm />} />




//       </Routes>
//     </div>
//   );
// }

// export default App;



import React from 'react';
import CustomSidebar from './features/SideExample';
import { Routes, Route } from 'react-router-dom';
import ImagePredictionDashBoard from './ImagePredictionDashBoard';
import InfoComponent from './features/info';
import EnvivoComponent from './features/vivo';
import EspeciesComponent from './features/especies';
import WahooComponent from './features/infoespecies/wahoo';
import { PatasecaComponent } from './features/infoespecies/pataseca';
import { BarrileteComponent } from './features/infoespecies/barrilete';
import { BonitoComponent } from './features/infoespecies/bonito';
import { SierraComponent } from './features/infoespecies/sierra';
import { BotellaComponent } from './features/infoespecies/botella';
import { AletaComponent } from './features/infoespecies/aletamarilla';
import { PatudoComponent } from './features/infoespecies/patudo';
import LoginForm from './Sesion' 



function App() {
  return (
    <div>
      <CustomSidebar />
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route exact path="/dashboard" element={<ImagePredictionDashBoard />} />
        <Route exact path="/info" element={<InfoComponent />} />
        <Route exact path="/envivo" element={<EnvivoComponent />} />
        <Route exact path="/especies" element={<EspeciesComponent />} />
        <Route exact path="/especies/wahoo" element={<WahooComponent />} />
        <Route exact path="/especies/pataseca" element={<PatasecaComponent />} />
        <Route exact path="/especies/bonitobarrilete" element={<BarrileteComponent />} />
        <Route exact path="/especies/bonito" element={<BonitoComponent />} />
        <Route exact path="/especies/sierra" element={<SierraComponent />} />
        <Route exact path="/especies/botellagrande" element={<BotellaComponent />} />
        <Route exact path="/especies/aletaamarilla" element={<AletaComponent />} />
        <Route exact path="/especies/patudo" element={<PatudoComponent />} />
        {/* <Route path="/sesion" element={<LoginForm />} /> */}

      </Routes>
    </div>
  );
}

export default App;





