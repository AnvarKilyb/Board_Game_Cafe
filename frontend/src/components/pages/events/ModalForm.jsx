import React, { useState, useCallback } from 'react';
import styles from "./ModalForm.module.css";

function ModalForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    // ... другие поля
  });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };
  
  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

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
            <ul className={styles.formLabel}>Create Event</ul>
          </div>
          <div className={styles.formField}>
            <label htmlFor='title'/>
              <input type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder='Enter events title' 
                className={styles.title}/>
          </div>
          <div className={styles.formField}>
          <label htmlFor='description'/>
              <input type="text" 
                name="description"
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder='Description' 
                className={styles.description}/>
          </div>
          {/* Добавьте другие поля формы */}
          <div className={styles.formField}>
            <button type="submit" className={styles.button}>Submit</button>
          </div>
        </form>
      </div>

    </div>
    </div>
  );
}

export default ModalForm;
