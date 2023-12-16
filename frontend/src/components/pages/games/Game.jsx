import { Link, useParams } from 'react-router-dom';
import useFetch from "../../../../hooks/useFetch";
import styles from './Game.module.css';
import { useState, useContext, createContext } from "react";
import { CartContext } from "../../../App";

const apiUrl = 'http://localhost:1337/api/games/'
const headers = { "Content-Type": "application/json" };

const Game = () => {
    const { id } = useParams()
    const [full, setFull] = useState(false)
    const [txt, setTxt] = useState('')
    const [more, setMore] = useState('More')
    const {cart, cartTrue} = useContext(CartContext);
    const { loading, error, data, updateData } = useFetch(apiUrl + id + '?populate=*')    

    if (loading) return <p>Loading...</p>
    if (error) return <p>Sorry, we have a problem.</p>

    const buttonFunction = () => {
        if (full) {
            setMore('More')
        } else{
            setMore('Less')
        }
        setFull(!full);
    };

    const handleChangeText = (event) => {
        setTxt(event.target.value);
    };

    const sendmsg = async (data) => {
        if (txt != '') 
            try{
                const response1 = await fetch('http://localhost:1337/api/comments', {
                    headers, 
                    method: "POST",
                    body: JSON.stringify({
                        data: {
                            user: "Ivan Golikov",
                            game: {
                                connect: [id]
                            },
                            text: txt
                        }
                    })
                });
                const data1 = await response1.json();
                setTxt('')

                await fetch('http://localhost:1337/api/games/'+id, {
                    headers, 
                    method: "PUT",
                    body: JSON.stringify({
                        data: {
                            comments:{
                                connect: [
                                    { id: data1.data.id, position: { start: true } }
                                ]
                            }
                        }
                    })
                });

                const response2 = await fetch(apiUrl + id + '?populate=*' , {
                    headers,
                    method: "GET",
                    body: null,
                });
            
                if(response2.ok){
                    const data = await response2.json();
                    updateData(data);
                }

            } catch(error) {
                console.error('event creation error', error);
            }
    };

    const addGameToCart = async (data) => {
        try {
            const response = await fetch('http://localhost:1337/api/carts?populate=*&filters[games][id][$eq]='+id+'&filters[user][id][$eq]=1', {
                headers,
                method: "GET",
                body: null,
            });
            const response2 = await fetch('http://localhost:1337/api/carts/1', {
                headers,
                method: "GET",
                body: null,
            });

            if(response.ok){
                const dataR = await response.json();
                const dataR2 = await response2.json();

                console.log(dataR)
                if (!dataR.data.length) {
                    console.log(dataR2)
                    await fetch('http://localhost:1337/api/carts/1', {
                        headers, 
                        method: "PUT",
                        body: JSON.stringify({
                            data: {
                                user: {
                                    connect: [1]
                                },
                                games: {
                                    connect: [id]
                                },
                                totalprice: parseInt(dataR2.data.attributes.totalprice)+parseInt(data.target.value)
                            }
                        })
                    });
                }
                cartTrue();
            }

        } catch(error){
            console.error('event creation error', error);
        }
    }

    return (
        <div className={styles.all}>
            <div>
                <div className={styles.image}>
                    {data.data.attributes.photo.data ? (
                        <img className={styles.imageInner} src={'http://localhost:1337' + data.data.attributes.photo.data.attributes.formats.thumbnail.url}/>
                    ) : (
                        <div>No Image Available</div>
                    )}

                    {data.data.attributes.count !== 0 ?
                        <button id={data.data.attributes.id} value={data.data.attributes.price} className={styles.btncart} onClick={addGameToCart}> {data.data.attributes.price} CZK </button> :
                        <button id={data.data.attributes.id} className={styles.btn_none}> Not available </button>
                    }
                </div>

                <div className={styles.info}>
                    <div className={styles.data}>
                        Title: {data.data.attributes.title}
                    </div>

                    <div className={styles.data}>
                        Genre: {data.data.attributes.categories} game
                    </div>

                    <div className={styles.data}>
                        Players: {data.data.attributes.min_players} - {data.data.attributes.max_players} 
                    </div>

                    <div className={styles.data}>
                        Time: {data.data.attributes.min_time} - {data.data.attributes.max_time}
                    </div>

                    <div>
                        {full ? 
                            <div className={styles.desc}> {data.data.attributes.description} </div>
                            : 
                            <div className={styles.desc}> {data.data.attributes.description.slice(0, 300)}... </div>
                        }

                        <button onClick={buttonFunction} className={styles.btn}>{more}</button>
                    </div>
                        
                </div>
            </div>
                    
            <div className={styles.comments_block}>
                Comments:

                <div className={styles.inputField}>
                    <textarea name="newcomment" id="newcomment" cols="150" rows="2" placeholder='Type your comment...' value={txt} onChange={handleChangeText}></textarea>
                    <button onClick={sendmsg} className={styles.sendmsg}>Send</button>
                </div>
                
                {data.data.attributes.comments.data.map(comment => (
                    <div key={comment.id} className={styles.comment}>
                        <div className={styles.user}>
                            {comment.attributes.user}
                        </div>
                        <div className={styles.text}>
                            {comment.attributes.text} 
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Game;
