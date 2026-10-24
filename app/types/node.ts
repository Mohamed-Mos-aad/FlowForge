export interface RequestHeaders {
    accept: string;
    requestId: string;
}

export interface NodeRequest {
    type: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    authentication: string;
    headers: RequestHeaders;
    timeout: number | "";
    retries: number | "";
}

export interface NodeState {
    success: boolean;
    ms: number;
}

export interface NodeData extends Record<string, unknown> {
    label: string;
    description?: string;
    state?: NodeState;
    request?: Partial<NodeRequest>;
    errorMsg?: string;
}