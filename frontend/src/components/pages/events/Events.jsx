/**
 * Author: Anvar Kilybayev
 * Login: xkilyb00
 * Date: 17.12.2023
 * 
 */

import styles from "./Events.module.css";
import Wrapper from "../../../UI/Wrapper";
import useFetch from "../../../hooks/useFetch";
import altEventImage from '../../../assets/alt-event.jpg';
import { useState } from "react";
import ModalForm from "./ModalForm";
import ModalFormUpdate from "./ModalFormUpdate"

const apiUrl = 'http://localhost:1337'
const Events = () => {
  const { loading, error, data, updateData } = useFetch('http://localhost:1337/api/events?populate=*')
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error something</p>

  const headers = { "Content-Type": "application/json" };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModalUpdate = () => {
    setIsModalUpdateOpen(true);
    setSelectedEvent(null);
  };

  const handleCloseModalUpdate = () => {
    setIsModalUpdateOpen(false);
    setSelectedEvent(null);
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setIsModalUpdateOpen(true);
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

  const handleUpdateObject = async (data) => {
    try {
      const url = selectedEvent ? `${apiUrl}/api/events/${selectedEvent.id}` : `${apiUrl}/api/events`;
      const method = selectedEvent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        headers,
        method,
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response data:', responseData);
        updateData(responseData);
        handleCloseModal();
      }
    } catch (error) {
      console.error('Event creation or update error', error);
    }
  };
  return (
    <div className={styles.eventPage}>
      <div className={styles.eventBar}>
        <div className={styles.eventBarContent}>
          <button onClick={handleOpenModal}  className={styles.button}>Create Event</button>
          <ModalForm isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleCreateObject}/>
          <ModalFormUpdate isOpen={isModalUpdateOpen} 
            onClose={handleCloseModalUpdate} onSubmit={handleUpdateObject} eventData={selectedEvent} />
        </div>
      </div>
      <Wrapper>
        {data.data.map(event => (
          <div key={event.id} className={styles.card}>
            
            <div className={styles.cardImage}>
              {event.attributes.logo.data ? (
                <img src={apiUrl + event.attributes.logo.data.attributes.formats.medium.url}/>
              ) : (
                <img src={altEventImage}/>
              )}
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardContentInner}>
                <div className={styles.cardTitle}>{event.attributes.title}</div>
                <small>{event.attributes.date}</small>
                <div className={styles.cardDescription}>{event.attributes.description}</div>
                <button className={styles.cardButton}  onClick={() => handleEditClick(event)}>
                  Edit
                  </button>
              </div>
            </div>
          </div>
        ))}
      </Wrapper>
    </div>
  );
};
export default Events;