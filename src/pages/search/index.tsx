import { useState } from 'react';
import { RenderUnits } from '../renderUnits';
import useStore from '../../context/useStore';
import { IUnits } from '../../interfaces/IUnits';
import Hour_icon from '../../assets/images/icon-hour.png'

export const Search = () => {

    const { data } = useStore();
    const [searchUnits, setSearchUnits] = useState('')
    const [isClose, setIsClose] = useState<boolean>(false)
    const [filterUnits, setFilterUnits] = useState<IUnits[]>([])

    const handleSearch = () => {
        const filterData = (data?.map((e) => {
            const schedules = e?.schedules
            const hasAfternoon = schedules?.some(schedule => {
                const hour = parseInt(schedule.hour.slice(0, 2), 10);
                return hour >= 12 && hour <= 18
            });
            const hasEvening = schedules?.some(schedule => {
                const hour = parseInt(schedule.hour.slice(0, 2), 10);
                return hour >= 17 && hour <= 21
            });
            const isMorning = schedules?.some(schedule => {
                const hour = parseInt(schedule.hour.slice(0, 2), 10);
                return hour < 12
            });
            if (isClose && e?.opened === false) { return null }
            if (searchUnits === 'manha' && isMorning) { return e }
            if (searchUnits === 'tarde' && hasAfternoon) { return e }
            if (searchUnits === 'noite' && hasEvening) { return e }
            return null;
        }) as IUnits[]).filter(Boolean);
        setFilterUnits(filterData);
    };
    const ClearForm = () => {
        setIsClose(false)
        setSearchUnits('')
    }
    return (
        <div className="flex flex-wrap gap-2 w-[60%] items-center justify-center">

            <div className="w-[80%] p-5 rounded-[8px] bg-[#fff] border-[5px] border-[#edededb7] shadow-lg ">
                <div className="mb-8">
                    <div className='text-[3.4rem] mb-[-20px] text-[#363636] font-bold'>REABERTURA</div>
                    <div className="text-[3.4rem] mt-[-22px] text-[#ffd446] font-bold">SMART FIT</div>
                    <div className="bg-[#4b4b4b] w-[170px] h-[10px]"></div>
                </div>

                <div className="flex gap-2 items-center text-[#c4c4c4] mb-7">
                    <img src={Hour_icon} className="w-[30px]" />
                    <p>Horário</p>
                </div>
                <h1 className="text-[1.8rem] text-[#c4c4c4] font-light">Qual período quer treinar?</h1>
                <div className="bg-neutral-200 w-[100%] h-[2px] mt-3 mb-3"></div>
                <div className="flex gap-2 items-center text-[#c4c4c4] w-[100%] justify-between">
                    <div className="text-[1.2rem] font-bold">
                        <input type="radio" className="mr-2" name="hour" onChange={() => setSearchUnits('manha')}
                            checked={searchUnits === 'manha'} />Manhã</div>
                    <div className="text-[1.2rem] font-bold">06:00 às 12:00</div>
                </div>
                <div className="bg-neutral-200 w-[100%] h-[2px] mt-3 mb-3"></div>
                <div className="flex gap-2 items-center text-[#c4c4c4] w-[100%] justify-between">
                    <div className="text-[1.2rem] font-bold">
                        <input type="radio" className="mr-2" name="hour" onChange={() => setSearchUnits('tarde')}
                            checked={searchUnits === 'tarde'} />Tarde</div>
                    <div className="text-[1.2rem] font-bold">12:01 às 18:00</div>
                </div>
                <div className="bg-neutral-200 w-[100%] h-[2px] mt-3 mb-3"></div>
                <div className="flex gap-2 items-center text-[#c4c4c4] w-[100%] justify-between">
                    <div className="text-[1.2rem] font-bold">
                        <input type="radio" className="mr-2" name="hour" onChange={() => setSearchUnits('noite')}
                            checked={searchUnits === 'noite'} />Noite</div>
                    <div className="text-[1.2rem] font-bold">18:01 às 23:00</div>
                </div>
                <div className="bg-neutral-200 w-[100%] h-[2px] mt-3 mb-3"></div>
                <div className="flex justify-between mt-5">
                    <div className="flex justify-between gap-2 text-[#3b3b3b] font-semibold">
                        <input type="checkbox" name="hour" checked={isClose} onChange={() => setIsClose(!isClose)} />Exibir unidades fechadas</div>
                    <div className="flex justify-between gap-2 text-[#c4c4c4]">Resultados encontrados:
                        <p className="text-[#353535] font-semibold">
                            {filterUnits.length > 0 ? filterUnits?.length : 0}
                        </p>
                    </div>
                </div>

                <div className="flex justify-center gap-2 text-[#c4c4c4] mt-5">
                    <div onClick={() => handleSearch()} className="text-[#252525] font-bold p-2 w-[40%] rounded-[5px] text-center bg-[#ffb610] border-[2px] border-[#edededb7] cursor-pointer">
                        ENCONTRAR UNIDADE
                    </div>
                    <div onClick={() => ClearForm()} className="text-[#252525] font-bold p-2 w-[40%] rounded-[5px] text-center bg-[#fff] border-[2px] border-[#9b9b9b96] cursor-pointer">
                        LIMPAR
                    </div>
                </div>
            </div>
            <RenderUnits data={data} filterData={filterUnits} />

        </div>
    )
}