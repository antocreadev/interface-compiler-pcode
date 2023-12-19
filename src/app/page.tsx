"use client";
// import Components
import TextareaCode from "@/app/components/TextareaCode";

// import redux toolkit
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

// import components
import Ast from "./components/Ast";
import Error from "./components/Error";
import TableSym from "./components/TableSym";
import Pcode from "./components/Pcode";
import Interpreter from "./components/Interpreter";
import HistoPcode from "./components/HistoPcode";

export default function Home() {
  // redux toolkit
  const code = useSelector((state: RootState) => state.code.value);
  const outPutArray = useSelector((state: RootState) => state.outPutArr.value);
  return (
    <main className="h-screen grid grid-cols-10 p-3">
      <div className="flex flex-col items-center gap-10 col-span-1">
        <Interpreter />
        <div>
          <p>Symbol table : </p>
          <TableSym />
        </div>
        <div>
          <p>Output : </p>
          <div className="w-full h-1/2 overflow-y-auto h-full">
            <ul className="list-disc list-inside ">
              {
                outPutArray == null ? <li className="hidden"></li> :
              outPutArray.map((item, index) => (
                <li key={index}>{item}</li>
              ))
              }
            </ul>
          </div>
        </div>
      </div>

      <section className="flex flex-wrap col-span-9">
        <div className="w-1/2 h-1/2 flex justify-center items-center flex-col">
          <h1 className="text-xl">Editeur</h1>
          <div className="p-4 w-full h-full">
            <TextareaCode />
          </div>
          <Error />
        </div>

        <div className="w-1/2 h-1/2 flex justify-center items-center flex-col">
          <h1 className="text-xl">Abstract Syntax Tree</h1>
          <div className="p-4 w-full h-full">
            <Ast />
          </div>
        </div>

        <div className="w-1/2 h-1/2 flex justify-center items-center flex-col">
          <h1 className="text-xl">P-code machine</h1>
          <div className="p-4 w-full h-full">
          <Pcode />
          </div>
        </div>

        <div className="w-1/2 h-1/2 flex justify-center items-center flex-col">
          <h1 className="text-xl">Stack history</h1>
          <div className="p-4 w-full h-full">
          <HistoPcode />
          </div>
        </div>
      </section>
    </main>
  );
}
