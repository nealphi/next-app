import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { Link, IssueStatusBadge } from "@/app/components";
import React from "react";
import delay from "delay";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
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
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5;

  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status: status }
  });

  // await delay(2000);
  return (
    <div className="m-5">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.classNames}
              >
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.lable}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                <div className="block my-2 md:hidden">
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
     
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page}       
      />
     
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
