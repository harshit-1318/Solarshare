import { useState } from "react";
import Header from "../../components/landing/Header.jsx";
import Footer from "../../components/landing/Footer.jsx";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import SupportHero from "../../components/support/SupportHero.jsx";
import SupportCategories from "../../components/support/SupportCategories.jsx";
import DirectChannels from "../../components/support/DirectChannels.jsx";
import TicketForm from "../../components/support/TicketForm.jsx";
import SupportFaqSection from "../../components/support/SupportFaqSection.jsx";

export default function SupportPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("prosumer");
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    category: "Prosumer & Solar Setup",
    priority: "Normal",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const ticketId = `SS-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket({
        id: ticketId,
        subject: form.subject,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
      setSubmitting(false);
      setForm({
        name: user?.name || "",
        email: user?.email || "",
        category: "Prosumer & Solar Setup",
        priority: "Normal",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  const mainContent = (
    <div className="space-y-16">
      <SupportHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SupportCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 space-y-6">
          <DirectChannels />
        </div>
        <div className="lg:col-span-7">
          <TicketForm
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
            submitting={submitting}
            submittedTicket={submittedTicket}
            setSubmittedTicket={setSubmittedTicket}
          />
        </div>
      </div>
      <SupportFaqSection searchQuery={searchQuery} />
    </div>
  );

  if (user) {
    return (
      <DashboardLayout title="Help & Support Center 🎧" subtitle="Get 24/7 technical assistance for smart meters, wallet payouts, and P2P trade disputes.">
        <div className="mt-6">{mainContent}</div>
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-body text-slate-800">
      <Header />
      <main className="container mx-auto px-4 py-12">{mainContent}</main>
      <Footer />
    </div>
  );
}
