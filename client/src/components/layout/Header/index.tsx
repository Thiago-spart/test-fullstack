import Image from "next/image"
import Link from "next/link"

export const Header = () => {
	return (
		<div className="navbar justify-center items-center bg-secondary">
			<Link title="UOL - Seu universo online" href="http://uol.com.br">
				<Image
					src="/logo_completo_white.svg"
					alt="UOL logo"
					width={100}
					height={50}
				/>
			</Link>
		</div>
	)
}