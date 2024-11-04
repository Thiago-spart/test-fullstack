import * as yup from "yup"

export const schema = yup.object({
	name: yup.string().min(3, "Nome muito curto").required("Nome obrigatório"),
	email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
	telephone: yup.string().required("Telefone obrigatório"),
	document: yup.string().required("CPF obrigatório"),
	status: yup.string().oneOf(["active", "inactive", "deactivated", "waiting"]).required("Status obrigatório"),
})