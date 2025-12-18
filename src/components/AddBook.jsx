import { Button, Form, Select, Input, InputNumber, Space } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

const URL_CATEGORY = "/api/book-category";

export default function AddBook(props) {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(URL_CATEGORY);
      
      const options = response.data.map(cat => ({
        label: cat.name,
        value: cat.id
      }));
      setCategories(options);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  
  useEffect(() => {
    fetchCategories();
  }, []);

  const onFinish = (values) => {
    
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

      {}
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