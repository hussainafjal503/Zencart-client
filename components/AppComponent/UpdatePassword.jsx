"use client";
import React, { useState } from "react";
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
import LoadingButton from "@/components/AppComponent/LoadingButton";
import { z } from "zod";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetUpdatePassword } from "@/Redux/resetPasswordSlice/actions";
import { useRouter } from "next/navigation";
import { APP_LOGIN } from "@/routes/appRoutes";

function UpdatePassword({ email }) {
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const formSchema = zSchema
    .pick({
      email: true,
      password: true,
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
      email: email,
      password: "",
      confirmPassword: "",
    },
  });

  const handlePasswordUpdate = async (values) => {
    try {
      setIsLoading(true)
      const updatePasswordRes = await dispatch(
        resetUpdatePassword(values)
      ).unwrap();
      toast.success(updatePasswordRes?.message);
      form.reset();
      router.replace(APP_LOGIN);
    } catch (err) {
      console.log("ERROR OCCIRED IN UPDATE PASSWORD HANDLER : ", err);
      toast.error(err);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Update Password</h1>
        <p>Create new password by filling below form..</p>
      </div>

      <div className="mt-5 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handlePasswordUpdate)}
            className="space-y-8"
          >
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
                text="Update Password"
                loading={isLoading}
                className="w-full cursor-pointer"
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UpdatePassword;
