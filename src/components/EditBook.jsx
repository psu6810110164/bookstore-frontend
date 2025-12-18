import { Modal, Form, Select, Input, InputNumber } from 'antd';
import { useEffect } from 'react';

export default function EditBook(props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.isOpen && props.item) {
      form.setFieldsValue(props.item);
    }
  }, [props.isOpen, props.item, form]);

  const handleFormSubmit = () => {
    form.validateFields()
      .then(formData => {
        props.onSave(formData); 
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Edit Book"
      open={props.isOpen}
      onOk={handleFormSubmit}
      onCancel={() => {
        form.resetFields();
        props.onCancel();
      }}
      okText="Save"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="ชื่อหนังสือ" />
        </Form.Item>

        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
          <Input placeholder="ชื่อผู้แต่ง" />
        </Form.Item>

        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber placeholder="ราคา" min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
          <InputNumber placeholder="จำนวน" min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
          <Select 
            placeholder="เลือกหมวดหมู่"
            allowClear 
            options={props.categories} 
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}