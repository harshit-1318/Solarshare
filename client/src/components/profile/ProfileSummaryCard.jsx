import { Camera, ShieldCheck, Sparkles } from "lucide-react";

export default function ProfileSummaryCard({ user, initials, handlePhotoChange }) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft flex flex-col items-center text-center">
      <div className="relative">
        {user?.profilePictureUrl ? (
          <img
            src={user.profilePictureUrl}
            alt="Profile"
            className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg shadow-emerald-600/10"
          />
        ) : (
          <span className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-600 font-heading text-4xl font-bold text-white shadow-lg shadow-emerald-600/20">
            {initials}
          </span>
        )}
        <input
          type="file"
          id="profile-photo-input"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
        <button
          type="button"
          onClick={() => document.getElementById("profile-photo-input").click()}
          className="absolute bottom-0 right-0 p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 hover:shadow-md transition"
        >
          <Camera size={16} />
        </button>
      </div>

      <h2 className="mt-5 font-heading text-xl font-extrabold text-slate-900">{user?.name}</h2>
      <p className="text-xs font-semibold text-slate-400 mt-1">{user?.email}</p>

      <span className="mt-3 inline-flex items-center gap-1 px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 capitalize">
        <Sparkles size={12} /> {user?.role}
      </span>

      <hr className="w-full my-6 border-slate-100" />

      <div className="w-full space-y-4 text-xs text-left">
        <div className="flex justify-between">
          <span className="font-semibold text-slate-400">Member Since</span>
          <span className="font-bold text-slate-800">October 2023</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-slate-400">KYC Verification</span>
          <span className="font-bold text-emerald-600 flex items-center gap-1">
            Verified <ShieldCheck size={16} />
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-slate-400">Panel Capacity</span>
          <span className="font-bold text-slate-800">{user?.solarPanel?.capacityKw || 6} kW</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-slate-400">Grid Zone</span>
          <span className="font-bold text-slate-800">{user?.address?.city || "Bangalore"}, India</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => document.getElementById("profile-photo-input").click()}
        className="mt-8 w-full rounded-2xl border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
      >
        Update Profile Photo
      </button>
    </section>
  );
}
