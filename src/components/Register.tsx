import React from 'react';
import {
	Avatar,
	Grid,
	Button,
	CardHeader,
	makeStyles,
	Theme,
	createStyles,
	Card,
	CardContent,
	CardActions,
	Snackbar,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router';
import UserApi, { RegisterProps } from '../apis/UserApi';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: '30%',
			marginLeft: '35%',
			marginTop: '10%',
		},
		actions: {
			textAlign: 'center',
		},
	})
);

const initialValues: RegisterProps = {
	phone: '',
	password: '',
	traderCompony: '',
};

const Register = () => {
	const classes = useStyles();
	const history = useHistory();
	const [open, setOpen] = React.useState<boolean>(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert onClose={handleClose} severity='error'>
					注册失败
				</Alert>
			</Snackbar>
			<Formik
				onSubmit={(values, { setSubmitting }) => {
					console.log(values);
					UserApi.register(values).then((res) => {
						console.log('register get res', res);
						if (res.status === 200 && res.data === true) {
							setSubmitting(false);
							window.location.reload();
						} else {
							setOpen(true);
							setSubmitting(false);
						}
					});
				}}
				initialValues={initialValues}
				render={({ submitForm, isSubmitting }) => (
					<Form>
						<Card>
							<CardHeader
								avatar={
									<Avatar>
										<AccountCircle />
									</Avatar>
								}
								title={'注册'}
							/>
							<CardContent>
								<Grid container direction='column'>
									<Field component={TextField} label='手机号' name='phone' />
									<Field component={TextField} label='密码' name='password' />
									<Field
										component={TextField}
										label='所属公司'
										name='traderCompony'
									/>
								</Grid>
							</CardContent>

							<CardActions className={classes.actions}>
								<Button
									onClick={() => {
										submitForm();
									}}
									disabled={isSubmitting}
									color='primary'
									variant='contained'
								>
									{'注册'}
								</Button>
							</CardActions>
						</Card>
					</Form>
				)}
			/>
		</React.Fragment>
	);
};

export default Register;
