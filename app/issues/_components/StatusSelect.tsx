"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
interface StatusProps {
    value: Status;
    label: string;
}

interface Props {
    issue: Issue;
}

const status: StatusProps[] = [
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "IN_PROGRESS" },
];
export default function StatusSelect({ issue }: Props) {
    const { status: session } = useSession();

    const router = useRouter();
    const changeStatus = async (status: Status) => {
        try {
            await axios.patch("/api/issues/" + issue.id, { status });
            toast.success("Status changed to " + status.toLocaleLowerCase());
            router.refresh();
        } catch (error) {
            toast.error("Changes cannot be done");
        }
    };
    return (
        <>
            {session === "authenticated" && (
                <>
                    <Toaster />

                    <Select.Root
                        defaultValue={issue.status}
                        onValueChange={changeStatus}
                    >
                        <Select.Trigger placeholder="Change Status..." />
                        <Select.Content>
                            {status.map((item) => (
                                <Select.Item
                                    key={item.label}
                                    value={item.value}
                                >
                                    {item.label}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
                </>
            )}
        </>
    );
}
