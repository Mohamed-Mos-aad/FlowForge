// ** React Flow
import type {Node} from "@xyflow/react";
// ** Interfaces
import {NodeData} from "@/app/types/node";
import {logProps} from "@/app/types/types";
interface NodeFormProps {
    node: Node<NodeData>;
    onChange: (id: string, data: Partial<NodeData>) => void;
    setExecutionLogs: (log: logProps)=> void
    resData: [];
}
type Operator = "equals" | "not_equals" | "contains" | "greater_than" | "less_than" | "is_empty";



export default function ConditionForm({node, onChange, resData, setExecutionLogs}: NodeFormProps) {
    // ** Constants
    const condition = node.data.condition ?? {};
    const status = node.data.status;



    // ** Handlers
    const updateConditionHandler = (key: string, value: string) => {
        onChange(node.id, {
            condition: {
                ...condition,
                [key]: value,
            },
        });
    };
    function evaluateCondition(left: unknown, operator: Operator, right: unknown): boolean {
        switch (operator) {
            case "equals":       return String(left) === String(right);
            case "not_equals":   return String(left) !== String(right);
            case "contains":     return String(left).includes(String(right));
            case "greater_than": return Number(left) > Number(right);
            case "less_than":    return Number(left) < Number(right);
            case "is_empty":     return left === undefined || left === null || String(left).trim() === "";
            default:             return false;
        }
    }
    function resolveExpression(input: string, item: unknown): unknown {
        const match = input.match(/^\{\{\s*(.+?)\s*\}\}$/);
        if (!match) return input;
        return match[1].split(".").reduce<unknown>((obj, key) => {
            if (obj !== null && typeof obj === "object") return (obj as Record<string, unknown>)[key];
            return undefined;
        }, item);
    }
    const testConditionHandler = () => {
        const { leftValue = "", operator = "equals", rightValue = "" } = condition;
        const items = Array.isArray(resData) ? resData : [resData];

        if (items.length === 0) {
            setExecutionLogs({
                time: new Date().toLocaleTimeString(),
                success: false,
                title: node.data.label,
                message: "No input items to evaluate",
            });
            return;
        }

        let passed = 0;
        for (const item of items) {
            const left = resolveExpression(leftValue, item);
            const right = resolveExpression(rightValue, item);
            if (evaluateCondition(left, operator as Operator, right)) passed++;
        }
        const failed = items.length - passed;

        onChange(node.id, { status: { success: passed > 0, ms: 0 } });
        setExecutionLogs({
            time: new Date().toLocaleTimeString(),
            success: passed > 0,
            title: node.data.label,
            message: `${leftValue} ${operator} ${rightValue} → ${passed} true / ${failed} false`,
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
                        Condition Met: {status.success ? "True" : "False"}
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-3.5 border-b border-[#2B2E35] p-3.5">
                <h1 className="text-[11px] text-[#9197A2]">Condition Rules (If / Else)</h1>

                <div className="flex flex-col gap-1.25">
                    <label htmlFor="leftValue" className="text-[11px] text-[#9197A2]">Left Variable / Value</label>
                    <input
                        type="text"
                        name="leftValue"
                        id="leftValue"
                        value={condition.leftValue ?? ""}
                        onChange={e => updateConditionHandler("leftValue", e.target.value)}
                        placeholder="{{webhook.body.status}}"
                        className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"
                    />
                </div>

                <div className="flex flex-col gap-1.25">
                    <label htmlFor="operator" className="text-[11px] text-[#9197A2]">Operator</label>
                    <select
                        id="operator"
                        value={condition.operator ?? "equals"}
                        onChange={e => updateConditionHandler("operator", e.target.value)}
                        className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"
                    >
                        <option value="equals">Equals (==)</option>
                        <option value="not_equals">Not Equals (!=)</option>
                        <option value="contains">Contains</option>
                        <option value="greater_than">Greater Than (&gt;)</option>
                        <option value="less_than">Less Than (&lt;)</option>
                        <option value="is_empty">Is Empty</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.25">
                    <label htmlFor="rightValue" className="text-[11px] text-[#9197A2]">Right Value</label>
                    <input
                        type="text"
                        name="rightValue"
                        id="rightValue"
                        value={condition.rightValue ?? ""}
                        onChange={e => updateConditionHandler("rightValue", e.target.value)}
                        placeholder="active"
                        className="bg-[#0F1113] border border-[#2B2E35] rounded-[3px] px-2.5 py-1.5 text-[11px] text-[#E3E5E8] focus:outline-0 focus:border-[#C7F568]"
                    />
                </div>
            </div>

            <div className="w-full p-3.5">
                <button
                    type="button"
                    onClick={testConditionHandler}
                    className="w-full border border-[#2B2E35] rounded-lg p-2 mt-1.5 cursor-pointer hover:bg-[#22252B] text-[11px] text-[#E3E5E8]"
                >
                    Test condition
                </button>
            </div>
        </div>
    );
}