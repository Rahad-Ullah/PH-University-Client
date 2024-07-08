/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { TUserInfo } from "../types";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const onSubmit = async (inputData: TUserInfo) => {
    const toastId = toast.loading("Loggin in");

    try {
      const res = await login(inputData).unwrap() as any;

      // decode token
      const user = verifyToken(res.data.accessToken) as TUser;

      // set token to redux local state
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type={"text"} name={"id"} label={"ID:"} />
        <PHInput type={"text"} name={"password"} label={"Password:"} />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

//? Ant Design Form
{
  /* <Form onFinish={onFinish}>
<Form.Item
  label="Username"
  name="username"
  rules={[
    { required: true, message: "Required" },
    { max: 15, message: "Username should be less than 15 characters" },
  ]}
>
  <Input />
</Form.Item>
<Form.Item
  label="Password"
  name="password"
  rules={[{ required: true, message: "Required" }]}
>
  <Input.Password />
</Form.Item>
<Form.Item name="remember" valuePropName="checked">
  <Checkbox>Remember me</Checkbox>
</Form.Item>
<Form.Item>
  <Button type="primary" htmlType="submit">
    Submit
  </Button>
</Form.Item>
</Form> */
}

export default Login;
