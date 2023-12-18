// components/MonacoEditor.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false });

interface MonacoEditorProps {
  code: string;
  onChange: (newCode: string) => void;
}

const MonacoEditorComponent: React.FC<MonacoEditorProps> = ({ code, onChange }) => {
  const editorOptions: monacoEditor.editor.IStandaloneEditorConstructionOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line', // Correction ici
    automaticLayout: true,
  };

  return (
    <MonacoEditor
      height="400"
      language="typescript"
      theme="vs-dark"
      value={code}
      options={editorOptions}
      onChange={onChange}
    />
  );
};

export default MonacoEditorComponent;
