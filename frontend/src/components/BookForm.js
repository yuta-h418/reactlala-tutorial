import { useState } from "react";
import "./BookForm.css";

const BookForm = ({ addBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = () => {
    if (!title || !author) {
      alert("タイトルと作者を入力してください");
      return;
    }
    addBook(title, author);
    setTitle("");
    setAuthor("");
  };

  return (
    <div className="form-container">
      <label>
        タイトル:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        作者:
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>作成</button>
    </div>
  );
};

export default BookForm;