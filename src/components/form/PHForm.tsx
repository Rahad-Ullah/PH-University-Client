/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormProps = {
  onSubmit: SubmitHandler<any>;
  children: ReactNode;
};

const PHForm = ({ onSubmit, children }: TFormProps) => {
  const methods = useForm({
    // defaultValues: {
    //   id: "A-0001",
    //   password: "admin123",
    // },
  });

  return (
    <FormProvider {...methods}>
      <Form onFinish={methods.handleSubmit(onSubmit)} layout="vertical">
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
