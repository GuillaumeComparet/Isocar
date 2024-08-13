import React from 'react';
import { AppointmentShift } from "@prisma/client";

type Availability = {
    morning: number;
    afternoon: number;
    maxShift: number;
};

type Props = {
    availability: Availability;
    selectedShift: string | null;
    setSelectedShift: React.Dispatch<React.SetStateAction<AppointmentShift | null>>;
    worktime: number;
};

const ShiftSelector = ({ availability, selectedShift, setSelectedShift, worktime }: Props) => {
    const handleShiftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        if (checked) {
            setSelectedShift(name as AppointmentShift);
        } else {
            setSelectedShift(null);
        }
    };

    return (
        <>
            {worktime > 180 ? (
                <>
                    <p className='font-bol'>Au vu des prestations choisies, vous ne pouvez sélectionner qu'une journée complète</p>
                    <div>
                        <input
                            type="checkbox"
                            name="Fullday"
                            id='fullday'
                            checked={selectedShift === "Fullday"}
                            onChange={handleShiftChange}
                        />
                        <label className='pl-4' htmlFor="fullday">Sélectionner toute la journée</label>
                    </div>
                </>
            ) : (
                <>
                    {availability.morning < availability.maxShift ? (
                        <>
                            <h3 className='title mt-4'>Sélectionnez un créneau :</h3>
                            <p><span className='font-bold text-highlight'>Matin :</span> Disponible</p>
                            <div>
                                <input
                                    type="checkbox"
                                    name="Morning"
                                    id='morning'
                                    checked={selectedShift === "Morning"}
                                    onChange={handleShiftChange}
                                />
                                <label className='pl-4' htmlFor="morning">Sélectionner le matin</label>
                            </div>
                        </>
                    ) : (
                        <p><span className='font-bold text-highlight'>Matin :</span> Indisponible</p>
                    )}
                    {availability.afternoon < availability.maxShift ? (
                        <>
                            <p><span className='font-bold text-highlight'>Après-midi :</span> Disponible</p>
                            <div>
                                <input
                                    type="checkbox"
                                    name="Afternoon"
                                    id='afternoon'
                                    checked={selectedShift === "Afternoon"}
                                    onChange={handleShiftChange}
                                />
                                <label className='pl-4' htmlFor="afternoon">Sélectionner l'après-midi</label>
                            </div>
                        </>
                    ) : (
                        <p><span className='font-bold text-highlight'>Après-midi :</span> Indisponible</p>
                    )}
                </>
            )}
        </>
    );
};

export default ShiftSelector;
