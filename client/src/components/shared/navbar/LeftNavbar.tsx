"use client"
import { leftNavLinks } from "@/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useAuthNavigation } from "@/hooks"
export default function LeftNavbar() {
    const pathname = usePathname();
    const {handleLogout, filteredNavLinks, isAuthenticated} = useAuthNavigation()
  return (
    <section className="bg-baby_rich light-border custom-scrollbar shadow-platinum sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 max-sm:hidden lg:w-[297px] dark:shadow-none">
        <div className="flex flex-1 flex-col gap-6">
            {filteredNavLinks.map((linkItem) => {
                const isActive =
            (pathname.includes(linkItem.path) && linkItem.path.length > 1) ||
            pathname === linkItem.path;
            return (
                <Link
                href={linkItem.path}
                key={linkItem.label}
                className={`${isActive ? "electricIndigo-gradient rounded-lg text-babyPowder":
                        "text-baby_richBlack"} flex items-center justify-start gap-4 bg-transparent p-4`}
                >
                <Image
                    src={linkItem.imgLocation}
                    alt={linkItem.label}
                    width={22}
                    height={22}
                    className={`${isActive ? "" : "color-invert"}`}
                />
                <p
                className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}
                >
                    {linkItem.label}
                </p>
                </Link>
            );
            })}
        </div>
        { isAuthenticated ? (
            <div className="flex flex-col gap-3">
                <Button
                    onClick={handleLogout}
                    className="lime-gradient small-medium light-border-2
                    btn-tertiary text-baby_ballon min-h-[41px] w-full
                    rounded-lg border px-4 py-3 shadow-none">
                        Logout
                    </Button>
            </div>
            ):(
            <div className="flex flex-col gap-3">
                <Link href="/login">
                    <Button
                    className="lime-gradient small-medium light-border-2
                    btn-tertiary text-baby_ballon min-h-[41px] w-full
                    rounded-lg border px-4 py-3 shadow-none">
                        Login
                    </Button>
                </Link>
                <Link href="/register">
                    <Button
                    className="electricIndigo-gradient
                    small-medium light-border-2 btn-tertiary
                        text-baby_ballon min-h-[41px] w-full
                        rounded-lg border px-4 py-3 shadow-none">
                        Register
                    </Button>
                </Link>
            </div>
        )
        }
    </section>
  );
}