import { useState } from 'react';
import useStore from '../../context/useStore'
import { RenderUnits } from '../renderUnits';
import { IUnits } from '../../interfaces/IUnits';

export const Search = () => {

    const { data } = useStore();

    const [filterUnits, setFilterUnits] = useState<IUnits[]>([])
    const [searchUnits, setSearchUnits] = useState('')
    const [isClose, setIsClose] = useState<boolean>(false)

    const handleSearch = () => {

        const filterData = (data?.map((e) => {
            const schedules = e?.schedules

            const hasAfternoon = schedules?.some(schedule => {
                const hour = parseInt(schedule.hour.slice(0, 2), 10);
                return hour >= 12 && hour <= 18;
            });

            const hasEvening = schedules?.some(schedule => {
                const hour = parseInt(schedule.hour.slice(0, 2), 10);
                return hour > 18 && hour <= 21;
            });

            const isMorning = schedules?.some(schedule => {
                const hour = parseInt(schedule.hour.slice(0, 2), 10);
                return hour < 12;
            });

            if (searchUnits === 'manha' && isMorning) {
                return e;
            }

            if (searchUnits === 'tarde' && hasAfternoon) {
                return e;
            }

            if (searchUnits === 'noite' && hasEvening) {
                return e;
            }

            return null;
        }) as IUnits[]).filter(Boolean);

        setFilterUnits(filterData);
    };

    return (
        <div className="flex flex-wrap gap-2 w-[100%] items-center justify-center">
            
            <div className="w-[80%] bg-yellow-500">
                <button onClick={() => handleSearch()}>clicar</button>
                <p>Horário</p>
                <h1>Qual período quer treinar?</h1>

                <div>
                    <div>
                        <input type="radio" name="hour" id="" onChange={() => setSearchUnits('manha')} />
                        Manhã
                    </div>
                    <div>06:00 às 12:00</div>
                </div>
                <div>
                    <div>
                        <input type="radio" name="hour" id="" onChange={() => setSearchUnits('tarde')} />
                        Tarde
                    </div>
                    <div>12:01 às 18:00</div>
                </div>
                <div>
                    <div>
                        <input type="radio" name="hour" id="" onChange={() => setSearchUnits('noite')} />
                        Noite
                    </div>
                    <div>18:01 às 23:00</div>
                </div>
                <div>
                    <div>
                        <input type="checkbox" name="hour" id="" defaultChecked={isClose} onChange={() => setIsClose(!isClose)} />
                        Exibir unidades fechadas
                    </div>
                    <div>
                        Resultados encontrados: <p>{filterUnits.length > 0 ? filterUnits?.length : 0}</p>
                    </div>
                </div>
                <div>
                    <div>ENCONTRAR UNIDADE</div>
                    <div>LIMPAR</div>
                </div>
            </div>

            <RenderUnits data={data} filterData={filterUnits} />

        </div>
    )
}