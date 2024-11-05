import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Cliente | UOL - Seu universo online",
  description: "Crie ou editar seus clientes na UOL.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
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
        <div className="flex flex-col md:flex-row items-center w-full gap-4">
          <div className="flex flex-col gap-2 sm:gap-4">
            <h2 className="text-lg md:text-2xl">Novo usuário</h2>
            <p className="from-neutral-500 text-sm md:text-md font-light">Informe os campos a seguir para criar novo usuário:</p>
          </div>
        </div>

        <Suspense>
          {children}
        </Suspense>
      </section>
    </main>
	);
}