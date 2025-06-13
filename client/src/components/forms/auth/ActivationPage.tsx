"use client"
import { useActivateUserMutation } from "@/lib/redux/features/auth/authApiSlice";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import {toast} from "react-toastify"

interface ActivationProps {
  params: {
    uid: string;
    token: string;
  }
}

export default function ActivationPage() {
  const router = useRouter()
  const { uid, token } = useParams() as { uid: string; token: string };
  const [activateUser, {isLoading, isSuccess, isError, error}] = useActivateUserMutation()

    useEffect(() => {
    if (uid && token) {
      activateUser({ uid, token });
    }
  }, [activateUser, uid, token]);


  useEffect(() => {
    if(isSuccess){
      toast.success("Account activated successfully!")
      router.push("/login")
    }else if(isError && error){
      toast.error("Failed to activate your account")
    }
  }, [isSuccess, isError, error, router]);


  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h3
        className="dark:text-platinum font-robotoSlab text-2xl
        font-bold text-gray-800 sm:text-4xl md:text-5xl"
        >
        {isLoading ? (
          <div className="flex-center">
            <span className="mr-2" >⏰</span>
            <span className="mr-2" >Activating your account... Please wait.</span>
            <span className="ml-2">🥱</span>
          </div>
        ): isSuccess ? (
          <div>
            <span className="mr-2" >✅</span>
            <span className="mr-2" >Account activated successfully</span>
          </div>
        ): (isError && (
          <div>
            <span className="mr-2" >❌</span>
            <span className="mr-2" >Your account been activated already...</span>
          </div>
        ))}
        </h3>
      </div>
    </div>
  )
}