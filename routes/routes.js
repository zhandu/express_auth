import express from "express";
const router = express.Router();
const {registerValidators} = require('../utils/validators')
const {loginValidators} = require('../utils/validators')

import RegisterController from "../controllers/register";
import CreateUserController from "../controllers/createUser";

import LoginController from "../controllers/login";
import LoginUserController from "../controllers/loginUser";
import LogoutUserController from "../controllers/logoutUser";

import HomeController from "../controllers/home";
import DashboardController from "../controllers/dashboard";

import auth from '../middlewares/redirectToLoginPageIfNotAuth'
import redirectToDashboardIfAuth from '../middlewares/redirectToDashboardIfAuth'

router.get("/register", redirectToDashboardIfAuth, RegisterController);
router.post("/register", registerValidators, CreateUserController);

router.get('/login', redirectToDashboardIfAuth, LoginController)
router.post('/login', loginValidators, LoginUserController)
router.get('/logout', LogoutUserController)

router.get('/', HomeController)
router.get('/dashboard', auth, DashboardController)

export default router;