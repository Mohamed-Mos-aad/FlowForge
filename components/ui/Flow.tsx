'use client';
// ** Hooks && Tools
import {useCallback} from 'react';
import type {Dispatch, SetStateAction, MouseEvent} from 'react';
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
import '@/style/flow.css';
// ** Interfaces
import type {NodeData} from "@/types/node";
interface FlowProps {
    nodes: Node<NodeData>[];
    edges: Edge[];
    setNodes: Dispatch<SetStateAction<Node<NodeData>[]>>;
    setEdges: Dispatch<SetStateAction<Edge[]>>;
    setActiveNode: Dispatch<SetStateAction<Node<NodeData> | null>>;
    setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
    setLastSteps: Dispatch<SetStateAction<{ nodes: Node<NodeData>[], edges: Edge[] }[]>>
}
// ** Components
import CustomNode from "@/components/workflow/CustomNode";
// ** Constants
const nodeTypes = {
    custom: CustomNode,
};


export default function Flow({
                                 nodes,
                                 edges,
                                 setNodes,
                                 setEdges,
                                 setActiveNode,
                                 setIsPanelOpen,
                                 setLastSteps
                             }: FlowProps) {



    // ** Handlers
    const onNodesChange = useCallback(
        (changes: NodeChange<Node<NodeData>>[]) => {
            setNodes(nds =>
                applyNodeChanges<Node<NodeData>>(changes, nds)
            );
        },
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            setEdges(eds => applyEdgeChanges(changes, eds));
            setLastSteps(prev => [
                ...prev,
                {
                    nodes: structuredClone(nodes),
                    edges: structuredClone(edges),
                },
            ]);
        },
        [nodes, edges, setEdges, setLastSteps]
    );
    const onConnect = useCallback(
        (params: Connection) => {
            setLastSteps(prev => [
                ...prev,
                {
                    nodes: structuredClone(nodes),
                    edges: structuredClone(edges),
                },
            ]);

            setEdges(eds => addEdge(params, eds));
        },
        [nodes, edges, setEdges, setLastSteps]
    );
    const onNodeClick = useCallback(
        (_event: MouseEvent, node: Node<NodeData>) => {
            setActiveNode(node);
        },
        [setActiveNode]
    );
    const onNodeDoubleClick = useCallback(
        (_event: MouseEvent, node: Node<NodeData>) => {
            setActiveNode(node);
            setIsPanelOpen(true);
        },
        [setActiveNode, setIsPanelOpen]
    );
    const onPaneClick = useCallback(() => {
        setActiveNode(null);
        setIsPanelOpen(false);
    }, [setActiveNode, setIsPanelOpen]);




    return (
        <div className="w-full h-full">
            <ReactFlow<Node<NodeData>, Edge>
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onNodeDoubleClick={onNodeDoubleClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
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
