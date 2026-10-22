
'use client';

import { useState, useCallback } from 'react';

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

const initialNodes: Node[] = [
    {
        id: 'n1',
        position: { x: 0, y: 0 },
        data: { label: 'Node 1' },
        className: 'custom-node',
    },
    {
        id: 'n2',
        position: { x: 0, y: 120 },
        data: { label: 'Node 2' },
        className: 'custom-node',
    },
];

const initialEdges: Edge[] = [
    { id: 'n1-n2', source: 'n1', target: 'n2' },
];

export default function Flow() {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

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
