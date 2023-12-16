import styles from "./Filter.module.css";
import React, { useState } from 'react';

function Filter(props) {

    const handleChangeText = props.handleChangeText;
    const handleKeyDown = props.handleKeyDown;
    const handleChange = props.handleChange;
    const handleClean = props.handleClean;
    const message = props.message;
    const value = props.value;
    const cbvalue = props.cbvalue;

    return (
        <div className={styles.filter}>
            <div>
                Find the game:
                <div>
                    <input type="text" placeholder="Game's title" value={message} onChange={handleChangeText} onKeyDown={handleKeyDown}/>
                </div>
            </div>
        
            <div className={styles.part}>
                Category:
                <div className={styles.category}>
                    <div>
                        <input type="checkbox" id="Party" onChange={handleChange} checked={cbvalue["Party"]}/> Party game
                    </div>
                    <div>
                        <input type="checkbox" id="Card" onChange={handleChange} checked={cbvalue["Card"]}/> Card game
                    </div>
                    <div>
                        <input type="checkbox" id="Cooperative" onChange={handleChange} checked={cbvalue["Cooperative"]}/> Cooperative game
                    </div>
                    <div>
                        <input type="checkbox" id="Strategy" onChange={handleChange} checked={cbvalue["Strategy"]}/> Strategy game
                    </div>
                </div>
            </div>

            <div className={styles.part}>
                Players:
                <div>
                    <input type="range" id="range" className={styles.range} min={0} max={6} value={value} onChange={handleChange}/>
                </div>
                <div className={styles.numbers}>
                    <span>Any</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>More</span>
                </div>
            </div>

            <div className={styles.part}>
                <button className={styles.btnClear} onClick={handleClean}>Clear</button>
            </div>
        </div>
    );
}

export default Filter;