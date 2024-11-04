import React from 'react';

export const phoneMask = (
	event: React.ChangeEvent<HTMLInputElement>
): string => {
	const phone = event.target.value
		.replace(/\D/g, '')
		.replace(/^(\d{2})(\d)/g, '($1) $2')
		.replace(/(\d{4,5})(\d)/, '$1-$2');

	return phone;
};
