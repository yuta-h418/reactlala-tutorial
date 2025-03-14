import { useEffect, useState } from "react";
import axios from "axios";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/books/")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("データ取得エラー:", error));
  }, []);

  const addBook = (title, author) => {
    axios
      .post("http://localhost:8000/api/books/", { title, author })
      .then((response) => setBooks([...books, response.data]))
      .catch((error) => console.error("追加エラー:", error));
  };

  const deleteBook = (id) => {
    axios
      .delete(`http://localhost:8000/api/books/${id}`)
      .then(() => setBooks(books.filter((book) => book.id !== id)))
      .catch((error) => console.error("削除エラー:", error));
  };

  const updateBook = (id, title, author) => {
    axios
      .patch(`http://localhost:8000/api/books/${id}`, { title, author })
      .then((response) => setBooks(books.map((book) => (book.id === id ? response.data : book))))
      .catch((error) => console.error("更新エラー:", error));
  };

  return (
    <div>
      <h1>本の管理</h1>
      <BookForm addBook={addBook} />
      <BookList books={books} deleteBook={deleteBook} updateBook={updateBook} />
    </div>
  );
};

export default App;