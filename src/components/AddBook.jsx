import { Button, Form, Select, Input, InputNumber, Space } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

// 1. ตั้งค่า URL สำหรับดึงหมวดหมู่ (หน้า 14)
const URL_CATEGORY = "/api/book-category";

export default function AddBook(props) {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]); // เก็บรายการหมวดหมู่ที่ดึงมาจาก Server [cite: 239]

  // 2. ฟังก์ชันดึงรายการหมวดหมู่จาก Server (หน้า 14) [cite: 240, 242]
  const fetchCategories = async () => {
    try {
      const response = await axios.get(URL_CATEGORY);
      // ปรับรูปแบบข้อมูลให้เข้ากับ Select ของ Ant Design (label และ value)
      const options = response.data.map(cat => ({
        label: cat.name,
        value: cat.id
      }));
      setCategories(options);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // 3. เรียกดึงหมวดหมู่ทันทีที่ Component โหลด (หน้า 14) [cite: 244, 245, 246]
  useEffect(() => {
    fetchCategories();
  }, []);

  const onFinish = (values) => {
    // 4. ส่งข้อมูลกลับไปที่ App.jsx (หน้า 15)
    // หมายเหตุ: Backend ต้องการ categoryId เป็นตัวเลข ไม่ใช่ชื่อหมวดหมู่ [cite: 274]
    props.onBookAdded(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={onFinish}
      style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input placeholder="ชื่อหนังสือ" />
      </Form.Item>

      <Form.Item name="author" label="Author" rules={[{ required: true }]}>
        <Input placeholder="ชื่อผู้แต่ง" />
      </Form.Item>

      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
        <InputNumber placeholder="ราคา" min={0} />
      </Form.Item>

      <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
        <InputNumber placeholder="จำนวน" min={0} />
      </Form.Item>

      {/* 5. ช่องเลือกหมวดหมู่ที่ดึงมาจาก API (หน้า 14) [cite: 250] */}
      <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
        <Select 
          placeholder="เลือกหมวดหมู่"
          allowClear 
          style={{ width: "150px" }} 
          options={categories} 
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">New Book</Button>
      </Form.Item>
    </Form>
  );
}