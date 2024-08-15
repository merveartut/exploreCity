import logo from "./logo.svg";
import "./App.css";
import Input from "./components/Input/Input";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'mdbreact/dist/css/mdb.css';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./components/User/User";
import Users from "./components/Users/Users";
import Home from "./components/Home/Home";
import { ThemeProvider, LoginProvider } from "./context/Provider";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import ThemeContainer from "./components/ThemeContainer/ThemeContainer";
import Weather from "./components/Weather/Weather";
import SignUp from "./components/Form/SignUp/SignUp";
import Login from "./components/Form/SignIn/Login"
import List from "./components/List/List";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <ThemeProvider>
      <LoginProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeContainer>
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/themeSwitcher" element={<ThemeSwitcher />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/list/:selectedCity/:date" element={<List />} />
      </Routes>
    </BrowserRouter>
    </ThemeContainer>
    </LocalizationProvider>
    </LoginProvider>
    </ThemeProvider>
  );
}

export default App;
