import { Box, Flex, Heading } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";
import "react-loading-skeleton/dist/skeleton.css";
export default function loading() {
	return (
		<Box className="max-w-xl">
			<Heading>
				<Skeleton />
			</Heading>
			<Flex gap={"3"} my={"3"}>
				<Skeleton width={"4rem"} />
				<Skeleton width={"4rem"} />
			</Flex>

			<Skeleton height={"25rem"} />
		</Box>
	);
}
