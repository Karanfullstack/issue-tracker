import { Grid, Box, Heading, Flex } from "@radix-ui/themes";
import React from "react";
import Skeleton from "@/app/components/Skeleton";

export default function IssueSkeleton() {
    return (
        <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
            <Box className="max-w-xl">
                <Heading>
                    <Skeleton />
                </Heading>
                <Flex gap={"3"} my={"3"}>
                    <Skeleton width={"4rem"} />
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
