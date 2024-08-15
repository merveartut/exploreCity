import React from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import styles from "./Picker.module.css"
function Picker({dateValue, onSelectDate}) {
  return (
    <div>
         <DateRangePicker 
         className={styles.picker} 
         localeText={{ start: 'Start date', end: 'End date' }}
         value={dateValue}
         onChange={(newValue) => onSelectDate(newValue)}
         />
    </div>
  )
}

export default Picker