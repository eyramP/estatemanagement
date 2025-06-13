"use client";
import { SheetClose, SheetContent, SheetFooter, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { leftNavLinks } from "@/constants"
import { HomeModernIcon } from "@heroicons/react/24/solid"
import { Sheet } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuthNavigation } from "@/hooks";

function LeftNavContent() {
    const pathname = usePathname()
    const {filteredNavLinks} = useAuthNavigation()

    return (
    <section className="flex h-full flex-col gap-6 pt-16">
        {filteredNavLinks.map((linkItem) => {
            const isActive =
            (pathname.includes(linkItem.path) && linkItem.path.length > 1) ||
            pathname === linkItem.path;
            return (
                <SheetClose asChild key={linkItem.path}>
                    <Link
                    href={linkItem.path}
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
                        <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                            {linkItem.label}
                        </p>
                    </Link>
                </SheetClose>
            )
        })}
    </section>
    )
}

export default function MobileNavbar() {
    const {handleLogout, isAuthenticated} = useAuthNavigation()

  return (
    <Sheet>
        <SheetTrigger asChild className="cursor-pointer">
            <Image
                src="/assets/icons/mobile-menu.svg"
                alt="Mobile Menu"
                width={36}
                height={36}
                className="invert-colors sm:hidden"
            />
        </SheetTrigger>
        <SheetContent side="left" className="bg-baby_rich border-none">
            <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
            <Link href="/" className="flex items-center gap-1">
                <HomeModernIcon className="mr-2 size-11 text-lime-500" />
                <p className="h2-bold text-baby_veryBlack font-robotoSlab">
                    Estate{" "}
                    <span className=" text-lime-500">Managment</span>
                </p>
            </Link>
            <div>
                <SheetClose asChild>
                    <LeftNavContent />
                </SheetClose>

                <SheetClose asChild>
                    <SheetFooter>
                        {isAuthenticated ? (
                            <Button onClick={handleLogout} className="lime-gradient small-medium light-border-2 btn-tertiary text-baby_richblack min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                               Logout
                            </Button>
                        ) : (
                        <>
                            <Link href="/register">
                                <Button className="electricIndigo-gradient small-medium light-border-2 btn-tertiary text-babyPowder mt-4 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                                    Register
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button className="lime-gradient small-medium light-border-2 btn-tertiary text-babyPowder min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                                    Login
                                </Button>
                            </Link>
                        </>)}
                    </SheetFooter>
                </SheetClose>
            </div>
        </SheetContent>
    </Sheet>
  )
}