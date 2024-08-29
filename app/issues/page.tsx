import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { Link, IssueStatusBadge } from "@/app/components";
import React from "react";
import delay from "delay";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from 'next/link';
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status: Status, orderBy: keyof Issue  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: {
    lable: string;
    value: keyof Issue;
    classNames?: string;
  }[] = [
    { lable: "Issue", value: "title" },
    { lable: "Status", value: "status", classNames: "hidden md:table-cell" },
    {
      lable: "Created",
      value: "createdAt",
      classNames: "hidden md:table-cell",
    },
  ];
  const statuses = Object.values(Status);
  const validStatus = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const issues = await prisma.issue.findMany({
    where: { status: validStatus },
  });
  // await delay(2000);
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.classNames}
              >
                <NextLink href={{
                  query: { ...searchParams, orderBy: column.value}
                }}>
                {column.lable}
                </NextLink>
                { column.value === searchParams.orderBy && <ArrowUpIcon className="inline"/>}
                
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
