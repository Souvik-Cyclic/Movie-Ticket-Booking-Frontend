import React, { useEffect } from 'react';
import { Button, Form, Input, message, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from '../calls/users';

const predefinedCredentials = [
  { email: 'user@test.com', password: '1234' },
  { email: 'partner@test.com', password: '1234' },
  { email: 'admin@test.com', password: '1234' },
];

function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/");
    }
  }, [navigate]);

  const handleSelect = (value) => {
    const selected = predefinedCredentials.find(cred => cred.email === value);
    if (selected) {
      form.setFieldsValue({
        email: selected.email,
        password: selected.password,
      });
    }
  };

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token', response.token);
        navigate('/');
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error(error.message || 'An error occurred during login');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#333',
        }}>Login to BookMyShow</h1>
        <p style={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '20px',
        }}>
          <strong>Note:</strong> Predefined users are for testing purposes only.
        </p>
        <Form layout="vertical" onFinish={onFinish} form={form} style={{
          marginBottom: '20px',
        }}>
          <Form.Item
            label="Select Predefined User"
            style={{
              marginBottom: '20px',
            }}
          >
            <Select
              placeholder="Select a user"
              onChange={handleSelect}
              style={{
                width: '100%',
              }}
            >
              {predefinedCredentials.map((cred, index) => (
                <Select.Option key={index} value={cred.email}>
                  {cred.email}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Email"
            htmlFor="email"
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
            style={{
              marginBottom: '20px',
            }}
          >
            <Input id="email" type="text" placeholder="Enter your Email" style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }} />
          </Form.Item>

          <Form.Item
            label="Password"
            htmlFor="password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
            style={{
              marginBottom: '20px',
            }}
          >
            <Input id="password" type="password" placeholder="Enter your Password" style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }} />
          </Form.Item>

          <Form.Item style={{
            marginBottom: '20px',
          }}>
            <Button type="primary" block htmlType="submit" style={{
              fontSize: "16px",
              fontWeight: "600",
              padding: '10px 20px',
              borderRadius: '4px',
            }}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#666',
        }}>
          <p>
            New User? <Link to="/register" style={{
              color: '#1890ff',
              textDecoration: 'none',
            }}>Register Here</Link>
          </p>
          <p>
            Forgot Password? <Link to="/forget" style={{
              color: '#1890ff',
              textDecoration: 'none',
            }}>Click Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
