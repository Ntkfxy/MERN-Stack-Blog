import { forwardRef, useRef, useImperativeHandle } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";

const Editor = forwardRef(({ value, onChange }, ref) => {
  // เก็บ reference ของ ReactQuill
  const quillRef = useRef(null);

  // expose method ให้ component แม่เรียกใช้งาน editor ได้
  useImperativeHandle(ref, () => ({
    getQuill: () => quillRef.current?.getEditor(),
  }));

  // toolbar configuration
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      style={{ height: "300px", marginBottom: "2rem" }}
    />
  );
});

Editor.displayName = "Editor";

export default Editor;