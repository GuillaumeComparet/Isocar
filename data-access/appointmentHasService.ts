import prisma from "@/utils/prisma";

export async function createAppointments(appointments:any) {
return await prisma.appointmentHasService.createMany({
  data: appointments,
});
}
