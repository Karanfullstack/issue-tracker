"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
const SimpleEditor = dynamic(() => import("react-simplemde-editor"), {
	ssr: false,
	loading: () => <p>Loading...</p>,
});
import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";

import { useRouter } from "next/navigation";

interface CreateIssueProps {
	title: string;
	description: string;
}

export default function NewIssuePage() {
	const [error, setError] = useState("");
	const router = useRouter();
	const { register, handleSubmit, control } = useForm<CreateIssueProps>();
	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root color="red" className="mb-4">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form
				onSubmit={handleSubmit(async (data) => {
					try {
						await axios.post("/api/issues", data);
						router.push("/issues");
					} catch (error) {
						setError("An unexpected error occured");
					}
				})}
				className="space-y-3 "
			>
				<TextField.Root placeholder="Title" {...register("title")} />
				<Controller
					control={control}
					name="description"
					render={({ field }) => (
						<SimpleEditor placeholder="Description" {...field} />
					)}
				/>
				<Button type="submit">Submit New Issue</Button>
			</form>
		</div>
	);
}
