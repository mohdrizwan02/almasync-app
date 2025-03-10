"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/schemas/login.schema";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import axios from "axios";

const AdminLoginPage = () => {
  const adminForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (values) => {
    console.log(values);

    axios.post("/api/auth/login",values).then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })

  };

  const router = useRouter();
  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex mx-2 items-center">
            <Label>Not an Admin?</Label>
            <Button
              variant={"link"}
              type="button"
              onClick={() => router.push("/login")}
            >
              user login
            </Button>
          </div>
          <div className="">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your email below to login as admin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...adminForm}>
                  <form
                    className="space-y-5 mt-2"
                    onSubmit={adminForm.handleSubmit(handleLogin)}
                  >
                    <FormField
                      control={adminForm.control}
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
                    />
                    <FormField
                      control={adminForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>

                          <FormControl>
                            <Input type="password" placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={adminForm.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className={"flex "}>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>

                          <FormLabel>Remember me</FormLabel>
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-center">
                      <Button type="submit" className="">
                        Sign in
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
