// ============================================================
// File: src/pages/Login.tsx
// Purpose: Public login page — entry point before any protected
//          route is accessible
// Logic:
//   - Local form state (email/password), submits via useAuth().login
//   - On success, AuthContext stores the session and this page
//     navigates to "/" (Dashboard); ProtectedRoute then lets the
//     user through automatically
//   - Displays the backend error message (e.g. invalid credentials)
//     inline, without a page reload
//   - "Forgot password?" is rendered as an inert element, not a
//     Link: no password-recovery endpoint exists in AuthController
//     (Backend Architecture only documents /register and /login),
//     so wiring it to a route would be a dead link. It stays here
//     only to match the reference mockup's layout; it will become
//     a real Link once that endpoint exists
// ============================================================
import { useState, type FormEvent } from "react";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();
    const { login, isLoggingIn, loginError } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Submit credentials, then redirect to the dashboard on success
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate("/");
        } catch {
            // Error is already exposed via loginError below; nothing else to do
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm rounded-md border border-outline-variant bg-surface-container-lowest p-8">
                <div className="text-center">
                    <h1 className="font-display text-2xl font-bold text-primary">METHIX</h1>
                    <p className="mt-1 text-sm text-on-surface-variant">Agri-Intelligence</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                    <label className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium text-on-surface-variant">Email</span>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                autoFocus
                                className="h-10 w-full rounded-md border border-outline-variant bg-surface-container-lowest pl-9 pr-3 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </label>

                    <label className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-on-surface-variant">Password</span>
                            {/* Inert placeholder — see file header for why this
                                isn't a real Link yet */}
                            <span className="cursor-not-allowed text-xs font-medium text-primary/60">
                                Forgot password?
                            </span>
                        </div>
                        <div className="relative">
                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="h-10 w-full rounded-md border border-outline-variant bg-surface-container-lowest pl-9 pr-3 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </label>

                    {loginError && (
                        <p className="text-sm text-error" role="alert">
                            Invalid email or password. Please try again.
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="flex h-10 items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-on-primary hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoggingIn ? "Logging in..." : "Log in"}
                        {!isLoggingIn && <ArrowRight className="h-4 w-4" />}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-on-surface-variant">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-medium text-primary hover:underline">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
}