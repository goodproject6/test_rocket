"use client"
import React, { useEffect } from 'react'
import BlockDetails from '../../../components/BlockManagement/blockDetails';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { Block } from '../../../redux/search/interface';
import { getBlockMangement } from '../../../redux/search/features';


const BlockManagement = () => {


    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(getBlockMangement())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    const { blockManagement, isGettingBlockManagement } =
        useAppSelector((state) => state.search);


    return (


        <section className='px-4 md:px-6 xl:px-10 py-10 space-y-10'>
            <div className="mt-5">
                {isGettingBlockManagement ? <div className="flex items-center justify-center h-80 p-4">
                        <div className="space-y-3">
                            <div className="text-center">
                                <p className="text-center text-gray-400 text-sm">Fetching blocks...</p>
                            </div>
                        </div>
                    </div> : (
                    blockManagement.length >= 1 ? <ul>
                        {blockManagement.map((block: Block, i: number) => (
                            <BlockDetails
                                key={i}
                                block={block}

                            />
                        ))}
                    </ul> : <div className="flex items-center justify-center h-80 p-4">
                        <div className="space-y-3">
                            <div className="text-center">
                                <p className="text-center text-gray-400 text-sm">No blocks</p>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </section>
    )
}

export default BlockManagement;
