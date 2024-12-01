'use client';

import { NavbarMenu } from '@/interfaces/navbarMenu';
import { RootState } from '@/redux/store';
import { postMenu } from '@/services/navbarMenus';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { TreeSelect, TreeSelectSelectionKeysType } from 'primereact/treeselect';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const NavbarMenuAddPage = () => {
    const toastRef = useRef<Toast>(null);
    const router = useRouter();
    const menuData = useSelector((state: RootState) => state.navbarMenu);
    const [selectValue, setSelectValue] = useState<string | TreeSelectSelectionKeysType | TreeSelectSelectionKeysType[] | null>(null);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [formValid, setFormValid] = useState({
        title: {
            isValid: true,
            message: ''
        },
        url: {
            isValid: true,
            message: ''
        },
        selectValue: {
            isValid: true,
            message: ''
        }
    });

    const handleValidations = () => {
        let valid = true;
        const acceptableUrlRegex = /^\/[a-zA-Z0-9\-._~:/?#\[\]@!$&'()*+,;=]*$/;
        const urlValidation = acceptableUrlRegex.test(url);

        const invalidUrlRegex = /[^a-zA-Z0-9\-._~:/?#\[\]@!$&'()*+,;=]/;
        const invalidUrlValidation = invalidUrlRegex.test(url);
        if (!title) {
            setFormValid((prevState) => ({
                ...prevState,
                title: {
                    isValid: false,
                    message: 'Başlık boş bırakılamaz.'
                }
            }));
            valid = false;
        }
        if (!url) {
            setFormValid((prevState) => ({
                ...prevState,
                url: {
                    isValid: false,
                    message: 'URL boş bırakılamaz.'
                }
            }));
            valid = false;
        }

        
        if (!selectValue) {
            setFormValid((prevState) => ({
                ...prevState,
                selectValue: {
                    isValid: false,
                    message: 'Menü seçimi yapmalısınız.'
                }
            }));
            valid = false;
        }

        if (url && !urlValidation) {
            setFormValid((prevState) => ({
                ...prevState,
                url: {
                    isValid: false,
                    message: 'Geçerli bir URL giriniz. / ile başlamalıdır.'
                }
            }));
            valid = false;
        }

        if (url && invalidUrlValidation) {
            setFormValid((prevState) => ({
                ...prevState,
                url: {
                    isValid: false,
                    message: 'Geçersiz karakterler içeriyor.'
                }
            }));
            valid = false;
        }
        return valid;
    };

    const handleSubmit = () => {
        if (handleValidations()) {
            postMenu({
                title,
                url,
                parentId: typeof selectValue === 'string' ? parseInt(selectValue) : 0,
                mainMenu: false,
                isActive: true,
                icon: '',
                sortOrder: null,
                grandParentTitle: null,
                id: null,
                children: [],
                createdAt: null,
                updatedAt: null,
                parentTitle: null,
                hasGrandChild: false
            }).then(response => {
                console.log('response', response);
                toastRef.current?.show({ severity: 'success', summary: 'Başarılı', detail: 'Menü başarıyla eklendi.' });
                router.push('/');
            }).catch((error) => {
                console.error(error);
            });
            console.log('Form is valid', title, url, selectValue);
        } else {
            console.log('Form is invalid');
        }
    };

    function convertToTreeSelectFormat(data: NavbarMenu[] | null): any {
        // const lastChild = data?.find((item) => item.data.grandParentTitle !== null);
        const lastChild = data?.find((item) => item.grandParentTitle !== null);
        if (lastChild) return;
        const formattedData = data?.map((item) => ({
            key: item.id?.toString(),
            label: item.title,
            data: item,
            children: item.children ? convertToTreeSelectFormat(item.children) : []
        }));

        return [
            {
                key: '0',
                label: 'Ana Menü',
                children: formattedData
            }
        ];
    }

    return (
        <div className="card">
            <Toast ref={toastRef} />
            <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="title">Başlık</label>
                <InputText id="title" aria-describedby="title-help" className={formValid.title.isValid ? '' : 'p-invalid'} onChange={(e) => {
                    setTitle(e.target.value);
                    setFormValid((prevState) => ({
                        ...prevState,
                        title: {
                            isValid: true,
                            message: ''
                        }
                    }));
                }} />
                <small id="title-help" className="p-d-block p-mt-2">
                    {formValid.title.message}
                </small>
            </div>
            <label htmlFor="url">URL</label>
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">/</span>
                <InputText id="url" aria-describedby="url-help" className={formValid.url.isValid ? '' : 'p-invalid'} onChange={(e) => {
                    setUrl(e.target.value);
                    setFormValid((prevState) => ({
                        ...prevState,
                        url: {
                            isValid: true,
                            message: ''
                        }
                    }));
                }} />
            </div>
            <small id="url-help" className="p-d-block p-mt-2">
                {formValid.url.message}
            </small>
            <TreeSelect
                className={'flex mt-3 mb-3' + (formValid.selectValue.isValid ? '' : ' p-invalid')}
                value={selectValue}
                options={convertToTreeSelectFormat(menuData.formattedMenuList)}
                selectionMode="single"
                metaKeySelection={false}
                onChange={(e) => {
                    setFormValid((prevState) => ({
                        ...prevState,
                        selectValue: {
                            isValid: true,
                            message: ''
                        }
                    }));
                    if (e.value !== undefined) {
                        setSelectValue(e.value);
                    }
                }}
                placeholder="Hangi Menü Altında?"
            />
            <small id="selectValue-help" className="p-d-block">
                {formValid.selectValue.message}
            </small>
            <div className="flex gap-2 mt-6">
                <Button label="Kaydet" outlined className="flex-1" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default NavbarMenuAddPage;
