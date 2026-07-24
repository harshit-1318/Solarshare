import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import api from "../../api/axios.js";
import WalletCard from "../../components/wallet/WalletCard.jsx";
import TopUpPanel from "../../components/wallet/TopUpPanel.jsx";
import WalletHistoryTable from "../../components/wallet/WalletHistoryTable.jsx";

export default function WalletPage() {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState("500");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const load = () => api.get("/wallet").then(({ data }) => setWallet(data));

  useEffect(() => {
    load().catch(() => setNotice("Could not load wallet right now."));
  }, []);

  const topUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setNotice("");
    try {
      await api.post("/wallet/top-up", { amount: Number(amount) });
      setNotice("Demo balance added successfully to your wallet!");
      load();
    } catch (err) {
      setNotice(err.response?.data?.message || "Could not add balance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="Digital Energy Wallet 💳"
      subtitle="Manage your SolarShare balance, instant UPI payouts, and trade settlement history."
    >
      <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr]">
        <WalletCard wallet={wallet} />
        <TopUpPanel
          amount={amount}
          setAmount={setAmount}
          topUp={topUp}
          loading={loading}
          notice={notice}
        />
      </div>
      <WalletHistoryTable wallet={wallet} />
    </DashboardLayout>
  );
}
