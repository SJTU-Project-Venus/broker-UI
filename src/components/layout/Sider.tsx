import React from 'react';
import { connect } from 'react-redux';
import {
	List,
	ListItem,
	Drawer,
	makeStyles,
	createStyles,
	Theme,
	ListItemText,
} from '@material-ui/core';
import { UserProps, ReduxState } from '../../redux/reducer/ReduxState';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		drawer: {
			width: 240,
			flexShrink: 0,
		},
		drawerPaper: {
			width: 240,
		},
		toolbar: theme.mixins.toolbar,
	})
);

interface StateProps {
	user: UserProps;
}

const mapStateToProps = (state: ReduxState) => ({
	user: state.base.user,
});

type Props = StateProps;

const Sider: React.FunctionComponent<Props> = (props: Props) => {
	const { user } = props;
	const classes = useStyles();

	return (
		<React.Fragment>
			<Drawer
				className={classes.drawer}
				variant='permanent'
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.toolbar} />
				{user.login && (
					<List dense>
						<ListItem
							button
							key={1}
							component={(props): React.ReactElement => (
								<NavLink to='/profile/security-settings' {...props} />
							)}
						>
							<ListItemText disableTypography primary={'请先进行认证'} />
						</ListItem>
					</List>
				)}

				<div className={classes.toolbar} />
			</Drawer>
		</React.Fragment>
	);
};

export default connect(mapStateToProps)(Sider);
