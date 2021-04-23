import React from 'react';
import styles from './meetupDetail.module.css';

function MeetupDetail(props) {
    return (
        <div className={styles.details}>
            <img src={props.image} alt="pic" />
            <h2>{props.title}</h2>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </div>
    );
}

export default MeetupDetail;