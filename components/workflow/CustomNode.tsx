"use client";
// ** React Flow
import {
    Handle,
    Position,
    type Node,
    type NodeProps,
} from "@xyflow/react";
// ** Interfaces
import {NodeData} from "@/app/types/node";
export type WorkflowNodeType = Node<
    NodeData,
    "custom"
>;

export default function CustomNode({
                                       data,
                                   }: NodeProps<WorkflowNodeType>) {
    return (
        <div className="w-34 max-w-34">
            <Handle
                type="target"
                position={Position.Left}
                className="!h-2 !w-2 !border-2 !border-[#9197A2] !bg-[#0F1113]"
            />
            <div className="flex-col gap-2">
                <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="shrink-0">
                            {
                                data.category === "Webhook" ?
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
                                    :
                                    data.category === "Action" ?
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
                                        :
                                        data.category ===  "Condition" ?
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.9992 3L4.49975 8.4996L2 5.99978" strokeWidth="1.5" strokeLinecap="round" stroke="#9197A2"/>
                                            </svg>
                                            :
                                            data.category === "HTTP" ?
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
                                                :
                                                <div></div>
                            }
                        </div>
                        <h1 className="text-[12px] font-medium text-[#E3E5E8] truncate">{data.label}</h1>
                    </div>
                    <div className={`w-1.5 h-1.5 flex rounded-full shrink-0 ${data.status?.success ? 'bg-[#6BC18F]' : 'bg-[#EF7B63]'}`}></div>
                </div>
                <div className="flex justify-between text-[10px] text-[#9197A2] min-w-0">
                    <p className="truncate flex-1">{data.description}</p>
                    <span className="shrink-0">{data.status?.ms} ms</span>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                className="!h-2 !w-2 !border-2 !border-[#9197A2] !bg-[#0F1113]"
            />
        </div>
    );
}