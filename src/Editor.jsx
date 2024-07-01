import React, { useState, useCallback } from "react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import styled from "styled-components";
import ReactQuill, { Quill } from "react-quill";
import QuillResizeImage from "quill-resize-image";

import handleImageUpload from "./imageUploadHandler"; // Import image upload handler
import handleVideoUpload from "./videoUploadHandler"; // Import video upload handler

Quill.register("modules/resize", QuillResizeImage);

const Heading = styled.input`
  marginbottom: "20px";
  width: "100%";
  padding: "10px";
  fontsize: "18px";
`;

const Editor = () => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  let quillRef = null;

  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const saveContent = async () => {
    console.log(heading, content);
    try {
      const response = await axios.post("http://localhost:5000/articles", {
        heading,
        content,
      });
      console.log("Article saved:", response.data);
      // Redirect or update UI to show the saved article link
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const range = quillRef.getEditor().getSelection();
        quillRef
          .getEditor()
          .insertEmbed(range.index, "image", response.data.imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
  }, [quillRef]);

  const modules = {
    resize: {
      locale: {
        center: "center",
      },
    },
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
        [{ align: [] }],
        ["code-block"],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
  };

  return (
    <div>
      <Heading
        type="text"
        value={heading}
        onChange={handleHeadingChange}
        placeholder="Enter article heading"
      />
      <ReactQuill
        ref={(el) => {
          if (el) quillRef = el;
        }}
        value={content}
        onChange={handleContentChange}
        modules={modules}
        style={{ height: "100%", marginBottom: "20px" }}
      />
      <button
        onClick={saveContent}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Save
      </button>
    </div>
  );
};

export default Editor;
