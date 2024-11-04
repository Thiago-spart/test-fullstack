import React from 'react';

export const documentMask = (event: React.ChangeEvent<HTMLInputElement>): string => {
	const value = event.target.value.replace(/\D/g, '').substring(0, 14);
	const formattedValue = value
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

	return formattedValue;
};