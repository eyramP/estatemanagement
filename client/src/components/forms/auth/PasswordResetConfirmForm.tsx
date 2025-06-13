"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter, useParams } from "next/navigation"
import { useResetPasswordConfirmMutation } from "@/lib/redux/features/auth/authApiSlice"
import { useForm } from "react-hook-form"
import { passwordResetConfirmSchema, TPasswordResetConfirmSchema } from "@/lib/validationSchemas"
import {toast} from "react-toastify"
import { extractErrorMessage } from "@/utils"
import { FormFieldComponent } from "@/components/forms/FormFieldComponent"
import { Button } from "@/components/ui/button"
import Spinner from "@/components/shared/spinner"

export default function PasswordResetConfirmForm() {
    const router = useRouter()
    const {uid, token} = useParams()

    const [resetPasswordConfirm, {isLoading}] = useResetPasswordConfirmMutation()

    const {register, handleSubmit, reset, formState: {errors}} = useForm<TPasswordResetConfirmSchema>({
        mode: "all",
        defaultValues: {
            uid: uid as string,
            token: token as string,
            new_password: "",
            re_new_password: "",
        }
    })

    const onSubmit = async(values: z.infer<typeof passwordResetConfirmSchema >) =>{
        try {
            await resetPasswordConfirm({
                ...values,
                uid:uid as string,
                token:token as string
            }).unwrap()
            router.push("/login")
            toast.success("Password was reset successfully")
            reset()
        }catch (e) {
            const errorMessage = extractErrorMessage(e)
            toast.error(errorMessage || "An error occured")
        }
    }

  return (
    <main>
        <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        >
            <FormFieldComponent
            label="New Password"
            name="new_password"
            register={register}
            errors={errors}
            placeholder="New Password"
            isPassword={true}
            />
            <FormFieldComponent
            label="Confirm Password"
            name="re_new_password"
            register={register}
            errors={errors}
            placeholder="Confirm New Password"
            isPassword={true}
            />
            <Button
            disabled={isLoading}
            type="submit"
            className="h4-semibold bg-eerieBlack dark:bg-pumpkin w-full text-white mt-4"
            >
                {isLoading ? <Spinner size="sm" /> : `Confirm new password `}
            </Button>
        </form>
    </main>
  )
}