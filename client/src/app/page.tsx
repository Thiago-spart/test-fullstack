'use client';

import { ClientCard, SkeletonList } from "@/components";
import { ClientDTO } from "@/DTO/clients";
import { uolApi } from "@/services/uolApi";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const fetchClients = async (): Promise<ClientDTO[]> => {
  const response = await uolApi.get("/clients");

  return response.data;
};

export default function Home() {
  const { data, isSuccess } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
  })

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 gap-8">
      <section className="w-full max-w-7xl flex gap-4 ls:gap-8 text-lg items-center">
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height={36}
          width={36}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx={12} cy={7} r={4} />
        </svg>

        <h1 className="text-xl lg:text-3xl">
          Painel de clientes
        </h1>
      </section>
      <div className="divider m-0 divider-horizontal w-full h-[2px] bg-gray-200 max-w-7xl"></div>
      <section className="w-full max-w-7xl flex gap-4 ls:gap-8 text-lg items-center flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          <div className="flex flex-col gap-2 sm:gap-4">
            <h2 className="text-lg md:text-2xl">Listagem de usuários</h2>
            <p className="from-neutral-500 text-sm md:text-md font-light">Escolha um cliente para visualizar os detalhes</p>
          </div>

          <Link href={"/client"} className="btn btn-primary">
            Novo cliente
          </Link>
        </div>

        <div className="w-full flex flex-col gap-8">
          {isSuccess ? 
            data?.map((client) => (
              <ClientCard
                key={client.id}
                status={client.status}
                name={client.name}
                email={client.email}
                document={client.document}
                telephone={client.telephone}
                id={client.id}
              />
            ))
           : (
              <SkeletonList />
          )}
        </div>

        <span className="text-gray-500 font-light w-full">Exibindo {data?.length} clientes</span>
      </section>
    </main>
  );
}
