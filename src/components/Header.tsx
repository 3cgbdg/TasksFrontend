"use client"

import Link from "next/link"



const Header = () => {
    return (
        <div className="flex items-center py-2 _container">
            <div className="basis-[150px] shrink-1">
                <Link className="  section-title  hover:text-blue! transition-colors" href={"/"}>Tasks app</Link>
            </div>
            <div className=" flex items-center gap-5 basis-full justify-center">
                <Link href={"/task/create"} className="button-transparent ">Create task</Link>
                <Link href={"/tasks"} className="button-transparent ">All tasks</Link>
            </div>
        </div>

    )

}

export default Header