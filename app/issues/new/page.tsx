import React from "react";
import dynamic from "next/dynamic";
import IssueSkeleton from "../_components/IssueSkeleton";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
    ssr: false,
    loading: () => <IssueSkeleton />,
});

export default function NewIssuePage() {
    return <IssueForm />;
}
