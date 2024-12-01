import { NavbarMenu } from "@/interfaces/navbarMenu";
import axios from "axios";

const BASE_URL = 'http://lee.webmobilebros.com/api/';
const LOCAL_BASE_URL = 'http://localhost:3003/api/';

const getNavbarMenus = async (): Promise<NavbarMenu[]> => {
    try {
        const response = await axios.get<NavbarMenu[]>(BASE_URL + 'navbar-menus');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const postMenu = async (menu: NavbarMenu): Promise<void> => {
    try {
        await axios.post(BASE_URL + 'navbar-menus', menu);
    } catch (error) {
        console.error(error);
    }
};

const deleteNavbarMenu = async (id: number): Promise<void> => {
    try {
        await axios.delete(BASE_URL + `navbar-menus/${id}`);
    } catch (error) {
        console.error(error);
    }
};


export { getNavbarMenus, postMenu, deleteNavbarMenu };