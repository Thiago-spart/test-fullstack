export const unmaskInputs = (value: string) => {
	return value.replace(/\D/g, "");
}
