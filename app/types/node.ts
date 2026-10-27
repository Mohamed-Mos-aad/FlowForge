export interface NodeWebhook {
    method: string;
    url: string;
    secret: string;
}

export interface NodeAction {
    type: string;
    payload: string;
}

export interface NodeCondition {
    leftValue: string;
    operator: string;
    rightValue: string;
}

export interface NodeRequest {
    type: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    authentication: string;
    headers: RequestHeaders;
    body: string;
    timeout: number | "";
    retries: number | "";
}

export interface RequestHeaders {
    accept?: string;
    requestId?: string;
}

export interface NodeState {
    success: boolean;
    ms: number;
}

export interface NodeData extends Record<string, unknown> {
    label: string;
    description?: string;
    category: string;
    status?: NodeState;
    output?: unknown,
    errorMsg?: string;
    request?: Partial<NodeRequest>;
    webhook? : Partial<NodeWebhook>;
    action? : Partial<NodeAction>;
    condition? : Partial<NodeCondition>;
}