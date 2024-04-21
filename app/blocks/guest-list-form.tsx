import { FormEvent, useState } from "react";
import { Button } from "~/atoms/ui/button";
import { Input } from "~/atoms/ui/input";
import { Label } from "~/atoms/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/atoms/ui/card";
import { addDoc, query, where, getDocs } from "firebase/firestore";
// import { db } from "~/db/firebase";
import { uniqueGuestCode } from "~/lib/generator";
import { guestIdRef, guestRef } from "~/db/guest-list-ref";

interface NewGuest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  exists: boolean
}

type FormErrorData<T> = Partial<Record<keyof T, string>>;

// const newGuestListData = collection(db, 'guestlist');

export const GuestListForm = () => {
  const [errors, setErrors] = useState<FormErrorData<NewGuest>>({});

  async function handleOnSubmit(e: FormEvent) {
    if (!(e.target instanceof HTMLFormElement)) {
      return;
    }
    e.preventDefault();
    const _formData = new FormData(e.target);
    console.log("_formData", _formData);

    const guestID = await uniqueGuestCode.next();
    _formData.append("guestID", String(guestID.value));

    const formData = Object.fromEntries(_formData.entries());
    console.log("submit", formData);

    const errors: FormErrorData<NewGuest> = {};

    if (!("firstName" in formData && typeof formData.firstName === "string" && formData.firstName.length >= 2)) {
      errors.firstName = 'First name is required, min 2 characters';
    }

    if (!("lastName" in formData && typeof formData.lastName === "string" && formData.lastName.length >= 2)) {
      errors.lastName = 'Last name is required, min 2 characters';
    }

    if (!("email" in formData && typeof formData.email === "string" && /^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/i.test(formData.email))) {
      errors.email = 'Email is required';
    }

    const q = query(guestRef,
      where('firstName', '==', formData.firstName),
      where('lastName', '==', formData.lastName),
      where('email', '==', formData.email)
    );

    const snapshot = await getDocs(q);

    if (snapshot.size > 0) {
      errors.exists = 'Guest already exists';
    }

    setErrors(errors);

    if (Object.keys(errors).length !== 0) {
      e.target.reset();
      return;
    } else {
      await addDoc(guestIdRef, { "ID": guestID.value });
      // addDoc(newGuestListData, formData);
      await addDoc(guestRef, formData);
      e.target.reset();
    }
  }

  return (
    <form onSubmit={handleOnSubmit} id="GuestListForm">
      <Card className="w-9/12 mt-5 mb-6 mx-auto">
        <CardHeader>
          <CardTitle className="text-base">Add your new guest</CardTitle>
        </CardHeader>
        <CardContent className=" grid grid-cols-3 gap-6 items-top">
          <div className="space-y-1">
            <Label htmlFor="firstName">First name</Label>
            <Input name="firstName" type="text" placeholder="First name" />
            {!!errors?.firstName && <em className="text-xs">{errors.firstName}</em>}
            {errors.exists && <em className="text-xs">{errors.exists}</em>}
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
        <CardFooter className='grid grid-cols-2 gap-4 '>
          <Button variant='outline' className='w-full' >Cancel</Button>
          <Button type='submit' form='GuestListForm' className='w-full' >Add your guest</Button>
        </CardFooter>
      </Card>
    </form>
  )
}