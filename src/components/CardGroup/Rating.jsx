import React from 'react'
import styles from "./CardGroup.module.css"

function Rating({rating}) {
const getLabel = (rating) => {
    switch (true) {
        case (rating <= 5 && rating > 4.2):
            return "Perfect";
        case (rating <= 4.2 && rating > 3.9):
            return "Good";
        case (rating <= 3.9 && rating > 3):
            return "Poor";
        case (rating <= 3 && rating >= 0):
            return "Bad";
        default:
            return "Invalid rating";
    }
}
  return (
    <div>
        <row className={styles.ratingRow}>
        <div className={styles.rating}>{rating}</div>
        <div className={styles.ratingLabel}> {getLabel(rating)}</div>
        </row>
       
    </div>
  )
}

export default Rating