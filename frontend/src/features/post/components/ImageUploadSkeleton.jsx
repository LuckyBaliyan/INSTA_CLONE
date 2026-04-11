import "../styles/skeleton.scss";

export default function ImageUploadSkeleton({ hasImage = false, fileName = "" }) {
  return (
    <div className="upload-container">
      <div className={`upload-box${hasImage ? " is-uploaded" : ""}`}>
        <div className="upload-content">
          <div className="upload-icon">{hasImage ? "✓" : "+"}</div>
          <p className="upload-text">{hasImage ? "Image Selected" : "Upload Image"}</p>
          {hasImage && fileName ? (
            <p className="upload-subtext">{fileName}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
