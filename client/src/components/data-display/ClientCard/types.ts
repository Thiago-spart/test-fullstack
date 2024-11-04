import { ClientDTO } from "@/DTO/clients";
export type ClientCardProps = Omit<ClientDTO, 'created_at' | 'updated_at'>;
