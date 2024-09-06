import React from 'react'
import styles from "./CardGroup.module.css"

function Rating({rating, ratingLabel}) {

  return (
    <div>
        <row className={styles.ratingRow}>
        <div className={styles.rating}>{rating}</div>
        <div className={styles.ratingLabel}> {ratingLabel}</div>
        </row>
       
    </div>
  )
}

export default Rating