import { AnyAction } from 'redux';
import { LoginUserProps,MarketDepthStateProps,Data } from './../reducer/ReduxState';
import ActionTypes from './ActionTypes';
import { OrderBlotterProps } from '../../apis/OrderApi';

const BaseAction = {
  login: (user: LoginUserProps): AnyAction => ({
    type: ActionTypes.LOGIN,
    user: user
  }),
  logout: (): AnyAction => ({
    type: ActionTypes.LOGOUT,
  }),
  marketdepth: (marketdepth:MarketDepthStateProps): AnyAction => ({
    type: ActionTypes.MarketDepth,
    marketDepth: marketdepth
  }),
  dealer: (dealers:OrderBlotterProps[]): AnyAction => ({
    type: ActionTypes.Dealer,
    dealers:dealers
  })
}

export default BaseAction