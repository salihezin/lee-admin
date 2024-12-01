/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { useState, useEffect } from 'react';
import { deleteNavbarMenu, getNavbarMenus } from '@/services/navbarMenus';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setFetchedMenuData, setFormattedMenuList } from '@/redux/features/navbarMenuSlice';
import { NavbarMenu } from '@/interfaces/navbarMenu';
import { Button } from 'primereact/button';

const Dashboard = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [navbarMenus, setNavbarMenus] = useState<any[]>([]);

    const fetchNavbarMenus = () => {
        getNavbarMenus().then((data) => {
            dispatch(setFetchedMenuData(data));
            dispatch(setFormattedMenuList(transformToTreeTableData(data)));
            setNavbarMenus(transformToTreeTableData(data));
        });
    };

    const deleteMenu = (id: number) => {
        deleteNavbarMenu(id).then(() => {
            fetchNavbarMenus();
        });
    };

    const goToAddNavbarMenu = () => {
        router.push('/pages/navbar-menus/add/');
    };

    useEffect(() => {
        fetchNavbarMenus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const transformToTreeTableData = (data: NavbarMenu[]): any => {
        return data.map((item, index) => ({
            key: item.id?.toString(),
            data: {
                title: item.title,
                url: item.url,
                icon: item.icon,
                sortOrder: item.sortOrder || index + 1,
                mainMenu: item.mainMenu ? 'Yes' : 'No',
                isActive: item.isActive ? 'Active' : 'Inactive',
                parentId: item.parentId,
                parentTitle: item.parentTitle,
                grandParentTitle: item.grandParentTitle,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            },
            children: item.children?.length ? transformToTreeTableData(item.children) : null,
        }));
    };

    const menusOperations = (data: any) => {
        return (
            <div>
                <Button icon="pi pi-times" rounded outlined severity="danger" aria-label="Sil"
                className='mr-2'
                disabled={data.children}
                    onClick={() => deleteMenu(data.key)} />
            </div>
        );
    };

    const header = (data: any) => {
        return (
            <div>
                <Button icon="pi pi-plus" text raised aria-label="Ekle" label="Menü Ekle"
                    onClick={() => goToAddNavbarMenu()} />
            </div>
        );
    };

    return (
        <div className="card">
            Welcome to Lee Dashboard
            <TreeTable value={navbarMenus}>
                <Column field="title" header="Başlık" expander />
                <Column field="url" header="URL" />
                <Column field="sortOrder" header="Sıra" />
                <Column body={menusOperations} header="Sil" />
                <Column header={header} />
            </TreeTable>
        </div>
    );
};

export default Dashboard;
