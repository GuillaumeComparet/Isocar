import React, { useState } from 'react';

interface ModelBrandFieldsProps {
  inputName: string;
  displayName: string;
  placeholder: string;
}

const ModelBrandFields: React.FC<ModelBrandFieldsProps> = ({ inputName, displayName, placeholder }) => {
  const [data, setData] = useState("");
  const [dataError, setDataError] = useState("");

  const validateBrand = (brand: string) => {
    const regex = /^[a-zA-Z0-9À-ÿ\s]{1,30}$/;
    return regex.test(brand);
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBrand = event.target.value;
    setData(newBrand);

    if (newBrand === "") {
        setDataError("");
    } else if (validateBrand(newBrand)) {
        setDataError("");
    } else {
        setDataError("La marque ne doit contenir que des lettres et des espaces");
    }
  };

  return (
    <div className='flex flex-col'>
      <label htmlFor={inputName}>{displayName}</label>
      <input
        className="text-background px-4 py-2 rounded-md border w-4/5 md:w-full"
        placeholder={placeholder}
        type="text"
        name={inputName}
        id={inputName}
        value={data}
        onChange={handleBrandChange}
      />
      {dataError && <p className="text-red-500">{dataError}</p>}
    </div>
  );
};

export default ModelBrandFields;
