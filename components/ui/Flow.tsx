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
import '@/app/style/flow.css';
// ** Interfaces
import type {NodeData} from "@/app/types/node";
interface FlowProps {
    nodes: Node<NodeData>[];
    edges: Edge[];
    setNodes: Dispatch<SetStateAction<Node<NodeData>[]>>;
    setEdges: Dispatch<SetStateAction<Edge[]>>;
    setActiveNode: Dispatch<SetStateAction<Node<NodeData> | null>>;
    setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
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
                                 setIsPanelOpen
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
        },
        [setEdges]
    );
    const onConnect = useCallback(
        (params: Connection) => {
            setEdges(eds => addEdge(params, eds));
        },
        [setEdges]
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
