import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";




export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="flex flex-col h-screen  ">
            <Header />

            <div className="flex items-start grow border-t  border-neutral-300">
                <div className="  sm:py-6 py-2 px-3 md:p-8 w-full">
                    {children}
                </div>

            </div>
            <ToastContainer position="top-right" />
        </div >
    );
}