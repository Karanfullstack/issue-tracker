import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import Pagination from "./Pagination";
import IssueTable, { columnNames, QueryParamsSearch } from "./IssueTable";
import { Metadata } from "next";

interface SearchParamsProps {
	searchParams: QueryParamsSearch;
}
export default async function IssuePage({ searchParams }: SearchParamsProps) {
	const status = Object.values(Status).includes(searchParams.status)
		? searchParams.status
		: undefined;
	const where = { status };
	const sortType =
		searchParams.sortType === "asc"
			? "asc"
			: searchParams.sortType === "desc"
			? "desc"
			: undefined;

	const orderBy = columnNames
		.map((column) => column)
		.includes(searchParams.orderBy)
		? {
				[searchParams.orderBy]: sortType,
		  }
		: undefined;

	const page = parseInt(searchParams.page) || 1;
	const pageSize = 10;

	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	});
	const issuesCount = await prisma.issue.count({ where });
	return (
		<Flex direction={"column"} gap={"3"}>
			<IssueActions />
			<IssueTable issues={issues} searchParams={searchParams} />
			<Pagination
				pageCount={issuesCount}
				pageSize={pageSize}
				currentPage={page}
			/>
		</Flex>
	);
}

// this to forcefully make dynamic
export const dynamic = "force-dynamic";
// for revlidate in terms of time
// export const revlidate = 0 or 60

export const metadata: Metadata = {
	title: "Issue Tracker - Issue Lists",
	description: "View project issues project issues",
};
