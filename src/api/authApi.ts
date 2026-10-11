// ============================================================
// File: src/api/authApi.ts
// Purpose: All authentication-related backend calls
// Logic:
//   - Wraps POST /api/auth/login and POST /api/auth/register
//   - Used only by Login.tsx and Register.tsx
// ============================================================
import { axiosClient } from "./axiosClient";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/user";

// Log the user in and return the JWT token + user info
export async function login(payload: LoginRequest): Promise<AuthResponse> {
    const { data } = await axiosClient.post<AuthResponse>("/auth/login", payload);
    return data;
}

// Register a new Farmer account and return the JWT token + user info
export async function register(payload: RegisterRequest): Promise<AuthResponse> {
    const { data } = await axiosClient.post<AuthResponse>("/auth/register", payload);
    return data;
}