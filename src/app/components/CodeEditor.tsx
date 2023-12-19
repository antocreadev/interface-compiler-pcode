// Import des dépendances
import React, { useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

interface CodeEditor{
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditor> = ({ initialValue, onChange }) => {
  const editorRef = useRef<AceEditor | null>(null);

  const handleEditorChange = (value: string) => {
    onChange(value);
  };

  return (
    <AceEditor
      ref={(ref) => (editorRef.current = ref)}
      mode="javascript"
      theme="monokai"
      onChange={handleEditorChange}
      value={initialValue}
      name="code-editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{ tabSize: 2 }}
      width='100%'
      height='100%'
    />
  );
};

export default CodeEditor;
