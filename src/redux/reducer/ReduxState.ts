import { OrderBlotterProps } from "../../apis/OrderApi";
export interface LoginUserProps {
	userId: string;
	traderName: string;
	traderCompany: string;
	login: boolean;
	access_token: string;
}

export interface UserProps {
	userId: string | undefined;
	traderName: string;
	traderCompany: string;
	login: boolean;
	access_token: string;
}
export interface Data {
	buyLevel: number | undefined;
	buyVol: number | undefined;
	sellLevel: number | undefined;
	sellVol: number | undefined;
	price: number;
}
export interface MarketDepthStateProps {
		OIL_SEP22: Data[]
	    OIL_MAR01: Data[]
	    GOLD_JUN18: Data[]
	 	GOLD_FEB22: Data[]
	 	GOLD_SEP13: Data[]
}
export interface BaseReducerStateProps {
	user: UserProps;
	marketDepth: MarketDepthStateProps
	dealers: OrderBlotterProps[]
}
export interface ReduxState {
	base: BaseReducerStateProps;
	
}

const initialReduxState: ReduxState = {
	base: {
		user: {
			userId: undefined,
			traderName: '',
			traderCompany: '',
			login: false,
			access_token: '',
		},
		marketDepth:{
			OIL_SEP22: [],
	    	OIL_MAR01: [],
	    	GOLD_JUN18: [],
	 		GOLD_FEB22: [],
	 		GOLD_SEP13: []
		},
		dealers:[]
	},
};

export default initialReduxState;
