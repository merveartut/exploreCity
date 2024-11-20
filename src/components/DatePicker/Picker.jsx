import React from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { DateRangePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import styles from "./Picker.module.css"
function Picker({dateValue, onSelectDate}) {
  return (
    <div>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
         <DateRangePicker 
         className={styles.picker} 
         localeText={{ start: 'Start date', end: 'End date' }}
         value={dateValue}
         onChange={(newValue) => onSelectDate(newValue)}
         />
         {/* </LocalizationProvider> */}
    </div>
  )
}

export default Picker