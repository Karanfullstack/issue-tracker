"use client";
import { Issue, User } from "@prisma/client";
import { Avatar, Text, Flex, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
export default function AssigneSelect({ issue }: { issue: Issue }) {
	const router = useRouter();
	const { data: users, error, isLoading } = useUsers();

	if (isLoading) return <Skeleton height={"2rem"} />;

	if (error) return null;
	const onChangeAssigne = async (userId: string) => {
		try {
			await axios.patch("/api/issues/" + issue.id, {
				assignedToUserID: userId === "unassigned" ? null : userId,
			});
			const user = users?.find((user) => user.id === userId);
			toast((t) => (
				<Flex gap={"2"} align={"center"}>
					{user && <Avatar radius="full" src={user?.image!} fallback={""} />}
					<Text weight={"bold"}>
						{(user && "Assiged To " + user.name) || "User UnAssigned"}{" "}
					</Text>
				</Flex>
			));
			router.refresh();
		} catch (error) {
			toast.error("Changes Could Not Be Done!");
		}
	};
	return (
		<>
			<Toaster />
			<Select.Root
				defaultValue={issue.assignedToUserID || "unassigned"}
				onValueChange={onChangeAssigne}
			>
				<Select.Trigger placeholder="Asssigne.." />
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						<Select.Item value={"unassigned"}>Unassigned</Select.Item>
						{users?.map((user) => (
							<Select.Item key={user.id} value={user.id}>
								<Avatar
									size={"1"}
									radius="full"
									mr="3"
									src={user.image!}
									fallback={"?"}
								/>
								{user.name}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</>
	);
}

const useUsers = () =>
	useQuery<User[]>({
		queryKey: ["users"],
		queryFn: () => axios.get("/api/users").then((res) => res.data),
		retry: 3,
		staleTime: 60 * 1000,
	});
