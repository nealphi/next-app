import React from "react";
import dynamic from 'next/dynamic'
import prisma from "@/prisma/client";
import { notFound } from 'next/navigation';
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton/>
})
interface Props {
  params: {
    id: string;
  };
}
const EditIssuePage = async ({params: {id}}: Props) => {
    const issue = await prisma.issue.findUnique({where: {id: parseInt(id)}})
    if (!issue) notFound();

  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  );
};

export default EditIssuePage;
