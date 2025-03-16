import { useState, useEffect } from "react";
import "./BookList.css";

const BookList = ({ books, deleteBook, updateBook }) => {
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editBookId, setEditBookId] = useState(null);
  const [updatedBooks, setUpdatedBooks] = useState([]);

  useEffect(() => {
    setUpdatedBooks(books);
  }, [books]);

  const startEditing = (book) => {
    setIsEditing(true);
    setEditBookId(book.id);
    setEditTitle(book.title);
    setEditAuthor(book.author);
  };

  const handleUpdate = async (id) => {
    await updateBook(id, editTitle, editAuthor);
    setUpdatedBooks(updatedBooks.map(book => 
      book.id === id ? { ...book, title: editTitle, author: editAuthor } : book
    ));
    setIsEditing(false);
    setEditBookId(null);
    setEditTitle("");
    setEditAuthor("");
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditBookId(null);
    setEditTitle("");
    setEditAuthor("");
  };

  return (
    <div className="book-list">
      {updatedBooks.length > 0 ? (
        updatedBooks.map((book) => (
          <div className="book-card" key={book.id}>
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
                <div className="card-btn">
                  <button onClick={() => handleUpdate(book.id)}>更新</button>
                  <button onClick={() => deleteBook(book.id)}>削除</button>
                  <button onClick={cancelEdit}>キャンセル</button>
                </div>
              </>
            ) : (
              <>
                <span>タイトル: {book.title}</span>
                <span>作者: {book.author}</span>
                <button onClick={() => startEditing(book)}>編集</button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>本のデータがありません。</p>
      )}
    </div>
  );
};

export default BookList;