import { TRADER_BACKEND } from './BaseUrlConfig';
import axios from 'axios';

export interface RegisterProps {
	password: string;
	phone: string;
	traderCompony: string;
}

export interface LoginProps {
	username: string;
	password: string;
}

export const BaseApi = axios.create({
	baseURL: TRADER_BACKEND,
	headers: {
		'Content-Type': 'application/json',
	},
});

const UserApi = {
	register: (data: RegisterProps) => {
		return BaseApi.post('/traderUser/register', data);
	},
	login: (data: LoginProps) => {
		return BaseApi.get('/oauth/token', {
			params: {
				...data,
				grant_type: 'password',
				scope: 'select',
				client_id: 'client_2',
				client_secret: '123456',
			},
		});
	},
};

export default UserApi;
