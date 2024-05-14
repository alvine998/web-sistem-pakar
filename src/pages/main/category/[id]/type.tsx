import Button from '@/components/Button'
import Input from '@/components/Input'
import Modal, { useModal } from '@/components/Modal'
import { CustomTableStyle } from '@/components/table/CustomTableStyle'
import PropertyTabs from '@/components/tabs/PropertyTabs'
import { EyeIcon, PencilIcon, PlusIcon, SaveAllIcon, Trash2Icon, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import ReactSelect from 'react-select'

const data: any = [
    {
        id: 1,
        brand_name: "Toyota",
        name: "Altis G"
    }
]

export async function getServerSideProps(context: any) {
    try {
        const { page, limit } = context.query;
        const { id } = context.params;
        // const result = await axios.get(CONFIG.BASE_URL_API.v1 + `/feature?page=${page || 1}&limit=${limit || 10}`)
        return {
            props: {
                // table: result?.data
                id
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default function PropertyRoomType({ id }: any) {
    const router = useRouter();
    const [show, setShow] = useState<boolean>(false)
    const [modal, setModal] = useState<useModal>()
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setShow(true)
        }
    }, [])

    const Column: any = [
        {
            name: "Brand",
            sortable: true,
            selector: (row: any) => row?.brand_name
        },
        {
            name: "Tipe",
            sortable: true,
            selector: (row: any) => row?.name
        },
        {
            name: "Aksi",
            selector: (row: any) => <div className='flex gap-2 flex-row'>
                <Button title='Edit' color='primary' type='button' onClick={() => {
                    setModal({ ...modal, open: true, data: row, key: "update" })
                }}>
                    <PencilIcon className='text-white w-5 h-5' />
                </Button>
                <Button title='Hapus' color='danger' type='button' onClick={() => {
                    setModal({ ...modal, open: true, data: row, key: "delete" })
                }}>
                    <TrashIcon className='text-white w-5 h-5' />
                </Button>
            </div>
        },
    ]

    const types = [
        { value: "homestay", label: "Homestay" },
        { value: "hotel", label: "Hotel" },
        { value: "villa", label: "Villa" }
    ]
    return (
        <PropertyTabs id={id}>
            <h2 className='text-2xl font-semibold'>Tipe</h2>

            <div className='mt-5'>
                <div className='flex lg:flex-row flex-col justify-between items-center'>
                    <div className='lg:w-auto w-full'>
                        <Input label='' type='search' placeholder='Cari disini...' />
                    </div>
                    <div className='lg:w-auto w-full'>
                        <Button type='button' color='info' className={'flex gap-2 px-2 items-center lg:justify-start justify-center'} onClick={() => {
                            setModal({ ...modal, open: true, data: null, key: "create" })
                        }}>
                            <PlusIcon className='w-4' />
                            Tipe
                        </Button>
                    </div>
                </div>
                <div className='mt-5'>
                    {
                        show &&
                        <DataTable
                            columns={Column}
                            data={data}
                            customStyles={CustomTableStyle}
                        />
                    }
                </div>


                {
                    modal?.key == "create" || modal?.key == "update" ? <Modal open={modal.open} setOpen={() => setModal({ ...modal, open: false })}>
                        <h2 className='text-xl font-semibold text-center'>{modal.key == 'create' ? "Tambah" : "Ubah"} Tipe</h2>
                        <form>
                            <Input label='Nama Tipe' placeholder='Masukkan Nama Tipe' name='name' defaultValue={modal?.data?.name || ""} required />
                            <div className='w-full my-2'>
                                <label className='text-gray-500' htmlFor="x">Brand</label>
                                <ReactSelect
                                    options={types}
                                    defaultValue={{ value: modal?.data?.type || "homestay", label: types?.find((v: any) => modal?.data?.type == v?.value)?.label || "Homestay" }}
                                    required
                                    name='type'
                                    id='x'
                                />
                            </div>
                            <input type="hidden" name="id" value={modal?.data?.id || ""} />
                            <div className='flex lg:gap-2 gap-0 lg:flex-row flex-col-reverse justify-end'>
                                <div>
                                    <Button color='white' type='button' onClick={() => {
                                        setModal({ open: false })
                                    }}>
                                        Kembali
                                    </Button>
                                </div>

                                <div>
                                    <Button color='info' className={'flex gap-2 px-2 items-center justify-center'}>
                                        <SaveAllIcon className='w-4 h-4' />
                                        Simpan
                                    </Button>
                                </div>

                            </div>
                        </form>
                    </Modal>
                        : ""
                }
                {
                    modal?.key == "delete" ? <Modal open={modal.open} setOpen={() => setModal({ ...modal, open: false })}>
                        <h2 className='text-xl font-semibold text-center'>Hapus Tipe</h2>
                        <form>
                            <input type="hidden" name="id" value={modal?.data?.id} />
                            <p className='text-center my-2'>Apakah anda yakin ingin menghapus data {modal?.data?.name}?</p>
                            <div className='flex lg:gap-2 gap-0 lg:flex-row flex-col-reverse justify-end'>
                                <div>
                                    <Button color='white' type='button' onClick={() => {
                                        setModal({ open: false })
                                    }}>
                                        Kembali
                                    </Button>
                                </div>

                                <div>
                                    <Button color='danger' className={'flex gap-2 px-2 items-center justify-center'}>
                                        <Trash2Icon className='w-4 h-4' />
                                        Hapus
                                    </Button>
                                </div>

                            </div>
                        </form>
                    </Modal>
                        : ""
                }
            </div>
        </PropertyTabs>
    )
}