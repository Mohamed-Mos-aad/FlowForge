// ** React Flow
import {Edge, Node} from "@xyflow/react";
import {NodeData} from "@/types/node";
// ** Work Flow
export interface WorkFlowProps{
    id: string;
    title: string;
    status: 'Active' | 'Failing' | 'Draft';
    lastRun: number;
    success: number;
    runs: number;
    nodes?: Node<NodeData>[];
    edges?: Edge[];
}



// ** Log
export interface logProps {
    time: string;
    success: boolean;
    title: string;
    message: string;
}