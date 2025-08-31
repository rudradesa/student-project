
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

const User =lazy(()=>import('./pages/User'))
const Login =lazy(()=>import('./pages/Login'))
const Register =lazy(()=>import('./pages/Register'))
const HomeScreen =lazy(()=>import('./pages/UserHomeScreen'))
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Suspense fallback={<div>Loding...</div>}>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/homescrenn' element={<HomeScreen/>}/>
        <Route path='/user'element={<User/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/register'element={<Register/>}/>
        <Route path='*' element={<NotFound/>}/>
     </Routes>
      </Suspense>
      <ToastContainer
        position='top-center'
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick
        theme='colored'
      />
     </BrowserRouter>
    </div>
  );
}

export default App;
