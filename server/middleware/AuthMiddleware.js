import jwt from 'jsonwebtoken'
import TokenService from '../Services/TokenService.js'
import dotenv from 'dotenv'
dotenv.config()

class AuthMiddleware{
	async authMidd(req,res,next){
		if(req.method === 'OPTIONS'){
			next()
		}
		try{
			const authorizationHeader = req.headers.authorization
			if(!authorizationHeader){
				console.log('Unauthorized')
			}
			const accessToken = authorizationHeader.split(' ')[1]
			if(!accessToken){
				console.log('Unauthorized')
				//return res.status(403).json({message:'Пользователь не авторизован'})
			}
			const userData = await TokenService.validateAccessToken(accessToken)
			if(!userData){
				console.log('Unauthorized')
			}
			req.user = userData


			const decodedToken = jwt.verify(token, process.env.SECRET)
			req.user = decodedToken
			next()
		} catch(e){
			console.log(e)
			return res.status(403).json({message:'Пользователь не авторизован'})
		}
	}

}


export default new AuthMiddleware()