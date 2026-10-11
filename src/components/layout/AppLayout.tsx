// ============================================================
// File: src/components/layout/AppLayout.tsx
// Purpose: Shell wrapping Sidebar + Topbar around every protected
//          page's content, per Frontend Architecture routing spec
// Logic:
//   - Uses React Router's <Outlet /> so App.tsx can nest all
//     protected routes under this one layout without repeating
//     Sidebar/Topbar on every page component
// ============================================================
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

// Layout shell for all authenticated pages (Dashboard, Cattle, etc.)
export function AppLayout() {
    return (
        <div className="flex h-screen bg-background">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}