import React from 'react';
import {
	Grid,
	TextField,
	Select,
	MenuItem,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';
import HookField from '../style/HookField';

/* Component Types */
export enum HookComponentsType {
	TEXT,
	SELECT,
}

/* Base Interface */
interface HookComponentsProps {
	label: string;
	component?: HookComponentsType;
	reg?: any;
	name: string;
	type?: string;
	control?: any;
	options?: SelectDataFormat[];
}

/* Text Interface */
interface HookTextProps {
	component?: HookComponentsType;
	reg: any;
	label: string;
	name: string;
	type?: string;
}

/* Select Data Form */
export interface SelectDataFormat {
	value: string | number;
	label: string;
}

/* Select Interface */
interface HookSelectProps {
	component: HookComponentsType;
	reg: any;
	label: string;
	name: string;
	control: any;
	options: SelectDataFormat[];
}

/* Component Class */
export default function HookComponents(props: HookComponentsProps) {
	const { component, label } = props;

	switch (component) {
		default:
		case HookComponentsType.TEXT: {
			const { type, reg, name } = props as HookTextProps;
			return (
				<Grid item xs={12}>
					<HookField label={label}>
						<TextField
							inputRef={reg}
							name={name}
							fullWidth={true}
							type={type ? type : 'text'}
						/>
					</HookField>
				</Grid>
			);
		}
		case HookComponentsType.SELECT: {
			const { control, options, name } = props as HookSelectProps;
			return (
				<Grid item xs={12}>
					<HookField label={label}>
						<Controller
							as={
								<Select>
									{options.map((elem, index) => (
										<MenuItem key={index.toString()} value={elem.value}>
											{elem.label}
										</MenuItem>
									))}
								</Select>
							}
							control={control}
							name={name}
							fullWidth={true}
							defaultValue={''}
							onChange={([selected]) => {
								return selected.target.value;
							}}
						/>
					</HookField>
				</Grid>
			);
		}
		
	}
}
