"use client";
//THIRD PARTY MODULES
import * as z from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  ArticleControllerApiFetchParamCreator,
  BASE_PATH,
} from "_@/swagger/api";
//LAYOUT, COMPONENTS
import Button from "_@/components/Button";
import BaseFormItem from "_@/components/BaseFormItem";
import FormInput from "_@/components/Input/FormInput";
import Dialog, { Description, Title } from "_@/components/Dialog";

const schema = z.object({
  categoryName: z.string(),
});
type Values = z.infer<typeof schema>;

export default function DialogComp() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const methods = useForm<Values>({
    defaultValues: {
      categoryName: "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (values) => {
    const { url } = ArticleControllerApiFetchParamCreator().addCategory();
    const query = new URLSearchParams(values);
    const urlWithQuery = `${BASE_PATH}${url}?${query.toString()}`;

    const res = await fetch(urlWithQuery, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setShow(false);
      router.refresh();
      toast.success("Thêm thành công");
    } else {
      toast.error("Thêm thất bại");
    }
  });

  return (
    <Dialog
      open={show}
      onOpenChange={setShow}
      Content={
        <>
          <Title>Thêm loại</Title>
          <Description>Thêm loại bài viết mới vào hệ thống</Description>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit} className="mt-6 grid gap-8">
              <fieldset>
                <BaseFormItem label="Name" name="categoryName">
                  <FormInput placeholder="Công nghệ thông tin ..." />
                </BaseFormItem>
              </fieldset>

              <div className="grid grid-cols-2">
                <Button className="col-start-2 w-full bg-teal-900">Thêm</Button>
              </div>
            </form>
          </FormProvider>
        </>
      }
    >
      <Button className="w-min bg-teal-900 font-semibold">Thêm</Button>
    </Dialog>
  );
}
