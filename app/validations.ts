import { z } from "zod";
export const IssueScema = z.object({
	title: z.string().min(1, "Title is required").max(255),
	description: z.string().min(1, "Description is required"),
});

export const UpdateIssueSchema = z.object({
	title: z.string().min(1, "Title is required").max(255).optional(),
	description: z
		.string()
		.min(1, "Description is required")
		.max(56000)
		.optional(),
		assignedToUserID: z
		.string()
		.min(1, "assignedToUserID is required")
		.optional()
		.nullable(),
});
