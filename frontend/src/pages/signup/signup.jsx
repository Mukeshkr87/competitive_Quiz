import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { apiUrl } from "@/lib/api";
import ThemeToggle from "@/components/custom/themeToggle";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${apiUrl}/api/user/signup`, data);
      toast.success("Registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.15),_transparent_24%),linear-gradient(135deg,_#f8fafc,_#eff6ff_48%,_#ecfeff)] px-6 py-8 dark:bg-[radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.15),_transparent_24%),linear-gradient(135deg,_#020617,_#0f172a_45%,_#082f49)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:pt-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-black tracking-tight text-slate-900 dark:text-white"
          >
            QuizCraft-Ai
          </Link>
          <ThemeToggle className="border-slate-300 bg-white/70 text-slate-800 hover:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100" />
        </div>

        <div className="grid items-center gap-10 md:grid-cols-[1.02fr_0.98fr]">
          <div className="hidden rounded-[2rem] border border-white/50 bg-white/55 p-8 shadow-xl backdrop-blur md:block dark:border-slate-800 dark:bg-slate-900/55">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-400">
              Join the platform
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
              Start creating smarter live quiz experiences.
            </h1>
            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
              Build rooms, manage questions, create quizzes, and explore the
              refreshed QuizCraft-Ai interface from day one.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <h2 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">
              Create your account
            </h2>
            <p className="mb-6 text-slate-500 dark:text-slate-400">
              Join QuizCraft-Ai and launch your first live session.
            </p>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  {...register("name", {
                    required: "name is required",
                  })}
                />
                {errors?.name && (
                  <div className="text-sm text-red-400">
                    {errors.name.message}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  {...register("email", { required: "email is required" })}
                />
                {errors?.email && (
                  <div className="text-sm text-red-400">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter a secure password"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  {...register("password", {
                    required: "password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum length of password must be 6.",
                    },
                  })}
                />
                {errors?.password && (
                  <div className="text-sm text-red-400">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <Button
                type="submit"
                className="w-full rounded-lg bg-slate-950 py-3 font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
                size="md"
              >
                Sign Up
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
