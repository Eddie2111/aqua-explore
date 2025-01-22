"use server";
import { cookies } from 'next/headers'

export const setAuthToken = async (token: string) => {
    const cookie = await cookies();
    cookie.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  })
}

export const getAuthToken = async () => {
  const token = await cookies();
    return token.get('auth-token')
}