import { Leaf, X } from "lucide-react";

const number = (val) => Number(val) || 0;

export default function MintCertModal({
  showMintModal,
  setShowMintModal,
  mintVolume,
  setMintVolume,
  handleMintCertificate,
  minting
}) {
  if (!showMintModal) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-100">
        <button
          onClick={() => setShowMintModal(false)}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
        >
          <X size={18} />
        </button>

        <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
          <Leaf className="text-emerald-500" size={20} /> Mint Carbon Credit
        </h3>
        <p className="text-xs text-slate-500 mt-1.5">
          Enter your total solar energy sales volume to convert into tradeable carbon credit certificates.
        </p>

        <form onSubmit={handleMintCertificate} className="mt-4 space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Solar Energy (kWh)</label>
            <input
              type="number"
              required
              min="1"
              value={mintVolume}
              onChange={(e) => setMintVolume(e.target.value)}
              placeholder="e.g. 500"
              className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="text-xs text-slate-400 space-y-1 border-t border-slate-50 pt-2 font-medium">
            <p>Calculated offsets summary:</p>
            <p className="text-emerald-600">Avoided CO2: {(number(mintVolume) * 0.8).toFixed(1)} kg</p>
            <p className="text-amber-600">Credits issued: {(number(mintVolume) * 0.8 / 10).toFixed(2)} Credits</p>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={() => setShowMintModal(false)}
              className="flex-1 border border-slate-200 rounded-xl py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={minting}
              className="flex-1 bg-emerald-600 rounded-xl py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition"
            >
              {minting ? "Minting..." : "Mint Credits"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
