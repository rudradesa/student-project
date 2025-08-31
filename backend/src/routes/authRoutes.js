import express from 'express';
import { getUserFromTokenController, login, register } from '../controller/authController.js';



const routes=express.Router();

routes.post('/register-user',register);
routes.post('/login-user',login);
routes.get('/me',getUserFromTokenController)


export default routes;