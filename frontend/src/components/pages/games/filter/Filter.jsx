import { useState } from "react";
import Checkbox from "./Checkbox";


const Filter = () => {
  const [likings, setLikings] = useState("") 
  const [categories, setCategories] = useState([ {
    'Board games': false, 
    'Card games': false, 
    'Cooperative games': false, 
    'Party games': false, 
    'War games': false, 
    'Strategy games': false} ]);

  const [players, setPlayers] = useState([2])

  function toggleCategorie(categorie) { 
  
    categories[categorie] = !categories[categorie]; 
    
    let newLikings = ""; 
    for ( var categorie in categories ) { 
      if ( categories[categorie] ) { 
        newLikings += categorie + " "; 
      } 
    } 
    
    setLikings(newLikings); 
  } 

  return (
    <div>
      <h2>Categories</h2>
      <Checkbox toggleCategorie={toggleCategorie} categorie="Board games" /> 
      <Checkbox toggleCategorie={toggleCategorie} categorie="Card games" /> 
      <Checkbox toggleCategorie={toggleCategorie} categorie="Cooperative games" /> 
      <Checkbox toggleCategorie={toggleCategorie} categorie="Party games" /> 
      <Checkbox toggleCategorie={toggleCategorie} categorie="War games" /> 
      <Checkbox toggleCategorie={toggleCategorie} categorie="Strategy games" /> 

      {/* <h1> My analysis of you: You like {likings} </h1>  */}
    </div>
  );
};

export default Filter;