import styles from "./Events.module.css";
import Wrapper from "../../../UI/Wrapper";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
import ModalForm from "./ModalForm";

const apiUrl = 'http://localhost:1337'
const Events = () => {
  const { loading, error, data, updateData } = useFetch('http://localhost:1337/api/events?populate=*')
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error something</p>

  const headers = { "Content-Type": "application/json" };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateObject = async (data) => {
    try{
      const response = await fetch('http://localhost:1337/api/events?populate=*', {
      headers,
      method: "POST",
      body: JSON.stringify({ data: data}),
      });
      if(response.ok){
        const data = await response.json();
        console.log('Response data:', data);
        updateData(data);
      }
    }catch(error){
      console.error('event creation error', error);
    }
  };

  return (
    <div className={styles.eventPage}>
      <div className={styles.eventBar}>
        <div className={styles.eventBarContent}>
          <button onClick={handleOpenModal}  className={styles.button}>Create Event</button>
          <ModalForm isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleCreateObject}/>
        </div>
      </div>
      <Wrapper>
        {data.data.map(event => (
          <div key={event.id} className={styles.card}>
            
            <div className={styles.cardImage}>
              {event.attributes.logo.data ? (
                <img src={apiUrl + event.attributes.logo.data.attributes.formats.thumbnail.url}/>
              ) : (
                <div>No Image Available</div>
              )}
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardContentInner}>
                <div className={styles.cardTitle}>{event.attributes.title}</div>
                <small>{event.attributes.date}</small>
                <div className={styles.cardDescription}>{event.attributes.description}</div>
              </div>
            </div>
          </div>
        ))}
      </Wrapper>
    </div>
  );
};
export default Events;

{/* <td>{event.attributes.title}</td>
            <tr>{event.attributes.date}</tr>

            <tr>{event.attributes.game.data.attributes.name}</tr> */}
