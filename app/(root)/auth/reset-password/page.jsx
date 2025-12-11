"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/public/assets/images/logo-black.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Link from "next/link";
import { APP_HOME, APP_REGISTER } from "@/routes/appRoutes";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logger } from "@/utility/logger";
import OtpValidationFrom from "@/components/AppComponent/OtpValidationFrom";
import UpdatePassword from "@/components/AppComponent/UpdatePassword";
import {
  resetPasswordSendOTP,
  resetPasswordVerifyOTP,
} from "@/Redux/resetPasswordSlice/actions";

function ResetPassword() {
  const [isLoading, setLoading] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const formSchema = zSchema.pick({
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleEmailSubmit = async (values) => {
    try {
      setLoading(true);
      const mailSentResponse = await dispatch(
        resetPasswordSendOTP({ email: values.email })
      ).unwrap();
      setEmail(values.email);
      toast.success(mailSentResponse.message);
    } catch (err) {
      logger.error(
        "ERROR OCCURED IN HANDLE EMAIL SUBMIT IN RESET_PASSWORD : ",
        err
      );
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (payload) => {
    try {
      setLoading(true);
      const res = await dispatch(resetPasswordVerifyOTP(payload)).unwrap();
      toast.success(res?.message);
      setIsOTPVerified(true);
    } catch (err) {
      logger.log("ERROR OCCURED IN OTP HANDLER :: ", err);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    // <div>
    //   <Card className="w-[450px]">
    //     <CardContent>
    //       {!email && !isOTPVerified ? (
    //         <>
    //           {/* for login password and email  */}

    //           <div className="text-center">
    //             <h1 className="text-3xl font-bold">Reset password</h1>
    //             <p>Enter your email to reset your password..</p>
    //           </div>

    //           <div className="mt-5 ">
    //             <Form {...form}>
    //               <form
    //                 onSubmit={form.handleSubmit(handleEmailSubmit)}
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

    //                 <div className="mb-3">
    //                   <LoadingButton
    //                     type="Submit"
    //                     text="Send OTP"
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
    //                       Back to Register
    //                     </Link>
    //                   </div>
    //                 </div>
    //               </form>
    //             </Form>
    //           </div>
    //         </>
    //       ) : (
    //         <>
    //           {!isOTPVerified ? (
    //             <>
    //               <OtpValidationFrom
    //                 email={email}
    //                 loading={isLoading}
    //                 onSubmit={handleOtpVerification}
    //               />
    //             </>
    //           ) : (
    //             <UpdatePassword email={email} />
    //           )}
    //         </>
    //       )}
    //     </CardContent>
    //   </Card>
    // </div>

    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-[450px]">
        <CardContent className="p-6 sm:p-8">
          {/* State 1 — Ask for Email */}
          {!email && !isOTPVerified ? (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Reset Password
                </h1>
                <p className="text-sm sm:text-base">
                  Enter your email to reset your password.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleEmailSubmit)}
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

                  {/* Send OTP */}
                  <LoadingButton
                    type="submit"
                    text="Send OTP"
                    loading={isLoading}
                    className="w-full cursor-pointer"
                  />

                  {/* Footer Links */}
                  <div className="text-center text-sm sm:text-base">
                    <div className="flex gap-1 justify-center">
                      <p>Don't have an account?</p>
                      <Link
                        href={APP_REGISTER}
                        className="text-primary underline font-bold"
                      >
                        Back to Register
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </>
          ) : (
            <>
              {/* State 2 — OTP Verification */}
              {!isOTPVerified ? (
                <OtpValidationFrom
                  email={email}
                  loading={isLoading}
                  onSubmit={handleOtpVerification}
                />
              ) : (
                /* State 3 — Update Password */
                <UpdatePassword email={email} />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ResetPassword;
