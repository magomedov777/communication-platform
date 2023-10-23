import React from "react";
import styles from "./Preloader.module.scss"

export const Preloader = () => {
    return (
        <div className={styles.preloaderContainer}>
            <div className={styles.preloaderBlock}>
                <span className={styles.loader}></span>
            </div>
        </div>
    )
}
