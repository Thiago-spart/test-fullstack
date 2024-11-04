import Link from "next/link";
import { ClientCardProps } from "./types";
import { statusTranslate } from "@/utils/statusTranslate";
import clsx from "clsx";

export const ClientCard = ({
	status,
	name,
	email,
	telephone,
	document,
	id
}: ClientCardProps) => {
	const translatedStatus = statusTranslate(status);

	const badgeClassName = clsx(
		`badge badge-xs badge-primary mr-1`,
		status === "active" && "badge-success",
		status === "inactive" && "badge-error",
		status === "deactivated" && "badge-gray",
		status === "waiting" && "badge-primary"
	)

	const formattedName = name.length > 20 ? name.substring(0, 20) + "..." : name
	const formattedNumber = telephone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
	const formattedDocument = document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")

	return (
		<div className="w-full border border-gray-200 py-4 px-8 grid justify-between items-center grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
			<div className="flex flex-col justify-between items-start">
				<h4 className="text-sm md:text-lg font-light" title={name}>{formattedName}</h4>
				<p className="text-sm md:text-md font-light">{email}</p>
			</div>

			<div className="hidden md:flex flex-col justify-between items-start">
				<span className="text-lg font-light ">{formattedDocument}</span>
				<span className="text-sm md:text-md font-light">{formattedNumber}</span>
			</div>


			<p className="text-sm md:text-md font-light ">
				<span className={badgeClassName} title={translatedStatus?.text} />
				<span>{translatedStatus?.text}</span>
			</p>

			<Link href={{
				pathname: "/client",
				query: { id: id }
			}} className="btn btn-outline btn-primary w-fit lg:justify-self-end">
				Editar
			</Link>
		</div>
	);
};