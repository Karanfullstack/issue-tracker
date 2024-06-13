import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { Link } from "@/app/components";
import NextLink from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "./Pagination";

interface SearchParamsProps {
	searchParams: {
		status: Status;
		orderBy: keyof Issue;
		sortType: "asc" | "desc";
		page: string;
	};
}

export default async function IssuePage({ searchParams }: SearchParamsProps) {
	const columns: { label: string; value: keyof Issue; classNames?: string }[] =
		[
			{ label: "Issue", value: "title" },
			{ label: "Status", value: "status", classNames: "hidden md:table-cell" },
			{
				label: "Created",
				value: "createdAt",
				classNames: "hidden md:table-cell",
			},
		];

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

	const orderBy = columns
		.map((column) => column.value)
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
	const issuesCount = await prisma.issue.count({where});
	return (
		<Flex direction={"column"} gap={"3"}>
			<IssueActions />
			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						{columns.map((item) => (
							<Table.ColumnHeaderCell
								className={item.classNames}
								key={item.value}
							>
								<NextLink
									href={{
										query: {
											...searchParams,
											orderBy: item.value,
											sortType:
												searchParams.sortType === "asc" ? "desc" : "asc",
										},
									}}
								>
									{item.label}
								</NextLink>
								<ArrowCompoent value={item.value} searchParams={searchParams} />
							</Table.ColumnHeaderCell>
						))}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
								<div className="block md:hidden">
									<IssueStatusBadge status={issue.status} />
								</div>
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<IssueStatusBadge status={issue.status} />
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								{issue.createdAt.toDateString()}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
			<Pagination
				pageCount={issuesCount}
				pageSize={pageSize}
				currentPage={page}
			/>
		</Flex>
	);
}

interface ArrowCompoentI {
	value: string;
	searchParams: {
		orderBy: string;
		sortType: "asc" | "desc";
	};
}
const ArrowCompoent = ({ value, searchParams }: ArrowCompoentI) => {
	return value === searchParams.orderBy ? (
		searchParams.sortType === "asc" ? (
			<ArrowUpIcon className="inline ml-2" />
		) : (
			<ArrowDownIcon className="inline ml-2" />
		)
	) : null;
};
// this to forcefully make dynamic
export const dynamic = "force-dynamic";
// for revlidate in terms of time
// export const revlidate = 0 or 60
