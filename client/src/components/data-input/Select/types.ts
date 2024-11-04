import React from 'react';

export interface SelectInputProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	errorMessage?: string;
	labelMessage?: string;
	hideLabel?: boolean;
	containerClassName?: string;
	options: Array<{ value: string; label: string }>;
	selectDefaultValue?: string;
}
