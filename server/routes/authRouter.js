import express from "express"
import Router from 'express'
import AuthController from '../Controllers/AuthController.js'
import AuthMiddleware from '../middleware/AuthMiddleware.js'
import RoleMiddleware from '../middleware/RoleMiddleware.js'
import {body} from 'express-validator'
const router = new Router()

router.post('/registration', /*RoleMiddleware.roleMidd(['admin']),*/ [
	body('email').isEmail(), body('password').isLength({min:6, max:12})], 
	AuthController.registration)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/refresh', AuthController.refresh)
router.get('/users', /*RoleMiddleware.roleMidd(['onec']), */AuthController.getUsers)
/*router.get('/auth', AuthController.auth)*/
router.get('/auth', AuthController.auth)
router.get('/logout', AuthController.logout)

router.get('/reg', (req, res) => {
    res.redirect('/signup.html');
});
router.get('/login', (req, res) => {
    res.redirect('/signin.html');
}); 


export default router