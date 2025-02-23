'use client'
 
import dynamic from 'next/dynamic'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BarProvider } from '../BarContext.js'
import { UserProvider } from "../UserContext.js";
 
const App = dynamic(() => import('../../App'), { ssr: false })
 
export function ClientOnly() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserProvider>
            <BarProvider>
                <App />
            </BarProvider>
        </UserProvider>
    </GoogleOAuthProvider>
  )
}