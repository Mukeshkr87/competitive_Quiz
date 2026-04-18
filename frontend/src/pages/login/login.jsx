import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { apiUrl } from "@/lib/api";
import ThemeToggle from "@/components/custom/themeToggle";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/api/user/login`, data);
      Cookies.set("token", response.data.token, { expires: 1 });
      toast.success("Loggedin successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_26%),linear-gradient(135deg,_#eff6ff,_#ecfeff_45%,_#f8fafc)] px-6 py-8 dark:bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.15),_transparent_22%),linear-gradient(135deg,_#020617,_#0f172a_42%,_#082f49)]">
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

        <div className="grid items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
          <div className="hidden rounded-[2rem] border border-white/50 bg-white/55 p-8 shadow-xl backdrop-blur md:block dark:border-slate-800 dark:bg-slate-900/55">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-400">
              Welcome back
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
              Return to your live quiz workspace.
            </h1>
            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
              Pick up where you left off with rooms, questions, quizzes, and
              the refreshed dark/light experience.
            </p>
            <div className="mt-8 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60">
                Real-time rooms and multiplayer hosting
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60">
                AI-supported quiz workflows
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60">
                Creator dashboard optimized for speed
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/70 bg-white/85 p-10 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Sign in to QuizCraft-Ai
            </h2>
            <p className="mt-2 mb-8 text-slate-500 dark:text-slate-400">
              Log in to continue your quiz journey.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  {...register("email", { required: "email is required" })}
                />
                {errors?.email && (
                  <div className="text-sm text-red-400">
                    {errors.email.message}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
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
                className="w-full rounded-xl bg-slate-950 py-3 font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
                size="md"
              >
                Login
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-sky-600 hover:underline dark:text-sky-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
