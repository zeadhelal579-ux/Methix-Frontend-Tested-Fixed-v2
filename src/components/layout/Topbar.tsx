// ============================================================
// File: src/components/layout/Topbar.tsx
// Purpose: Top bar shown on every protected page — breadcrumb
//          tabs (left), and farm switcher / notifications / help
//          / user avatar (right)
// Logic:
//   - "Farm Overview" tab is always shown and links back to "/".
//     A second "Cattle Detail" tab appears only while viewing
//     /cattle/:cattleId, matching the two-tab state shown in the
//     Cattle Detail mockup (vs. the single-tab state everywhere
//     else); detected via useLocation + matchPath instead of
//     hardcoding the route in every page component
//   - Reads the current farm via useFarm(farmId) (React Query),
//     and the current user via useAuth() (AuthContext)
//   - The farm dropdown only lists farms the user has access to;
//     for now it renders the single active farm's name — full
//     multi-farm switching will be wired once the personnel/farm
//     list endpoint for a user is available
// ============================================================
import { Bell, ChevronDown, CircleHelp, LogOut } from "lucide-react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useFarm } from "@/hooks/useFarm";
import { useFarmContext } from "@/context/FarmContext";
import { cn } from "@/lib/utils";

// Top bar: breadcrumb tabs (left) + farm switcher and utility actions (right)
export function Topbar() {
    const { user, logout } = useAuth();
    const { farmId } = useFarmContext();
    const { data: farm } = useFarm(farmId);
    const location = useLocation();

    // Only the Cattle Detail route shows a second tab; every other
    // protected page shows just the single "Farm Overview" tab
    const isCattleDetail = !!matchPath("/cattle/:cattleId", location.pathname);

    return (
        <header className="flex h-16 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-6">
            {/* Breadcrumb tabs: always "Farm Overview", plus "Cattle
                Detail" only while on that page */}
            <nav className="flex h-full items-center gap-6">
                <Link
                    to="/"
                    className={cn(
                        "flex h-full items-center border-b-2 text-sm font-medium",
                        isCattleDetail
                            ? "border-transparent text-on-surface-variant hover:text-on-surface"
                            : "border-primary text-on-surface"
                    )}
                >
                    Farm Overview
                </Link>

                {isCattleDetail && (
                    <span className="flex h-full items-center border-b-2 border-primary text-sm font-medium text-on-surface">
                        Cattle Detail
                    </span>
                )}
            </nav>

            <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-on-surface hover:bg-surface-container"
                >
                    {farm?.name ?? "Select farm"}
                    <ChevronDown className="h-4 w-4 text-outline" />
                </button>

                <button
                    type="button"
                    aria-label="Notifications"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container"
                >
                    <Bell className="h-5 w-5" />
                </button>

                <button
                    type="button"
                    aria-label="Help"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container"
                >
                    <CircleHelp className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-on-primary">
                        {user?.name?.charAt(0).toUpperCase() ?? "?"}
                    </div>
                    <span className="text-sm font-medium text-on-surface">{user?.name}</span>
                </div>

                <button
                    type="button"
                    onClick={logout}
                    aria-label="Log out"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container"
                >
                    <LogOut className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}
