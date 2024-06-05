"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

interface Props {
	issueId: number;
}
export default function DeleteIssueButton({ issueId }: Props) {
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button color="red">Delete Issue</Button>
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
						<Button variant="solid" color="red">
							Delete
						</Button>
					</AlertDialog.Action>
				</Flex>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
}