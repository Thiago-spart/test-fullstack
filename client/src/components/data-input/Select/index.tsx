'use client';

import clsx from 'clsx';
import React, { ForwardRefRenderFunction } from 'react';

import { SelectInputProps } from './types';

export const SelectBase: ForwardRefRenderFunction<
	HTMLSelectElement,
	SelectInputProps
> = (
	{
		id,
		errorMessage,
		labelMessage,
		className,
		hideLabel = true,
		containerClassName,
		options,
		selectDefaultValue,
		...rest
	},
	ref
) => {
	const classNameSchema = clsx(
		'flex px-4 py-2 select select-bordered w-full',
		className,
		errorMessage && 'select-error',
	);

	const tempContainerClassName = clsx(
		'relative flex flex-col items-start gap-2 max-w-[280px]',
		containerClassName
	);

	return (
		<div className={tempContainerClassName}>
			{labelMessage ? (
				<label
					className={clsx('text-lg', hideLabel ? 'sr-only' : 'w-full')}
					htmlFor={id}
				>
					{labelMessage}
				</label>
			) : null}

			<select id={id} ref={ref} defaultValue={selectDefaultValue} className={`${classNameSchema}`} {...rest}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>

			{errorMessage ? (
				<span className=" font-light text-error">
					{String(errorMessage)}
				</span>
			) : null}
		</div>
	);
};

export const Select = React.forwardRef(SelectBase);
