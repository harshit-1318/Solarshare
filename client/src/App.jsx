import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

import ProsumerDashboard from "./pages/prosumer/ProsumerDashboard.jsx";
import ProsumerSmartMeter from "./pages/prosumer/ProsumerSmartMeter.jsx";
import ProsumerSolarPanels from "./pages/prosumer/ProsumerSolarPanels.jsx";
import ProsumerCertificates from "./pages/prosumer/ProsumerCertificates.jsx";
import ProsumerCarbon from "./pages/prosumer/ProsumerCarbon.jsx";
import ProsumerNotifications from "./pages/prosumer/ProsumerNotifications.jsx";
import ProsumerSettings from "./pages/prosumer/ProsumerSettings.jsx";
import ListingsPage from "./pages/prosumer/ListingsPage.jsx";

import ConsumerDashboard from "./pages/consumer/ConsumerDashboard.jsx";
import ConsumerOrders from "./pages/consumer/ConsumerOrders.jsx";
import ConsumerAnalytics from "./pages/consumer/ConsumerAnalytics.jsx";
import ConsumerDisputes from "./pages/consumer/ConsumerDisputes.jsx";
import ConsumerSettings from "./pages/consumer/ConsumerSettings.jsx";
import ConsumerLedger from "./pages/consumer/ConsumerLedger.jsx";
import ConsumerCarbon from "./pages/consumer/ConsumerCarbon.jsx";
import ConsumerCertificates from "./pages/consumer/ConsumerCertificates.jsx";
import ConsumerNotifications from "./pages/consumer/ConsumerNotifications.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminPanels from "./pages/admin/AdminPanels.jsx";
import AdminListings from "./pages/admin/AdminListings.jsx";
import AdminTransactions from "./pages/admin/AdminTransactions.jsx";
import AdminGrid from "./pages/admin/AdminGrid.jsx";
import AdminPricing from "./pages/admin/AdminPricing.jsx";
import AdminCarbon from "./pages/admin/AdminCarbon.jsx";
import AdminDisputes from "./pages/admin/AdminDisputes.jsx";
import AdminReports from "./pages/admin/AdminReports.jsx";
import AdminNotifications from "./pages/admin/AdminNotifications.jsx";
import AdminSettings from "./pages/admin/AdminSettings.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Marketplace from "./pages/shared/Marketplace.jsx";
import WalletPage from "./pages/shared/WalletPage.jsx";
import TransactionsPage from "./pages/shared/TransactionsPage.jsx";
import ProfilePage from "./pages/shared/ProfilePage.jsx";
import SupportPage from "./pages/shared/SupportPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />

      {/* Prosumer Routes */}
      <Route path="/prosumer" element={<ProtectedRoute allowedRoles={["prosumer"]}><ProsumerDashboard /></ProtectedRoute>} />
      <Route path="/prosumer/meter" element={<ProtectedRoute allowedRoles={["prosumer"]}><ProsumerSmartMeter /></ProtectedRoute>} />
      <Route path="/prosumer/panels" element={<ProtectedRoute allowedRoles={["prosumer"]}><ProsumerSolarPanels /></ProtectedRoute>} />
      <Route path="/prosumer/listings" element={<ProtectedRoute allowedRoles={["prosumer"]}><ListingsPage /></ProtectedRoute>} />
      <Route path="/prosumer/transactions" element={<ProtectedRoute allowedRoles={["prosumer"]}><TransactionsPage /></ProtectedRoute>} />
      <Route path="/prosumer/wallet" element={<ProtectedRoute allowedRoles={["prosumer"]}><WalletPage /></ProtectedRoute>} />
      <Route path="/prosumer/carbon" element={<ProtectedRoute allowedRoles={["prosumer"]}><ProsumerCarbon /></ProtectedRoute>} />
      <Route path="/prosumer/certificates" element={<ProtectedRoute allowedRoles={["prosumer"]}><ProsumerCertificates /></ProtectedRoute>} />
      <Route path="/prosumer/notifications" element={<ProtectedRoute allowedRoles={["prosumer"]}><ProsumerNotifications /></ProtectedRoute>} />
      <Route path="/prosumer/settings" element={<ProtectedRoute allowedRoles={["prosumer"]}><ProsumerSettings /></ProtectedRoute>} />

      {/* Consumer Routes */}
      <Route path="/consumer" element={<ProtectedRoute allowedRoles={["consumer"]}><ConsumerDashboard /></ProtectedRoute>} />
      <Route path="/consumer/orders" element={<ProtectedRoute allowedRoles={["consumer"]}><ConsumerOrders /></ProtectedRoute>} />
      <Route path="/consumer/analytics" element={<ProtectedRoute allowedRoles={["consumer"]}><ConsumerAnalytics /></ProtectedRoute>} />
      <Route path="/consumer/disputes" element={<ProtectedRoute allowedRoles={["consumer"]}><ConsumerDisputes /></ProtectedRoute>} />
      <Route path="/consumer/settings" element={<ProtectedRoute allowedRoles={["consumer"]}><ConsumerSettings /></ProtectedRoute>} />
      <Route path="/consumer/transactions" element={<ProtectedRoute allowedRoles={["consumer"]}><TransactionsPage /></ProtectedRoute>} />
      <Route path="/consumer/wallet" element={<ProtectedRoute allowedRoles={["consumer"]}><WalletPage /></ProtectedRoute>} />
      <Route path="/consumer/ledger" element={<ProtectedRoute allowedRoles={["consumer"]}><ConsumerLedger /></ProtectedRoute>} />
      <Route path="/consumer/carbon" element={<ProtectedRoute allowedRoles={["consumer"]}><ConsumerCarbon /></ProtectedRoute>} />
      <Route path="/consumer/certificates" element={<ProtectedRoute allowedRoles={["consumer"]}><ConsumerCertificates /></ProtectedRoute>} />
      <Route path="/consumer/notifications" element={<ProtectedRoute allowedRoles={["consumer"]}><ConsumerNotifications /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin"              element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users"        element={<ProtectedRoute allowedRoles={["admin"]}><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/panels"       element={<ProtectedRoute allowedRoles={["admin"]}><AdminPanels /></ProtectedRoute>} />
      <Route path="/admin/listings"     element={<ProtectedRoute allowedRoles={["admin"]}><AdminListings /></ProtectedRoute>} />
      <Route path="/admin/transactions" element={<ProtectedRoute allowedRoles={["admin"]}><AdminTransactions /></ProtectedRoute>} />
      <Route path="/admin/grid"         element={<ProtectedRoute allowedRoles={["admin"]}><AdminGrid /></ProtectedRoute>} />
      <Route path="/admin/pricing"      element={<ProtectedRoute allowedRoles={["admin"]}><AdminPricing /></ProtectedRoute>} />
      <Route path="/admin/carbon"       element={<ProtectedRoute allowedRoles={["admin"]}><AdminCarbon /></ProtectedRoute>} />
      <Route path="/admin/disputes"     element={<ProtectedRoute allowedRoles={["admin"]}><AdminDisputes /></ProtectedRoute>} />
      <Route path="/admin/reports"      element={<ProtectedRoute allowedRoles={["admin"]}><AdminReports /></ProtectedRoute>} />
      <Route path="/admin/notifications" element={<ProtectedRoute allowedRoles={["admin"]}><AdminNotifications /></ProtectedRoute>} />
      <Route path="/admin/settings"     element={<ProtectedRoute allowedRoles={["admin"]}><AdminSettings /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
