import { useState } from "react";

const BookList = ({ books, deleteBook, updateBook }) => {
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  const startEditing = (book) => {
    setIsEditing(true);
    setEditBookId(book.id);
    setEditTitle(book.title);
    setEditAuthor(book.author);
  };

  const handleUpdate = async (id) => {
    await updateBook(id, editTitle, editAuthor);
    setIsEditing(false);
    setEditBookId(null);
    setEditTitle("");
    setEditAuthor("");
  };

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          {isEditing && editBookId === book.id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                type="text"
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
              />
              <button onClick={() => handleUpdate(book.id)}>更新</button>
              <button onClick={() => deleteBook(book.id)}>削除</button>
            </>
          ) : (
            <>
              <span>タイトル: {book.title} 作者: {book.author}</span>
              <button onClick={() => startEditing(book)}>編集</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BookList;