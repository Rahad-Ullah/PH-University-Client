import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "F-0001",
      password: "rahad12345",
    },
  });

  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const onSubmit = async (data) => {
    const res = await login(data).unwrap();

    // decode token
    const user = verifyToken(res.data.accessToken);
    dispatch(setUser({ user: user, token: res.data.accessToken }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Submit</Button>
    </form>
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
