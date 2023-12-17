/**
 * Author: Anvar Kilybayev
 * Login: xkilyb00
 * Date: 17.12.2023
 * 
 */

import React, { useState, useEffect } from 'react';
import styles from './ModalFormUpdate.module.css';

const ModalFormUpdate = ({ isOpen, onClose, onSubmit, eventData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    // ... add other fields
  });

  useEffect(() => {
    // Populate the form data when eventData changes (for editing)
    if (eventData) {
      setFormData({
        title: eventData.attributes.title,
        description: eventData.attributes.description,
        date: eventData.attributes.date,
        // ... populate other fields
      });
    }
  }, [eventData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
    <div className={styles.formWrapper}>

      <div className={styles.modal}>
        <span className={styles.modalClose} onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <ul className={styles.formLabel}>Edit event</ul>
          </div>
          <div className={styles.formField}>
            <label htmlFor='title'/>
              <input type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder='Enter new events title' 
                className={styles.title}/>
          </div>
          <div className={styles.formField}>
          <label htmlFor='description'/>
              <textarea type="text" 
                name="description"
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder='Description' 
                className={styles.description}/>
          </div>
          <div className={styles.formField}>
              <label htmlFor='date'></label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={styles.date}
              />
            </div>
          <div className={styles.formField}>
            <button type="submit" className={styles.button}>Submit</button>
          </div>
        </form>
      </div>

    </div>
    </div>
  );
};

export default ModalFormUpdate;
