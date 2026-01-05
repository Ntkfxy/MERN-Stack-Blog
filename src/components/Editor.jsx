import { forwardRef, useRef, useImperativeHandle } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = forwardRef(({ value, onChange }, ref) => {
  const quillRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getQuill: () => quillRef.current?.getEditor(),
  }));



  const toolbarOptions = ["bold", "italic", "underline", "strike"];
  const modules = { toolbar: toolbarOptions };

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      // formats={formats}
      style={{ height: "300px", marginBottom: "2rem" }}
    />
  );
});

export default Editor;
