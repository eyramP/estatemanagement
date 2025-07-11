import { setAuth } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import {toast} from "react-toastify"

export default function useSocialAuth(authenticate: any, provider: string){
    const dispatch = useAppDispatch()
    const router = useRouter()
    const searchParams = useSearchParams()

    const effectRan = useRef(false)

    useEffect(() => {
        const state = searchParams.get("state")
        const code = searchParams.get("code")

        if (state && code && !effectRan.current){
            authenticate({provider, state, code}).unwrap().then(()=>{
                dispatch(setAuth())
                toast.success("Logged in successfully")
                router.push("/welcome")
            }).catch(() => {
                toast.error("Login failed, try again")
                router.push("/login")
            })
        }
        return () => {
            effectRan.current = true
        }
    }, [authenticate, dispatch, provider, router, searchParams]);

}