"use server"
import { UpdateUserSchema } from "@/utils/zodSchema/globals";
import testSchemaServer from "@/utils/zodSchema/testSchemaServer";
import { createClient } from "@/utils/supabase/server";

type updateUser = {
  first_name: string,
  last_name: string,
  phone_number: string
}
const supabase = createClient()

const updateUser = async (formData: updateUser) => {

    const validateData = testSchemaServer(UpdateUserSchema, formData)

    if(validateData){
      const { error } = await supabase.auth.updateUser({
        data: {
          last_name: formData.last_name,
          first_name: formData.first_name,
          phone_number: formData.phone_number
        }
      })
    
      if (error) {
        return { success: false, error: error.message }
      } else {
        return { success: true }
      }
    }
    
  }

export default updateUser