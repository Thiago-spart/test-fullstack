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
import { useMutation, useQuery } from "@tanstack/react-query";
import { unmaskInputs } from "@/utils/unmask";
import { useRouter, useSearchParams } from "next/navigation";
import { ClientDTO } from "@/DTO/clients";
import React from "react";
import { queryClient } from "@/services/queryClient";

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

const fetchUpdateClient = async ({ id, ...data }: FormData & { id: number }) => {
	const response = uolApi.put('/clients/update', {
		...data,
		id
	})

	return response
}

const fetchClient = async (id: number) => {
	const response = uolApi.get<Array<ClientDTO>>(`/clients`, {
		params: {
			id
		}
	})

	const { data } = await response;
	
	return data[0]
}

export default function Page() {
	const params = useSearchParams();
	const router = useRouter();

	const userId = params.get("id");

	const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
		resolver: yupResolver(schema),
	}); 

	queryClient.refetchQueries({
    queryKey: ["clients"],
  });

	const createMutation = useMutation({
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

	const clientQuery = useQuery({
		queryKey: ["client", userId],
		queryFn: () => fetchClient(Number(userId)),
		enabled: !!userId,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
	})

	const updateMutation = useMutation({
		mutationFn: fetchUpdateClient,
		onSuccess: () => {
			toast.success("Cliente atualizado com sucesso!", {
				toastId: "update-client-toast",
			});

			router.push("/");
			
			queryClient.removeQueries({
				queryKey: ["client", userId],
			});
		},
		onError: () => {
			toast.error("Erro ao atualizar o cliente!", {
				toastId: "update-client-toast",
			});
		}
	})

	const onSubmit = (data: FormData) => {
		const { name, email, telephone, document, status } = data;

		if (userId) {
			updateMutation.mutate({
				id: Number(userId),
				name,
				email,
				telephone: unmaskInputs(telephone),
				document: unmaskInputs(document),
				status
			})

			return
		}

		createMutation.mutate({
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

	React.useEffect(() => {
		if (!!userId || clientQuery.isSuccess) {
			if (clientQuery?.data) {
				setValue("name", clientQuery.data?.name);
				setValue("email", clientQuery.data?.email);
				setValue("telephone", clientQuery.data?.telephone);
				setValue("document", clientQuery.data?.document);
				setValue("status", clientQuery.data?.status);
			}
		}
	}, [userId, clientQuery]);

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
          {!!userId ? "Atualizar" : "Criar"}
        </button>
        <Link href="/" className="btn btn-primary btn-outline">
          Voltar
        </Link>
      </div>
    </form>
  );
}
