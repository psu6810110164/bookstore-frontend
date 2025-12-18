import { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider, Spin, message } from 'antd';
import BookList from "./BookList";
import AddBook from "./AddBook";

function BookScreen() {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/book");
      setBookData(response.data);
    } catch (err) {
      message.error("ดึงข้อมูลไม่สำเร็จ");
    } finally { setLoading(false); }
  };

  const handleAddBook = async (book) => {
    try {
      await axios.post("/api/book", book);
      message.success("เพิ่มหนังสือสำเร็จ");
      fetchBooks();
    } catch (err) { message.error("เพิ่มไม่สำเร็จ"); }
  };

  const handleLikeBook = async (id) => {
    try {
      await axios.post(`/api/book/${id}/like`);
      fetchBooks();
    } catch (err) { console.log(err); }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`/api/book/${id}`);
      message.success("ลบสำเร็จ");
      fetchBooks();
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchBooks(); }, []);

  const totalAmount = bookData.reduce((sum, b) => sum + (b.price * b.stock), 0);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>My Book Store</h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2em" }}>
        <AddBook onBookAdded={handleAddBook} />
      </div>
      <Divider>My Books List</Divider>
      <h3 style={{ textAlign: 'center' }}>
        Total Value: {totalAmount.toLocaleString()} dollars
      </h3>
      <Spin spinning={loading}>
        <BookList data={bookData} onLiked={handleLikeBook} onDeleted={handleDeleteBook} />
      </Spin>
    </div>
  );
}

export default BookScreen;