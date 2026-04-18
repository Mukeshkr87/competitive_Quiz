import "./App.css";
import { Link } from "react-router";
import {
  Bot,
  BrainCircuit,
  Gauge,
  Layers3,
  MoonStar,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./components/custom/themeToggle";

function App() {
  const features = [
    {
      title: "Live multiplayer sessions",
      description:
        "Launch rooms instantly, invite players with a code, and keep the energy high with real-time answer flow.",
      icon: Users,
    },
    {
      title: "AI-assisted quiz building",
      description:
        "Speed up creation with AI support, then fine-tune questions and quiz structure from your dashboard.",
      icon: Bot,
    },
    {
      title: "Fast host controls",
      description:
        "Manage rooms, questions, and score visibility from a creator-first interface designed for momentum.",
      icon: Gauge,
    },
  ];

  const stack = [
    "React 19 + Vite",
    "Tailwind CSS 4",
    "Node.js + Express",
    "MongoDB",
    "Socket.IO",
    "AI-powered quiz workflows",
  ];

  const highlights = [
    "Quiz creation and question management",
    "Real-time room hosting and participation",
    "AI-enhanced interactive gameplay",
    "Responsive dashboard for desktop and mobile",
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <section className="hero-grid relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.22),_transparent_32%),linear-gradient(135deg,_#f8fbff,_#eef4ff_48%,_#ecfeff)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.22),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.2),_transparent_30%),linear-gradient(135deg,_#020617,_#0f172a_48%,_#082f49)]">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.55),transparent_40%,rgba(14,165,233,0.12))] dark:bg-[linear-gradient(120deg,rgba(15,23,42,0.2),transparent_40%,rgba(56,189,248,0.08))]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 md:px-10">
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-sky-300/50 bg-white/70 px-4 py-2 text-sm font-medium text-sky-900 shadow-sm backdrop-blur dark:border-sky-400/20 dark:bg-slate-900/60 dark:text-sky-100">
                <Sparkles size={16} />
                AI-powered multiplayer quiz platform
              </p>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-4xl">
                QuizCraft-Ai
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ThemeToggle className="border-slate-300/70 bg-white/70 text-slate-800 hover:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100" />
              <Button
                asChild
                variant="ghost"
                className="rounded-full text-slate-700 hover:bg-white/70 dark:text-slate-200 dark:hover:bg-slate-800/70"
              >
                <a href="#features">Features</a>
              </Button>
              <Button
                asChild
                className="rounded-full bg-slate-950 text-white hover:bg-slate-800 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
              >
                <Link to="/login">Launch app</Link>
              </Button>
            </div>
          </header>

          <div className="grid flex-1 items-center gap-16 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/75 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
                <MoonStar size={16} className="text-sky-500" />
                Switch between dark and light modes anytime
              </div>
              <h2 className="mt-6 text-5xl font-black leading-tight tracking-tight text-balance text-slate-950 dark:text-white md:text-7xl">
                Craft smarter quizzes.
                <span className="block text-sky-600 dark:text-sky-400">
                  Run them live with confidence.
                </span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 md:text-xl">
                QuizCraft-Ai brings live rooms, quiz management, and AI-assisted
                creation together in one fast interface for classrooms, teams,
                events, and communities.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-sky-500 px-8 text-base text-white hover:bg-sky-400"
                >
                  <Link to="/signup">Start building</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-slate-300 bg-white/80 px-8 text-base text-slate-800 hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-900"
                >
                  <a href="#stack">See the stack</a>
                </Button>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
                  <p className="text-3xl font-black text-slate-950 dark:text-white">
                    24/7
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Ready for quiz prep, hosting, and room management
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
                  <p className="text-3xl font-black text-slate-950 dark:text-white">
                    Real-time
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Multiplayer sync powered by room-based live events
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
                  <p className="text-3xl font-black text-slate-950 dark:text-white">
                    AI-first
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Built to accelerate writing, editing, and engagement
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-sky-400/20 blur-3xl dark:bg-sky-500/20" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-slate-950 p-6 text-white shadow-2xl dark:border-slate-800">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      Live Control Center
                    </p>
                    <p className="mt-1 text-lg font-semibold">QuizCraft-Ai Studio</p>
                  </div>
                  <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Session active
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-slate-400">Current room</p>
                    <p className="mt-2 text-3xl font-black tracking-[0.35em] text-sky-300">
                      QCAI
                    </p>
                    <p className="mt-3 text-sm text-slate-300">
                      Share the code and let players join in seconds.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-slate-400">Quiz progress</p>
                    <div className="mt-3 h-3 rounded-full bg-white/10">
                      <div className="h-3 w-3/4 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300" />
                    </div>
                    <p className="mt-3 text-sm text-slate-300">
                      15 of 20 questions prepared for your next live round.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  {features.map(({ title, description, icon: Icon }) => (
                    <div
                      key={title}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-300">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-300">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-400">
              Platform features
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Built for hosts, creators, and fast-moving teams.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400">
            The experience now matches the project better: crisp branding,
            theme switching, and a landing page that explains the stack and the
            value clearly.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                <Icon size={24} />
              </div>
              <h3 className="mt-6 text-2xl font-bold">{title}</h3>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white/70 py-24 backdrop-blur dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[0.95fr_1.05fr] md:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-400">
              Tech stack credit
            </p>
            <h2 id="stack" className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Powered by a modern real-time stack.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-slate-600 dark:text-slate-400">
              This project deserves clear credit for the technologies shaping
              the experience, from the React frontend to the real-time backend
              and AI-assisted quiz flow.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stack.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/60"
              >
                <Layers3 size={18} className="text-sky-500" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white dark:bg-slate-900">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
              <Rocket size={24} />
            </div>
            <h2 className="mt-6 text-3xl font-black">What makes it useful</h2>
            <div className="mt-6 space-y-4">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <Zap size={18} className="mt-1 shrink-0 text-sky-300" />
                  <p className="text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-sky-50 to-cyan-50 p-8 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white">
              <ShieldCheck size={24} />
            </div>
            <h2 className="mt-6 text-3xl font-black">Ready to host smarter?</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600 dark:text-slate-400">
              Sign in, create a quiz, open a room, and run an experience that
              looks polished in both light and dark themes.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-slate-950 text-white hover:bg-slate-800 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
              >
                <Link to="/signup">Create account</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-slate-300 bg-white/80 dark:border-slate-700 dark:bg-slate-900"
              >
                <Link to="/login">Open dashboard</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/70">
              <BrainCircuit size={20} className="text-sky-500" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                QuizCraft-Ai now reflects the product&apos;s AI and live gameplay
                focus much more clearly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
