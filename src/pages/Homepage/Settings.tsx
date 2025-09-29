import React, { useContext, useState } from 'react'
import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Divider,
  Upload,
  message,
  Row,
  Col,
  Typography,
  Space
} from 'antd'
import {
  UserOutlined,
  UploadOutlined,
  SaveOutlined,
  LockOutlined,
  HistoryOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { userContext } from '~/context/userContext'
import type { UploadProps } from 'antd'

const { Title, Text } = Typography

const Settings: React.FC = () => {
  const { user, setUser } = useContext(userContext)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  // Initialize form with user data
  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        username: user.username,
        email: user.username + '@hcmut.edu.vn', // Mock email
        phone: '+84 123 456 789', // Mock phone
        bio: 'Sinh viên năm 3 ngành Công nghệ Thông tin'
      })
    }
  }, [user, form])

  const handleSaveProfile = async (values : unknown) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Update user in context and localStorage
      if (user) {
        const updatedUser = { ...user, name: values.name }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }

      message.success('Cập nhật thông tin thành công!')
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật thông tin!')
    } finally {
      setLoading(false)
    }
  }

  const uploadProps: UploadProps = {
    name: 'avatar',
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('Chỉ có thể upload file JPG/PNG!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Hình ảnh phải nhỏ hơn 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success('Cập nhật avatar thành công!')
      } else if (info.file.status === 'error') {
        message.error('Cập nhật avatar thất bại!')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Title level={2} className="mb-8 text-center">⚙️ Cài đặt tài khoản</Title>

        <Row gutter={[24, 24]}>
          {/* Profile Settings */}
          <Col xs={24} lg={16}>
            <Card title="� Thông tin cá nhân" className="mb-6">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSaveProfile}
                className="space-y-4"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      label="Họ và tên"
                      rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                    >
                      <Input placeholder="Nhập họ và tên" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="username"
                      label="Tên đăng nhập"
                    >
                      <Input placeholder="Tên đăng nhập" size="large" disabled />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { type: 'email', message: 'Email không hợp lệ!' }
                      ]}
                    >
                      <Input placeholder="Nhập email" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="phone"
                      label="Số điện thoại"
                    >
                      <Input placeholder="Nhập số điện thoại" size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="bio"
                  label="Giới thiệu về bản thân"
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Viết vài dòng giới thiệu về bản thân..."
                    maxLength={200}
                    showCount
                    size="large"
                  />
                </Form.Item>

                <Form.Item className="mb-0">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    icon={<SaveOutlined />}
                    className="px-8"
                  >
                    Lưu thay đổi
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            {/* Student Academic Information */}
            <Card title="🎓 Thông tin học vụ" className="mb-6">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Text type="secondary" className="block mb-1">Mã số sinh viên</Text>
                    <Text strong className="text-lg text-blue-600">2152001</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <Text type="secondary" className="block mb-1">Khóa học</Text>
                    <Text strong className="text-lg text-green-600">K21</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <Text type="secondary" className="block mb-1">Ngành đào tạo</Text>
                    <Text strong className="text-purple-600">Công nghệ Thông tin</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <Text type="secondary" className="block mb-1">Năm học hiện tại</Text>
                    <Text strong className="text-orange-600">2024-2025</Text>
                  </div>
                </Col>
              </Row>

              <Divider />

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <div className="text-center">
                    <Text strong className="text-2xl text-blue-500 block">3.65</Text>
                    <Text type="secondary">GPA Tích lũy</Text>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-center">
                    <Text strong className="text-2xl text-green-500 block">128</Text>
                    <Text type="secondary">Tín chỉ đã tích lũy</Text>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-center">
                    <Text strong className="text-2xl text-purple-500 block">32</Text>
                    <Text type="secondary">Tín chỉ còn lại</Text>
                  </div>
                </Col>
              </Row>
            </Card>

            {/* Academic Progress */}
            <Card title="📊 Tiến độ học tập">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <Text strong>Học kỳ hiện tại</Text>
                    <br />
                    <Text type="secondary">Học kỳ 1 - Năm học 2024-2025</Text>
                  </div>
                  <Text strong className="text-blue-600">Đang học</Text>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <Text strong>Số môn đang học</Text>
                    <br />
                    <Text type="secondary">Tổng cộng 6 môn học</Text>
                  </div>
                  <Text strong className="text-green-600">20 tín chỉ</Text>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <Text strong>Trạng thái học tập</Text>
                    <br />
                    <Text type="secondary">Đánh giá tổng quát</Text>
                  </div>
                  <Text strong className="text-green-600">Tốt</Text>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <Text strong>Dự kiến tốt nghiệp</Text>
                    <br />
                    <Text type="secondary">Thời gian hoàn thành chương trình</Text>
                  </div>
                  <Text strong className="text-purple-600">06/2026</Text>
                </div>
              </div>
            </Card>
          </Col>

          {/* Avatar and Quick Info */}
          <Col xs={24} lg={8}>
            <Card title="📷 Ảnh đại diện" className="text-center mb-6">
              <div className="mb-6">
                <Avatar
                  size={120}
                  src={user?.avatarUrl}
                  icon={<UserOutlined />}
                  className="border-4 border-gray-200 shadow-lg"
                />
              </div>

              <Upload {...uploadProps}>
                <Button
                  icon={<UploadOutlined />}
                  size="large"
                  type="dashed"
                  className="w-full"
                >
                  Thay đổi ảnh đại diện
                </Button>
              </Upload>

              <Text type="secondary" className="text-xs mt-2 block">
                Định dạng: JPG, PNG • Kích thước tối đa: 2MB
              </Text>
            </Card>

            {/* Account Info */}
            <Card title="ℹ️ Thông tin tài khoản" className="mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text type="secondary">Tên hiển thị:</Text>
                  <Text strong>{user?.name}</Text>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between">
                  <Text type="secondary">Vai trò:</Text>
                  <Text strong className="capitalize">
                    {user?.role === 'student' ? '🎓 Sinh viên' :
                      user?.role === 'lecturer' ? '👨‍🏫 Giảng viên' : '👨‍💼 Quản trị viên'}
                  </Text>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between">
                  <Text type="secondary">Ngày tham gia:</Text>
                  <Text>01/09/2024</Text>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between">
                  <Text type="secondary">Trạng thái:</Text>
                  <Text className="text-green-500 font-semibold">🟢 Đang hoạt động</Text>
                </div>
              </div>
            </Card>

            {/* Security Card */}
            <Card title="🔒 Bảo mật & Quyền riêng tư">
              <Space direction="vertical" className="w-full" size="middle">
                <Button
                  icon={<LockOutlined />}
                  size="large"
                  block
                  type="default"
                >
                  Đổi mật khẩu
                </Button>
                <Button
                  icon={<HistoryOutlined />}
                  size="large"
                  block
                  type="dashed"
                >
                  Lịch sử đăng nhập
                </Button>
                <Button
                  icon={<LogoutOutlined />}
                  size="large"
                  block
                  danger
                >
                  Đăng xuất tất cả thiết bị
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Settings
