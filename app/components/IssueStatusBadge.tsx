import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

interface Props {
    status: Status;
}

const issueMap: Record<
    Status,
    { label: string; color: "red" | "violet" | "green" }
> = {
    OPEN: { label: "Open", color: "red" },
    IN_PROGRESS: { label: "In Progress", color: "violet" },
    CLOSED: { label: "Closed", color: "green" },
};
export default function IssueStatusBadge({ status }: Props) {
    return (
        <Badge color={issueMap[status].color}>{issueMap[status].label}</Badge>
    );
}
