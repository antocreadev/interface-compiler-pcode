"use client";
// import hook react
import { useRef } from "react"

// import redux toolkit
import type { RootState } from '@/store'
import { useSelector, useDispatch } from 'react-redux'
import { updateCode } from '@/features/code/codeSlice'

// component
const TextareaCode = () => {

    // ref react
    const contentTextArea = useRef<HTMLTextAreaElement>(null);

    // redux toolkit
    const code = useSelector((state: RootState) => state.code.value)
    const dispatch = useDispatch()

  return (
    <textarea className="textarea resize-none" placeholder="var a = 10" ref={contentTextArea} onChange={()=>{
        if (contentTextArea && contentTextArea.current) {
            const newContent = contentTextArea.current.value;
            dispatch(updateCode(newContent))
        }
    }}>
      
    </textarea>
  )
}
export default TextareaCode
