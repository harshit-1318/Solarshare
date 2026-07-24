import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import LoginHero from "../../components/auth/LoginHero.jsx";
import LoginForm from "../../components/auth/LoginForm.jsx";

const roleHome = { prosumer: "/prosumer", consumer: "/consumer", admin: "/admin" };

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(form.email, form.password);
      navigate(roleHome[user.role] || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickFill = (role) => {
    if (role === "prosumer") setForm({ email: "ramesh@solarshare.com", password: "password123" });
    if (role === "consumer") setForm({ email: "priya@solarshare.com", password: "password123" });
    if (role === "admin") setForm({ email: "admin@solarshare.com", password: "password123" });
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-12 font-body">
      <LoginHero />
      <section className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-12 lg:col-span-7">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-emerald-600 mb-8 transition-colors"
          >
            <ArrowLeft size={15} /> Back to Home
          </Link>

          <div>
            <h1 className="font-heading text-3xl font-black tracking-tight text-slate-900">
              Welcome back! 👋
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Sign in to manage your solar listings, wallet, & carbon credits.
            </p>
          </div>

          <LoginForm
            form={form}
            setForm={setForm}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={error}
            submitting={submitting}
            handleSubmit={handleSubmit}
            handleQuickFill={handleQuickFill}
          />
        </div>
      </section>
    </div>
  );
}
