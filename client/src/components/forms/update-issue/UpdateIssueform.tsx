"use client"
import { statusOptions } from "@/constants";
import { useUpdateIssueMutation } from "@/lib/redux/features/issues/IssueApiSlice";
import { TIssueUpdateSchema } from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import dynamic from "next/dynamic"
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select"
import {toast} from "react-toastify"
import customStyles from "../selectStyles";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

const ClientOnly = dynamic<{children: React.ReactNode}>(
    () => Promise.resolve(({children}) => <>{children}</>),
    { ssr: false}
);


export default function UpdateIssueform() {
    const params = useParams()
    const issueId = params.id as string;
    const [updateIssue, {isLoading}] = useUpdateIssueMutation();
    const router = useRouter()

    const {handleSubmit, control, reset, formState: {errors}} = useForm<TIssueUpdateSchema>()

    const onSubmit = async(formValues: TIssueUpdateSchema) => {
        if (issueId){
            const valuesWithIssueId = {
                ...formValues, issueId
            }

            try {
                await updateIssue(valuesWithIssueId).unwrap();
                toast.success("The issue updated to you has been updated. A confirmation email has been sent to the tenant");
                reset()
                router.push("/profile")
            }catch (error) {
                const errorMessge = extractErrorMessage(error)
                toast.error(errorMessge || "An error occured")
            }
        }
    }

  return (
    <main>
        <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col gap-4 dark:text-black"
        >
            <div>
                <label htmlFor="Status" className="h4-semibold dark:text-babyPowder">Status</label>
                <div className="mt-1 flex items-center space-x-3 text-sm">
                    <ClientOnly>
                        <Controller
                        name="status"
                        control={control}
                        render={({field: {onChange, onBlur, value }}) => (
                            <Select
                            className="mt-1 w-full"
                            options={statusOptions}
                            value={statusOptions.find(
                                (option) => option.value === value,
                            )}
                            onChange={(val) => onChange(val?.value)}
                            onBlur={onBlur}
                            placeholder="Update the issue status"
                            instanceId="issue-status-select"
                            styles={customStyles}
                            />
                        )}
                        />
                    </ClientOnly>
                </div>
                {errors.status && (
                    <p className="mt-2 text-sm text-red-500">{errors.status.message}</p>
                )}
            </div>
            <Button
            type="submit"
            className="ht-semibold border-eerieBlack dark:bg-pumpkin mt-2 w-full text-white"
            disabled={isLoading}
            >
                {isLoading ? <Spinner size="sm"/> : `Update Status`}
            </Button>
        </form>
    </main>
  )
}