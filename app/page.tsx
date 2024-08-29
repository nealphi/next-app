import Link from "next/link";
import React from "react";
import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination itemCount={100} pageSize={10} currentPage={2} />;
}
