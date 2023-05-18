"use client";
//THIRD PARTY MODULES
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import LogoIcon from "_@/icons/LogoIcon";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
//LAYOUT, COMPONENTS
import Button from "_@/components/Button";
import Checkbox from "_@/components/Checkbox";
import CenterLayout from "_@/layouts/CenterLayout";
import BaseFormItem from "_@/components/BaseFormItem";
import FormInput from "_@/components/Input/FormInput";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const methods = useForm<Values>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Values) => {
    const res = await signIn("credentials", {
      usernameOrEmail: data.email,
      password: data.password,
      callbackUrl: "/",
      // redirect: false,
    }).catch((err) => {
      console.log({ err });
    });
    console.log({ res });
  };

  return (
    <CenterLayout>
      <div className="relative min-h-screen grid-cols-2 p-2  md:grid md:p-6 ">
        <div className="absolute inset-0 isolate z-10 m-4 flex flex-col rounded-lg bg-gray-400/30 backdrop-blur-sm backdrop-filter md:static md:bg-transparent">
          <div className="flex-1 md:space-y-[120px]">
            <Link href="/">
              <LogoIcon className="hidden text-[#57C5B6] md:block" />
            </Link>
            <div className="px-[20px] py-20 sm:px-[40px] md:px-[120] md:py-0 lg:px-[80px]">
              <div className="space-y-8">
                <div className="space-y-1.5">
                  <h3 className="text-36 font-bold text-white md:text-black">
                    Welcome
                  </h3>
                  <p className="text-14 text-white md:text-gray-500">
                    Welcome, please enter your details
                  </p>
                </div>
                <FormProvider {...methods}>
                  <form
                    className="space-y-6"
                    onSubmit={methods.handleSubmit(onSubmit)}
                  >
                    <div className="space-y-3">
                      <div className="space-y-6">
                        <BaseFormItem
                          label="Email"
                          name="email"
                          labelClassName="ow:text-gray-100 md:ow:text-gray-700"
                        >
                          <FormInput
                            type="email"
                            id="email"
                            placeholder="phatphamm01@gmail.com"
                          />
                        </BaseFormItem>

                        <BaseFormItem
                          label="Password"
                          name="password"
                          labelClassName="ow:text-gray-100 md:ow:text-gray-700"
                        >
                          <FormInput
                            type="password"
                            id="password"
                            placeholder="***************"
                          />
                        </BaseFormItem>
                      </div>
                      <div className="flex items-center justify-between text-12 md:text-16">
                        <Checkbox
                          className="ow:text-white md:text-gray-600"
                          indicatorClassName="ow:text-white md:text-gray-600"
                          rootClassName="ow:border-gray-300"
                          name="remember"
                          label="Remember for 30 days"
                        />
                        <Link
                          href="/forgot"
                          className="text-white underline md:text-gray-600"
                        >
                          Forgot password ?
                        </Link>
                      </div>
                    </div>

                    <div>
                      <Button className="bg-teal-900" type="submit">
                        Login
                      </Button>
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
