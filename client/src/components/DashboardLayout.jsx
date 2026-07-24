import { useState } from "react";
import { Menu, Search } from "lucide-react";
import Sidebar from "./Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotifications } from "./layout/useNotifications.js";
import NotificationDropdown from "./layout/NotificationDropdown.jsx";

const DashboardLayout = ({ title, subtitle, action, children }) => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const notifState = useNotifications(user);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} unreadCount={notifState.unreadCount} />
      <main className="min-h-screen lg:pl-[17rem]">
        <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur sm:px-7 lg:px-9">
          <button aria-label="Open menu" onClick={() => setMenuOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden">
            <Menu size={21} />
          </button>
          
          <div className="relative w-72 sm:w-96">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border-0 bg-slate-100/80 py-2 pl-9 pr-4 text-xs text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <NotificationDropdown
            notifsOpen={notifState.notifsOpen}
            setNotifsOpen={notifState.setNotifsOpen}
            notifications={notifState.notifications}
            unreadCount={notifState.unreadCount}
            handleMarkRead={notifState.handleMarkRead}
            handleMarkAllRead={notifState.handleMarkAllRead}
            handleDeleteNotif={notifState.handleDeleteNotif}
            formatNotifTime={notifState.formatNotifTime}
            user={user}
            notifRef={notifState.notifRef}
          />
        </header>

        <div className="px-4 py-8 sm:px-7 lg:px-9">
          {(title || action) && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {title && <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>}
                {subtitle && <p className="mt-1 text-sm font-medium text-slate-500">{subtitle}</p>}
              </div>
              {action && <div>{action}</div>}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
