"use client";

import { queryClient, useMutation } from "@/components/shared/api/core/wrapper";
import userApiModule from "@/components/shared/api/modules/auth";
import { TVerifyRequest } from "@/components/shared/api/modules/auth/auth.types";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";
import { useLocalStorage } from "@/utils/localStorage";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type TVerificationResponse = {
  id: string; email: string; role: string; message: string; token: string;
}

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const { setLocalStorage } = useLocalStorage();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";
  const requestType = searchParams.get("tokentype") ?? "";

  const [hasMutated, setHasMutated] = useState(false);

  const mutation = useMutation<TVerificationResponse, Error, TVerifyRequest>({
    mutationFn: ({ token, requestType }) =>
      userApiModule.verifyUser({ token, requestType }),
    onSuccess: (data) => {
      toast.success("User verified successfully, navigating to onboarding");
      setLocalStorage("role", data.role);
      setLocalStorage("id", data.id);
      setLocalStorage("auth_token", data.token);
      queryClient.invalidateQueries({ queryKey: ["login"] });

      if (requestType == "signup") {
        router.push("/onboarding");
      }
      else {
        router.push("/");
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      if(!hasMutated){
      toast.error("Error verifying user");
      }
    },
  });

  useEffect(() => {
    if (token && requestType && !hasMutated) {
      const data = mutation.mutate({ token, requestType: requestType });
      console.log(data);
      setHasMutated(true);
    }
  }, [token, requestType, hasMutated, mutation]);

  return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
        <p>
          {
            requestType == "signup" ? "Preparing for onboard..." : "Verifying user..."
          }
        </p>
      </div>
  );
}
