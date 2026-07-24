import { Leaf, Award, Plus, RefreshCw } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import ProsumerCertTable from "../../components/prosumer/ProsumerCertTable.jsx";
import MintCertModal from "../../components/prosumer/MintCertModal.jsx";
import { useProsumerCertificates } from "../../components/prosumer/useProsumerCertificates.js";

export default function ProsumerCertificates() {
  const c = useProsumerCertificates();

  return (
    <DashboardLayout
      title="Carbon Credits & Certificates"
      subtitle="Verify your green solar offset, generate carbon certificates, and list them for trade."
      action={
        <div className="flex gap-2">
          <button onClick={() => c.setShowMintModal(true)} className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-md transition">
            <Plus size={14} /> Mint Certificate
          </button>
          <button onClick={c.loadData} className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
            <RefreshCw size={13} className={c.loading ? "animate-spin" : ""} />
          </button>
        </div>
      }
    >
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="panel p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">CO2 Emissions Avoided</p>
            <p className="mt-3 font-heading text-2xl font-semibold text-slate-900">{(c.stats.totalCO2SavedKg / 1000).toFixed(2)} Tons</p>
          </div>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600"><Leaf size={24} /></span>
        </div>
        <div className="panel p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Accumulated Carbon Credits</p>
            <p className="mt-3 font-heading text-2xl font-semibold text-slate-900">{c.stats.totalCreditsIssued.toFixed(2)} Credits</p>
          </div>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 text-amber-600"><Award size={24} /></span>
        </div>
      </div>

      <ProsumerCertTable certs={c.certs} handleTradeCertificate={c.handleTradeCertificate} />
      <MintCertModal showMintModal={c.showMintModal} setShowMintModal={c.setShowMintModal} mintVolume={c.mintVolume} setMintVolume={c.setMintVolume} handleMintCertificate={c.handleMintCertificate} minting={c.minting} />
    </DashboardLayout>
  );
}
