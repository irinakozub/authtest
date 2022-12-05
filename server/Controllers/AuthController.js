import bcrypt from 'bcryptjs'
import User from '../config/Users.js'
import Role from '../config/Roles.js'
import UserService from '../Services/UserService.js'
import ApiError from '../exc/ApiError.js'
import {validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

User.belongsToMany(Role, { through: 'UserRole' });

class AuthController{
	async registration(req, res, next){
		try{
			/*const errors = validationResult(req)
			if (!errors.isEmpty()){
				return res.json({message: 'Problem with email or password'})
			}*/
			const {username, role, email, password} = req.body
			const userData = await UserService.registration(username, role, email, password)
			const userId = userData.user.dataValues.id
			const refreshToken = userData.refreshToken //change to reFresh
			res.cookie('refreshToken', refreshToken, {maxAge: 7*24*60*60*1000, httpOnly:true}) //if use https, add secure flag : true
			res.cookie('testinfo',userId)
			console.log("I'm done in registration AuthController")
			return res.json(true)
		}catch (e){
			console.log(e)
			//next(e)
		}
	}

	async login(req, res, next){
		try{
			const {email, password} = req.body
			const userData = await UserService.login(email, password)
			const userId = userData.user.dataValues.id;
			const refreshToken = userData.token.refreshToken;
			res.cookie('refreshToken', refreshToken, {maxAge: 7*24*60*60*1000, httpOnly:true}) //if use https, add secure where true
			res.cookie('testinfo',userId)
			return res.json(true)
			/*res.redirect('/main');*/
		}catch (e){
			console.log(e)
			//next(e)
		}
	}

	async getUsers(req, res, next){
		try{
			const users = await User.findAll()
			res.json(users)
		}catch (e){
			console.log(e)
			//next(e)
		}
	}

	async logout(req, res, next){
		try{
			const {refreshToken} = req.cookies;
			const token = await UserService.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.json(token)
		} catch(e){
			console.log(e)
			//next(e)
		}
	}

	async refresh(req, res, next){
		try{
			const {refreshToken} = req.cookies;
			const token = await UserService.refresh(refreshToken)
			res.cookie('refreshToken', token, {maxAge: 7*24*60*60*1000, httpOnly:true}) //if use https, add secure where true
			return res.json(token)
		} catch(e){
			console.log(e)
			//next(e)
		}
	}

	async auth(req,res,next){
		try{
			const {refreshToken} = req.cookies;
			if(refreshToken !== undefined){
				let token = refreshToken
				console.log("token: "+token)
				if(refreshToken.refreshToken){
					token = refreshToken.refreshToken
					console.log("token2: "+token)
					const newToken = await UserService.refresh(token)
					res.cookie('refreshToken', newToken, {maxAge: 7*24*60*60*1000, httpOnly:true}) //if use https, add secure where true
					const userId = req.cookies.testinfo;
					const userData = await UserService.getOneUser(userId);
					return res.json(userData.email)
				}
			}else{
				return res.json(true)
			}
		} catch(e){
			console.log(e)
			//next(e)
		}
	}
	async logout(req,res,next){
		try{
			const removeToken = res.clearCookie('refreshToken')
			const removeTestInfo = res.clearCookie('testinfo')
			return res.json(false)
		} catch(e){
			console.log(e)
			next(e)
		}
	}
}

export default new AuthController()
