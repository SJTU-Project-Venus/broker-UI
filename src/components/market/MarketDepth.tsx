import React from 'react';
import { OrderBlotterProps } from "../../apis/OrderApi";
import MaterialTable from 'material-table';
import {
	NavigateBefore,
	NavigateNext,
	LastPage,
	FirstPage
} from '@material-ui/icons';
import {FormControl,
	Select,
	MenuItem,
	FormHelperText,
	makeStyles,
	createStyles,
	Theme,
	Grid,
	Typography,} from '@material-ui/core'
import { Broker_WEBSOCKET } from '../../apis/BaseUrlConfig';
import store from '../../redux/store/Store';
import BaseAction from '../../redux/action/BaseAction';
import  { MarketDepthStateProps, Data }  from '../../redux/reducer/ReduxState';
const cellStyle = {
	borderRight: '1px solid grey',
	borderLeft: '1px solid grey',
	lineHeight:0.2
};

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
const FutureNames = [
	'OIL-SEP22',
	'OIL-MAR01',
	'GOLD-JUN18',
	'GOLD-FEB22',
	'GOLD-SEP13',
];
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			marginLeft: 20,
			minWidth: 150,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	})
);
const handlerRedux1 = (marketDepth:OrderBlotterProps[])=>{
	store.dispatch(
		BaseAction.dealer(marketDepth)
	)
}
const MarketDepth = () => {
	let constRedux:MarketDepthStateProps = store.getState().base.marketDepth
	const [data, setData] = React.useState<Data[]>(constRedux.OIL_SEP22);
	const [futureName,setFutureName] = React.useState("OIL-SEP22");
	const [futureName1,setFutureName1] = React.useState("");
	const [websokcet,setWebsocket] = React.useState<any>(null);
	const classes = useStyles();
	const handlerRedux = (marketDepth:MarketDepthStateProps)=>{
		store.dispatch(
			BaseAction.marketdepth(marketDepth)
		)
	}
	React.useEffect(() => {
		if(websokcet == null){
			var ws1 = new WebSocket(Broker_WEBSOCKET);
			ws1.onopen = function () {
			}
			ws1.onmessage = function (event) {
				console.log(event.data)
				const data = JSON.parse(event.data);
				if (data.order != null) {
          const tempdata: OrderBlotterProps = JSON.parse(
            data.order
          ) as OrderBlotterProps;
		  const result: OrderBlotterProps[] = store.getState().base.dealers;
      result.reverse()
      result.push(tempdata)
      result.reverse()
			handlerRedux1(result)
		}
			else {
					const marketDepth:any = JSON.parse(data.marketDepth)
					const buyers:TradersProps[]  = marketDepth.buyers as TradersProps[]
					const sellers:TradersProps[]  = marketDepth.sellers as TradersProps[]
					const tmp: Data[] = [];
					const len = sellers.length;
					sellers.reverse().map((elem, index) => {
					tmp.push({
						buyLevel: undefined,
						buyVol: undefined,
						price: elem.price,
						sellVol: elem.count,
						sellLevel: len - index,
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
					let tempRedux:MarketDepthStateProps = store.getState().base.marketDepth
					console.log(futureName)
					switch(data.futureName){
						case 'OIL-SEP22':{
							tempRedux.OIL_SEP22 = tmp
							break;
						}
	          case 'OIL-MAR01':{
							tempRedux.OIL_MAR01 = tmp
							break;
						}
	          case 'GOLD-JUN18':{
							tempRedux.GOLD_JUN18 = tmp
							break;	
						}
	          case 'GOLD-FEB22':{
							tempRedux.GOLD_FEB22 = tmp
							break;
						}
	          case 'GOLD-SEP13':{
							tempRedux.GOLD_FEB22 = tmp
							break;
						}
						default:{

						}
					}
					if(data.futureName === futureName){
						setData(tmp)
					}
						let value:Data[] = []
						switch(data.futureName){
						case 'OIL-SEP22':{
							value = tempRedux.OIL_SEP22;
							break;
						}
	          case 'OIL-MAR01':{
							value = tempRedux.OIL_MAR01;
							break;
						}
	          case 'GOLD-JUN18':{
							value = tempRedux.GOLD_JUN18;
							break;	
						}
	          case 'GOLD-FEB22':{
							value = tempRedux.GOLD_FEB22;
							break;
						}
	          case 'GOLD-SEP13':{
							value = tempRedux.GOLD_FEB22 
							break;
						}
						default:{
							
						}
					}
					handlerRedux(tempRedux)
					
				}
			}
			setWebsocket(ws1);
		  }
	}, [futureName]);

	return (
		<React.Fragment>
			<Grid container>
			<Grid item xs={2}>
									<Typography variant='h5'>{'市场纵深'}</Typography>
								</Grid>
								<Grid item xs={2}>
			<FormControl className={classes.formControl}>
										<Select
											value={futureName}
											onChange={(e: any) => {
												const name = e.target.value as string;
												setFutureName(name);
												setWebsocket(null)
												let value:Data[]=[]
												let tempRedux:MarketDepthStateProps = store.getState().base.marketDepth
												switch(name){
													case 'OIL-SEP22':{
														value = tempRedux.OIL_SEP22;
														
														break;
													}
													case 'OIL-MAR01':{
														value = tempRedux.OIL_MAR01;
														
														break;
													}
													case 'GOLD-JUN18':{
														value = tempRedux.GOLD_JUN18;
														break;	
													}
													case 'GOLD-FEB22':{
														value = tempRedux.GOLD_FEB22;
														break;
													}
													case 'GOLD-SEP13':{
														value = tempRedux.GOLD_FEB22 
														break;
													}
												}
												setData(value)
												//console.log(futureName)
											}}
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											fullWidth={true}
										>
											{FutureNames.map((elem, index) => {
												return (
													<MenuItem value={elem} key={`${index}`}>
														{elem}
													</MenuItem>
												);
											})}
										</Select>
										<FormHelperText>{'选择交易商品名称'}</FormHelperText>
									</FormControl>
									</Grid>
									</Grid>
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
					paging:false
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
