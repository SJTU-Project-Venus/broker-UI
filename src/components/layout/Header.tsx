import React from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	makeStyles,
	createStyles,
	Theme,
	Link,
} from '@material-ui/core';
import { UserProps, ReduxState } from '../../redux/reducer/ReduxState';
import BaseAction from '../../redux/action/BaseAction';
import { Dispatch } from 'redux';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			height: theme.spacing(6),
		},
		flex: {
			flexGrow: 1,
		},
	})
);

interface StateProps {
	user: UserProps;
}

interface DispatchProps {
	logout: () => void;
}

const mapStateToProps = (state: ReduxState) => ({
	user: state.base.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	logout: () => {
		dispatch(BaseAction.logout());
	},
});

type Props = StateProps & DispatchProps;

const Header: React.FunctionComponent<Props> = (props: Props) => {
	const { user, logout } = props;
	const classes = useStyles();

	return (
		<AppBar className={classes.appBar} variant='elevation' position='static'>
			<Toolbar variant='dense'>
				<Link underline='none' color='inherit' to='/' component={RouterLink}>
					<Typography variant='h6' noWrap>
						OTC
					</Typography>
				</Link>

				<Button>
					<Link
						underline='none'
						color='inherit'
						to='/market'
						component={RouterLink}
					>
						<Typography variant='inherit' style={{ color: 'white' }}>
							查看市场
						</Typography>
					</Link>
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
