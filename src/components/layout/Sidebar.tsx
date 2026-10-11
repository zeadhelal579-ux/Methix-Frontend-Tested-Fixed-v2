// ============================================================
// File: src/components/layout/Sidebar.tsx
// Purpose: Fixed left navigation sidebar (260px), per DESIGN.md
//          layout spec
// Logic:
//   - Uses React Router's NavLink for automatic active-state
//     detection (no manual pathname comparison needed)
//   - Icons are 20px, stroke-based, neutral by default, shifting
//     to primary teal when the route is active (DESIGN.md > Side
//     Navigation spec)
//   - Brand block (icon + "METHIX" + "Agri-Intelligence" tagline)
//     matches the reference mockups exactly, since this is the
//     one element shown identically on every single screen
// ============================================================
import { NavLink } from "react-router-dom";
import { FlaskConical, LayoutDashboard, Beef, LineChart, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

// Nav items, in the order defined by Frontend Architecture routing table
const NAV_ITEMS = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/cattle", label: "Cattle", icon: Beef, end: false },
    { to: "/predictions", label: "Predictions", icon: LineChart, end: false },
    { to: "/settings", label: "Settings", icon: Settings, end: false },
];

// Persistent sidebar shown on every protected page (inside AppLayout)
export function Sidebar() {
    return (
        <aside className="flex h-screen w-(--spacing-sidebar-width) flex-col border-r border-outline-variant bg-surface-container-lowest">
            {/* Brand block: teal icon tile + wordmark + tagline,
                identical on every page per the reference mockups */}
            <div className="flex items-center gap-3 px-6 py-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary">
                    <FlaskConical className="h-5 w-5 text-on-primary" strokeWidth={2} />
                </div>
                <div className="flex flex-col leading-tight">
                    <span className="font-display text-lg font-bold text-primary">METHIX</span>
                    <span className="text-xs text-on-surface-variant">Agri-Intelligence</span>
                </div>
            </div>

            <nav className="flex flex-1 flex-col gap-1 px-3">
                {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary-container/10 text-primary"
                                    : "text-on-surface-variant hover:bg-surface-container"
                            )
                        }
                    >
                        <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}