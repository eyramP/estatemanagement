import Navbar from "@/components/shared/navbar/navbar"

interface LayoutProps {
    children: React.ReactNode
}

export default function layout({children}: LayoutProps) {
  return (
    <main className="bg-baby_veryBlack relative">
        <Navbar />
        <div className="flex">
            {/* Plaeholdre LeftNarbar component */}
            <div className="dark:text-pumpkin hidden text-xl md:block">
                Left Navbar
            </div>
            {/* Main content */}
            <section className="flex min-h-screen flex-1 flex-col px-4 pb-6 pt-24 sm:px-6 lg:px-8 lg:pt-32">
                <div>{children}</div>
            </section>
            {/* Right Navbar component */}
            <div className="dark:text-pumpkin hidden text-xl md:block">
                Right Navbar
            </div>
        </div>
    </main>
  )
}