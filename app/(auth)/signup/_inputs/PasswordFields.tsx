"use client"
import { ChangeEvent, useState } from "react";
import GreenCircle from "@/components/formCircles/GreenCircle";
import RedCircle from "@/components/formCircles/RedCircle";
import PurpleCircle from "@/components/formCircles/PurpleCircle";

const PasswordFields = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@!$%^&*()_+|~=`{}[\]:";'<>?,./])[A-Za-z\d@!$%^&*()_+|~=`{}[\]:";'<>?,./]{8,}$/;

  // Test regex
  const validatePassword = (value: string) => {
    if (!value) {
      return "Ce champ est requis";
    }
    if (!passwordRegex.test(value)) {
      return "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial";
    }
    return "";
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const error = validatePassword(newPassword);
    setPasswordError(error);
    setPasswordIsValid(!error);
    if (confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (newConfirmPassword !== password) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas");
    } else {
      setConfirmPasswordError("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-md" htmlFor="password">
          Mot de passe
        </label>
        <div className="flex items-center mt-2">
          <input
            className="rounded-md px-4 py-2 bg-inherit border w-4/5"
            type="password"
            name="password"
            placeholder="Entrez un mot de passe"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordIsValid && (
            <span className="pl-4 w-1/5"><GreenCircle /></span>
          )}
        </div>
        {passwordError && <p className="text-purple-500 w-5/6 py-2 text-justify"><PurpleCircle/>{passwordError}</p>}
      </div>
      <div>
        <label className="text-md" htmlFor="confirmPassword">
          Confirmation de mot de passe
        </label>
        <div className="flex items-center mt-2">
          <input
            className="rounded-md px-4 py-2 bg-inherit border w-4/5"
            type="password"
            name="confirmPassword"
            placeholder="Confirmez le mot de passe"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {confirmPassword && !confirmPasswordError && password === confirmPassword && (
            <span className="pl-4 w-1/5"><GreenCircle /></span>
          )}
        </div>
        {confirmPasswordError && <p className="text-red-500 w-5/6 py-2"><RedCircle />{confirmPasswordError}</p>}
      </div>
    </div>
  );
};

export default PasswordFields;