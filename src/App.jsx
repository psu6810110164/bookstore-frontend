import { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider, Spin, message } from 'antd';
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

// ตั้งค่า Base URL ตามหน้า 12
axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  // ฟังก์ชันดึงข้อมูลหนังสือ (หน้า 12)
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/book"); //
      setBookData(response.data);
    } catch (err) {
      console.log(err);
      message.error("ดึงข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันเพิ่มหนังสือ (หน้า 15)
  const handleAddBook = async (book) => {
    try {
      await axios.post("/api/book", book); 
      message.success("เพิ่มหนังสือสำเร็จ");
      fetchBooks(); 
    } catch (err) {
      message.error("ไม่สามารถเพิ่มหนังสือได้");
    }
  };

  // ฟังก์ชันกด Like (หน้า 16)
  const handleLikeBook = async (bookId) => {
    try {
      await axios.post(`/api/book/${bookId}/like`);
      fetchBooks();
    } catch (err) {
      console.log(err);
    }
  };

  // ฟังก์ชันลบหนังสือ (หน้า 17)
  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`/api/book/${bookId}`);
      message.success("ลบหนังสือเรียบร้อย");
      fetchBooks();
    } catch (err) {
      console.log(err);
    }
  };

  // เรียกดึงข้อมูลครั้งแรก
  useEffect(() => {
    fetchBooks();
  }, []);

  // คำนวณราคารวม (Logic จากสไลด์ 01)
  useEffect(() => {
    const total = bookData.reduce((sum, book) => sum + (book.price * book.stock), 0);
    setTotalAmount(total);
  }, [bookData]);

  return (
    <div style={{ padding: '20px' }}>
      {}
      <h1 style={{ textAlign: 'center' }}>My Book Store</h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2em" }}>
        <AddBook onBookAdded={handleAddBook} />
      </div>

      <Divider>My Books List</Divider>
      
      <h3 style={{ textAlign: 'center' }}>
        My books worth {totalAmount.toLocaleString()} dollars
      </h3>

      <Spin spinning={loading}>
        <BookList
          data={bookData}
          onLiked={handleLikeBook}
          onDeleted={handleDeleteBook}
        />
      </Spin>
    </div>
  );
}

export default App;