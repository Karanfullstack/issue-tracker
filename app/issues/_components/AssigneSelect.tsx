"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";

export default function AssigneSelect({ issue }: { issue: Issue }) {
	const {
		data: users,
		error,
		isLoading,
	} = useQuery<User[]>({
		queryKey: ["users"],
		queryFn: () => axios.get("/api/users").then((res) => res.data),
		retry: 3,
		staleTime: 60 * 1000,
	});

	if (isLoading) return <Skeleton height={"2rem"} />;

	if (error) return null;
	return (
		<Select.Root
			defaultValue={issue.assignedToUserID || "unassigned"}
			onValueChange={(userId) => {
				axios.patch("/api/issues/" + issue.id, {
					assignedToUserID: userId === "unassigned" ? null : userId,
				});
			}}
		>
			<Select.Trigger placeholder="Asssigne.." />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					<Select.Item value={"unassigned"}>Unassigned</Select.Item>
					{users?.map((user) => (
						<Select.Item key={user.id} value={user.id}>
							{user.name}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
}
