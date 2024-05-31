import { Button, TextArea, TextField } from "@radix-ui/themes";

export default function newIssue() {
	return (
		<div className="space-y-4 max-w-xl">
			<TextField.Root placeholder="Title" />
			<TextArea placeholder="Description" />
			<Button>Submit New Issue</Button>
		</div>
	);
}
