export interface ClientsProps {
	id: number;
	name: string;
	email: string;
	telephone: string;
	document: string;
	status: "active" | "inactive" | "deactivated" | "waiting";
	created_at: string;
	updated_at: string | null;
}

export type CreateClientProps = Omit<ClientsProps, "id" | "created_at" | "updated_at">

