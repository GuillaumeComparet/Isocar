import { z } from "zod";

const dateOrString = z.union([
  z.date(),
  z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date string",
  }).transform(val => new Date(val))
]);

export const CarSchema = z.object({
  id_car: z.number().int().nonnegative(""),
  plate: z.string().regex(/^(([0-9]{1,4}[A-Z]{1,3}[0-9]{2})|([A-Z]{2}-[0-9]{3}-[A-Z]{2}))$/, { message: "L'immatriculation n'est pas valide" }),
  brand: z.string().min(1, { message: "La marque est obligatoire" }).max(30, { message: "30 Caractères maximum" }),
  model: z.string().min(1, { message: "Le modèle est obligatoire" }).max(30, { message: "30 Caractères maximum" }),
  id_profile : z.string(),
  createdAt : z.date(),
  updatedAt: z.date().nullable(),
});

export const NewCarSchema = z.object({
  plate: z.string().regex(/^(([0-9]{1,4}[A-Z]{1,3}[0-9]{2})|([A-Z]{2}-[0-9]{3}-[A-Z]{2}))$/, { message: "L'immatriculation n'est pas valide" }),
  brand: z.string().min(1, { message: "La marque est obligatoire" }).max(30, { message: "30 Caractères maximum" }),
  model: z.string().min(1, { message: "Le modèle est obligatoire" }).max(30, { message: "30 Caractères maximum" })
});

export const ServiceSchema = z.object({
  id_service: z.number().int().nonnegative(""),
  name: z.string().min(1, { message: "La nom est obligatoire" }).max(50, { message: "50 Caractères maximum" }),
  worktime : z.number().int(),
  status: z.enum(["Enable", "Disable"]),
  id_category: z.number().int(),
  createdAt : dateOrString.nullable(),
  updatedAt: dateOrString.nullable(),
});


export const AddServiceSchema = z.object({
  name: z.string().min(1, { message: "La nom est obligatoire" }).max(50, { message: "50 Caractères maximum" }),
  worktime : z.number().int(),
  id_category: z.number().int(),
});

export const ServicesInAppointmentSchema = z.object({
  service: z.object({
    id_service: z.number().int().nonnegative(),
    name: z.string().min(1, { message: "Le nom est obligatoire" }).max(50, { message: "Maximum 50 caractères pour le nom" }),
    worktime: z.number().int(),
    id_category: z.number().int(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
  }),
});

export const CategorySchema = z.object({
  id_category: z.number().int().nonnegative(""),
  name: z.string().min(1, { message: "Le nom est obligatoire" }).max(50, { message: "50 Caractères maximum" }),
  createdAt : dateOrString.nullable(),
  updatedAt: dateOrString.nullable(),
});

export const AddCategorySchema = z.object({
  name: z.string().min(1, { message: "Le nom est obligatoire" }).max(50, { message: "50 Caractères maximum" }),
});

export const CategoryWithServicesSchema = z.object({
  id_category: z.number().int().nonnegative(""),
  name: z.string().min(1, { message: "Le nom est obligatoire" }).max(50, { message: "50 Caractères maximum" }),
  createdAt: dateOrString.nullable(),
  updatedAt: dateOrString.nullable(),
  services: z.array(ServiceSchema)
});

export const NewUserSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Adresse mail non valide" }),
  password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@!$%^&*()_+|~=`{}[\]:";'<>?,./])[A-Za-z\d@!$%^&*()_+|~=`{}[\]:";'<>?,./]{8,}$/, { message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffres et un caractère spécial" }),
  first_name: z.string().min(1, { message: "Votre prénom doit contenir au moins 1 caractère" }).max(30, { message: "Maximum 30 caractères pour le champ prénom" }),
  last_name: z.string().min(2, { message: "Votre nom doit contenir au moins 1 caractère" }).max(30, { message: "Maximum 30 caractères pour le champ nom" }),
  phone_number: z.string().regex(/^\d{10}$/, { message: "Numéro de téléphone non valide, ce dernier doit être composé de 10 chiffres" }),
});

export const UpdateUserSchema = z.object({
  first_name: z.string().min(1, { message: "Votre prénom doit contenir au moins 1 caractère" }).max(30, { message: "Maximum 30 caractères pour le champ prénom" }),
  last_name: z.string().min(2, { message: "Votre nom doit contenir au moins 1 caractère" }).max(30, { message: "Maximum 30 caractères pour le champ nom" }),
  phone_number: z.string().regex(/^\d{10}$/, { message: "Numéro de téléphone non valide, ce dernier doit être composé de 10 chiffres" })
});

export const ShiftSchema = z.enum(["Morning", "Afternoon", "Fullday"]);

export const PlanningDateSchema = z.object({
  daydate: z.date(),
  morning: z.number().int().nonnegative(),
  afternoon: z.number().int().nonnegative(),
  maxShift: z.number(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export const passwordSchema = z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@!$%^&*()_+|~=`{}[\]:";'<>?,./])[A-Za-z\d@!$%^&*()_+|~=`{}[\]:";'<>?,./]{8,}$/, { message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffres et un caractère spécial" });

export const commentSchema = z.string().max(1000, "Le commentaire ne doit pas dépasser 1000 caractères")

export const defaultSettingsSchema = z.object({
  id_defaultSettings: z.number().int().positive(),  
  limitShift: z.number().int().default(2),                     
  monday: z.string().nullable(),                    
  tuesday: z.string().nullable(),
  wednesday: z.string().nullable(),
  thursday: z.string().nullable(),
  friday: z.string().nullable(),
  saturday: z.string().nullable(),
  sunday: z.string().nullable(),
  garage_name: z.string().nullable(),               
  address: z.string().nullable(),                  
  zip_code: z.string().nullable(),                 
  city: z.string().nullable(),                      
  coordonate_x: z.string().nullable(),              
  coordonate_y: z.string().nullable(),              
  email: z.string().nullable(),             
  landline_phone: z.string().nullable(),            
  cell_phone: z.string().nullable(),               
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),                  
});