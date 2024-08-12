import styles from "./ThemeContainer.module.css";
import { useSelector } from "react-redux";
function ThemeContainer({ children }) {
  const theme = useSelector((state)=> state.theme) 
  return <div class={styles[theme]}>{children}</div>;
}

export default ThemeContainer;
