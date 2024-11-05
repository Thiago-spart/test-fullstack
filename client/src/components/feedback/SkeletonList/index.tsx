export const SkeletonList = () => {	
	const arr = Array(8).fill("");
	
	return (
		<div className="w-full flex flex-col gap-4">
			{arr.map((_, idx) => (
				<div key={idx} className="skeleton h-24 w-full"></div>
			))}
		</div>
	)
}