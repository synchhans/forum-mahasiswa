"use client";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function DevPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ClerkProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Developement
          </h1>

          <SignedOut>
            <p className="text-gray-600 text-center mb-6">
              Login diperlukan untuk mengakses halaman pengembang.
            </p>
            <div className="flex justify-center">
              <SignInButton>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200">
                  Masuk
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="text-center mb-6">
              <UserButton />
            </div>
            <div className="text-lg text-gray-600 text-center">
              Selamat datang, Developer!
            </div>
          </SignedIn>
        </div>
      </div>
    </ClerkProvider>
  );
}
