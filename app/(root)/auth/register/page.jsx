"use client";
import React, { useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import { APP_LOGIN } from "@/routes/appRoutes";
import { registerUser } from "@/Redux/authSlice/actions";
import { useDispatch, useSelector } from "react-redux";

function RegisterPage() {
  const [isTypePassword, setIsTypePassword] = useState(true);
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formSchema = zSchema
    .pick({
      email: true,
      password: true,
      name: true,
    })
    .extend({
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "password and confirm Password must be Same",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisterSubmit = async (values) => {
    try {
      const res = await dispatch(registerUser(values)).unwrap();
      toast.success(res.message);
      form.reset();
    } catch (err) {
      toast.error(err.message);
    }
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
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p>Create new Acccount by filling out the form below..</p>
          </div>

          <div className="mt-5 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleRegisterSubmit)}
                className="space-y-8"
              >
                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Afjal hussain "
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
                            type="password"
                            placeholder="************"
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
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Confirm Password</FormLabel>
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
                    text="Create Account"
                    loading={isLoading}
                    className="w-full cursor-pointer"
                  />
                </div>

                <div className="text-center">
                  <div className="flex gap-1 justify-center item-center">
                    <p>Already Have An Account ? </p>
                    <Link
                      href={APP_LOGIN}
                      className="text-primary Underline font-bold"
                    >
                      LogIn!
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

export default RegisterPage;
