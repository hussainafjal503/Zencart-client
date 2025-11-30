import { zSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import LoadingButton from "./LoadingButton";
import { resendOTP } from "@/Redux/authSlice/actions";
import { useDispatch, useSelector } from "react-redux";
import { logger } from "@/utility/logger";
import toast from "react-hot-toast";

function OtpValidationFrom({ email, onSubmit, loading }) {
  const { resendLoading } = useSelector((state) => state.auth);
  const formSchema = zSchema.pick({
    otp: true,
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      email: email,
    },
  });

  const dispatch = useDispatch();
  const handleOTPVerification = async (values) => {
    onSubmit(values);
  };

  const resendOTPHandler = async () => {
    try {
      const res = await dispatch(resendOTP({ email })).unwrap();
      toast.success(res?.message);
    } catch (err) {
      logger.log("ERROR OCCURED IN RESEND OTP HANDLER :: ", err);
      toast.error(err);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOTPVerification)}
          className="space-y-8"
        >
          <div className="mb-5 flex justify-center mt-4">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-2xl">
                    Verify OTP
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        {/* <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} /> */}

                        {Array(6)
                          .fill("")
                          .map((_, index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="w-12 h-12 text-2xl"
                            />
                          ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-3">
            <LoadingButton
              type="submit"
              text="Verify"
              loading={loading}
              className="w-full cursor-pointer"
            />

            <div className="text-center mt-5 ">
              {resendLoading ? (
                <span className="text-primary">Resending..</span>
              ) : (
                <button
                  type="button"
                  className="text-yellow-500 cursor-pointer hover:underline"
                  onClick={resendOTPHandler}
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        </form>
      </Form>

      <div className="text-center font-semibold ">
        <p>Your OTP is Only Valid for 10 minutes..</p>
      </div>
    </div>
  );
}

export default OtpValidationFrom;
