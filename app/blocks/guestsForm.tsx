import React, { useState } from 'react';
import {Button} from "~/atoms/ui/button"
import { Input } from '~/atoms/ui/input';
import { Label } from '~/atoms/ui/label';

interface NameFormProps {
  onSubmit: (firstName: string, lastName: string) => void;
}

export const GuestsForm: React.FC<NameFormProps> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(firstName, lastName);

    console.log(firstName);
    console.log(lastName);

    setFirstName('');
    setLastName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label>
        Imię:
        <Input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Label>
      <br /><br />
      <Label>
        Nazwisko:
        <Input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Label>
      <br /><br />
      <Button variant={"ghost"} type="submit">Wyślij</Button>
    </form>
  );
};

