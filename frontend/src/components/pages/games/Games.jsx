import styles from "./Games.module.css";
import useFetch from "../../../../hooks/useFetch";
import Filter from "./Filter";
import Card from "./Card";
import { useState, useContext, createContext } from "react";

const apiUrl = 'http://localhost:1337/api/games?populate=*'

const Games = () => {
  const { loading, error, data, updateData } = useFetch(apiUrl)
  const [categories, setCategories] = useState({
    'card': false, 
    'cooperative': false, 
    'party': false, 
    'strategy': false});
  const [message, setMessage] = useState('');
  const [updated, setUpdated] = useState('');
  const [range, setRange] = useState(0);
  const [page, setPage] = useState(1);
  const headers = { "Content-Type": "application/json" };
  
  let itemsToDisplay;
  try {
    itemsToDisplay = data.data.slice(page*8-8, page*8);
  } catch {

  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Sorry, we have a problem.</p>
  
  const handlePage = (event) => {
    console.log(event.target.id);
    if (event.target.id === "next") {
      setPage(page + 1);
    } else if (event.target.id === "before") {
      setPage(page - 1);
    } else {
      setPage(parseInt(event.target.id));
    }
  };

  const handleChangeText = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = async (data) => {

    if (data.key === 'Enter') {
      let cmd = '';
      if (message !== "") {
        setUpdated(message);
        cmd = '&filters[title][$eq]=' + message;
        setMessage('');
      }

      for ( var category in categories ) 
        categories[category] = false;
      setCategories(categories);

      setRange(0);

      try{
        const response = await fetch(apiUrl + cmd, {
          headers,
          method: "GET",
          body: null,
        });
  
        if(response.ok){
          const data = await response.json();
          updateData(data);
        }
      }catch(error){
        console.error('event creation error', error);
      }
    }
  };

  const handleChange = async (data) => {

    let v = range;
    if (data.target.id === "range") {
      v = parseInt(data.target.value, 10);
      setRange(parseInt(data.target.value, 10));
    } else {
      categories[data.target.id] = !categories[data.target.id]; 
    }

    setMessage('');
    let cmd = ""
    for ( var category in categories ) { 
      if (categories[category]) { 
        cmd += '&filters[categories][$eq]=' + category;
      } 
    }
    
    if (v !== 0) {
      cmd += '&filters[$and][0][min_players][$lte]='+v+'&filters[$and][1][max_players][$gte]='+v;
    }
    console.log(cmd);

    try{
      const response = await fetch(apiUrl + cmd, {
        headers,
        method: "GET",
        body: null,
      });

      if(response.ok){
        const data = await response.json();
        updateData(data);
      }
    }catch(error){
      console.error('event creation error', error);
    }
  };

  const handleClean = async (data) => {
    setMessage('');
    setRange(0);

    for ( var category in categories ) 
      categories[category] = false;
    setCategories(categories);

    try{
      const response = await fetch(apiUrl, {
        headers,
        method: "GET",
        body: null,
      });

      if(response.ok){
        const data = await response.json();
        updateData(data);
      }
    }catch(error){
      console.error('event creation error', error);
    }
  }

  return (
    <div className={styles.all}>
      <div className={styles.filter}>
        <Filter handleChangeText={handleChangeText} handleKeyDown={handleKeyDown} handleChange={handleChange} handleClean={handleClean} message={message} value={range} cbvalue={categories}></Filter>
      </div>

      {data.data.length ?
        <div>
          <div className={styles.games}>
            {itemsToDisplay.map(game => (
              <Card game={game} upData={handleChange} key={game.id}/>
            ))}
          </div>
          <div className={styles.pages}>
            {page !== 1 ?
            <button id="before" type="button" onClick={handlePage} className={styles.page}>Before</button>
            :
            <div></div>
            }

            {page-2 > 0 ?
            <button id={page-2} type="button" onClick={handlePage} className={styles.page}>{page-2}</button>
            :
            <div></div>
            }

            {page-1 > 0 ?
            <button id={page-1} type="button" onClick={handlePage} className={styles.page}>{page-1}</button>
            :
            <div></div>
            }

            <button id="before" type="button" onClick={handlePage} className={styles.page} disabled>{page}</button>

            {page+1 <= Math.ceil(data.data.length/8) ?
            <button id={page+1} type="button" onClick={handlePage} className={styles.page}>{page+1}</button>
            :
            <div></div>
            }

            {page+2 <= Math.ceil(data.data.length/8) ?
            <button id={page+2} type="button" onClick={handlePage} className={styles.page}>{page+2}</button>
            :
            <div></div>
            }

            {page !== Math.ceil(data.data.length/8) ?
            <button id="next" type="button" onClick={handlePage} className={styles.page}>Next</button>
            :
            <div></div>
            }
          </div>
        </div>
      :
        <p className={styles.games}> We don't found any game. </p>
      }

      <div>

      </div>

    </div>
  );
};
export default Games;