import { FormEvent, useState } from "react";
import { Button } from "~/atoms/ui/button";
import { Input } from "~/atoms/ui/input";
import { Label } from "~/atoms/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/atoms/ui/card";
import { addDoc, collection } from "firebase/firestore";
import { db } from "~/db/firebase";

interface NewGuest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

type FormErrorData<T> = Partial<Record<keyof T, string>>;

const newGuestListData = collection(db, 'guestlist');

export const GuestListForm = () => {
  const [errors, setErrors] = useState<FormErrorData<NewGuest>>({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isFormInvalid = !firstName || !lastName || !email;

  async function handleOnSubmit(e: FormEvent) {
    if (!(e.target instanceof HTMLFormElement)) {
      return;
    }

    e.preventDefault();

    setSubmitting(true);

    const _formData = new FormData(e.target);

    const formData = Object.fromEntries(_formData.entries());

    const errors: FormErrorData<NewGuest> = {};

    const validate = () => {
      let hasErrors = false;

      if (!firstName) {
        errors.firstName = 'First name required';
        hasErrors = true;
      } else if (!("lastName" in formData && typeof formData.lastName === "string" && formData.lastName.length > 2)) {
        errors.lastName = "Full surname is required";
        hasErrors = true;
      }

      if (!lastName) {
        errors.lastName = 'Last name required';
        hasErrors = true;
      } else if (!("firstName" in formData && typeof formData.firstName === "string" && formData.firstName.length > 2)) {
        errors.firstName = "Full name is required";
        hasErrors = true;
      }

      if (!email) {
        errors.email = 'Email required';
        hasErrors = true;
      } else if (!("email" in formData && typeof formData.email === "string" && formData.email.includes("@"))) {
        errors.email = "Invalid email format";
        hasErrors = true;
      }

      setErrors(errors);
      return hasErrors;
    }

    if (submitting) {
      const hasErrors = validate();
      if (hasErrors) {
        return;
      }
    }

    addDoc(newGuestListData, formData);

    setFirstName('');
    setLastName('');
    setEmail('');
    setErrors({});
  }

  const resetValues = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleOnSubmit} id="GuestListForm">
      <Card className="w-fit">
        <CardHeader>
          <CardTitle className="text-base">Add your new guest</CardTitle>
        </CardHeader>
        <CardContent className=" grid grid-cols-3 gap-6 items-top">
          <div className="space-y-1">
            <Label htmlFor="firstName">First name</Label>
            <Input name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
            {submitting && !!errors?.firstName && <em className="text-xs">{errors.firstName}</em>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName">Last name</Label>
            <Input name="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
            {submitting && !!errors?.lastName && <em className="text-xs">{errors.lastName}</em>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email address</Label>
            <Input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            {submitting && !!errors?.email && <em className="text-xs">{errors.email}</em>}
          </div>
        </CardContent>
        <CardFooter className='grid grid-cols-2 gap-4'>
          <Button variant='outline' className='w-full' onClick={resetValues}>Cancel</Button>
          <Button type='submit' form='GuestListForm' className='w-full' disabled={isFormInvalid}>Add your guest</Button>
        </CardFooter>
      </Card>
    </form>
  )
}