"use client";
import { createIssueSchema } from "@/app/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleEditor = dynamic(() => import("react-simplemde-editor"), {
	ssr: false,
	loading: () => <p>Loading...</p>,
});

type CreateIssueProps = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
	// const [error, setError] = useState("");
	const router = useRouter();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<CreateIssueProps>({
		resolver: zodResolver(createIssueSchema),
	});
	return (
		<div className="max-w-xl">
			<form
				onSubmit={handleSubmit(async (data) => {
					try {
						await axios.post("/api/issues", data);
						router.push("/issues");
					} catch (error) {
						console.log(error);
					}
				})}
				className="space-y-3 "
			>
				{errors && <Text color="red" as="p">{errors.title?.message}</Text>}
				<TextField.Root placeholder="Title" {...register("title")} />

				<Controller
					control={control}
					name="description"
					render={({ field }) => (
						<SimpleEditor placeholder="Description" {...field} />
					)}
				/>
				{errors?.description && (
					<Text color="red" as="p">{errors.description.message}</Text>
				)}
				<Button type="submit">Submit New Issue</Button>
			</form>
		</div>
	);
}
