'use client';

import { useParams } from "next/navigation";

const NavbarMenuAddPage = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <div className="card">
            Menü ekle
        </div>
    );
}

export default NavbarMenuAddPage;
