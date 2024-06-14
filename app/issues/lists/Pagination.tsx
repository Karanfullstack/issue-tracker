"use client";

import {
	ArrowLeftIcon,
	ArrowRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
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
				variant="outline"
				className=" !cursor-pointer"
				disabled={currentPage === 1}
				onClick={() => changePage(1)}
			>
				<DoubleArrowLeftIcon />
			</Button>
			<Button
				variant="outline"
				className=" !cursor-pointer"
				disabled={currentPage === 1}
				onClick={() => changePage(currentPage - 1)}
			>
				<ArrowLeftIcon />
			</Button>
			{[...Array(totalPages)]?.map((_, index) => (
				<Button
					className="!cursor-pointer"
					variant={currentPage === index + 1 ? "soft" : "surface"}
					key={index}
					onClick={() => changePage(index + 1)}
				>
					{index + 1}
				</Button>
			))}
			<Button
				variant="outline"
				className=" !cursor-pointer"
				disabled={currentPage === totalPages}
				onClick={() => changePage(currentPage + 1)}
			>
				<ArrowRightIcon />
			</Button>
			<Button
				variant="outline"
				className=" !cursor-pointer"
				disabled={currentPage === totalPages}
				onClick={() => changePage(totalPages)}
			>
				<DoubleArrowRightIcon />
			</Button>
		</Flex>
	);
}
