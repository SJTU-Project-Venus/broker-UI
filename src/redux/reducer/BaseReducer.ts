import { AnyAction } from 'redux';
import ActionTypes from '../action/ActionTypes';
import initialReduxState from './ReduxState';

const baseReducer = (state = initialReduxState.base, action: AnyAction) => {
	switch (action.type) {
		case ActionTypes.LOGIN: {
			return {
				...state,
				user: action.user,
			};
		}
		case ActionTypes.LOGOUT: {
			return { ...initialReduxState.base };
		}
		case ActionTypes.MarketDepth:{
			return {
				...state,
				marketDepth: action.marketDepth,
			}
		}
		case ActionTypes.Dealer:{
			return{
				...state,
				dealers:action.dealers
			}
		}
		default: {
			return state;
		}
	}
};

export default baseReducer;
