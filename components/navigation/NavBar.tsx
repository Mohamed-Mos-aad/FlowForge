'use client'
// ** Hooks && Tools
import Link from "next/link";
import {useState} from "react";



export default function NavBar() {
    // ** States
    const [ activePage, setActivePage ] = useState('Workflows');



    // ** Handlers
    const activePageHandler = (id: string)=>{
        setActivePage(id)
    }



    return (
        <nav className="min-w-1/5 flex flex-col gap-3.5 bg-[#17191D] border-r border-[#2B2E35] p-4">
            <div className="flex items-center gap-2">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="stroke0_7_4156" fill="white">
                        <path d="M0 0H7.82353V4.47059H12.2941V11.1765H19V19H11.1765V11.1765H12.2941V4.47059H7.82353V7.82353H0V0Z"/>
                    </mask>
                    <path d="M12.2941 4.47059H13.0441V3.72059H12.2941V4.47059ZM7.82353 4.47059V5.22059H12.2941V4.47059V3.72059H7.82353V4.47059ZM12.2941 4.47059H11.5441V11.1765H12.2941H13.0441V4.47059H12.2941ZM0 0V-1.5H-1.5V0H0ZM7.82353 0H9.32353V-1.5H7.82353V0ZM7.82353 7.82353V9.32353H9.32353V7.82353H7.82353ZM0 7.82353H-1.5V9.32353H0V7.82353ZM11.1765 11.1765V9.67647H9.67647V11.1765H11.1765ZM19 11.1765H20.5V9.67647H19V11.1765ZM19 19V20.5H20.5V19H19ZM11.1765 19H9.67647V20.5H11.1765V19ZM0 0V1.5H7.82353V0V-1.5H0V0ZM7.82353 0H6.32353V4.47059H7.82353H9.32353V0H7.82353ZM7.82353 4.47059H6.32353V7.82353H7.82353H9.32353V4.47059H7.82353ZM7.82353 7.82353V6.32353H0V7.82353V9.32353H7.82353V7.82353ZM0 7.82353H1.5V0H0H-1.5V7.82353H0ZM11.1765 11.1765V12.6765H12.2941V11.1765V9.67647H11.1765V11.1765ZM12.2941 11.1765V12.6765H19V11.1765V9.67647H12.2941V11.1765ZM19 11.1765H17.5V19H19H20.5V11.1765H19ZM19 19V17.5H11.1765V19V20.5H19V19ZM11.1765 19H12.6765V11.1765H11.1765H9.67647V19H11.1765Z" fill="#C7F568" mask="url(#stroke0_7_4156)"/>
                </svg>
                <h1 className="font-bold text-[#E3E5E8]">FlowForge</h1>
            </div>
            <ul className="flex flex-col gap-2 text-[#9197A2]">
                <li className={`p-2 border-l-2 cursor-pointer ${activePage === 'Workflows' ? 'bg-[#1D2025] border-[#C7F568]' : 'border-transparent' }`} onClick={()=>{activePageHandler("Workflows")}}>
                    <Link href="/workflows">Workflows</Link>
                </li>
                <li className={`p-2 border-l-2 cursor-pointer ${activePage === 'Templates' ? 'bg-[#1D2025] border-[#C7F568]' : 'border-transparent' }`} onClick={()=>{activePageHandler("Templates")}}>
                    <Link href="/workflows">Templates</Link>
                </li>
                <li className={`p-2 border-l-2 cursor-pointer ${activePage === 'Connections' ? 'bg-[#1D2025] border-[#C7F568]' : 'border-transparent' }`} onClick={()=>{activePageHandler("Connections")}}>
                    <Link href="/workflows">Connections</Link>
                </li>
                <li className={`p-2 border-l-2 cursor-pointer ${activePage === 'OPERATE' ? 'bg-[#1D2025] border-[#C7F568]' : 'border-transparent' }`} onClick={()=>{activePageHandler("OPERATE")}}>
                    <Link href="/workflows">OPERATE</Link>
                </li>
                <li className={`p-2 border-l-2 cursor-pointer ${activePage === 'Overview' ? 'bg-[#1D2025] border-[#C7F568]' : 'border-transparent' }`} onClick={()=>{activePageHandler("Overview")}}>
                    <Link href="/workflows">Overview</Link>
                </li>
                <li className={`p-2 border-l-2 cursor-pointer ${activePage === 'Executions' ? 'bg-[#1D2025] border-[#C7F568]' : 'border-transparent' }`} onClick={()=>{activePageHandler("Executions")}}>
                    <Link href="/workflows">Executions</Link>
                </li>
                <li className={`p-2 border-l-2 cursor-pointer ${activePage === 'Activity' ? 'bg-[#1D2025] border-[#C7F568]' : 'border-transparent' }`} onClick={()=>{activePageHandler("Activity")}}>
                    <Link href="/workflows">Activity</Link>
                </li>
                <li className={`p-2 border-l-2 cursor-pointer ${activePage === 'Settings' ? 'bg-[#1D2025] border-[#C7F568]' : 'border-transparent' }`} onClick={()=>{activePageHandler("Settings")}}>
                    <Link href="/workflows">Settings</Link>
                </li>
            </ul>
        </nav>
    );
}