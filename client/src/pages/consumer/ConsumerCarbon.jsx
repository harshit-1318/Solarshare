import { Leaf, Award, ShoppingBag, Trees } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatCard from "../../components/StatCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useConsumerCarbon } from "../../components/consumer/useConsumerCarbon.js";
import GreenBadgesSection from "../../components/consumer/GreenBadgesSection.jsx";
import CarbonProgressCertificate from "../../components/consumer/CarbonProgressCertificate.jsx";

export default function ConsumerCarbon() {
  const { user } = useAuth();
  const c = useConsumerCarbon(user);

  return (
    <DashboardLayout
      title="Carbon Credits & Climate Offset 🌿"
      subtitle="Track your verified CO₂ offsets, green certificates, and environmental achievements."
    >
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="CO₂ Offset Saved"
          value={`${c.totalCO2Tons} Tons`}
          sublabel="Audited carbon reduction"
          icon={Leaf}
          accent="green"
          trend="+0.12 Tons"
        />
        <StatCard
          label="Carbon Credits"
          value={`${c.creditsEarnedVal.toFixed(0)} CC`}
          sublabel="Accrued UN certificates"
          icon={Award}
          accent="violet"
        />
        <StatCard
          label="Credits Traded"
          value={`${(c.creditsEarnedVal / 2).toFixed(0)} CC`}
          sublabel={`₹${(c.creditsEarnedVal / 2 * 60).toFixed(0)} market value`}
          icon={ShoppingBag}
          accent="amber"
        />
        <StatCard
          label="Trees Equivalent"
          value={`${Math.round(c.totalCO2Tons * 16)} Trees`}
          sublabel="Offset absorption impact"
          icon={Trees}
          accent="blue"
        />
      </div>

      <GreenBadgesSection />
      <CarbonProgressCertificate
        user={user}
        totalCO2Tons={c.totalCO2Tons}
        creditsEarnedVal={c.creditsEarnedVal}
        handleDownloadCertificate={c.handleDownloadCertificate}
      />
    </DashboardLayout>
  );
}
