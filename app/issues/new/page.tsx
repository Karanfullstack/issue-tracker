"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { createIssueSchema } from "@/app/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleEditor = dynamic(() => import("react-simplemde-editor"), {
	ssr: false,
});
type CreateIssueProps = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
	const [error, setError] = useState("");
	const [isSubmitting, setSubmit] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		control,

		formState: { errors },
	} = useForm<CreateIssueProps>({
		resolver: zodResolver(createIssueSchema),
	});

	const onSubmit = async (data: FieldValues) => {
		try {
			setSubmit(true);
			await axios.post("/api/issues", data);
			router.push("/issues");
		} catch (error) {
			setSubmit(false);
			setError("An unexpected error occured!");
		}
	};

	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root className="mb-4">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-3 ">
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<TextField.Root placeholder="Title" {...register("title")} />

				<Controller
					control={control}
					name="description"
					render={({ field }) => (
						<SimpleEditor placeholder="Description" {...field} />
					)}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting} type="submit">
					Submit New Issue {isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>
	);
}
