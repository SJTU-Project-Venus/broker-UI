import { TRADER_WEBSOCKET } from './BaseUrlConfig';
import Stomp from 'stompjs';
import store from '../redux/store/Store';

interface StompServiceProps {
	url?: string;
	subscribeurl: string;
	sendurl?: string;
	sendMsg?: string;
	callback: (msg: string) => any;
}

const StompService = (props: StompServiceProps) => {
	const {
		url = TRADER_WEBSOCKET,
		subscribeurl,
		sendurl = '/app/orderBlotter',
		callback,
		sendMsg = JSON.stringify({ futureName: 'GOLD' }),
	} = props;
	const { userId } = store.getState().base.user;
	// const webSocketUrl = 'ws://localhost:8081/ws';
	// const webSocketGreetingsSubscribeEndpoint = '/user/topic/orderBlotter';
	// const webSocketGreetingsSendEndpoint = '/app/orderBlotter';
	const client = Stomp.client(url);

	const connectionCallback = () => {
		console.log('ws connect ok');
		client.subscribe(subscribeurl, (message) => {
			console.log('subscribe ok');
			if (message.body) {
				//console.log('got message with body ', message.body);
				callback(message.body);
			} else {
				console.log('got empty message');
			}
		});
		client.send(sendurl, {}, sendMsg);
	};

	const errorCallback = () => {
		console.log('ws connect error');
	};

	client.connect(`${userId}`, `${userId}`, connectionCallback, errorCallback);
	client.heartbeat.outgoing = 4000;
	client.heartbeat.incoming = 4000;

	return () =>
		client.disconnect(() => {
			console.log('disconnect ws');
		});
};

export default StompService;
