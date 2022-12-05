import bcrypt from 'bcryptjs'
import User from '../config/Users.js'
import Role from '../config/Roles.js'
import TokenService from '../Services/TokenService.js'
import ApiError from '../exc/ApiError.js'
import {validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

class UserService{
	async registration(username, role, email, password){
		try{
			const candidate = await User.findOne({where:{email: email}, raw: true })
			if (candidate){
				console.log('Пользователь с таким именем уже существует')
				//return res.json({message: 'Пользователь с таким именем уже существует'})
				//throw new ApiError.BadRequest('Пользователь с таким именем уже существует')
			}
			const hashPass = bcrypt.hashSync(password, 7)
			const user = await User.create({name: username, email: email, password: hashPass})
			const userData = await User.findOne({where:{email: email}, raw: true })
			await User.findOne({where: {email: email}}).then(user => {
				if (!user)
					//throw new ApiError.BadRequest('Пользователь не найден')
					return res.status(400).json({message: 'User cannot find'})
				Role.findOne({where:{value: role}, raw: true }).then(role =>{
				if (!role)
					//throw new ApiError.BadRequest('Роль не найдена')
					return res.status(400).json({message: 'Role cannot find'})
				user.addRole(role.id)
				})
			})
			const name = userData.name
			const payload = {
				name,
				email
			}
			const tokens = TokenService.genToken(payload)
			await TokenService.addToken(userData.id, tokens.refreshToken)
			return{  ...tokens, user }
		} catch(e){
			console.log(e)
		}
	}	

	async login(email, password){
		try{
			const user = await User.findOne({where: {email: email}, 
				include: Role})
			const role = user.roles[0].value			
			if (!user){
				return res.json({message: 'Пользователь '+ user.email+'не найден'})
				//throw new ApiError.BadRequest('Пользователь '+ user.email+'не найден', errors)
			}
			const validPass = bcrypt.compareSync(password, user.password)
			if(!validPass){
				//throw new ApiError.BadRequest('Введен неверный пароль', errors)
				return res.status(400).json({message:'Введен неверный пароль'})
			}
			const name = user.name
			const payload = {
				name,
				email
			}
			const token = TokenService.genToken(payload)
			await TokenService.addToken(user.email, token)
			return{  token, user }
		} catch(e){getCaptain()
			console.log(e)
		}
	}

	async logout(refreshToken){
		try{
			const token = await TokenService.removeToken(refreshToken)
			return token
		} catch(e){
			console.log(e)
		}
	}

	async refresh(refreshToken){
		if(!refreshToken){
			console.log('Unauthorized')
			//return res.json({message: 'Unauthorized'})
		}
		const token = refreshToken
		const userData = await TokenService.validateRefreshToken(token)
		const tokenFromDb = await TokenService.getOneToken(token)
		if(!userData || !tokenFromDb){
			console.log('Unauthorized')
		}
		let email = ""
		if (!userData.email){
			email=userData.userEmail
		} else {
			email=userData.email
		}
		const user = await User.findOne({where: {email: email}, raw: true})
		const userName = user.name
		const userEmail = user.email
		const payload = {
				userName,
				userEmail
		}
		const tokens = TokenService.genToken(payload)
		await TokenService.addToken(user.id, tokens.refreshToken)
		return{  ...tokens, user }
	}

	async getUserRoles(email){
		try{
			const userData = await User.findOne({where: {email: email}})
			const role = await userData.getRoles()
			return role[0].value //need to change to more than 1 role
		} catch(e){
			console.log(e)
		}
	}

	async getOneUser(id){
		try{
			const userData = await User.findOne({where: {id: id}, raw: true})
			return userData
		} catch(e){
			console.log(e)
		}
	}
}
export default new UserService()