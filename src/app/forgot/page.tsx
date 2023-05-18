"use client";
//THIRD PARTY MODULES
import * as z from "zod";
import Link from "next/link";
import Image from "next/image";
import LogoIcon from "_@/icons/LogoIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
//LAYOUT, COMPONENTS
import Input from "_@/components/Input";
import Button from "_@/components/Button";
import Label from "_@/components/BaseFormItem";
import CenterLayout from "_@/layouts/CenterLayout";

const schema = z.object({
  email: z.string().email(),
});
type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const methods = useForm<Values>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Values) => {
    console.log({ data });
  };

  return (
    <CenterLayout>
      <div className="relative min-h-screen grid-cols-2 p-2  md:grid md:p-6 ">
        <div className="absolute inset-0 isolate z-10 m-4 flex flex-col rounded-lg bg-gray-400/30 backdrop-blur-sm md:static md:bg-transparent">
          <div className="flex-1 md:space-y-[120px]">
            <LogoIcon className="hidden text-[#57C5B6] md:block" />
            <div className="px-[20px] py-20 sm:px-[40px] md:px-[120] md:py-0 lg:px-[80px]">
              <div className="space-y-8">
                <div className="space-y-1.5">
                  <h3 className="text-36 font-bold text-white md:text-black">
                    Don't worry
                  </h3>
                  <p className="text-14 text-white md:text-gray-500">
                    We are here to help you to recover your password. Enter the
                    email address you used when you joined and we'll send you
                    instructions to reset your password.
                  </p>
                </div>

                <FormProvider {...methods}>
                  <form
                    className="space-y-6"
                    onSubmit={methods.handleSubmit(onSubmit)}
                  >
                    <Label
                      name="Email"
                      className="ow:text-gray-100 md:ow:text-gray-700"
                    >
                      <Input
                        type="email"
                        id="email"
                        placeholder="phatphamm01@gmail.com"
                      />
                    </Label>

                    <div className="space-y-3">
                      <Button className=" bg-teal-900" type="submit">
                        Send
                      </Button>
                      <Link
                        href="/login"
                        className="block text-center text-14 text-white md:text-16 md:text-gray-600"
                      >
                        Ohh! I remembered my password.
                      </Link>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
          <p className="mb-9 text-center text-white md:text-gray-600">
            2023 © Copyright
          </p>
        </div>

        <div className="absolute inset-0 z-[-1] md:static">
          <div className="relative h-full w-full overflow-hidden md:rounded-lg">
            <Image
              src="/images/auth.png"
              className="h-full w-full object-cover"
              alt="auth image"
              fill
              sizes="100%"
            />
          </div>
        </div>
      </div>
    </CenterLayout>
  );
}
