import { Button, Form, Input } from "antd";

export default function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form name="login" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="密码" name="password">
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
