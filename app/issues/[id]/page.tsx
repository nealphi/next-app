import prisma from "@/prisma/client";
import { Grid, Box, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import IssueDetails from "./IssueDetails";
import delay from "delay";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";

interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue) notFound();
  // await delay(2000);
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
       <Flex direction={'column'} gap='4'>
       <EditIssueButton issueId={issue.id} />
       <DeleteIssueButton issueId={issue.id}/>
       </Flex>
     </Box>
    </Grid>
  );
};

export default IssueDetailPage;
