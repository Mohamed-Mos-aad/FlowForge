// ** React Flow
import {Edge, Node} from "@xyflow/react";
// ** Work Flow
export interface WorkFlowProps{
    id: string;
    title: string;
    status: 'Active' | 'Failing' | 'Draft';
    lastRun: string;
    success: number;
    runs: number;
    nodes?: Node[];
    edges?: Edge[];
}



// ** Log
export interface logProps {
    time: string;
    success: boolean;
    title: string;
    message: string;
}