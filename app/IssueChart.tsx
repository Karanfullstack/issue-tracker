"use client";
import { Card } from "@radix-ui/themes";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
interface Props {
	open: number;
	inProgress: number;
	closed: number;
}
interface Data {
	name: string;
	value: number;
}
export default function IssueChart({ inProgress, closed, open }: Props) {
	const data: Data[] = [
		{ name: "Open Issues", value: open },
		{ name: "In-Progress Issues", value: inProgress },
		{ name: "Closed Issues", value: closed },
	];

	return (
		<Card className=" h-full w-full">
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data}>
					<XAxis dataKey="name" />
					<YAxis />
					<Bar
						dataKey="value"
						style={{ fill: "var(--accent-9)" }}
						barSize={50}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Card>
	);
}
