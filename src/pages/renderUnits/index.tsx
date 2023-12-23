
import React, { useState } from 'react';
import requiredTowel from '../../assets/images/required-towel.png';
import recommendedTowel from '../../assets/images/recommended-towel.png';
import requiredMask from '../../assets/images/required-mask.png';
import recommendedMask from '../../assets/images/recommended-mask.png';
import requiredLockerroom from '../../assets/images/required-lockerroom.png';
import partialLockerroom from '../../assets/images/partial-lockerroom.png';
import forbiddenLockerroom from '../../assets/images/forbidden-lockerroom.png';
import forbiddenFountain from '../../assets/images/forbidden-fountain.png';
import partialFountain from '../../assets/images/partial-fountain.png';

export const RenderUnits = ({ data, filterData }: any) => {
    const itemsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);
    const filterUnite = filterData.length > 0 ? filterData : data;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUnits = filterUnite.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="flex justify-between flex-wrap gap-6 w-[80%]">
            {currentUnits?.map((data: any, index: number) => (
                <div key={index} className="w-[280px] rounded-[5px] p-2 bg-[#f5f5f5] border border-[#cacaca63] shadow-lg h-[400px]">
                    <div className="text-[14px] font-bold" style={{ color: data?.opened ? '#00d200' : 'red' }}>{data?.opened ? 'Aberto' : 'Fechado'}</div>
                    <div className="text-neutral-600 text-[24px] font-bold">{data?.title}</div>
                    <div dangerouslySetInnerHTML={{ __html: data?.content }} className="text-neutral-400 text-[13px] font-semibold" />
                    <div className="bg-neutral-200 w-[100%] h-[2px] mt-3 mb-3" />

                    <div className="flex flex-wrap justify-between gap-2 w-[100%] mb-5">
                        {data.mask === 'required' ?
                            <img src={requiredMask} className="w-[20%]" alt='Obrigatório' />
                            :
                            <img src={recommendedMask} className="w-[20%]" alt='Recomendado' />
                        }

                        {data.towel === 'required' ?
                            <img src={requiredTowel} className="w-[20%]" />
                            :
                            <img src={recommendedTowel} className="w-[20%]" alt='Recomendado' />
                        }

                        {data.fountain === 'partial' ?
                            <img src={partialFountain} className="w-[20%]" />
                            :
                            <img src={forbiddenFountain} className="w-[20%]" />
                        }

                        {data.locker_room === 'allowed' ?
                            <img src={requiredLockerroom} className="w-[20%]" />
                            :
                            data.locker_room === 'partial' ?
                                <img src={partialLockerroom} className="w-[20%]" />
                                :
                                data.locker_room === 'closed' ?
                                    <img src={forbiddenLockerroom} className="w-[20%]" />
                                    : null
                        }
                    </div>

                    <div className="flex flex-wrap justify-between  w-[100%] ">
                        {data?.schedules?.map((e: any, index: number) => (
                            <div key={index} className="w-[50%]">
                                <div className="text-neutral-600 text-[20px] font-bold">
                                    {e.weekdays}
                                </div>
                                <div className="text-neutral-600 w-[100%] text-[14px] font-medium">
                                    {e.hour}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            ))}

            <div className="w-[100%] flex flex-wrap gap-3">
                {Array.from({ length: Math.ceil(filterUnite.length / itemsPerPage) }, (_, index) => (
                    <div className={`${currentPage === index + 1 ? 'bg-[#d8d8d8]' : 'bg-[#f5f5f5]'} 
                    w-[40px] h-[40px]  cursor-pointer  rounded-sm flex justify-center items-center transition-all  border
                     border-[#cacaca63] shadow-lg h-[400px]`} key={index} onClick={() => paginate(index + 1)} >
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};
