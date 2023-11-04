import styles from "./Games.module.css";
import Checkbox from "./filter/Checkbox";
import Game from "./game/Game";
import { useState } from "react";

const Games = () => {
  const [filter, setFilter] = useState("") 
  const [categories, setCategories] = useState([ {
    'Board games': false, 
    'Card games': false, 
    'Cooperative games': false, 
    'Party games': false, 
    'War games': false, 
    'Strategy games': false} ]);
  const [finder, setFinder] = useState("")
  const [games, setGames] = useState([
    {title: 'Game 1'},
    {title: 'Game 2'},
    {title: 'Game 3'},
    {title: 'Game 4'},
    {title: 'Game 5'},
    {title: 'Game 6'},
    {title: 'Game 7'},
    {title: 'Game 8'},
    {title: 'Game 9'} ])
  
  function toggleCategorie(categorie) { 
  
    categories[categorie] = !categories[categorie]; 
    
    let newLikings = ""; 
    for ( var categorie in categories ) { 
      if ( categories[categorie] ) { 
        newLikings += categorie + " "; 
      } 
    } 
    
    setFilter(newLikings); 
  } 

  return (
    <div className={styles.row}>
      <div className={`${styles.column} ${styles.filter}`}>
        <h2>Find a game</h2>
        <div><input type="text" value={finder} onChange={event => setFinder(event.target.value)}/></div>
        <h2>Categories</h2>
        <Checkbox toggleCategorie={toggleCategorie} categorie="Board games" /> 
        <Checkbox toggleCategorie={toggleCategorie} categorie="Card games" /> 
        <Checkbox toggleCategorie={toggleCategorie} categorie="Cooperative games" /> 
        <Checkbox toggleCategorie={toggleCategorie} categorie="Party games" /> 
        <Checkbox toggleCategorie={toggleCategorie} categorie="War games" /> 
        <Checkbox toggleCategorie={toggleCategorie} categorie="Strategy games" /> 
      </div>

      <div className={`${styles.column} ${styles.games}`}> 
        {games.map(game => 
          <Game game = {game}/>
        )}
      </div>
    </div>
  );
};
export default Games;