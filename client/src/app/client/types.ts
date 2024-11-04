export interface FormData {
  name: string;
  email: string;
  telephone: string;
  document: string;
  status: "active" | "inactive" | "deactivated" | "waiting";
}