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
        <div>
            <Handle
                type="target"
                position={Position.Left}
                className="!h-3 !w-3 !border-2 !border-white !bg-slate-500"
            />
                <div>
                    {
                        data.category === "Webhook" ?
                            <div>Webhook</div>
                            :
                            data.category === "Action" ?
                                <div>Action</div>
                                :
                                data.category ===  "Condition" ?
                                <div>Condition</div>
                                :
                                    data.category === "HTTP Request" ?
                                    <div>HTTP Request</div>
                                        :
                                        <div>other</div>
                    }
                </div>
            <Handle
                type="source"
                position={Position.Right}
                className="!h-3 !w-3 !border-2 !border-white !bg-slate-500"
            />
        </div>
    );
}