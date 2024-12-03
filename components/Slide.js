export default function Slide({ title, content }) {
    return (
      <div style={slideStyle}>
        <h2 style={titleStyle}>{title}</h2>
        <p style={contentStyle}>{content}</p>
      </div>
    );
  }
  
  const slideStyle = {
    padding: "20px",
    maxWidth: "600px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };
  
  const titleStyle = {
    fontSize: "2rem",
    color: "#333",
    margin: "0 0 10px",
  };
  
  const contentStyle = {
    fontSize: "1.2rem",
    color: "#555",
  };
  