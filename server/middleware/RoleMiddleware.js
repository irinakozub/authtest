import jwt from 'jsonwebtoken'
import ApiError from '../exc/ApiError.js'
import UserService from '../Services/UserService.js'
import dotenv from 'dotenv'
dotenv.config()

class RoleMiddleware{
	roleMidd(roles){
		return async function(req,res,next){
			if(req.method === 'OPTIONS'){
				next()
			}
			try{
				const token = req.headers.cookie.split('refreshToken=')[1]
				if(!token){
					//throw ApiError.UnauthorizedError()
					res.redirect('/signin.html');
				}
				const verifiedToken = jwt.verify(token, process.env.SECRET)
				const role = await UserService.getUserRoles(verifiedToken.email)
				if(!roles.includes(role)){
					//throw new Error('Problem')
					//throw new ApiError.BadRequest('У вас нет доступа') 
					return res.status(403).json({message:'У вас нет доступа'})
				}
				next()
			} catch(e){
				console.log(e)
				//throw new Error('Problem')
				//throw ApiError.UnauthorizedError()
				res.redirect('/signin.html');
			}
		}

	}
}

export default new RoleMiddleware()