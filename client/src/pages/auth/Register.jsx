import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import RegisterHero from "../../components/auth/RegisterHero.jsx";
import RegisterStep1 from "../../components/auth/RegisterStep1.jsx";
import RegisterStep2 from "../../components/auth/RegisterStep2.jsx";

const roleHome = { prosumer: "/prosumer", consumer: "/consumer", admin: "/admin" };

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "", city: "", capacityKw: "5", adminCode: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleContinueToRole = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.city) return setError("Please fill in all required fields.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    setError("");
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!form.role) return setError("Please select a role to continue.");
    setError("");
    setSubmitting(true);
    try {
      const user = await register(form);
      navigate(roleHome[user.role] || "/");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Please try again.";
      setError(msg);
      if (!msg.toLowerCase().includes("admin") && !msg.toLowerCase().includes("code")) setStep(1);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-12 font-body">
      <RegisterHero />
      <section className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-12 lg:col-span-7">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-emerald-600 transition"><ArrowLeft size={15} /> Back to Home</Link>
            <span className="text-xs font-bold uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">Step {step} of 2</span>
          </div>

          {error && <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-900">{error}</div>}

          {step === 1 ? (
            <RegisterStep1 form={form} setForm={setForm} showPassword={showPassword} setShowPassword={setShowPassword} handleContinueToRole={handleContinueToRole} />
          ) : (
            <RegisterStep2 form={form} setForm={setForm} setStep={setStep} handleSubmit={handleSubmit} submitting={submitting} />
          )}
        </div>
      </section>
    </div>
  );
}
