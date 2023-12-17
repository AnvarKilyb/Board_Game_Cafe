// Author: Ivan Golikov (xgolik00)

import styles from "./Card.module.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../App";

const headers = { "Content-Type": "application/json" };

function Card(props) {

    const localhost = 'http://localhost:1337';
    const game = props.game;
    const {cart, cartTrue} = useContext(CartContext);

    const addGameToCart = async (data) => {
        try {
            const response = await fetch('http://localhost:1337/api/carts?populate=*&filters[games][id][$eq]='+game.id+'&filters[user][id][$eq]=1', {
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
                const data = await response.json();
                const data2 = await response2.json();

                if (!data.data.length) {
                    await fetch('http://localhost:1337/api/carts/1', {
                        headers, 
                        method: "PUT",
                        body: JSON.stringify({
                            data: {
                                user: {
                                    connect: [1]
                                },
                                games: {
                                    connect: [game.id]
                                },
                                totalprice: data2.data.attributes.totalprice+game.attributes.price
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
        <div key={game.id} className={styles.card}>
            <div className={styles.uppart}>
                <Link to={`/games/${game.id}`} className={styles.link} key={game.id}>
                    <div className={styles.inner}>

                        <div className={styles.image}>
                        {game.attributes.photo.data ? (
                            <img className={styles.imageInner} src={localhost + game.attributes.photo.data.attributes.formats.thumbnail.url}/>
                        ) : (
                            <div>No Image Available</div>
                        )}
                        </div>

                        <div className={styles.title} >
                            {game.attributes.title}
                        </div>

                    </div>
                </Link>
            </div>
            <div>
                {game.attributes.count !== 0 ?
                    <button id={game.id} className={styles.btn} onClick={addGameToCart}> {game.attributes.price} CZK </button> :
                    <button id={game.id} className={styles.btn_none}> Not available </button>
                }
            </div>
        </div>
    );
}

export default Card;
