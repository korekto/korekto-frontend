import { axiosAPI } from './../axios';
import type { Page, Table, UnparseableWebhook, UserForAdmin } from './../types';
import { loadUser } from './../stores';

export const getTables = async (): Promise<Table[]> => {
    return await axiosAPI.get<Table[]>('/fapi/admin/table').then((res) => res.data);
};

export const getUsers = async (): Promise<UserForAdmin[]> => {
    return await axiosAPI.get<UserForAdmin[]>('/fapi/admin/user').then((res) => res.data);
};

export const deleteUsers = async (ids: string[]) => {
    await axiosAPI({
        method: 'delete',
        url: '/fapi/admin/user',
        data: JSON.stringify(ids),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const setUsersTeacher = async (ids: string[]) => {
    await axiosAPI({
        method: 'patch',
        url: '/fapi/admin/teacher',
        data: JSON.stringify(ids),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    await loadUser();
};

export const getUnparseableWebhooks = async (page: number, per_page: number): Promise<Page<UnparseableWebhook>> => {
    return await axiosAPI.get<Page<UnparseableWebhook>>(`/fapi/admin/unparseable_webhooks?page=${page}&per_page=${per_page}`)
        .then((res) => res.data);
};

export const deleteUnparseableWebhooks = async () => {
    await axiosAPI({
        method: 'delete',
        url: '/fapi/admin/unparseable_webhooks'
    });
};
