"use client";
import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    issueId: number;
}
export default function DeleteIssueButton({ issueId }: Props) {
    const [error, setError] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    const onDelete = async () => {
        try {
            setDeleting(true);
            await axios.delete("/api/issues/" + issueId);
            router.push("/issues/lists");
            router.refresh();
        } catch (error) {
            setError(true);
            setDeleting(false);
        }
    };
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red" disabled={deleting}>
                        Delete Issue
                        {deleting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you want to delete this issue?
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button
                                variant="solid"
                                color="red"
                                onClick={onDelete}
                            >
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>
                        This issue could not be deleted
                    </AlertDialog.Description>
                    <Button
                        onClick={() => setError(false)}
                        variant="soft"
                        color="crimson"
                        mt={"2"}
                    >
                        OK
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
}
