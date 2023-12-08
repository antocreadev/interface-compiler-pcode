// import redux toolkit
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function Error() {
  // redux toolkit
  const error = useSelector((state: RootState) => state.error.value);
  return <p>{error}</p>;
}
