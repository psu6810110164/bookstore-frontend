import { Modal, Form, Select, Input, InputNumber } from 'antd';
import { useEffect } from 'react';

export default function EditBook(props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.isOpen && props.item) {
      form.setFieldsValue({
        id: props.item.id,
        title: props.item.title,
        author: props.item.author,
        price: Number(props.item.price),
        stock: Number(props.item.stock),
        categoryId: Number(props.item.category?.id),
      });
    }
  }, [props.isOpen, props.item]);



  const handleFormSubmit = () => {
    form.validateFields().then(formData => {
      props.onSave(formData);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Edit Book"
      open={props.isOpen}
      onOk={handleFormSubmit}
      onCancel={props.onCancel}
    >
      <Form form={form} layout="vertical">

        { }
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Price" rules={[{ required: true }, { type: 'number', min: 0.01 }]}>
          <InputNumber min={0.01} step={0.01} style={{ width: '100%' }} />
        </Form.Item>


        <Form.Item name="stock" label="Stock" rules={[{ required: true }, { type: 'number', min: 0 }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
          <Select options={props.categories} />
        </Form.Item>

      </Form>
    </Modal>
  );
}
