// Primer Codigo
// import React, {useState} from "react";
// import{Grid, GridColumn, Input, Label} from "semantic-ui-react";

// const SearchBox = ({setSearchState}) => {
//     const [inputUrl, setInputUrl] = useState("");
//     const handleChange = function(e){
//         setSearchState(e.target.value);
//         setInputUrl(e.target.value);
//     };
//     const handleClear = function(){};
//     return (
//         <Grid>
//             <GridColumn width={7}>
//                 <Input
//                     fluid
//                     value={inputUrl}
//                     icon='search'
//                     iconPosition="left"
//                     className='search-bar'
//                     placeholder='Buscar...'
//                     onChange={handleChange.bind(this)}
//                     action={{
//                         icon: "delete",
//                         onClick: (event, data) => {
//                             handleClear(event, data);
//                         },
//                     }}
//                 />
//                 <Label pointing className='pointedLabel'>
//                     Ingrese el link {" "}
//                 </Label>
//             </GridColumn>
//         </Grid>
//     );
// };

// export default SearchBox;



// Segundo Codigo

// import React, { useState } from "react";
// import { Grid, GridColumn, Input, Label } from "semantic-ui-react";

// const SearchBox = ({ setSearchState }) => {
//   const [inputUrl, setInputUrl] = useState("");
  
//   const handleChange = (e) => {
//     setSearchState(e.target.value);
//     setInputUrl(e.target.value);
//   };
  
//   const handleClear = () => {
//     setSearchState("");
//     setInputUrl("");
//   };
  
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
    
//     reader.onload = (event) => {
//       setSearchState(event.target.result);
//       setInputUrl("");
//     };
    
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Grid>
//       <GridColumn width={7}>
//         <Input
//           fluid
//           value={inputUrl}
//           icon="search"
//           iconPosition="left"
//           className="search-bar"
//           placeholder="Buscar..."
//           onChange={handleChange}
//           action={{
//             icon: "delete",
//             onClick: handleClear,
//           }}
//         />
//         <Label pointing className="pointedLabel">
//           Ingrese el link
//         </Label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           style={{ marginTop: "20px" }}
//         />
//       </GridColumn>
//     </Grid>
//   );
// };

// export default SearchBox;




import React, { useState } from "react";
import { Grid, GridColumn, Input, Label, Button } from "semantic-ui-react";

const SearchBox = ({ setSearchState }) => {
  const [inputUrl, setInputUrl] = useState("");

  const handleChange = (e) => {
    setSearchState(e.target.value);
    setInputUrl(e.target.value);
  };

  const handleClear = () => {
    setSearchState("");
    setInputUrl("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setSearchState(event.target.result);
      setInputUrl("");
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Grid stackable columns={2}>
      <GridColumn width={8}>
        <Input
          fluid
          value={inputUrl}
          icon="search"
          iconPosition="left"
          className="search-bar"
          placeholder="Buscar..."
          onChange={handleChange}
          action={{
            icon: "delete",
            onClick: handleClear,
          }}
        />

        <Label pointing="above" className="pointedLabel" style={{ backgroundColor: "#14539A", color: '#f9fafb'}}>
          Ingrese una URL
        </Label>


      </GridColumn>
      <GridColumn width={6} textAlign="center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label htmlFor="fileInput" style={{ marginLeft: "10px" }}>
          <Button
            as="div"
            labelPosition="right"
            content="Subir imagen"
            icon="file"
            onClick={() => {}}
            color="olive"
          />
        </label>
      </GridColumn>
    </Grid>
  );
};

export default SearchBox;

