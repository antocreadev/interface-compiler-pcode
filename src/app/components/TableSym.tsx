"use client";
// import redux toolkit
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function TableSym() {
  // redux toolkit
  const tableSym = useSelector((state: RootState) => state.tableSym.value);
  return (
    <div>{tableSym != null ? JSON.stringify(tableSym, null, 2) : null}</div>
  );
}
