import DashboardLayout from "../../components/DashboardLayout.jsx";
import ChangePasswordModal from "../../components/profile/ChangePasswordModal.jsx";
import TwoFactorModal from "../../components/profile/TwoFactorModal.jsx";
import ProfileSummaryCard from "../../components/profile/ProfileSummaryCard.jsx";
import PersonalInfoSection from "../../components/profile/PersonalInfoSection.jsx";
import SolarSpecsSection from "../../components/profile/SolarSpecsSection.jsx";
import KycSection from "../../components/profile/KycSection.jsx";
import SecuritySection from "../../components/profile/SecuritySection.jsx";
import { useProfileState } from "../../components/profile/useProfileState.js";

export default function ProfilePage() {
  const state = useProfileState();

  const initials = state.user?.name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "SS";

  return (
    <DashboardLayout title="Account & Grid Profile 👤" subtitle="Manage your verified personal details, solar array specifications, & security settings.">
      {state.message && (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-900">
          {state.message}
        </div>
      )}
      {state.errorMessage && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-900">
          {state.errorMessage}
        </div>
      )}

      <ChangePasswordModal
        managingPassword={state.managingPassword}
        setManagingPassword={state.setManagingPassword}
        passwordForm={state.passwordForm}
        setPasswordForm={state.setPasswordForm}
        handlePasswordChange={state.handlePasswordChange}
        loading={state.loading}
      />

      <TwoFactorModal
        managing2FA={state.managing2FA}
        setManaging2FA={state.setManaging2FA}
        twoFactorValue={state.twoFactorValue}
        handleToggle2FA={state.handleToggle2FA}
        loading={state.loading}
      />

      <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <ProfileSummaryCard user={state.user} initials={initials} handlePhotoChange={state.handlePhotoChange} />
        <div className="space-y-6">
          <PersonalInfoSection
            user={state.user}
            editingPersonal={state.editingPersonal}
            setEditingPersonal={state.setEditingPersonal}
            personalForm={state.personalForm}
            setPersonalForm={state.setPersonalForm}
            handleUpdatePersonal={state.handleUpdatePersonal}
            loading={state.loading}
          />
          <SolarSpecsSection user={state.user} editingSolar={state.editingSolar} setEditingSolar={state.setEditingSolar} />
          <KycSection />
          <SecuritySection setManagingPassword={state.setManagingPassword} twoFactorValue={state.twoFactorValue} setManaging2FA={state.setManaging2FA} />
        </div>
      </div>
    </DashboardLayout>
  );
}
