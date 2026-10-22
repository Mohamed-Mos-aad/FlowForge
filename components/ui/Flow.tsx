'use client';
// ** Hooks && Tools
import { useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
// ** React Flow
import {
    ReactFlow,
    Background,
    BackgroundVariant,
    Controls,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from '@xyflow/react';
import type {
    Node,
    Edge,
    NodeChange,
    EdgeChange,
    Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '../../app/workflows/flow.css';
// ** Interfaces
interface FlowProps{
    nodes: Node[];
    edges: Edge[];
    setNodes: Dispatch<SetStateAction<Node[]>>;
    setEdges: Dispatch<SetStateAction<Edge[]>>;
}



export default function Flow({nodes, edges, setNodes, setEdges}: FlowProps) {

    const onNodesChange = useCallback(
        (changes: NodeChange[]) =>
            setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) =>
            setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (params: Connection) =>
            setEdges((eds) => addEdge(params, eds)),
        []
    );



    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={20}
                    size={1}
                    color="#9197A2"
                />

                <Controls />
            </ReactFlow>
        </div>
    );
}
