// ** React Flow
import type { Node, Edge } from "@xyflow/react";
// ** Types
import type { NodeData } from "@/types/node";
import type { WorkFlowProps } from "@/types/types";


// ** Export WorkFlow
export function exportWorkflowFile(workflow: WorkFlowProps) {
    const exportData = {
        type: "flowforge-workflow",
        version: 1,
        exportedAt: Date.now(),
        workflow: {
            id: workflow.id,
            title: workflow.title,
            status: workflow.status,
            lastRun: workflow.lastRun,
            success: workflow.success,
            runs: workflow.runs,
            nodes: workflow.nodes ?? [],
            edges: workflow.edges ?? [],
        },
    };

    const blob = new Blob(
        [JSON.stringify(exportData, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${workflow.title.replace(/[^a-z0-9-_]/gi, "_")}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}




// ** Import WorkFlow
export async function importWorkflowFile(
    file: File
): Promise<WorkFlowProps> {

    if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size exceeds 5 MB");
    }

    let parsed: any;

    try {
        parsed = JSON.parse(await file.text());
    } catch {
        throw new Error("Invalid JSON file");
    }

    if (
        !parsed ||
        parsed.type !== "flowforge-workflow" ||
        parsed.version !== 1
    ) {
        throw new Error("Unsupported workflow format");
    }

    const workflow = parsed.workflow;

    if (
        !workflow ||
        typeof workflow.title !== "string" ||
        !workflow.title.trim() ||
        !Array.isArray(workflow.nodes) ||
        !Array.isArray(workflow.edges)
    ) {
        throw new Error("Invalid workflow data");
    }

    const nodes = workflow.nodes;
    const edges = workflow.edges;

    if (nodes.length > 1000 || edges.length > 5000) {
        throw new Error("Workflow contains too many elements");
    }

    const oldIds = new Set<string>();

    // Validate Nodes
    for (const node of nodes) {
        if (
            !node ||
            typeof node.id !== "string" ||
            typeof node.type !== "string" ||
            !node.position ||
            !Number.isFinite(node.position.x) ||
            !Number.isFinite(node.position.y) ||
            !node.data ||
            typeof node.data !== "object" ||
            typeof node.data.label !== "string" ||
            typeof node.data.category !== "string"
        ) {
            throw new Error("Invalid node data");
        }

        if (oldIds.has(node.id)) {
            throw new Error("Duplicate node ID");
        }

        oldIds.add(node.id);
    }

    // Generate new IDs
    const idMap = new Map<string, string>();

    nodes.forEach((node: Node<NodeData>) => {
        idMap.set(node.id, crypto.randomUUID());
    });

    // Validate Edges
    const edgeIds = new Set<string>();

    for (const edge of edges) {
        if (
            !edge ||
            typeof edge.id !== "string" ||
            typeof edge.source !== "string" ||
            typeof edge.target !== "string" ||
            !oldIds.has(edge.source) ||
            !oldIds.has(edge.target)
        ) {
            throw new Error("Invalid edge connection");
        }

        if (edgeIds.has(edge.id)) {
            throw new Error("Duplicate edge ID");
        }

        edgeIds.add(edge.id);
    }

    // Validate parent nodes
    for (const node of nodes) {
        if (node.parentId && !oldIds.has(node.parentId)) {
            throw new Error("Invalid parent node");
        }
    }

    // Rebuild Nodes
    const newNodes: Node<NodeData>[] = nodes.map(
        (node: Node<NodeData>) => ({
            ...node,
            id: idMap.get(node.id)!,
            ...(node.parentId
                ? { parentId: idMap.get(node.parentId)! }
                : {}),
            selected: false,
            dragging: false,
        })
    );

    // Rebuild Edges
    const newEdges: Edge[] = edges.map((edge: Edge) => ({
        ...edge,
        id: crypto.randomUUID(),
        source: idMap.get(edge.source)!,
        target: idMap.get(edge.target)!,
        selected: false,
    }));

    // Return a new independent Workflow
    return {
        id: crypto.randomUUID(),
        title: workflow.title.trim(),
        status: "Draft",
        lastRun: 0,
        success: 0,
        runs: 0,
        nodes: newNodes,
        edges: newEdges,
    };
}
