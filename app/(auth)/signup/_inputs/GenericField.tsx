"use client"
import GreenCircle from "@/components/formCircles/GreenCircle";
import { useState } from "react";

type Props = {
  label: string;
  name: string;
  placeholder: string;
  regex: string;
}

const GenericField = ({ label, name, placeholder, regex }: Props) => {
  const [dataField, setDataField] = useState("");

  // Update data
  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = event.target.value;
    setDataField(newData);
  };

  const regexField = new RegExp(regex)

  return (
    <div>
      <label htmlFor={name}>
        {label}
      </label>
      <div className="flex items-center mt-2">
        <input
          className="rounded-md px-4 py-2 bg-inherit border w-4/5"
          type="text"
          name={name}
          placeholder={placeholder}
          required
          value={dataField}
          onChange={handleDataChange}
        />
        {regexField.test(dataField) && <span className="pl-4 w-1/5"><GreenCircle /></span>}
      </div>
    </div>
  );
}

export default GenericField;
