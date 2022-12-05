import axios from 'axios';
import {setUser, logOut} from '../reducers/userReduces';

export const registration = (username, role, email, password) =>{
	return async (dispatch) =>{
		try {
			console.log(username)
			const response = await axios.post('/api/auth/registration',
			{
				username,
				role,
				email,
				password
			})
			dispatch(setUser(response.data.user))
		} catch(e){
			alert(e.response.data.message)
		}
	}
} 

export const login = (email, password) =>{
	return async (dispatch) => {
		try {
			const response = await axios.post('/api/auth/login',
			{
				email,
				password
			})
			dispatch(setUser(response.data.user))
		} catch(e){
			alert(e.response.data.message)
		}
	}
}

export const logout =  () => {
    return (dispatch) => {
        try {
            const response = axios.get(`/api/auth/logout`)
            dispatch(logOut(response))
        } catch (e) {
            console.log("problem with logout in client part")
        }
    }
}
export const auth =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`/api/auth/auth`)
            console.log(response)
            if(response.data==1){
            	dispatch(logOut(response))
            } else {
            	dispatch(setUser(response.data.user))
            }
        } catch (e) {
            console.log("problem with auth in client part")
        }
    }
}
/*export const auth = () =>{
	return async (dispatch) => {
		try {
			const response = await axios.get('/api/auth/auth')
			console.log(response.data.user)
			dispatch(setUser(response.data.user))
			console.log(response.data)
		} catch(e){
			alert(e.response.data.message)
		}
	}
}*/