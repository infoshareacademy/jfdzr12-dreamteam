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

  async function handleOnSubmit(e: FormEvent) {
    if (!(e.target instanceof HTMLFormElement)) {
      return;
    }
    e.preventDefault();
    const _formData = new FormData(e.target);
    console.log("_formData", _formData);
    const formData = Object.fromEntries(_formData.entries());
    console.log("submit", formData);
    const errors: FormErrorData<NewGuest> = {};

    if (!("firstName" in formData && typeof formData.firstName !== "string" || formData.firstName.length >= 2)) {
      errors.firstName = 'First name is required and must be at least 2 characters';
    }

    if (!("lastName" in formData && typeof formData.lastName !== "string" || formData.lastName.length >= 2)) {
      errors.lastName = 'Last name is required and must be at least 2 characters';
    }

    if (!("email" in formData && typeof formData.email !== "string" && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email))) {
      errors.email = 'Email is required';
    }

    if (Object.keys(errors).length !== 0) {
      e.target.reset();
      setErrors(errors);
      return;
    } else {
      addDoc(newGuestListData, formData);
      e.target.reset();
    }
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
            <Input name="firstName" type="text" placeholder="First name" />
            {!!errors?.firstName && <em className="text-xs">{errors.firstName}</em>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName">Last name</Label>
            <Input name="lastName" type="text" placeholder="Last name" />
            {!!errors?.lastName && <em className="text-xs">{errors.lastName}</em>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email address</Label>
            <Input name="email" type="text" placeholder="Email" />
            {!!errors?.email && <em className="text-xs">{errors.email}</em>}
          </div>
        </CardContent>
        <CardFooter className='grid grid-cols-2 gap-4'>
          <Button variant='outline' className='w-full' >Cancel</Button>
          <Button type='submit' form='GuestListForm' className='w-full' >Add your guest</Button>
        </CardFooter>
      </Card>
    </form>
  )
}