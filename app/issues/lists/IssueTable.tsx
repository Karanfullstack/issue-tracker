import { IssueStatusBadge } from "@/app/components";
import { Table } from "@radix-ui/themes";
import { Link } from "@/app/components";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

export interface QueryParamsSearch {
    status: Status;
    orderBy: keyof Issue;
    sortType: "asc" | "desc";
    page: string;
}

interface TableProps {
    issues: Issue[];
    searchParams: QueryParamsSearch;
}

export default function IssueTable({ issues, searchParams }: TableProps) {
    return (
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
                                            searchParams.sortType === "asc"
                                                ? "desc"
                                                : "asc",
                                    },
                                }}
                            >
                                {item.label}
                            </NextLink>
                            <ArrowCompoent
                                value={item.value}
                                searchParams={searchParams}
                            />
                        </Table.ColumnHeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issues?.map((issue) => (
                    <Table.Row key={issue.id}>
                        <Table.Cell>
                            <Link href={`/issues/${issue.id}`}>
                                {issue.title}
                            </Link>
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
    );
}

export const columns: {
    label: string;
    value: keyof Issue;
    classNames?: string;
}[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", classNames: "hidden md:table-cell" },
    {
        label: "Created",
        value: "createdAt",
        classNames: "hidden md:table-cell",
    },
];
export const columnNames = columns.map((item) => item.value);

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
