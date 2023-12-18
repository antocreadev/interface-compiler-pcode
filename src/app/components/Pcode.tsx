// import redux toolkit
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function Pcode() {
  // redux toolkit
  const pcode = useSelector((state: RootState) => state.pcode.value);
  return (
    <div>
      {pcode != null
        ? pcode.map((item, index) => (
            <div key={index}>
              <p>{item.op} {item.arg}</p>
            </div>
          ))
        : null}
    </div>
  );
}
