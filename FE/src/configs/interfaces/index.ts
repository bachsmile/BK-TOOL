export interface MenuItem {
    name: string;
    icon?: string;
    link?: string;
    show?: boolean;
    parentId?: number | string;
    showId?: number | string;
    subMenu?: MenuItem[];
}