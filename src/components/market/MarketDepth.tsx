import React from 'react';
import MaterialTable from 'material-table';
import {
	NavigateBefore,
	NavigateNext,
	LastPage,
	FirstPage,
} from '@material-ui/icons';
import { Broker_WEBSOCKET } from '../../apis/BaseUrlConfig';
import StompService from '../../apis/Websocket';

const cellStyle = {
	borderRight: '1px solid grey',
	borderLeft: '1px solid grey',
};

interface Data {
	buyLevel: number | undefined;
	buyVol: number | undefined;
	sellLevel: number | undefined;
	sellVol: number | undefined;
	price: number;
}

interface TradersProps {
	price: number;
	count: number;
}

interface MarketDepthWS {
	marketQuotation: {
		changePercent: any;
		changePrice: number;
		closePrice: number;
		currentPrice: number;
		currentTime: string;
		date: string;
		highPrice: number;
		id: string;
		lastClosePrice: number;
		lowPrice: number;
		marketDepthId: string;
		openPrice: number;
	};
	marketDepth: {
		buyers: TradersProps[];
		id: string;
		sellers: TradersProps[];
	};
	marketDepthId: string;
	timestamp: number;
	futureName: string;
}

const MarketDepth = () => {
	const [data, setData] = React.useState<Data[]>([]);
	const [futureName,setFutureName] = React.useState("GOLD");
	const [websokcet,setWebsocket] = React.useState<any>(null);
	React.useEffect(() => {
		if(websokcet == null){
			var ws1 = new WebSocket(Broker_WEBSOCKET);
			ws1.onopen = function () {
			}
			ws1.onmessage = function (event) {
				const data = JSON.parse(event.data);
				if(data.futureName!=null && data.futureName == futureName){
					const marketDepth:any = JSON.parse(data.marketDepth)
					const buyers:TradersProps[]  = marketDepth.buyers as TradersProps[]
					const sellers:TradersProps[]  = marketDepth.sellers as TradersProps[]
					const tmp: Data[] = [];
					sellers.map((elem, index) => {
						tmp.push({
							buyLevel: undefined,
							buyVol: undefined,
							price: elem.price,
							sellVol: elem.count,
							sellLevel: index + 1,
						});
						return 0;
					});
					buyers.map((elem, index) => {
						tmp.push({
							sellLevel: undefined,
							sellVol: undefined,
							price: elem.price,
							buyVol: elem.count,
							buyLevel: index + 1,
						});
						return 0;
					});
					setData(tmp)
				}
			}
			setWebsocket(ws1);
		  }
	}, []);

	return (
		<React.Fragment>
			<MaterialTable
				title='Market Depth'
				columns={[
					{
						title: '买方序列',
						field: 'buyLevel',
						sorting: false,
						cellStyle: { ...cellStyle, borderLeft: '1px solid white' },
					},
					{
						title: '买方数量',
						field: 'buyVol',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '价格',
						field: 'price',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '卖方数量',
						field: 'sellVol',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '卖方序列',
						field: 'sellLevel',
						sorting: false,
						cellStyle: cellStyle,
					},
				]}
				data={data}
				options={{
					search: false,
					sorting: false,
					pageSize: 10,
					pageSizeOptions: [10],
					paginationType: 'normal',
					headerStyle: {
						backgroundColor: 'rgb(248,248,248)',
					},
				}}
				icons={{
					NextPage: React.forwardRef((props, ref) => {
						return <NavigateNext {...props} ref={ref} />;
					}),
					PreviousPage: React.forwardRef((props, ref) => {
						return <NavigateBefore {...props} ref={ref} />;
					}),
					LastPage: React.forwardRef((props, ref) => {
						return <LastPage {...props} ref={ref} />;
					}),
					FirstPage: React.forwardRef((props, ref) => {
						return <FirstPage {...props} ref={ref} />;
					}),
				}}
			/>
		</React.Fragment>
	);
};

export default MarketDepth;
