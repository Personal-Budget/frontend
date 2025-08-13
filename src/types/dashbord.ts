export interface SideBarProps {
	onPageChanged: (pageId: string) => void;
	pages: SideBarElement[];
	activeElementId: string | null;
}

export interface SideBarElement {
	id: string;
	relativePath: string;
	icon: any;
	label: string;
}
