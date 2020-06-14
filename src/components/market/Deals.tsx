import React from "react";
import { OrderBlotterProps } from "../../apis/OrderApi";
import { Broker_WEBSOCKET } from "../../apis/BaseUrlConfig";
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { Paper } from "@material-ui/core";
const cellStyle = {
  borderRight: "1px solid grey",
  borderLeft: "1px solid grey",
};

const Deals = () => {
  const [data, setData] = React.useState<OrderBlotterProps[]>([]);
  const [websocket, setWebsocket] = React.useState<any>();
  //const [data1, setData1] = React.useState<OrderBlotterProps[]>([]);
  const [timeStamp,setTimeStamp] = React.useState(0);
  React.useEffect(() => {
    if (websocket == null) {
      let ws1 = new WebSocket(Broker_WEBSOCKET);
      ws1.onopen = function () {};
      ws1.onmessage = function (event) {
        const templist = JSON.parse(event.data);
        if (templist.order != null) {
          const tempdata: OrderBlotterProps = JSON.parse(
            templist.order
          ) as OrderBlotterProps;
		  const result: OrderBlotterProps[] = data;
		  result.push(tempdata)
		  setData(result)
		  setTimeStamp(new Date().getTime())
        console.log(data);
      };
      setWebsocket(ws1);
    }
  }}, []);

  return (
    <React.Fragment>
      <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>订单编号</TableCell>
                <TableCell>交易时间</TableCell>
                <TableCell>交易价格</TableCell>
                <TableCell>交易数量</TableCell>
                <TableCell>买方公司</TableCell>
                <TableCell>买方交易员</TableCell>
                <TableCell>卖方公司</TableCell>
                <TableCell>卖方交易员</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((elem, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{elem.id}</TableCell>
                    <TableCell>{elem.creationTime}</TableCell>
                    <TableCell>{elem.price}</TableCell>
                    <TableCell>{elem.count}</TableCell>
                    <TableCell>
                      {elem.buyerTraderName}
                    </TableCell>
                    <TableCell>
                      {elem.buyerTraderDetailName}
                    </TableCell>
                    <TableCell>
                      {elem.sellerTraderName}
                    </TableCell>
                    <TableCell>
                      {elem.sellerTraderDetailName}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
    </React.Fragment>
  );
};

export default Deals;
