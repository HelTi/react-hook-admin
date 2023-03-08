import { Button, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";

import { userLogin } from "../../services/login";

export default function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Success:", values);

    const res = await userLogin(values);
    console.log("res", res);

    if (res?.code === 200) {
      const { data } = res;
      window.localStorage.setItem("token",`Bearer ${data.token}`);
      navigate("/");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
  };

  return (
    <Row align={"center"}>
      <Col md={6} xs={24}>
        <Form
          name="login"
          {...formItemLayout}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ padding: "50px 20px" }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
