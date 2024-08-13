"use client"
import React, { useState, useTransition } from 'react';
import CarLoading from './carLoading/CarLoading';

type Props = React.ComponentProps<'button'> & {
  handleSubmit: () => Promise<void>,
  buttonText: string, 
};

const OnClickButton = ({ handleSubmit, buttonText, ...props }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await handleSubmit();
    });
  };

  return (
    <div>
      {isPending ? (<CarLoading />):(<button {...props} type='button' onClick={handleClick} disabled={isPending}>{buttonText}</button>)}
    </div>
  );
};

export default OnClickButton;
