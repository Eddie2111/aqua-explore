"use client";

import { LoadingSpinner } from "@/components/ui/loadingSpinner";
import { useSearchParams } from "next/navigation";
export default function VerifyPage() {
  const searchParams = useSearchParams();

  // Extract query parameters
  const token = searchParams.get("token");
  const tokenType = searchParams.get("tokentype");

  return (
    <div className="p-20 max-h-screen">
      <LoadingSpinner/>
      <h1>Verification Page</h1>
      <p><strong>Token:</strong> {token ? token : "No token found"}</p>
      <p><strong>Token Type:</strong> {tokenType ? tokenType : "No token type found"}</p>
    </div>
  );
}
