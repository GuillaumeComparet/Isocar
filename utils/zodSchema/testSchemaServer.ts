export default function testSchemaServer(schema: any, data: unknown) {
  try {
    if (Array.isArray(data)) {
      data.forEach(item => schema.parse(item));
    } else {
      schema.parse(data);
    }
    return true;
    // Si la validation réussit
  } catch (error) {
    throw error;
  }
}