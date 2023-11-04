import { useState } from "react";

function Checkbox(props) { 

    const [checked, setChecked] = useState(false); 
    const toggleCategorie = props.toggleCategorie;
    const categorie = props.categorie; 

    const handleChange = () => { 
      setChecked(!checked); 
      toggleCategorie(categorie); 
    }; 
    
    return ( 
      <div> 
        <input type="checkbox" name={props.name} onChange={handleChange}/> {categorie}
      </div> 
    ); 
    
  };

export default Checkbox;