export const statusTranslate = (status: string) => {
	if (status === "active") return { text: "Ativo" };
	if (status === "inactive") return { text: "Inativo" };
	if (status === "deactivated") return { text: "Desativado" };
	
	return { text: "Aguardando aprovação" }
}