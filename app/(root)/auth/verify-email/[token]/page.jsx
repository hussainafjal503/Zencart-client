"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { use, useEffect, useState } from "react";
import verifiedImg from "@/public/assets/images/verified.gif";

import verificationFailed from "@/public/assets/images/verification-failed.gif";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { APP_HOME } from "@/routes/appRoutes";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logger } from "@/utility/logger";
import toast from "react-hot-toast";
import { verifyEmail } from "@/Redux/authSlice/actions";
import { useRouter } from "next/navigation";

function VerifyEmail({ params }) {
  const [isVerified, setIsVerified] = useState(false);
  const { token } = use(params);
  const dispatch = useDispatch();
  const router = useRouter();

  const verifyHandler = async () => {
    try {
      const res = await dispatch(verifyEmail(token)).unwrap();
      setIsVerified(true);
      toast.success(res.message);
    } catch (error) {
      logger.error("error occured in verify Email Handler :: ", error);
      toast.error(error);
    }
  };

  useEffect(() => {
    verifyHandler();
  }, []);

  return (
    <Card className={`w-[400px]`}>
      <CardContent>
        {isVerified ? (
          <div>
            <div className="flex justify-center items-center">
              <Image
                src={verifiedImg}
                height={verifiedImg.height}
                width={verifiedImg.width}
                className="h-[100px]"
                alt="Verification success"
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold my-5 text-green-600">
                Email Verification Sucess
              </h1>
              <Button onClick={() => router.replace(APP_HOME)}>
                <p>Continue</p>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-center items-center">
              <Image
                src={verificationFailed}
                height={verificationFailed.height}
                width={verificationFailed.width}
                className="h-[100px]"
                alt="verification failed.."
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 my-5">
                Email Verification Failed
              </h1>
              <Button>
                <Link href={APP_HOME}>Continue</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default VerifyEmail;
