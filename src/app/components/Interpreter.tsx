// import redux toolkit
import type { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import interpreter from "@/compiler/interpreter";
import { updateHistoPcode } from "@/features/histoPcode/histoPcodeSlice";
import { updateOutPutArr } from "@/features/outPutArr/outPutArrSlice";
export default function Interpreter() {
  const dispatch = useDispatch();
  // redux toolkit
  const pcode = useSelector((state: RootState) => state.pcode.value);
  const error = useSelector((state: RootState) => state.error.value);

  return (
    <div
      className="btn btn-success"
      onClick={() => {
        if (error == "") {
          if (pcode) {
            const { historique, outputArr } = interpreter(pcode);
            if (historique) {
              dispatch(updateHistoPcode(historique));
              dispatch(updateOutPutArr(outputArr));
              console.log(outputArr);
            }
          }
        }
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
      </svg>
    </div>
  );
}
