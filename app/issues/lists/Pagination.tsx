"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
	pageCount: number;
	pageSize: number;
	currentPage: number;
}
export default function Pagination({
	pageCount,
	pageSize,
	currentPage,
}: Props) {
	const router = useRouter();
	const params = useSearchParams();

	const changePage = (page: number) => {
		const newParams = new URLSearchParams(params);
		newParams.set("page", page.toString());
		router.push("?" + newParams.toString());
	};
	const totalPages = Math.ceil(pageCount / pageSize);
	return (
		<Flex gap={"3"} justify={"center"} align={"center"}>
			<Button
				disabled={currentPage === 1}
				onClick={() => changePage(currentPage - 1)}
			>
				<ArrowLeftIcon />
			</Button>
			{[...Array(totalPages)]?.map((_, index) => (
				<Button
					variant={currentPage === index + 1 ? "soft" : "classic"}
					key={index}
					onClick={() => changePage(index + 1)}
				>
					{index + 1}
				</Button>
			))}
			<Button
				disabled={currentPage === totalPages}
				onClick={() => changePage(currentPage + 1)}
			>
				<ArrowRightIcon />
			</Button>
		</Flex>
	);
}
