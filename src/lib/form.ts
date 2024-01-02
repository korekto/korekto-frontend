import type * as yup from 'yup';

type ErrorRef = {
	errors: YupErrors;
};

export interface YupErrors {
	[key: string]: yup.ValidationError;
}

export const extractErrors = (err: yup.ValidationError): YupErrors => {
	return err.inner.reduce((acc, err) => {
		return { ...acc, [err.path ?? '']: err.message };
	}, {});
};

export const createSubmitHandler = <Values extends yup.AnyObject>(
	schema: yup.ObjectSchema<Values>,
	values: Values,
	errorRef: ErrorRef,
	onSuccess: (values: Values) => void,
	onErrorChange: (err: YupErrors) => void
): (() => void) => {
	return () => {
		schema
			.validate(values, { abortEarly: false })
			.then(() => {
				errorRef.errors = {};
				onErrorChange(errorRef.errors);
				onSuccess(values);
			})
			.catch((err: yup.ValidationError) => {
				errorRef.errors = extractErrors(err);
				onErrorChange(errorRef.errors);
			});
	};
};

export type HeadlessForm<Values extends yup.AnyObject> = {
	schema: yup.ObjectSchema<Values>;
	values: Values;
	errorRef: ErrorRef;
	submitHandler: () => void;
};

export const createHeadlessForm = <Values extends yup.AnyObject>(
	schema: yup.ObjectSchema<Values>,
	onSuccess: (values: Values) => void,
	// This is required to keep Svelte reactivity working
	onErrorChange: (err: YupErrors) => void,
	values: Values
): HeadlessForm<Values> => {
	const errorRef = {
		errors: {}
	};
	return {
		schema,
		values,
		errorRef,
		submitHandler: createSubmitHandler(schema, values, errorRef, onSuccess, onErrorChange)
	};
};
