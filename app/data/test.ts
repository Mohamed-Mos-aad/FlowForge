// ** Interfaces
import {WorkFlowProps} from "@/app/types/types";
// ** Constants
export const WORKFLOWS:WorkFlowProps[] = [
    {
        id: crypto.randomUUID(),
        title: "Customer Onboarding" ,
        status: "Active" ,
        lastRun: "2m ago" ,
        success: 99.2 ,
        runs: 12408
    },
    {
        id: crypto.randomUUID(),
        title: "Lead Qualification",
        status: "Active",
        lastRun: "11m ago",
        success: 97.8,
        runs: 8930
    },
    {
        id: crypto.randomUUID(),
        title: "Failed Payment Recovery",
        status: "Failing",
        lastRun: "4m ago",
        success: 82.1,
        runs: 1204
    },
    {
        id: crypto.randomUUID(),
        title: "Nightly Data Sync",
        status: "Active",
        lastRun: "6h ago",
        success: 100,
        runs: 412
    },
    {
        id: crypto.randomUUID(),
        title: "Support Ticket Routing",
        status: "Draft",
        lastRun: "—",
        success: 0,
        runs: 0
    },
    {
        id: crypto.randomUUID(),
        title: "Usage Threshold Alerts",
        status: "Active",
        lastRun: "28m ago",
        success: 99.9,
        runs: 5771
    },
]
