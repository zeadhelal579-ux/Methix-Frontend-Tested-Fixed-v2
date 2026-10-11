// ============================================================
// File: src/types/user.ts
// Purpose: Type definitions for authentication and user data
// Logic:
//   - AuthResponse mirrors the EXACT nested shape returned by the
//     backend's AuthResponse DTO (AuthController: /register, /login):
//     { token, user: { userId, name, email, role } } — confirmed
//     directly against Methix.Api.DTOs.Auth.AuthResponse.cs
//     (AuthResponse.User is an AuthUserDto with UserId/Name/Email/Role)
//   - "Role" is restricted to the two roles seeded in the
//     database (Farmer / Admin), matching SQL Architecture
// ============================================================

// User role, matching the seeded Roles table (Farmer / Admin)
export type Role = "Farmer" | "Admin";

// Authenticated user shape, matches the backend's nested AuthUserDto
export interface User {
    userId: number;
    name: string;
    email: string;
    role: Role;
}

// Request body for POST /api/auth/login
export interface LoginRequest {
    email: string;
    password: string;
}

// Request body for POST /api/auth/register
export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

// Response returned by both login and register endpoints.
// Nested shape — matches Methix.Api.DTOs.Auth.AuthResponse exactly:
// { token, user: { userId, name, email, role } }
export interface AuthResponse {
    token: string;
    user: User;
}