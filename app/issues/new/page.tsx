"use client";
import { Button, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
const SimpleEditor = dynamic(() => import("react-simplemde-editor"), {
	ssr: false,
});
import { useForm, Controller } from "react-hook-form";
import React from "react";

import { useRouter } from "next/navigation";

interface CreateIssueProps {
	title: string;
	description: string;
}

export default function NewIssuePage() {
	const router = useRouter();
	const { register, handleSubmit, control } = useForm<CreateIssueProps>();
	return (
		<form
			onSubmit={handleSubmit(async (data) => {
				const result = await axios.post("/api/issues", data);
				console.log(result);
				router.push("/issues");
			})}
			className="space-y-3 max-w-xl"
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
	);
}
