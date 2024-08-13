import React, { useState } from 'react';


const PlateField = () => {
  const [plate, setPlate] = useState("");
  const [plateError, setPlateError] = useState("");

  const validatePlate = (plate: string) => {
    const regex = /^(([0-9]{1,4}[A-Z]{1,3}[0-9]{2})|([A-Z]{2}-[0-9]{3}-[A-Z]{2}))$/;
    return regex.test(plate);
  };

  const handlePlateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPlate = event.target.value.toLocaleUpperCase();
    setPlate(newPlate);

    if (newPlate === "") {
      setPlateError("");
    } else if (validatePlate(newPlate)) {
      setPlateError(""); 
    } else {
      setPlateError("Format d'immatriculation incorrect");
    }
  };

  return (
    <div>
      <label htmlFor="plate">Immatriculation</label>
      <input
        className="text-background px-4 py-2 rounded-md border w-4/5 md:w-full"
        placeholder="AA-000-AA"
        type="text"
        name="plate"
        id="plate"
        value={plate}
        onChange={handlePlateChange}
      />
      {plateError && <p className="text-red-500">{plateError}</p>}
    </div>
  );
};

export default PlateField;