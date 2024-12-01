export interface NavbarMenu {
    id: number | null;
    title: string;
    url: string;
    icon: string | null;
    sortOrder: number | null;
    mainMenu: boolean;
    isActive: boolean;
    parentId: number;
    createdAt: string | null;
    updatedAt: string | null;
    parentTitle: string | null;
    grandParentTitle: string | null;
    hasGrandChild: boolean  | null;
    children: NavbarMenu[];
}

