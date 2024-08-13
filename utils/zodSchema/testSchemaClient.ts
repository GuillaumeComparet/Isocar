import { toast } from "sonner";
import { z } from "zod";

export default function testSchemaClient(schema: any, data: unknown){
    try {
        // Validation avec Zod
        schema.parse(data);
        // Si la validation réussit
        return true
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Affichage des erreurs de validation
          error.errors.forEach(err => toast.error(err.message));
          return false
        }
      }
}
