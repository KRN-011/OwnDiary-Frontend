"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, useWatch } from "react-hook-form";
import { SignupSchema, signupSchema } from "@/schemas/authScehma";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { PASSWORD_CONDITIONS } from "@/constants/generalConsts";
import { CircleCheck, CircleX } from "lucide-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // auth hook
  const { signup } = useAuth();

  // react hook form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  // watch password field
  const passwordValue = useWatch({
    control,
    name: "password",
  });

  // password conditions
  const passwordConditions = PASSWORD_CONDITIONS(passwordValue);

  // handle form submit
  const handleSignup = async (data: SignupSchema) => {
    await signup({
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleSignup)}>
            {/* To hide autocomplete fields in browsers */}
            <div className="hidden">
              <input type="text" name="username" />
              <input type="password" name="password" />
              <input type="text" name="email" />
            </div>
            <FieldGroup className="flex flex-col gap-5">
              <Field className="flex flex-col gap-2">
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  {...register("username")}
                  id="username"
                  type="text"
                  placeholder="john_doe"
                />
                {errors.username && (
                  <p className="text-destructive text-sm">
                    {errors.username.message}
                  </p>
                )}
              </Field>
              <Field className="flex flex-col gap-2">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </Field>
              <Field className="flex flex-col gap-2">
                <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...register("password")}
                      id="password"
                      type="password"
                    />
                    <div className="sm:hidden block">
                      {errors.password && (
                        <p className="text-destructive text-sm">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...register("confirmPassword")}
                      id="confirm-password"
                      type="password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-destructive text-sm">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </Field>
                </Field>
                <div className="sm:block hidden">
                  {errors.password && (
                    <p className="text-destructive text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <ul className="text-sm space-y-1">
                  <li
                    className={`flex items-center gap-2 ${passwordConditions.length ? "text-success" : "text-destructive"}`}
                  >
                    {passwordConditions.length ? (
                      <CircleCheck className="size-4" />
                    ) : (
                      <CircleX className="size-4" />
                    )}
                    At least 8 characters long
                  </li>
                  <li
                    className={`flex items-center gap-2 ${passwordConditions.uppercase ? "text-success" : "text-destructive"}`}
                  >
                    {passwordConditions.uppercase ? (
                      <CircleCheck className="size-4" />
                    ) : (
                      <CircleX className="size-4" />
                    )}
                    Must contain at least one uppercase letter
                  </li>
                  <li
                    className={`flex items-center gap-2 ${passwordConditions.lowercase ? "text-success" : "text-destructive"}`}
                  >
                    {passwordConditions.lowercase ? (
                      <CircleCheck className="size-4" />
                    ) : (
                      <CircleX className="size-4" />
                    )}
                    Must contain at least one lowercase letter
                  </li>
                  <li
                    className={`flex items-center gap-2 ${passwordConditions.number ? "text-success" : "text-destructive"}`}
                  >
                    {passwordConditions.number ? (
                      <CircleCheck className="size-4" />
                    ) : (
                      <CircleX className="size-4" />
                    )}
                    Must contain at least one number
                  </li>
                  <li
                    className={`flex items-center gap-2 ${passwordConditions.special ? "text-success" : "text-destructive"}`}
                  >
                    {passwordConditions.special ? (
                      <CircleCheck className="size-4" />
                    ) : (
                      <CircleX className="size-4" />
                    )}
                    Must contain at least one special character
                  </li>
                </ul>
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  );
}
