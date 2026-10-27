// ** React Flow
import type {Node} from "@xyflow/react";
// ** Interfaces
import {NodeData, NodeRequest, RequestHeaders} from "@/app/types/node";
import {logProps} from "@/app/types/types";
interface NodeFormProps {
    node: Node<NodeData>;
    onChange: (id: string, data: Partial<NodeData>) => void;
    setExecutionLogs: (log: logProps)=> void
}




export default function HttpRequestForm({node, onChange, setExecutionLogs}: NodeFormProps) {
    // ** Data
    const request = node.data.request ?? {};
    const headers: Partial<RequestHeaders> = request.headers ?? {};
    const status = node.data.status;



    // ** Handlers
    const updateRequestHandler = (
        key: keyof NodeRequest,
        value: string | number | ""
    ) => {
        onChange(node.id, {
            request: {
                ...request,
                [key]: value,
            },
        });
    };
    const updateHeadersHandler = (
        key: keyof RequestHeaders,
        value: string
    ) => {
        onChange(node.id, {
            request: {
                ...request,
                headers: {
                    ...headers,
                    [key]: value,
                },
            },
        });
    };
    const testRequestHandler = async ()=>{
        const req = node.data.request;
        if (!req?.url) return;

        const start = performance.now();

        try {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), req.timeout || 10000);


            const res = await fetch(req.url, {
                method: req.type ?? "GET",
                headers: {
                    ...(req.headers?.accept && { Accept: req.headers.accept }),
                    ...(req.body && { "Content-Type": "application/json" }),
                },
                body: req.type !== "GET" && req.body ? req.body : undefined,
                signal: controller.signal,
            });

            clearTimeout(timer);

            const text = await res.text();
            let data: unknown = text;
            try { data = JSON.parse(text); } catch {}

            const ms = Math.round(performance.now() - start);
            onChange(node.id, { status: { success: res.ok, ms }, errorMsg: res.ok ? "" : `HTTP ${res.status}` });
            setExecutionLogs({
                time: new Date().toLocaleTimeString(),
                success: res.ok,
                title: node.data.label,
                message: JSON.stringify(data, null, 2),
            });

        } catch (err) {
            const ms = Math.round(performance.now() - start);
            onChange(node.id, { status: { success: false, ms }, errorMsg: (err as Error).message });
        }
    }



    return (
        <div className="h-full overflow-y-auto">
            <div className="flex flex-col gap-3.5 border-b border-[#2B2E35] p-3.5">
                <input
                    type="text"
                    name="label"
                    id="nodeLabel"
                    value={node.data.label ?? ""}
                    onChange={e =>
                        onChange(node.id, {
                            label: e.target.value,
                        })
                    }
                    className="text-[14px] font-bold text-[#E3E5E8] focus:outline-0"
                />

                <textarea
                    name="description"
                    id="nodeDescription"
                    value={node.data.description ?? ""}
                    onChange={e =>
                        onChange(node.id, {
                            description: e.target.value,
                        })
                    }
                    className="w-full resize-none text-[13px] text-[#9197A2] focus:outline-0"
                />

                {status && (
                    <div className={`flex items-center gap-2 text-[11px] ${status.success ? "text-[#6BC18F]" : "text-[#EF7B63]"}`}>
                        <span className={`w-2 h-2 flex ${status.success ? "bg-[#6BC18F]" : "bg-[#EF7B63]"} rounded-full`}></span>
                        {status.success ? "Success" : "Failed"} · {status.ms}ms
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3.5 border-b border-[#2B2E35] p-3.5">
                <h1 className="text-[11px] text-[#9197A2]">Request</h1>

                <div className="flex flex-wrap gap-1.5">
                    {(["GET", "POST", "PUT", "DELETE"] as const).map(method => (
                        <button
                            key={method}
                            type="button"
                            onClick={() =>
                                updateRequestHandler("type", method)
                            }
                            className={`border ${request.type === method ? "border-[#C7F568] text-[#C7F568]" : "border-[#2B2E35] text-[#9197A2]"} rounded-[2px] px-2.25 py-1.25 text-[11px] cursor-pointer`}
                        >
                            {method}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-1.25">
                    <label htmlFor="url" className="text-[11px] text-[#9197A2]">URL</label>
                    <input
                        type="text"
                        name="url"
                        id="url"
                        value={request.url ?? ""}
                        onChange={e =>
                            updateRequestHandler("url", e.target.value)
                        }
                        className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"
                    />
                </div>

                <div className="flex flex-col gap-1.25">
                    <label htmlFor="authentication" className="text-[11px] text-[#9197A2]">Authentication</label>
                    <input
                        type="text"
                        name="authentication"
                        id="authentication"
                        value={request.authentication ?? ""}
                        onChange={e =>
                            updateRequestHandler("authentication", e.target.value)
                        }
                        className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3.5 border-b border-[#2B2E35] p-3.5">
                <h2 className="text-[11px] text-[#9197A2]">Headers & Body</h2>

                <div className="flex flex-col gap-1.5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="accept" className="text-[11px] text-[#9197A2]">Accept</label>
                        <input
                            type="text"
                            name="accept"
                            id="accept"
                            value={headers.accept ?? ""}
                            onChange={e =>
                                updateHeadersHandler("accept", e.target.value)
                            }
                            className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="requestId" className="text-[11px] text-[#9197A2]">Request ID</label>
                        <input
                            type="text"
                            name="requestId"
                            id="requestId"
                            value={headers.requestId ?? ""}
                            onChange={e =>
                                updateHeadersHandler("requestId", e.target.value)
                            }
                            className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1.25">
                    <label htmlFor="body" className="text-[11px] text-[#9197A2]">Request Body (JSON)</label>
                    <textarea
                        name="body"
                        id="body"
                        rows={3}
                        value={request.body ?? ""}
                        onChange={e => updateRequestHandler("body", e.target.value)}
                        placeholder='{"key": "value"}'
                        className="w-full bg-[#0F1113] border border-[#2B2E35] rounded-[3px] p-2.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568] font-mono resize-none"
                    />
                </div>

                <div className="w-full flex gap-2.5">
                    <div className="w-full flex flex-col gap-1.25">
                        <label htmlFor="timeout" className="text-[11px] text-[#9197A2]">Timeout (ms)</label>
                        <input
                            type="number"
                            min="1"
                            name="timeout"
                            id="timeout"
                            value={request.timeout ?? 1000}
                            onChange={e =>
                                updateRequestHandler(
                                    "timeout",
                                    e.target.value === "" ? "" : Number(e.target.value)
                                )
                            }
                            className="w-full min-w-0 bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-1.25">
                        <label htmlFor="retries" className="text-[11px] text-[#9197A2]">Retries</label>
                        <input
                            type="number"
                            min="0"
                            name="retries"
                            id="retries"
                            value={request.retries ?? 0}
                            onChange={e =>
                                updateRequestHandler(
                                    "retries",
                                    e.target.value === "" ? "" : Number(e.target.value)
                                )
                            }
                            className="w-full min-w-0 bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"
                        />
                    </div>
                </div>

                {node.data.errorMsg && (
                    <p className="text-[11px] text-[#EF7B63]">
                        {node.data.errorMsg}
                    </p>
                )}
            </div>

            <div className="w-full p-3.5">
                <button
                    type="button"
                    onClick={testRequestHandler}
                    className="w-full border border-[#2B2E35] rounded-lg p-2 mt-1.5 cursor-pointer hover:bg-[#22252B] text-[11px] text-[#E3E5E8]"
                >
                    Test request
                </button>
            </div>
        </div>
    );
}