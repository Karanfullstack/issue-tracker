import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { Link } from "@/app/components";
import NextLink from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { it } from "node:test";

interface SearchParamsProps {
	searchParams: {
		status: Status;
		orderBy: keyof Issue;
		sortType: "asc" | "desc";
	};
}

export default async function IssuePage({ searchParams }: SearchParamsProps) {
	const status = Object.values(Status).includes(searchParams.status)
		? searchParams.status
		: undefined;

	const issues = await prisma.issue.findMany({
		where: {
			status,
		},
		orderBy: {
			[searchParams.orderBy]: searchParams.sortType,
		},
	});

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

	console.log({ ...searchParams, orderBy: "title", sortType: "asc" });

	return (
		<div>
			<IssueActions />
			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						{columns.map((item) => (
							<Table.ColumnHeaderCell key={item.value}>
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
		</div>
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
			<ArrowUpIcon  className="inline ml-2"/>
		) : (
			<ArrowDownIcon  className="inline ml-2"/>
		)
	) : null;
};
// this to forcefully make dynamic
export const dynamic = "force-dynamic";
// for revlidate in terms of time
// export const revlidate = 0 or 60
