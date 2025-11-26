"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/public/assets/images/logo-black.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/AppComponent/LoadingButton";
import { z } from "zod";
import Link from "next/link";
import { APP_REGISTER } from "@/routes/appRoutes";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = zSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().nonempty("Password is Required"),
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (value) => {
    setLoading(true);
    console.log(value);
  };
  return (
    <div>
      <Card className="w-[450px]">
        <CardContent>
          <div className="flex justify-center">
            <Image
              src={Logo.src}
              width={Logo.width}
              height={Logo.height}
              alt="logo"
              className="max-w-[150px]"
            />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold">Log Into Account</h1>
            <p>Log Into Your Acccount by filling out the form below..</p>
          </div>

          <div className="mt-5 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLoginSubmit)}
                className="space-y-8"
              >
                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type={isTypePassword ? "password" : "text"}
                            placeholder="************"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute top-1/2
						  right-4 cursor-pointer "
                          onClick={() => setIsTypePassword(!isTypePassword)}
                        >
                          {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mb-3">
                  <LoadingButton
                    type="submit"
                    text="LogIn"
                    loading={loading}
                    onClickHandler={handleLoginSubmit}
                    className="w-full cursor-pointer"
                  />
                </div>

                <div className="text-center">
                  <div className="flex gap-1 justify-center item-center">
                    <p>Don't have an Account ? </p>
                    <Link
                      href={APP_REGISTER}
                      className="text-primary Underline font-bold"
                    >
                      Create Account!
                    </Link>
                  </div>
                  <div className="mt-3">
                    <Link href="" className="text-primary Underline font-bold">
                      Forget Password?
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
