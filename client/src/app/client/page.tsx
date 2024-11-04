'use client';

import { Input } from "@/components";
import Link from "next/link";
import { Select } from '@/components';
import { uolApi } from "@/services/uolApi";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from "./schema";
import { FormData } from "./types";
import { documentMask } from "@/utils/documentMask";
import { toast } from "react-toastify";
import { ValidateDTO } from "@/DTO/validate";
import { phoneMask } from "@/utils/phoneMask";
import { useMutation } from "@tanstack/react-query";
import { unmaskInputs } from "@/utils/unmask";
import { useRouter } from "next/navigation";

const statusOptions = [
  { value: "active", label: "Ativo" },
  { value: "inactive", label: "Inativo" },
  { value: "deactivated", label: "Desativado" },
  { value: "waiting", label: "Esperando aprovação" },
]

const fetchValidateDocument = async (document: string) => {
	const cleanDocument = document.replace(/\D/g, "");

	const response = uolApi.get<ValidateDTO>(`/validate/document`, {
		params: {
			document: cleanDocument,
		}
	})

	return response;
}

const fetchValidateEmail = async (email: string) => {
	const response = uolApi.get<ValidateDTO>(`/validate/email`, {
		params: {
			email,
		}
	})

	return response;
}

const fetchCreateClient = async (data: FormData) => {
	const response = uolApi.post('/clients', {
		...data
	})

	return response
}

export default function Page() {
	const router = useRouter();
	
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const { mutate } = useMutation({
		mutationFn: fetchCreateClient,
		onSuccess: () => {
			toast.success("Cliente criado com sucesso!", {
				toastId: "create-client-toast",
			});

			router.push("/");
		},
		onError: () => {
			toast.error("Erro ao criar o cliente!", {
				toastId: "create-client-toast",
			});
		}
	})

	const onSubmit = (data: FormData) => {
		const { name, email, telephone, document, status } = data;

		mutate({
			name,
			email,
			telephone: unmaskInputs(telephone),
			document: unmaskInputs(document),
			status
		})
	};


	const validateDocumentOnBlur = async (document: string) => {
		if (document.length < 11) return;

		const response = await fetchValidateDocument(document);

		toast.info(response.data.message, {
			toastId: "document-toast",
		});
	}

	const validateEmailOnBlur = async (email: string) => {
		const response = await fetchValidateEmail(email);

		toast.info(response.data.message, {
			toastId: "email-toast",
		});
	}

  return (
    <form 
			className="w-full max-w-7xl flex gap-6 flex-col py-8"
			onSubmit={handleSubmit(onSubmit)}
		>
      <Input
        id="name"
        labelMessage="Nome"
        placeholder="Nome"
        autoComplete="name"
				errorMessage={errors?.name?.message}
				{...register('name')}
      />

      <Input
				id="email"
				type="email"
				inputMode="email"
				placeholder="E-mail"
				autoComplete="email"
				labelMessage="E-mail"
				errorMessage={errors?.email?.message}
				{...register('email', {
					onBlur: (e) => {
						validateEmailOnBlur(e.target.value);
					}
				})}
			/>

      <Input
				id="cpf"
				placeholder="CPF"
				autoComplete="cpf"
				labelMessage="Digite o seu cpf"
				maxLength={14}
				inputMode="numeric"
				errorMessage={errors?.document?.message}
				{...register('document', {
					onChange: (e) => {
						e.target.value = documentMask(e);
					},
					onBlur: (e) => {
						validateDocumentOnBlur(e.target.value);
					},
				})}
			/>

      <Input
				id="telephone"
				type="tel"
				maxLength={15}
				placeholder="Telefone"
				labelMessage="Telefone"
				inputMode="numeric"
				autoComplete="tel"
				errorMessage={errors?.telephone?.message}
				{...(register('telephone', {
					onChange: (e) => {
						e.target.value = phoneMask(e);
					},
				}))}
			/>

      <Select
        id="status"
        labelMessage="Status"
        options={statusOptions}
        selectDefaultValue="active"
				errorMessage={errors?.status?.message}
				{...register('status')}
      />

      <div className="grid md:grid-cols-2 items-center gap-4 w-full max-w-xs mt-12">
        <button type="submit" className="btn btn-primary w-full">
          Criar
        </button>
        <Link href="/" className="btn btn-primary btn-outline">
          Voltar
        </Link>
      </div>
    </form>
  );
}
