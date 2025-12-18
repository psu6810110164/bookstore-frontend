import { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider, Spin, message } from 'antd';
import BookList from "./BookList";
import AddBook from "./AddBook";
import EditBook from './EditBook';

function BookScreen() {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/book-category");
      const options = response.data.map(cat => ({
        label: cat.name,
        value: cat.id
      }));
      setCategories(options);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/book");
      setBookData(response.data);
    } catch (err) {
      message.error("ดึงข้อมูลไม่สำเร็จ");
    } finally { setLoading(false); }
  };

  const handleUpdateBook = async (formData) => {
    try {
      const payload = {
        title: formData.title,
        author: formData.author,
        price: Number(formData.price),
        stock: Number(formData.stock),
        categoryId: Number(formData.categoryId),
      };

      if (isNaN(payload.price) || payload.price <= 0) {
        message.error("Price ต้องเป็นตัวเลขมากกว่า 0");
        return;
      }

      await axios.patch(`/api/book/${formData.id}`, payload);

      message.success("แก้ไขข้อมูลสำเร็จ");
      setEditingItem(null);
      fetchBooks();
    } catch (err) {
      console.log("BACKEND ERROR:", err.response?.data);
      message.error("แก้ไขไม่สำเร็จ");
    }
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

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const totalAmount = bookData.reduce((sum, b) => sum + (b.price * b.stock), 0);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>My Book Store</h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2em" }}>
        <AddBook onBookAdded={handleAddBook} categories={categories} />
      </div>
      <Divider>My Books List</Divider>
      <h3 style={{ textAlign: 'center' }}>
        Total Value: {totalAmount.toLocaleString()} dollars
      </h3>
      <Spin spinning={loading}>
        <BookList data={bookData} onLiked={handleLikeBook} onDeleted={handleDeleteBook} onEdit={(record) => setEditingItem(record)} />
      </Spin>
      <EditBook
        isOpen={editingItem !== null}
        item={editingItem}
        categories={categories}
        onCancel={() => setEditingItem(null)}
        onSave={handleUpdateBook} />
    </div>
  );
}

export default BookScreen;