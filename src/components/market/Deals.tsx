import { OrderBlotterProps } from "../../apis/OrderApi";
import { Broker_WEBSOCKET } from "../../apis/BaseUrlConfig";
import React from 'react';
import {  useTheme, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from "@material-ui/core/TableHead";
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {FormControl,
	Select,
	MenuItem,
	FormHelperText,
	makeStyles,
	createStyles,
	Grid,
  Typography,} from '@material-ui/core'
import store from '../../redux/store/Store';
import BaseAction from '../../redux/action/BaseAction';
const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
    formControl: {
			marginLeft: 20,
			minWidth: 150,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
  }),
);
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
const FutureNames = [
  "ALL",
	'OIL-SEP22',
	'OIL-MAR01',
	'GOLD-JUN18',
	'GOLD-FEB22',
	'GOLD-SEP13',
];
function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}
const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const CustomPaginationActionsTable = () => {
  const dealer:OrderBlotterProps[] = store.getState().base.dealers
  const classes = useStyles2();
  const classes2 = useStyles1();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [emptyRows,setEmptyRows] = React.useState(0);
  const [data, setData] = React.useState<OrderBlotterProps[]>(dealer);
  const [websocket, setWebsocket] = React.useState<any>();
  const [futureName,setFutureName] = React.useState("ALL");
  //const [data1, setData1] = React.useState<OrderBlotterProps[]>([]);
  const [timeStamp,setTimeStamp] = React.useState(0);
  const handlerRedux = (marketDepth:OrderBlotterProps[])=>{
		store.dispatch(
			BaseAction.dealer(marketDepth)
		)
	}
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
		  const result: OrderBlotterProps[] = store.getState().base.dealers;
      result.reverse()
      result.push(tempdata)
      result.reverse()
      handlerRedux(result)
		  setData(result)
      setTimeStamp(new Date().getTime())
      setEmptyRows(rowsPerPage - Math.min(rowsPerPage, result.length - page * rowsPerPage));
        console.log(data);
      };
      setWebsocket(ws1);
    }
  }}, []);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <Grid container>
								<Grid item xs={2}>
			<FormControl className={classes2.formControl}>
										<Select
											value={futureName}
											onChange={(e: any) => {
												const name = e.target.value as string;
												setFutureName(name);
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
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead>
              <TableRow>
                <TableCell>交易期货</TableCell>
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
          {(rowsPerPage > 0
            ? data.filter(elem=>(elem.futureName===futureName || futureName==="ALL")).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((elem) => (
            <TableRow key={elem.id}>
          <TableCell>{elem.futureName}</TableCell>
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
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={9} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={9}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
}
export default  CustomPaginationActionsTable;