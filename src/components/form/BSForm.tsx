import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};
type TFromProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const BSForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFromProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default BSForm;
