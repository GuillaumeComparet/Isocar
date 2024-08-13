import { toast } from "sonner";
import addAppointment from "./addAppointment";
import { AppointmentShift } from "@prisma/client";
import { Car, Service } from "@/utils/types/globals";
import testSchemaClient from "@/utils/zodSchema/testSchemaClient";
import { commentSchema } from "@/utils/zodSchema/globals";
import revalidateData from "./revalidateData";

const handleAddAppointment = async (
    formData: FormData,
    selectedCar: Car | null,
    services: Service[],
    selectedDate: Date,
    shift: AppointmentShift,
    setLoading: (loading: boolean) => void,
    router: any
): Promise<void> => {

    const comment = formData.get("comment") as string | null;

    function testComment(comment: string): boolean {
        return testSchemaClient(commentSchema, comment) || false;
    }

    if (!selectedDate) {
        toast.error('Veuillez choisir une date');
        return;
    }

    if (!shift) {
        toast.error('Veuillez choisir un créneau');
        return;
    }

    if (!selectedCar) {
        toast.error('Veuillez choisir une voiture');
        return;
    }

    // Test du commentaire s'il est fourni
    if (comment && !testComment(comment)) {
        toast.error("Le commentaire est invalide.");
        return;
    }

    setLoading(true);
    try {
        await addAppointment(
            selectedCar,
            services,
            selectedDate,
            shift,
            comment
        );
        const serviceList = services.map((service) => service.name).join(', ');

        localStorage.removeItem("services");
        await revalidateData();
        router.push(`/booking/appointments/validate?carbrand=${selectedCar.brand}&carmodel=${selectedCar.model}&carplate=${selectedCar.plate}&services=${serviceList}&date=${selectedDate}&shift=${shift}`);

    } catch (error) {
        toast.error("Une erreur est survenue lors de l'enregistrement du rendez-vous");
        localStorage.removeItem("services");
        setLoading(false);
    }
};

export default handleAddAppointment;
