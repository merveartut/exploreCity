import React, { useState } from "react";
import styles from "./styles.module.css"

function Input() {
  const [form, setForm] = useState({name: "", surname: ""});
  const onChangeInput = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  return (
    <div className={styles.text}>
      Enter name: <br/>
      <input className={styles.text} name="name" value={form.name} onChange={onChangeInput}></input> <br/>
      Enter surname: <br/>
      <input name="surname" value={form.surname} onChange={onChangeInput}></input> <br/>

      {form.name} {form.surname}
    </div>
  );
}

export default Input;
