-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('Validated', 'Canceled', 'Refused', 'Waiting');

-- CreateEnum
CREATE TYPE "AppointmentShift" AS ENUM ('Morning', 'Afternoon', 'Fullday');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Enable', 'Disable');

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "status" "Status" NOT NULL DEFAULT 'Enable',
    "email_confirmed_at" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id_service" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "worktime" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Enable',
    "id_category" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id_service")
);

-- CreateTable
CREATE TABLE "Category" (
    "id_category" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Enable',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "Planning" (
    "id_planning" SERIAL NOT NULL,
    "daydate" TIMESTAMP(3) NOT NULL,
    "morning" INTEGER NOT NULL DEFAULT 0,
    "afternoon" INTEGER NOT NULL DEFAULT 0,
    "maxShift" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Planning_pkey" PRIMARY KEY ("id_planning")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id_appointment" SERIAL NOT NULL,
    "id_planning" INTEGER NOT NULL,
    "id_profile" UUID NOT NULL,
    "id_car" INTEGER NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'Waiting',
    "shift" "AppointmentShift" NOT NULL,
    "comment" VARCHAR(1000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id_appointment")
);

-- CreateTable
CREATE TABLE "Car" (
    "id_car" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "id_profile" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id_car")
);

-- CreateTable
CREATE TABLE "AppointmentHasService" (
    "id_appointment_has_service" SERIAL NOT NULL,
    "id_service" INTEGER NOT NULL,
    "id_appointment" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "AppointmentHasService_pkey" PRIMARY KEY ("id_appointment_has_service")
);

-- CreateTable
CREATE TABLE "DefaultSettings" (
    "id_defaultSettings" SERIAL NOT NULL,
    "limitShift" INTEGER NOT NULL DEFAULT 2,
    "monday" TEXT,
    "tuesday" TEXT,
    "wednesday" TEXT,
    "thursday" TEXT,
    "friday" TEXT,
    "saturday" TEXT,
    "sunday" TEXT,
    "garage_name" TEXT,
    "address" TEXT,
    "zip_code" TEXT,
    "city" TEXT,
    "coordonate_x" TEXT,
    "coordonate_y" TEXT,
    "email" TEXT,
    "landline_phone" TEXT,
    "cell_phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "DefaultSettings_pkey" PRIMARY KEY ("id_defaultSettings")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Planning_daydate_key" ON "Planning"("daydate");

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentHasService_id_service_id_appointment_key" ON "AppointmentHasService"("id_service", "id_appointment");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_id_planning_fkey" FOREIGN KEY ("id_planning") REFERENCES "Planning"("id_planning") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_id_profile_fkey" FOREIGN KEY ("id_profile") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_id_car_fkey" FOREIGN KEY ("id_car") REFERENCES "Car"("id_car") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_id_profile_fkey" FOREIGN KEY ("id_profile") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentHasService" ADD CONSTRAINT "AppointmentHasService_id_service_fkey" FOREIGN KEY ("id_service") REFERENCES "Service"("id_service") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentHasService" ADD CONSTRAINT "AppointmentHasService_id_appointment_fkey" FOREIGN KEY ("id_appointment") REFERENCES "Appointment"("id_appointment") ON DELETE CASCADE ON UPDATE CASCADE;
