import React, { useState } from "react";

const FileUploadZone = ({
  onFilesUploaded,
  acceptedTypes = [],
  maxSize = 50, // MB
}) => {
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // 📌 Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  // 📌 Process and upload files
  const processFiles = (files) => {
    files.forEach(async (file) => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`❌ ${file.name} exceeds ${maxSize} MB limit`);
        return;
      }

      // Check file type (optional)
      if (acceptedTypes.length > 0 && !acceptedTypes.includes(file.type)) {
        alert(`❌ ${file.name} is not an accepted file type`);
        return;
      }

      // Create form data
      const formData = new FormData();
      formData.append("contentFile", file);

      try {
        // Send to backend
        const res = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        console.log("✅ Upload response:", data);

        if (data.success) {
          // Mark progress 100%
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: 100,
          }));

          // Save uploaded file details
          setUploadedFiles((prev) => [...prev, data.file]);

          // Notify parent
          if (onFilesUploaded) {
            onFilesUploaded([data.file]);
          }
        } else {
          alert("❌ Upload failed: " + data.message);
        }
      } catch (err) {
        console.error("❌ Upload error:", err);
        alert("Error uploading " + file.name);
      }
    });
  };

  // 📌 Remove file from list
  const removeFile = (fileName) => {
    setUploadedFiles((prev) => prev.filter((f) => f.storedName !== fileName));
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  };

  // 📌 Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="upload-zone">
      <h3>Upload Content Files</h3>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept={acceptedTypes.join(",")}
      />

      <ul>
        {uploadedFiles.map((file) => (
          <li key={file.storedName}>
            <strong>{file.name}</strong> ({file.size})
            <span> ✅ Uploaded</span>
            <button onClick={() => removeFile(file.storedName)}>Remove</button>
          </li>
        ))}
      </ul>

      <ul>
        {Object.keys(uploadProgress).map((fileName) => (
          <li key={fileName}>
            {fileName} - {uploadProgress[fileName]}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploadZone;

