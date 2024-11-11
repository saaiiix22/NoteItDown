import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
<>
    <App />
    <ToastContainer />
</>

)