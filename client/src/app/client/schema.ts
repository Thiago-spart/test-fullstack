import { validateDocument } from "@/utils/ValidateDocument"
import { validatePhone } from "@/utils/validatePhone"
import * as yup from "yup"

export const schema = yup.object({
	name: yup.string().min(3, "Nome muito curto").required("Nome obrigatório"),
	email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
	telephone: yup
		.string()
		.test("telefone", "Telefone inválido", (value) => validatePhone(value || ""))
		.required("Telefone obrigatório"),
	document: yup
		.string()
		.test("document", "CPF inválido", (value) => validateDocument(value || ""))
		.required("CPF obrigatório"),
	status: yup
		.string()
		.oneOf(["active", "inactive", "deactivated", "waiting"])
		.required("Status obrigatório"),
})