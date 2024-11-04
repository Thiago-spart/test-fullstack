'use client';

import clsx from 'clsx';
import React, { ForwardRefRenderFunction } from 'react';

import { InputProps } from './types';

export const InputBase: ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps
> = (
	{
		id,
		errorMessage,
		labelMessage,
		className,
		type,
		hideLabel = true,
		containerClassName,
		...rest
	},
	ref
) => {

	const classNameSchema = clsx(
		'flex px-4 py-2 input input-bordered',
		className,
		errorMessage && 'input-error',
	);

	const tempContainerClassName = clsx(
		'relative flex items-start gap-2 flex-col justify-start',
		containerClassName,
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

			<input
				id={id}
				ref={ref}
				type={type}
				className={`${classNameSchema}`}
				{...rest}
			/>

			{errorMessage ? (
				<span className=" font-light text-error">
					{String(errorMessage)}
				</span>
			) : null}
		</div>
	);
};

export const Input = React.forwardRef(InputBase);
