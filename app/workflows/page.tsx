'use client'
// ** Components
import Flow from "@/components/ui/Flow";
// ** React Flow
import type {Edge, Node} from "@xyflow/react";
import {useState} from "react";
// ** Constants
const initialNodes: Node[] = [
    {
        id: 'n1',
        position: { x: 0, y: 0 },
        data: { label: 'Node 1' },
        className: 'custom-node'
    },
    {
        id: 'n2',
        position: { x: 0, y: 120 },
        data: { label: 'Node 2' },
        className: 'custom-node'
    },
];

const initialEdges: Edge[] = [
    { id: 'n1-n2', source: 'n1', target: 'n2' },
];



export default function Home() {
    // ** States
    const [ nodes, setNodes ] = useState<Node[]>(initialNodes);
    const [ edges, setEdges ] = useState<Edge[]>(initialEdges);



    // ** Handlers
    const addNodeHandler = ()=>{
        setNodes(prev => [
            ...prev,
            {
                id: `n${nodes.length + 1}`,
                position: { x: 0, y: 120 * nodes.length },
                data: { label: `Node ${nodes.length + 1}` },
                className: 'custom-node'
            }
        ])
        setEdges(prev => [
            ...prev,
            { id: `n${nodes.length}-n${nodes.length + 1}`, source: `n${nodes.length}`, target: `n${nodes.length + 1}` },
        ])
    }



    return (
        <div className="w-full h-screen">
            <header className="flex justify-between items-center bg-[#17191D] border-b border-[#2B2E35] px-3.5 py-2">
                <h1 className="text-[#9197A2]">
                    Workflows / <span className="text-[#E3E5E8]">Customer Onboarding Pipeline</span>
                </h1>
                <div className="flex items-center gap-3">
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
                    <h2 className="text-[11px] text-[#9197A2]">
                        v14 · History
                    </h2>
                    <button className="flex items-center gap-1 py-1.75 px-3 border border-[#2B2E35] text-[13px] text-[#E3E5E8] rounded-lg cursor-pointer">
                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 11.8182V-1.19209e-05L10.0455 5.90908L0 11.8182Z" fill="#E3E5E8"/>
                        </svg>
                        Test workflow
                    </button>
                    <button className="bg-[#C7F568] py-1.75 px-1.25 border border-[#C7F568] rounded-lg text-[13px] font-semibold text-[#0F1113] cursor-pointer">
                        Publish
                    </button>
                </div>
            </header>
            <div className="flex w-full h-screen">
                <Flow nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges}/>
                <div className="min-w-1/4 grid grid-cols-2 gap-8 bg-[#17191D] border-l border-[#2B2E35] text-[#E3E5E8] p-3.5">
                    <div className="w-full h-fit border border-[#2B2E35] p-3 text-center rounded-lg cursor-pointer" onClick={addNodeHandler}>
                        Node
                    </div>
                </div>
            </div>
        </div>
    );
}