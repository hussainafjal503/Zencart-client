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
import LoadingButton from "@/components/AppComponent/LoadingButton";
import { z } from "zod";
import Link from "next/link";
import {
  APP_HOME,
  APP_LOGIN,
} from "@/routes/appRoutes";
import { loginUser, validateOTP } from "@/Redux/authSlice/actions";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logger } from "@/utility/logger";
import OtpValidationFrom from "@/components/AppComponent/OtpValidationFrom";
import { useRouter } from "next/navigation";

function ResetPassword() {
  const [isLoading, setLoading] = useState(false);
  const [email,setEmail]=useState("");
  const formSchema = zSchema.pick({
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValue: {
      email: "",
    },
  });

  const handleEmailSubmit = (values) => {

  };

  const handleOtpVerification = async (payload) => {
    try {
      logger.log("opt values ==>", payload);
      const res = await dispatch(validateOTP(payload)).unwrap();

      toast.success(res?.message);
    //   router.replace(APP_HOME);
    } catch (err) {
      logger.log("ERROR OCCURED IN OTP HANDLER :: ", err);
      toast.error(err);
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

          {!otpEmail ? (
            <>
              {/* for login password and email  */}

              <div className="text-center">
                <h1 className="text-3xl font-bold">Reset password</h1>
                <p>Enter your email to reset your password..</p>
              </div>

              <div className="mt-5 ">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleEmailSubmit)}
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
                              {isTypePassword ? (
                                <FaRegEyeSlash />
                              ) : (
                                <FaRegEye />
                              )}
                            </button>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mb-3">
                      <LoadingButton
                        type="submit"
                        text="Send OTP"
                        loading={isLoading}
                        className="w-full cursor-pointer"
                      />
                    </div>

                    <div className="text-center">
                      <div className="flex gap-1 justify-center item-center">
                        <p>Don't have an Account ? </p>
                        <Link
                          href={APP_LOGIN}
                          className="text-primary Underline font-bold"
                        >
                          Back to login
                        </Link>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </>
          ) : (
            <>
              {/* otp validation form */}

              <OtpValidationFrom
                email={otpEmail}
                loading={isLoading}
                onSubmit={handleOtpVerification}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ResetPassword;
