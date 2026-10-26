// ** React Flow
import type {Node} from "@xyflow/react";
// ** Interfaces
import {NodeData} from "@/app/types/node";
interface NodeFormProps {
    node: Node<NodeData>;
    onChange: (id: string, data: Partial<NodeData>) => void;
}



export default function WebhookForm({node, onChange}: NodeFormProps) {
    // ** Constants
    const webhook = node.data.webhook ?? {};
    const status = node.data.status;



    // ** Handlers
    const updateWebhookHandler = (key: string, value: any) => {
        onChange(node.id, {
            webhook: {
                ...webhook,
                [key]: value,
            },
        });
    };

    return (
        <div className="h-full overflow-y-auto">
            <div className="flex flex-col gap-3.5 border-b border-[#2B2E35] p-3.5">
                <input
                    type="text"
                    name="label"
                    id="nodeLabel"
                    value={node.data.label ?? ""}
                    onChange={e => onChange(node.id, { label: e.target.value })}
                    className="text-[14px] font-bold text-[#E3E5E8] focus:outline-0"
                />

                <textarea
                    name="description"
                    id="nodeDescription"
                    value={node.data.description ?? ""}
                    onChange={e => onChange(node.id, { description: e.target.value })}
                    className="w-full resize-none text-[13px] text-[#9197A2] focus:outline-0"
                />

                {status && (
                    <div className={`flex items-center gap-2 text-[11px] ${status.success ? "text-[#6BC18F]" : "text-[#EF7B63]"}`}>
                        <span className={`w-2 h-2 flex ${status.success ? "bg-[#6BC18F]" : "bg-[#EF7B63]"} rounded-full`}></span>
                        {status.success ? "Triggered" : "Failed"} · {status.ms}ms
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3.5 border-b border-[#2B2E35] p-3.5">
                <h1 className="text-[11px] text-[#9197A2]">Webhook Configuration</h1>

                <div className="flex flex-wrap gap-1.5">
                    {(["POST", "GET", "PUT", "DELETE"] as const).map(method => (
                        <button
                            key={method}
                            type="button"
                            onClick={() => updateWebhookHandler("method", method)}
                            className={`border ${webhook.method === method ? "border-[#C7F568] text-[#C7F568]" : "border-[#2B2E35] text-[#9197A2]"} rounded-[2px] px-2.25 py-1.25 text-[11px] cursor-pointer`}
                        >
                            {method}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-1.25">
                    <label htmlFor="endpointUrl" className="text-[11px] text-[#9197A2]">Endpoint URL</label>
                    <input
                        type="text"
                        name="endpointUrl"
                        id="endpointUrl"
                        readOnly
                        value={webhook.url ?? "https://api.yoursite.com/webhook/v1/..."}
                        className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#9197A2] focus:outline-0 select-all"
                    />
                </div>

                <div className="flex flex-col gap-1.25">
                    <label htmlFor="secret" className="text-[11px] text-[#9197A2]">Secret Key (Optional)</label>
                    <input
                        type="text"
                        name="secret"
                        id="secret"
                        value={webhook.secret ?? ""}
                        onChange={e => updateWebhookHandler("secret", e.target.value)}
                        className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"
                    />
                </div>
            </div>

            <div className="w-full p-3.5">
                <button
                    type="button"
                    onClick={() => console.log("Listen for test webhook:", node.data)}
                    className="w-full border border-[#2B2E35] rounded-lg p-2 mt-1.5 cursor-pointer hover:bg-[#22252B] text-[11px] text-[#E3E5E8]"
                >
                    Listen for test event
                </button>
            </div>
        </div>
    );
}