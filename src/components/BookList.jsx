import { Table, Button, Space, Popconfirm, Tag, Image } from 'antd';

export default function BookList(props) {
  const columns = [
    {
      title: "Cover",
      dataIndex: 'coverUrl',
      key: 'coverUrl',
      
      render: (text) => (
        <Image
          src={`http://localhost:3080${text}`}
          height={80}
          fallback="https://via.placeholder.com/80x100?text=No+Cover"
        />
      ),
    },
    { title: "Title", dataIndex: 'title', key: 'title' },
    { title: "Author", dataIndex: 'author', key: 'author' },
    { title: "Price", dataIndex: 'price', key: 'price', render: (v) => `${v} THB` },
    {
      title: "Stock",
      dataIndex: 'stock',
      key: 'stock',
      render: (v) => <Tag color={v >= 30 ? "green" : "red"}>{v}</Tag>
    },
    {
      title: "Category",
      dataIndex: 'category',
      key: 'category',
     
      render: (cat) => <Tag color="blue">{cat?.name || "ทั่วไป"}</Tag>
    },
    { title: "Liked", dataIndex: 'likeCount', key: 'likeCount', render: (v) => `❤️ ${v}` },
    {
      title: "Action",
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => props.onLiked(record.id)}>Like </Button>
          <Button style={{ backgroundColor: '#FFEBCD', color: 'black' }}
            onClick={() => props.onEdit(record)}>Edit </Button>
          <Popconfirm title="ยืนยันการลบ?" onConfirm={() => props.onDeleted(record.id)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={props.data}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
}