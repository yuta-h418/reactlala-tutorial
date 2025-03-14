import { useState } from "react";

const BookList = ({ books, deleteBook, updateBook }) => {
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <span>タイトル: {book.title} 作者: {book.author}</span>
          <button onClick={() => deleteBook(book.id)}>削除</button>
          <button onClick={() => updateBook(book.id, editTitle || book.title, editAuthor || book.author)}>
            更新
          </button>
          <input
            type="text"
            placeholder="新しいタイトル"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="新しい作者"
            value={editAuthor}
            onChange={(e) => setEditAuthor(e.target.value)}
          />
        </li>
      ))}
    </ul>
  );
};

export default BookList;