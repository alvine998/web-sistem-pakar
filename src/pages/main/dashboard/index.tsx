import ApexChart from '@/components/Chart'
import { CONFIG } from '@/config';
import axios from 'axios';
import React from 'react'

export async function getServerSideProps(context: any) {
    try {
        const { page, size } = context.query;
        const [brands, categories, users] = await Promise.all([
            axios.get(CONFIG.base_url_api + `/brands?page=${page || 1}&size=${size || 999999}`, {
                headers: {
                    "bearer-token": "tokotitohapi",
                    "x-partner-code": "id.marketplace.tokotitoh"
                }
            }),
            axios.get(CONFIG.base_url_api + `/categories?page=${page || 1}&size=${size || 999999}`, {
                headers: {
                    "bearer-token": "tokotitohapi",
                    "x-partner-code": "id.marketplace.tokotitoh"
                }
            }),
            // axios.get(CONFIG.base_url_api + `/ads?page=${page || 1}&size=${size || 999999}`, {
            //     headers: {
            //         "bearer-token": "tokotitohapi",
            //         "x-partner-code": "id.marketplace.tokotitoh"
            //     }
            // }),
            axios.get(CONFIG.base_url_api + `/users?isCustomer=1&page=${page || 1}&size=${size || 999999}`, {
                headers: {
                    "bearer-token": "tokotitohapi",
                    "x-partner-code": "id.marketplace.tokotitoh"
                }
            })
        ])
        console.log(brands?.data);
        return {
            props: {
                brands: brands?.data?.items?.count,
                categories: categories?.data?.items?.count,
                users: users?.data?.items?.count,
            }
        }
    } catch (error) {
        console.log(error);
        return {
            props: {

            }
        }
    }
}

export default function Dashboard({brands, categories, users}: any) {
    return (
        <div>

            <div className='bg-blue-500 w-full h-auto p-2 rounded'>
                <p className='text-white text-xl lg:text-left text-center'>Selamat Datang Admin</p>
            </div>

            <div className='flex lg:flex-row flex-col gap-2 justify-between items-center mt-5'>
                <div className='bg-green-500 w-full h-auto p-2 rounded'>
                    <h5 className='text-white font-semibold text-xl'>Total Pengguna :</h5>
                    <p className='text-white text-xl'>{users || 0}</p>
                </div>

                <div className='bg-orange-500 w-full h-auto p-2 rounded'>
                    <h5 className='text-white font-semibold text-xl'>Total Iklan :</h5>
                    <p className='text-white text-xl'>5</p>
                </div>

                <div className='bg-blue-500 w-full h-auto p-2 rounded'>
                    <h5 className='text-white font-semibold text-xl'>Total Laporan :</h5>
                    <p className='text-white text-xl'>25</p>
                </div>

                <div className='bg-gray-500 w-full h-auto p-2 rounded'>
                    <h5 className='text-white font-semibold text-xl'>Total Brand :</h5>
                    <p className='text-white text-xl'>{brands || 0}</p>
                </div>

                <div className='bg-red-500 w-full h-auto p-2 rounded'>
                    <h5 className='text-white font-semibold text-xl'>Total Kategori :</h5>
                    <p className='text-white text-xl'>{categories || 0}</p>
                </div>
            </div>

            <div className='mt-5'>
                <h2 className='text-xl'>Perkembangan Pengguna</h2>
                <ApexChart />
            </div>

            <div className='mt-5'>
                <h2 className='text-xl'>Perkembangan Iklan</h2>
                <ApexChart />
            </div>
        </div>
    )
}
