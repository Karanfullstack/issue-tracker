import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";
import "react-loading-skeleton/dist/skeleton.css";
export default function loading() {
	return (
		<Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
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
			<Box>
				<Skeleton width={"5rem"} height={"2rem"} />
			</Box>
		</Grid>
	);
}
