"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/public/assets/images/logo-black.png";
import { zSchema } from "@/lib/zodSchema";
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
import { APP_HOME, APP_REGISTER, APP_RESET_PASSWORD } from "@/routes/appRoutes";
import { loginUser, validateOTP } from "@/Redux/authSlice/actions";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logger } from "@/utility/logger";
import OtpValidationFrom from "@/components/AppComponent/OtpValidationFrom";
import { useRouter } from "next/navigation";

function LoginPage() {
  const { isLoading } = useSelector((state) => state.auth);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [otpEmail, setOtpEmail] = useState(null);

  logger.log(isLoading);
  const dispatch = useDispatch();
  const router = useRouter();

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

  const handleLoginSubmit = async (values) => {
    try {
      logger.log("user login Data ==", values);
      const res = await dispatch(loginUser(values)).unwrap();
      logger.log("mongo", res);
      toast.success(res.message);
      setOtpEmail(values.email);
      form.reset();
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  const handleOtpVerification = async (payload) => {
    try {
      logger.log("opt values ==>", payload);
      const res = await dispatch(validateOTP(payload)).unwrap();

      toast.success(res?.message);
      router.replace(APP_HOME);
    } catch (err) {
      logger.log("ERROR OCCURED IN OTP HANDLER :: ", err);
      toast.error(err);
    }
  };
  return (
    // <div>
    //   <Card className="w-[450px]">
    //     <CardContent>
    //       <div className="flex justify-center">
    //         <Image
    //           src={Logo.src}
    //           width={Logo.width}
    //           height={Logo.height}
    //           alt="logo"
    //           className="max-w-[150px]"
    //         />
    //       </div>

    //       {!otpEmail ? (
    //         <>
    //           {/* for login password and email  */}

    //           <div className="text-center">
    //             <h1 className="text-3xl font-bold">Log Into Account</h1>
    //             <p>Log Into Your Acccount by filling out the form below..</p>
    //           </div>

    //           <div className="mt-5 ">
    //             <Form {...form}>
    //               <form
    //                 onSubmit={form.handleSubmit(handleLoginSubmit)}
    //                 className="space-y-8"
    //               >
    //                 <div className="mb-5">
    //                   <FormField
    //                     control={form.control}
    //                     name="email"
    //                     render={({ field }) => (
    //                       <FormItem>
    //                         <FormLabel>Email</FormLabel>
    //                         <FormControl>
    //                           <Input
    //                             type="email"
    //                             placeholder="example@gmail.com"
    //                             {...field}
    //                           />
    //                         </FormControl>
    //                         <FormMessage />
    //                       </FormItem>
    //                     )}
    //                   />
    //                 </div>
    //                 <div className="mb-5">
    //                   <FormField
    //                     control={form.control}
    //                     name="password"
    //                     render={({ field }) => (
    //                       <FormItem className="relative">
    //                         <FormLabel>Password</FormLabel>
    //                         <FormControl>
    //                           <Input
    //                             type={isTypePassword ? "password" : "text"}
    //                             placeholder="************"
    //                             {...field}
    //                           />
    //                         </FormControl>
    //                         <button
    //                           type="button"
    //                           className="absolute top-1/2
    // 				  right-4 cursor-pointer "
    //                           onClick={() => setIsTypePassword(!isTypePassword)}
    //                         >
    //                           {isTypePassword ? (
    //                             <FaRegEyeSlash />
    //                           ) : (
    //                             <FaRegEye />
    //                           )}
    //                         </button>
    //                         <FormMessage />
    //                       </FormItem>
    //                     )}
    //                   />
    //                 </div>

    //                 <div className="mb-3">
    //                   <LoadingButton
    //                     type="submit"
    //                     text="LogIn"
    //                     loading={isLoading}
    //                     className="w-full cursor-pointer"
    //                   />
    //                 </div>

    //                 <div className="text-center">
    //                   <div className="flex gap-1 justify-center item-center">
    //                     <p>Don't have an Account ? </p>
    //                     <Link
    //                       href={APP_REGISTER}
    //                       className="text-primary Underline font-bold"
    //                     >
    //                       Create Account!
    //                     </Link>
    //                   </div>
    //                   <div className="mt-3">
    //                     <Link
    //                       href={APP_RESET_PASSWORD}
    //                       className="text-primary Underline font-bold"
    //                     >
    //                       Forget Password?
    //                     </Link>
    //                   </div>
    //                 </div>
    //               </form>
    //             </Form>
    //           </div>
    //         </>
    //       ) : (
    //         <>
    //           {/* otp validation form */}

    //           <OtpValidationFrom
    //             email={otpEmail}
    //             loading={isLoading}
    //             onSubmit={handleOtpVerification}
    //           />
    //         </>
    //       )}
    //     </CardContent>
    //   </Card>
    // </div>

    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-[450px]">
        <CardContent className="p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <Image
              src={Logo.src}
              width={Logo.width}
              height={Logo.height}
              alt="logo"
              className="max-w-[120px] sm:max-w-[150px]"
            />
          </div>

          {!otpEmail ? (
            <>
              {/* Login Title */}
              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Log Into Account
                </h1>
                <p className="text-sm sm:text-base">
                  Log into your account by filling the form below.
                </p>
              </div>

              {/* Login Form */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleLoginSubmit)}
                  className="space-y-6"
                >
                  {/* Email */}
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

                  {/* Password */}
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

                        {/* Eye Icon Toggle */}
                        <button
                          type="button"
                          className="absolute top-10 right-3 sm:top-10 cursor-pointer text-gray-500"
                          onClick={() => setIsTypePassword(!isTypePassword)}
                        >
                          {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Login Button */}
                  <LoadingButton
                    type="submit"
                    text="LogIn"
                    loading={isLoading}
                    className="w-full cursor-pointer"
                  />

                  {/* Links */}
                  <div className="text-center text-sm sm:text-base space-y-3">
                    <div className="flex gap-1 justify-center">
                      <p>Don't have an Account?</p>
                      <Link
                        href={APP_REGISTER}
                        className="text-primary underline font-bold"
                      >
                        Create Account!
                      </Link>
                    </div>

                    <Link
                      href={APP_RESET_PASSWORD}
                      className="text-primary underline font-bold"
                    >
                      Forget Password?
                    </Link>
                  </div>
                </form>
              </Form>
            </>
          ) : (
            <OtpValidationFrom
              email={otpEmail}
              loading={isLoading}
              onSubmit={handleOtpVerification}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
