"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { FC } from 'react'


export const Footer: FC = () => {

  const pathname = usePathname();
  return (
    <footer className="fixed bottom-0 z-20 w-full flex justify-center p-6 bg-white  border-t rounded-3xl shadow-[0_-8px_20px_-5px_rgba(0,0,0,0.1)] ">
    
    <Link 
    href={pathname ===  "/game" ? "/" : "/game"} className="w-full">
    <div className="w-full text-center text-2xl font-bold rounded-full  bg-amber-400 hover:bg-amber-300 p-4 cursor-pointer transition-transform duration-200 ease-out active:scale-95">
        {pathname === "/game" ? "กลับหน้าหลัก" : "ไปเล่นเกม"}
    </div>
    </Link>
    </footer>
  )
}
