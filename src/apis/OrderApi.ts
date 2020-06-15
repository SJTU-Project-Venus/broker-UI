export enum OrderType {
	LIMIT = 'LIMIT',
	STOP = 'STOP',
	CANCEL = 'CANCEL',
	MARKET = 'MARKET',
}

export enum StatusType {
	PENDING = 'PENDING',
	DONE = 'DONE',
	CANCELPENDING = 'CANCELPENDING',
}

export enum SideType {
	BUY = 'BUY',
	SELL = 'SELL',
}

export interface TraderOrder {
	orderType: OrderType;
	id: number;
	traderName: string;
	traderCompany: string;
	brokerName: string;
	Status: StatusType;

	// Market Order 所拥有的
	side?: SideType; // 买卖操作
	futureName?: string; // 期货类型
	number?: number; // 数量
	unitPrice?: number; // 单价
	pendingNumber?: number; // 未交易的数量

	// Limit Order
	// 买卖操作采用 Market Order 的那个side
	// 期货类型采用Market Order 的那个 futureName
	// 数量采用 Market Order 的那个 number
	// 单价采用Market depth 的那个unitPrice
	// 未交易的数量采用的是Market Order 的那个 pendingNumber;

	// Stop Order
	// 买卖操作采用 Market Order 的那个side
	// 期货类型采用Market Order 的那个 futureName
	// 数量采用 Market Order 的那个 number
	// 单价采用Market depth 的那个unitPrice
	// 未交易的数量采用的是Market Order 的那个 pendingNumber;
	stopPrice?: number; // price 达到这个值的时候会转化
	targetType?: OrderType; // 转化的类型

	// Cancel Order
	orderId?: number; // 撤销订单的Id号。
}

export interface PendingOrderProps {
	orderId: number;
	number: number;
	futureName: string;
	orderType: OrderType;
	timestamp: number;
}

export interface OrderBlotterProps {
	sellerTraderDetailName: string;
	creationTime: string;
	count: number;
	futureName: string;
	sellerTraderName: string;
	marketDepthId: string;
	buyerOtherId: string;
	price: number;
	sellerOtherId: string;
	id: string;
	buyerTraderName: string;
	buyerOrderId: string;
	sellerOrderId: string;
	buyerTraderDetailName: string;
}
