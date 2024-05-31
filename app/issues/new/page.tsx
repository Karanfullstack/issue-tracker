"use client";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import { Button, TextField } from "@radix-ui/themes";

export default function newIssue() {
	return (
		<div className="space-y-3 max-w-xl">
			<TextField.Root placeholder="Title" />
			<SimpleMDE placeholder="Description" />
			<Button>Submit New Issue</Button>
		</div>
	);
}
