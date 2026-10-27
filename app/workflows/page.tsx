'use client'
// ** Components
import Flow from "@/components/ui/Flow";
// ** Forms
import HttpRequestForm from "@/components/forms/HttpRequestForm";
import WebhookForm from "@/components/forms/WebhookForm";
import ConditionForm from "@/components/forms/ConditionForm";
import ActionForm from "@/components/forms/ActionForm";
// ** React Flow
import type {Edge, Node} from "@xyflow/react";
// ** Hooks && Tools
import {useState} from "react";
// ** Interfaces
import {NodeData} from "@/app/types/node";
// ** Constants
const initialNodes: Node<NodeData>[] = [];
const initialEdges: Edge[] = [];
const path = crypto.randomUUID();



export default function Home() {
    // ** States
    const [nodes, setNodes] = useState<Node<NodeData>[]>(initialNodes);
    const [ edges, setEdges ] = useState<Edge[]>(initialEdges);
    const [ isPanelOpen, setIsPanelOpen ] = useState(false);
    const [activeNode, setActiveNode] = useState<Node<NodeData> | null>(null);

    console.log(path)

    // ** Handlers
    const addNodeHandler = (type: "Webhook" | "Action" | "Condition" | "HTTP")=>{
        const nextId = `n${nodes.length + 1}`;
        const lastNode = nodes[nodes.length - 1];
        const nextXPosition = lastNode
            ? lastNode.position.x + 200
            : 0;
        const nextYPosition = lastNode
            ? lastNode.position.y
            : 0;


        setNodes(prev => [
            ...prev,
            {
                id: nextId,
                position: { x: nextXPosition, y: nextYPosition},
                type: "custom",
                data: {
                    label: `${type} ${prev.length + 1}`,
                    description: "",
                    status: {
                        success: true,
                        ms: 0,
                    },
                    category: type,
                    webhook:{
                        url: `https://flowforge-beta.vercel.app/api/webhooks/${path}`
                    },
                    request: {
                        type: "GET",
                        url: "",
                        authentication: "",
                        headers: {
                            accept: "application/json",
                            requestId: "",
                        },
                        timeout: 1000,
                        retries: 0,
                    },
                    errorMsg: "",
                },
                className: 'custom-node'
            }
        ]);

        setIsPanelOpen(false);
    };
    const updateNodeHandler = (
        id: string,
        data: Partial<NodeData>
    ) => {
        setNodes(prev =>
            prev.map(node =>
                node.id === id
                    ? {
                        ...node,
                        data: {
                            ...node.data,
                            ...data,
                        },
                    }
                    : node
            )
        );

        setActiveNode(prev =>
            prev?.id === id
                ? {
                    ...prev,
                    data: {
                        ...prev.data,
                        ...data,
                    },
                }
                : prev
        );
    };



    return (
        <div className="relative flex flex-col w-full h-dvh overflow-hidden bg-[#17191D]">
            <header className="absolute xl:relative top-3 left-3 right-3 xl:top-auto xl:left-auto xl:right-auto z-30 flex justify-end xl:justify-between items-center bg-transparent xl:bg-[#17191D] border-0 xl:border-b xl:border-[#2B2E35] px-0 xl:px-3.5 py-0 xl:py-2 shrink-0">

                <h1 className="hidden xl:block text-xs sm:text-sm text-[#9197A2] min-w-0">
                    Workflows / <span className="text-[#E3E5E8]">Customer Onboarding Pipeline</span>
                </h1>
                <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 bg-[#17191D]/95 border border-[#2B2E35] rounded-xl p-2 xl:p-0 xl:bg-transparent xl:border-0">
                    <button className="py-1.75 px-1.25 border border-[#2B2E35] rounded-lg cursor-pointer">
                        <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.00212 6.31795L1.63812 6.25295C1.37812 5.16095 0.832117 4.06895 0.000117302 2.93795L0.169117 2.19695C0.962117 2.82095 1.53412 3.39295 1.91112 3.89995C2.62612 1.63795 4.73212 -5.10216e-05 7.24112 -5.10216e-05C10.3351 -5.10216e-05 12.8311 2.49595 12.8311 5.58995H11.9081C11.9081 3.00295 9.82812 0.922949 7.24112 0.922949C5.18712 0.922949 3.44512 2.24895 2.82112 4.09495C3.35412 3.80895 4.13412 3.54895 5.09612 3.34095L4.91412 4.06895C3.69212 4.73195 2.71712 5.48595 2.00212 6.31795Z" fill="#9197A2"/>
                        </svg>
                    </button>

                    <button className="py-1.75 px-1.25 border border-[#2B2E35] rounded-lg cursor-pointer">
                        <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.000117302 5.58995C0.000117302 2.49595 2.49612 -5.10216e-05 5.59012 -5.10216e-05C8.09912 -5.10216e-05 10.2051 1.63795 10.9201 3.89995C11.2971 3.39295 11.8691 2.82095 12.6621 2.19695L12.8311 2.93795C11.9991 4.06895 11.4531 5.16095 11.1931 6.25295L10.8291 6.31795C10.1141 5.48595 9.13912 4.73195 7.91712 4.06895L7.73512 3.34095C8.69712 3.54895 9.47712 3.80895 10.0101 4.09495C9.38612 2.24895 7.64412 0.922949 5.59012 0.922949C3.00312 0.922949 0.923117 3.00295 0.923117 5.58995H0.000117302Z" fill="#9197A2"/>
                        </svg>
                    </button>

                    <h2 className="hidden xl:block text-[11px] text-[#9197A2]">
                        v14 · History
                    </h2>

                    <button className="flex items-center gap-1 py-1.75 px-2 sm:px-3 border border-[#2B2E35] text-[12px] sm:text-[13px] text-[#E3E5E8] rounded-lg cursor-pointer whitespace-nowrap">
                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 11.8182V-1.19209e-05L10.0455 5.90908L0 11.8182Z" fill="#E3E5E8"/>
                        </svg>
                        Test
                        <span className="hidden sm:inline">workflow</span>
                    </button>

                    <button className="bg-[#C7F568] py-1.75 px-3 sm:px-4 border border-[#C7F568] rounded-lg text-[12px] sm:text-[13px] font-semibold text-[#0F1113] cursor-pointer">
                        Publish
                    </button>
                </div>
            </header>

            <div className="flex flex-1 min-h-0 w-full">
                <div className="flex-1 min-w-0 min-h-0 relative">
                    <h3 className="absolute top-3.5 left-3.5 z-200 text-[10px] text-[#9197A2]">Test Onboarding · {nodes.length} nodes · {edges.length} edges</h3>
                    <Flow nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} setActiveNode={setActiveNode} setIsPanelOpen={setIsPanelOpen}/>
                </div>
                {isPanelOpen && activeNode ? (
                    <div className="hidden xl:block min-w-1/4 max-w-80 bg-[#17191D] border-l border-[#2B2E35] text-[#E3E5E8]">
                        {
                            activeNode?.data.category === "Webhook" ?
                            <WebhookForm node={activeNode} onChange={updateNodeHandler}/>
                            : activeNode?.data.category === "HTTP" ?
                            <HttpRequestForm node={activeNode} onChange={updateNodeHandler}/>
                            : activeNode?.data.category === "Condition" ?
                            <ConditionForm node={activeNode} onChange={updateNodeHandler}/>
                            : activeNode?.data.category === "Action" &&
                            <ActionForm node={activeNode} onChange={updateNodeHandler}/>
                        }
                    </div>
                ) : (
                    <div className="hidden xl:grid xl:min-w-1/4 xl:min-w-56 xl:max-w-80 grid-cols-2 content-start gap-8 bg-[#17191D] border-l border-[#2B2E35] text-[#E3E5E8] p-3.5">
                        <button
                            className="w-full h-fit flex items-center justify-center gap-2 border border-[#2B2E35] p-3 rounded-lg cursor-pointer text-nowrap"
                            onClick={()=>{addNodeHandler("Webhook")}}
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_7_4837)">
                                        <path d="M2.00067 7.00007C1.90607 7.0004 1.81331 6.97386 1.73318 6.92356C1.65305 6.87325 1.58884 6.80124 1.548 6.71588C1.50716 6.63053 1.49138 6.53534 1.50248 6.44137C1.51358 6.3474 1.55111 6.25851 1.61072 6.18502L6.56016 1.08472C6.59729 1.04186 6.64788 1.01289 6.70364 1.00258C6.75939 0.992269 6.81699 1.00122 6.86699 1.02797C6.91699 1.05472 6.95641 1.09767 6.97878 1.14978C7.00115 1.20189 7.00515 1.26005 6.99011 1.31473L6.03022 4.32491C6.00192 4.40068 5.99241 4.48218 6.00252 4.56243C6.01263 4.64268 6.04205 4.71928 6.08826 4.78565C6.13447 4.85203 6.19609 4.90621 6.26783 4.94353C6.33957 4.98086 6.4193 5.00022 6.50017 4.99995H9.99977C10.0944 4.99963 10.1871 5.02616 10.2673 5.07647C10.3474 5.12677 10.4116 5.19879 10.4524 5.28414C10.4933 5.3695 10.5091 5.46469 10.498 5.55866C10.4869 5.65263 10.4493 5.74152 10.3897 5.815L5.44029 10.9153C5.40316 10.9582 5.35257 10.9871 5.29681 10.9974C5.24106 11.0078 5.18345 10.9988 5.13346 10.9721C5.08346 10.9453 5.04404 10.9024 5.02167 10.8502C4.99929 10.7981 4.9953 10.74 5.01033 10.6853L5.97023 7.67511C5.99853 7.59935 6.00804 7.51784 5.99793 7.4376C5.98782 7.35735 5.9584 7.28075 5.91219 7.21437C5.86598 7.148 5.80436 7.09382 5.73262 7.0565C5.66087 7.01917 5.58115 6.99981 5.50028 7.00007H2.00067Z" strokeWidth="1.5" strokeLinecap="round" stroke="#9197A2"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_7_4837">
                                            <rect width="12" height="12" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            Webhook
                        </button>
                        <button
                            className="w-full h-fit flex items-center justify-center gap-2 border border-[#2B2E35] p-3 rounded-lg cursor-pointer text-nowrap"
                            onClick={()=>{addNodeHandler("Action")}}
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_7_4846)">
                                        <path d="M7.5 3C6.30653 3 5.16193 3.47411 4.31802 4.31802C3.47411 5.16193 3 6.30653 3 7.5M7.5 3C7.5 3.82843 8.17157 4.5 9 4.5C9.82843 4.5 10.5 3.82843 10.5 3C10.5 2.17157 9.82843 1.5 9 1.5C8.17157 1.5 7.5 2.17157 7.5 3ZM3 7.5V1.5M3 7.5C2.17157 7.5 1.5 8.17157 1.5 9C1.5 9.82843 2.17157 10.5 3 10.5C3.82843 10.5 4.5 9.82843 4.5 9C4.5 8.17157 3.82843 7.5 3 7.5Z" strokeWidth="1.5" strokeLinecap="round" stroke="#9197A2"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_7_4846">
                                            <rect width="12" height="12" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            Action
                        </button>
                        <button
                            className="w-full h-fit flex items-center justify-center gap-2 border border-[#2B2E35] p-3 rounded-lg cursor-pointer text-nowrap"
                            onClick={()=>{addNodeHandler("Condition")}}
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.9992 3L4.49975 8.4996L2 5.99978" strokeWidth="1.5" strokeLinecap="round" stroke="#9197A2"/>
                                </svg>
                            Condition
                        </button>
                        <button
                            className="w-full h-fit flex items-center justify-center gap-2 border border-[#2B2E35] p-3 rounded-lg cursor-pointer text-nowrap"
                            onClick={()=>{addNodeHandler("HTTP")}}
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_7_4843)">
                                        <path d="M11.0003 5.99997C11.0003 8.76162 8.76156 11.0004 5.99991 11.0004M11.0003 5.99997C11.0003 3.23833 8.76156 0.999573 5.99991 0.999573M11.0003 5.99997H8.00007M5.99991 11.0004C3.23827 11.0004 0.999512 8.76162 0.999512 5.99997M5.99991 11.0004C4.71593 9.65219 3.99975 7.86175 3.99975 5.99997M5.99991 11.0004C7.2839 9.65219 8.00007 7.86175 8.00007 5.99997M5.99991 0.999573C4.71593 2.34776 3.99975 4.13819 3.99975 5.99997M5.99991 0.999573C7.2839 2.34776 8.00007 4.13819 8.00007 5.99997M5.99991 0.999573C3.23827 0.999573 0.999512 3.23833 0.999512 5.99997M8.00007 5.99997H3.99975M3.99975 5.99997H0.999512" strokeWidth="1.5" strokeLinecap="round" stroke="#9197A2"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_7_4843">
                                            <rect width="12" height="12" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            HTTP
                        </button>
                    </div>
                )}
            </div>

            <button
                className="xl:hidden fixed bottom-5 right-5 z-40 flex items-center justify-center w-10 h-10 bg-[#C7F568] text-[#0F1113] rounded-full shadow-xl cursor-pointer"
                onClick={() => setIsPanelOpen(true)}
                aria-label="Add node"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>

            {isPanelOpen && (
                <div
                    className="xl:hidden fixed inset-0 z-40 bg-black/50"
                    onClick={() => {
                        setActiveNode(null)
                        setIsPanelOpen(false)
                    }}
                />
            )}

            <div className={`
                xl:hidden fixed top-0 right-0 z-50 flex flex-col
                w-3/4 w-[ min(85%,320px)] h-full bg-[#17191D] border-l border-[#2B2E35] text-[#E3E5E8]
                transform transition-transform duration-300 ease-in-out
                ${isPanelOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'}
            `}>
                <div className="flex items-center justify-between p-4 border-b border-[#2B2E35]">

                    <button
                        className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#2B2E35] text-[#9197A2] cursor-pointer"
                        onClick={() => {
                            setActiveNode(null)
                            setIsPanelOpen(false)
                        }}
                        aria-label="Close panel"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>
                {
                    activeNode?.data.category === "Webhook" ?
                    <WebhookForm node={activeNode} onChange={updateNodeHandler}/>
                    : activeNode?.data.category === "HTTP" ?
                    <HttpRequestForm node={activeNode} onChange={updateNodeHandler}/>
                    : activeNode?.data.category === "Condition" ?
                    <ConditionForm node={activeNode} onChange={updateNodeHandler}/>
                    : activeNode?.data.category === "Action" ?
                    <ActionForm node={activeNode} onChange={updateNodeHandler}/>
                    :
                    <div className="grid grid-cols-2 gap-3 p-4">
                        <button
                            className="flex flex-col items-center justify-center gap-2 min-h-24 border border-[#2B2E35] rounded-xl hover:bg-[#22252B] text-sm cursor-pointer"
                            onClick={()=>{addNodeHandler("Webhook")}}
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_7_4837)">
                                    <path d="M2.00067 7.00007C1.90607 7.0004 1.81331 6.97386 1.73318 6.92356C1.65305 6.87325 1.58884 6.80124 1.548 6.71588C1.50716 6.63053 1.49138 6.53534 1.50248 6.44137C1.51358 6.3474 1.55111 6.25851 1.61072 6.18502L6.56016 1.08472C6.59729 1.04186 6.64788 1.01289 6.70364 1.00258C6.75939 0.992269 6.81699 1.00122 6.86699 1.02797C6.91699 1.05472 6.95641 1.09767 6.97878 1.14978C7.00115 1.20189 7.00515 1.26005 6.99011 1.31473L6.03022 4.32491C6.00192 4.40068 5.99241 4.48218 6.00252 4.56243C6.01263 4.64268 6.04205 4.71928 6.08826 4.78565C6.13447 4.85203 6.19609 4.90621 6.26783 4.94353C6.33957 4.98086 6.4193 5.00022 6.50017 4.99995H9.99977C10.0944 4.99963 10.1871 5.02616 10.2673 5.07647C10.3474 5.12677 10.4116 5.19879 10.4524 5.28414C10.4933 5.3695 10.5091 5.46469 10.498 5.55866C10.4869 5.65263 10.4493 5.74152 10.3897 5.815L5.44029 10.9153C5.40316 10.9582 5.35257 10.9871 5.29681 10.9974C5.24106 11.0078 5.18345 10.9988 5.13346 10.9721C5.08346 10.9453 5.04404 10.9024 5.02167 10.8502C4.99929 10.7981 4.9953 10.74 5.01033 10.6853L5.97023 7.67511C5.99853 7.59935 6.00804 7.51784 5.99793 7.4376C5.98782 7.35735 5.9584 7.28075 5.91219 7.21437C5.86598 7.148 5.80436 7.09382 5.73262 7.0565C5.66087 7.01917 5.58115 6.99981 5.50028 7.00007H2.00067Z" strokeWidth="1.5" strokeLinecap="round" stroke="#9197A2"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_7_4837">
                                        <rect width="12" height="12" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            Webhook
                        </button>
                        <button
                            className="flex flex-col items-center justify-center gap-2 min-h-24 border border-[#2B2E35] rounded-xl hover:bg-[#22252B] text-sm cursor-pointer"
                            onClick={()=>{addNodeHandler("Action")}}
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_7_4846)">
                                    <path d="M7.5 3C6.30653 3 5.16193 3.47411 4.31802 4.31802C3.47411 5.16193 3 6.30653 3 7.5M7.5 3C7.5 3.82843 8.17157 4.5 9 4.5C9.82843 4.5 10.5 3.82843 10.5 3C10.5 2.17157 9.82843 1.5 9 1.5C8.17157 1.5 7.5 2.17157 7.5 3ZM3 7.5V1.5M3 7.5C2.17157 7.5 1.5 8.17157 1.5 9C1.5 9.82843 2.17157 10.5 3 10.5C3.82843 10.5 4.5 9.82843 4.5 9C4.5 8.17157 3.82843 7.5 3 7.5Z" strokeWidth="1.5" strokeLinecap="round" stroke="#9197A2"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_7_4846">
                                        <rect width="12" height="12" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            Action
                        </button>
                        <button
                            className="flex flex-col items-center justify-center gap-2 min-h-24 border border-[#2B2E35] rounded-xl hover:bg-[#22252B] text-sm cursor-pointer"
                            onClick={()=>{addNodeHandler("Condition")}}
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.9992 3L4.49975 8.4996L2 5.99978" strokeWidth="1.5" strokeLinecap="round" stroke="#9197A2"/>
                            </svg>
                            Condition
                        </button>
                        <button
                            className="flex flex-col items-center justify-center gap-2 min-h-24 border border-[#2B2E35] rounded-xl hover:bg-[#22252B] text-sm cursor-pointer"
                            onClick={()=>{addNodeHandler("HTTP")}}
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_7_4843)">
                                    <path d="M11.0003 5.99997C11.0003 8.76162 8.76156 11.0004 5.99991 11.0004M11.0003 5.99997C11.0003 3.23833 8.76156 0.999573 5.99991 0.999573M11.0003 5.99997H8.00007M5.99991 11.0004C3.23827 11.0004 0.999512 8.76162 0.999512 5.99997M5.99991 11.0004C4.71593 9.65219 3.99975 7.86175 3.99975 5.99997M5.99991 11.0004C7.2839 9.65219 8.00007 7.86175 8.00007 5.99997M5.99991 0.999573C4.71593 2.34776 3.99975 4.13819 3.99975 5.99997M5.99991 0.999573C7.2839 2.34776 8.00007 4.13819 8.00007 5.99997M5.99991 0.999573C3.23827 0.999573 0.999512 3.23833 0.999512 5.99997M8.00007 5.99997H3.99975M3.99975 5.99997H0.999512" strokeWidth="1.5" strokeLinecap="round" stroke="#9197A2"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_7_4843">
                                        <rect width="12" height="12" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            HTTP
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}