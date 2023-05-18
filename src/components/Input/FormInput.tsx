"use client";
//THIRD PARTY MODULES
import { useFormContext } from "react-hook-form";
//LAYOUT, COMPONENTS
import BaseInput, { As, BaseInputProps } from "_@/components/Input/Input";
//RELATIVE MODULES

export type FormInputProps<T extends As> = BaseInputProps<T>;

const FormInput = <T extends As = "input">({
  name,
  ...props
}: FormInputProps<T>) => {
  // const [showPassword, toggleShowPassword] = useReducer((oldS) => !oldS, false);
  const { register, formState } = useFormContext();

  if (!name) return null;
  const errMessage = formState.errors[name]?.["message"] as unknown as string;

  return (
    <BaseInput
      {...register(name)}
      {...props}
      data-invalid={errMessage ? true : undefined}
      aria-describedby={errMessage ? `err-${props.id}` : undefined}
    />
  );
};

export type TFormInput = <T extends As>(
  props: FormInputProps<T>
) => JSX.Element;
export default FormInput;
