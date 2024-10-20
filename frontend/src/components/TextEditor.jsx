// src/components/TextEditor.js
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

const TextEditor = ({ onChange, value }) => {

  return (
    <div className="border p-2 rounded-md shadow-sm bg-white">
      <ReactQuill
        onChange={onChange}
        value={value}
        theme="snow" 
        className="h-full text-gray-950 font-medium bg-white "
      />
    </div>
  );
};

export default TextEditor;
