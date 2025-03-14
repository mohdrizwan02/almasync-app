"use client";

import { useRouter } from "next/navigation";

import { LoaderCircle } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPasswordSchema } from "@/schemas/forgot-password.schema";

import { useForm } from "react-hook-form";

import React from "react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { Label } from "@/components/ui/label";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import axios from "axios";

const ForgotPasswordPage = () => {
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(60);

  const [firstTimeEmailSent, setFirstTimeEmailSent] = useState(false);

  const router = useRouter();

  useEffect(() => {
    let interval;
    if (disabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [disabled]);

  const [isEmailSent, setIsEmailSent] = useState(false);

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [emailSendLoading, setEmailSendLoading] = useState(false);

  const [emailVerifyLoading, setEmailVerifyLoading] = useState(false);

  const [emailResendLoading, setEmailResendLoading] = useState(false);

  const [passwordVerifyLoading, setPasswordVerifyLoading] = useState(false);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const forgotPasswordForm = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      verifyOtp: "",
    },
  });

  const email = forgotPasswordForm.watch("email");

  const handleSendVerificationCode = async (e) => {
    e.preventDefault();
    setEmailSendLoading((prev) => true);
    console.log(email);

    axios
      .post("/api/email/send-verification-email", {
        email,
        verifyOtp: "123456",
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          toast.success(response.data.message);
          console.log(response.data.success);
          setIsEmailSent((prev) => true);
          setFirstTimeEmailSent((prev) => true);
          setEmailSendLoading((prev) => false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
        console.log(error.response.data.success);
        console.log(error.response.data.error);
        setIsEmailSent((prev) => false);
        setEmailSendLoading((prev) => false);
      });
  };

  const handleResendVerificationCode = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setTimer(60);
    setIsEmailSent((prev) => false);
    forgotPasswordForm.setValue("verifyOtp", "");

    setEmailResendLoading((prev) => true);
    console.log(email);

    axios
      .post("/api/email/send-verification-email", {
        email,
        verifyOtp: "123456",
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          toast.success(response.data.message);
          console.log(response.data.success);
          setIsEmailSent((prev) => true);
          setEmailResendLoading((prev) => false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
        console.log(error.response.data.success);
        console.log(error.response.data.error);
        setIsEmailSent((prev) => false);
        setEmailSendLoading((prev) => false);
      });
  };

  const handleOtpVerificaition = (values) => {
    setEmailVerifyLoading((prev) => true);
    console.log(values);

    axios
      .post("/api/auth/verify-email-otp", values)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          toast.success(response.data.message);
          setEmailVerifyLoading((prev) => false);
          setIsEmailVerified(true);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
        console.log(error.response.data.success);
        console.log(error.response.data.error);
        setEmailVerifyLoading((prev) => false);
      });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordVerifyLoading((prev) => true);
    console.log(password);
    console.log(confirmPassword);
    console.log(email);
    if (!password || !confirmPassword) {
      toast.error("password or confirm password should not be empty");
      setPasswordVerifyLoading((prev) => false);
      return;
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      toast.error(
        "password and confirm password should be minimum of 6 characters"
      );
      setPasswordVerifyLoading((prev) => false);

      return;
    }

    if (password !== confirmPassword) {
      toast.error("password and confirm password should be same");
      setPasswordVerifyLoading((prev) => false);

      return;
    }

    axios
      .post("/api/auth/reset-password", {
        email,
        password,
      })
      .then((response) => {
        console.log(response)
        if (response.data.success) {
          console.log("password has been changed successfully you can login");
          toast.success(response.data.message);
          setPasswordVerifyLoading((prev) => false);

          router.push("/login");
        }
      })
      .catch((error) => {
        console.log(error)
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
        setPasswordVerifyLoading((prev) => false);
      });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="">
          <Card>
            <CardHeader>
              {isEmailVerified ? (
                <>
                  <CardTitle className="text-2xl">Reset Password</CardTitle>
                  <CardDescription>
                    Set the new password to your account to get your login
                    access
                  </CardDescription>
                </>
              ) : (
                <>
                  <CardTitle className="text-2xl">
                    Forgot your password?
                  </CardTitle>
                  <CardDescription>
                    Enter your email address and we'll send you instructions to
                    reset your password.
                  </CardDescription>
                </>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                {isEmailVerified ? (
                  <>
                    <div className="space-y-5 mt-2">
                      <div className="space-y-3">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) =>
                            setPassword((prev) => e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input
                          type="password"
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) =>
                            setConfirmPassword((prev) => e.target.value)
                          }
                        />
                      </div>
                      <Button type="button" className="w-20" onClick={handleChangePassword}>
                        {passwordVerifyLoading ? (
                          <LoaderCircle className="animate-spin" />
                        ) : (
                          "submit"
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <Form {...forgotPasswordForm}>
                    <form
                      className="space-y-5 mt-2"
                      onSubmit={forgotPasswordForm.handleSubmit(
                        handleOtpVerificaition
                      )}
                    >
                      {!firstTimeEmailSent &&(<FormField
                        control={forgotPasswordForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />)}

                      {isEmailSent && (
                        <>
                          <FormField
                            control={forgotPasswordForm.control}
                            name="verifyOtp"
                            rules={{
                              required: "OTP is required",
                              minLength: 6,
                            }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Verification Code</FormLabel>
                                <FormControl>
                                  <InputOTP
                                    value={field.value}
                                    onChange={(otp) => field.onChange(otp)}
                                    maxLength={6}
                                  >
                                    <InputOTPGroup>
                                      {[...Array(6)].map((_, index) => (
                                        <InputOTPSlot
                                          key={index}
                                          index={index}
                                        />
                                      ))}
                                    </InputOTPGroup>
                                  </InputOTP>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                      <div className="flex justify-center gap-5">
                        {firstTimeEmailSent && (
                          <Button
                            type="button"
                            onClick={handleResendVerificationCode}
                            disabled={disabled}
                            className="w-25"
                          >
                            {emailResendLoading ? (
                              <LoaderCircle className="animate-spin" />
                            ) : disabled ? (
                              `Resend in ${timer}s`
                            ) : (
                              "Resend"
                            )}
                          </Button>
                        )}
                        {isEmailSent ? (
                          <>
                            <Button type="submit" className="w-20">
                              {emailVerifyLoading ? (
                                <LoaderCircle className="animate-spin" />
                              ) : (
                                "verify"
                              )}
                            </Button>
                          </>
                        ) : (
                          !firstTimeEmailSent && (
                            <Button
                              type="button"
                              onClick={handleSendVerificationCode}
                              className={"w-20"}
                            >
                              {emailSendLoading ? (
                                <LoaderCircle className="animate-spin" />
                              ) : (
                                "send code"
                              )}
                            </Button>
                          )
                        )}
                      </div>
                    </form>
                  </Form>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
