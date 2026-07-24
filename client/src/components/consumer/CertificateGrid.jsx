import { FileSpreadsheet } from "lucide-react";

const number = (val) => Number(val) || 0;

export default function CertificateGrid({ certs }) {
  return (
    <section className="mt-4">
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-600">
          <FileSpreadsheet size={18} />
        </span>
        <div>
          <p className="eyebrow">Verification history</p>
          <h2 className="mt-0.5 font-heading text-lg font-semibold text-slate-900">Your Certificates</h2>
        </div>
      </div>

      <div className="table-shell">
        <table className="min-w-[760px] w-full text-left text-sm">
          <thead className="table-header">
            <tr>
              <th className="px-5 py-3.5">Certificate ID</th>
              <th className="px-5 py-3.5">Energy Purchased</th>
              <th className="px-5 py-3.5">CO2 Offset</th>
              <th className="px-5 py-3.5">Credits Earned</th>
              <th className="px-5 py-3.5">Date Issued</th>
              <th className="px-5 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {certs.map((c) => (
              <tr className="hover:bg-slate-50/70" key={c._id}>
                <td className="px-5 py-4 font-mono font-semibold text-slate-700">
                  CERT-{c._id.substring(c._id.length - 8).toUpperCase()}
                </td>
                <td className="px-5 py-4 font-medium text-slate-800">
                  {number(c.kwhSold).toFixed(1)} kWh
                </td>
                <td className="px-5 py-4 text-emerald-600 font-semibold">
                  {number(c.co2SavedKg).toFixed(1)} kg
                </td>
                <td className="px-5 py-4 text-amber-600 font-semibold">
                  {number(c.creditsEarned).toFixed(2)}
                </td>
                <td className="px-5 py-4 text-slate-500">
                  {new Date(c.issuedAt || c.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-4">
                  <a
                    href={c.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    Download PDF
                  </a>
                </td>
              </tr>
            ))}

            {!certs.length && (
              <tr>
                <td colSpan="6" className="px-6 py-14 text-center">
                  <p className="font-medium text-slate-700">No certificates generated yet</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Certificates will list here once issued from your transaction settlements.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
