import React from 'react';
import styles from './loader.module.css';

export default function Loader() {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: "center", alignItems: 'center', backdropFilter: 'blur(10px)' }}>
        <div className={styles.ripple}><div></div><div></div></div>
    </div>
}