import { BookUser, House, Receipt, ReceiptIcon } from "lucide-svelte";
import Clock_1 from "lucide-svelte/icons/clock-1";
import type { SideBarElement } from "src/types/dashbord";

export const SideBarPages: SideBarElement[] = [
	{
		id: "dashboard_Home",
		label: "Home",
		relativePath: "Home.svelte",
		icon: House,
	},
	{
		id: "dashboard_Detailed",
		label: "Detailed",
		relativePath: "Detailed.svelte",
		icon: BookUser,
	},
	{
		id: "dashboard_Current",
		label: "Current",
		relativePath: "Current.svelte",
		icon: Clock_1,
	},
	{
		id: "Dashboard_Transactions",
		label: "Transactions",
		relativePath: "Transactions.svelte",
		icon: ReceiptIcon,
	},
];
