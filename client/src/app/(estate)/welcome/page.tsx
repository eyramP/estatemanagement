import type { Metadata } from "next"

const metadata: Metadata = {
    title: "Estate Management",
    description: `Welcome to Estatment Management websit. This webapp allows users
                  who are tenants to signup, create thier profiles, report issues
                  with their apartments, report any tenants, post anything of relevance
                  for other tenants to see and or respond`
}

export default function welcomePage() {
  return (

    <div>
        <h1 className="dark:text-pumpkin text-6xl">Welcome</h1>
    </div>
  )
}