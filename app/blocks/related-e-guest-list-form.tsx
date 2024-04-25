import { FormEvent, useEffect, useState } from "react";
import { Button } from "~/atoms/ui/button";
import { Input } from "~/atoms/ui/input";
import { Label } from "~/atoms/ui/label";
import {
  Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "~/atoms/ui/sheet"
import { addDoc, query, where, getDocs } from "firebase/firestore";
import { uniqueGuestCode } from "~/lib/generator";
import { relatedEventGuestIdRef, relatedEventGuestRef } from "~/db/related-e-guest-list-ref";
import { useCurrentUser } from "~/db/auth";
import { getUserUID } from "~/db/get-user-uid";
import { RelatedEventNewGuest } from "~/lib/new-guest";
import { useParams } from "@remix-run/react";

type FormErrorData<T> = Partial<Record<keyof T, string>>;

export const RelatedEventGuestListForm = () => {
  const { eventID } = useParams()

  const [errors, setErrors] = useState<FormErrorData<RelatedEventNewGuest>>({});
  const [userUID, setUserUID] = useState<string | null>();

  const user = useCurrentUser();

  useEffect(() => {
    if (user.status === 'authenticated') {
      getUserUID()
        .then(res => setUserUID(res))
    } else {
      setUserUID(null)
    }
  }, [user.status])

  async function handleOnSubmit(e: FormEvent) {
    if (!(e.target instanceof HTMLFormElement)) {
      return;
    }
    e.preventDefault();
    const _formData = new FormData(e.target);
    console.log("_formData", _formData);

    if (eventID) {
      _formData.append('eventID', eventID)
    }

    if (userUID) {
      _formData.append('userUID', userUID)
    }

    const guestID = uniqueGuestCode.next();
    _formData.append("guestID", String(guestID.value));

    const currentDate = new Date();
    const addTimes = currentDate.getTime();
    _formData.append("timestamp", addTimes.toString());

    const formData = Object.fromEntries(_formData.entries());
    console.log("submit", formData);

    const errors: FormErrorData<RelatedEventNewGuest> = {};

    if (!("firstName" in formData && typeof formData.firstName === "string" && formData.firstName.length >= 2)) {
      errors.firstName = 'First name is required, min 2 characters';
    }

    if (!("lastName" in formData && typeof formData.lastName === "string" && formData.lastName.length >= 2)) {
      errors.lastName = 'Last name is required, min 2 characters';
    }

    if (!("email" in formData && typeof formData.email === "string" && /^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/i.test(formData.email))) {
      errors.email = 'Email is required';
    }

    const existingGuest = query(relatedEventGuestRef,
      where('firstName', '==', formData.firstName),
      where('lastName', '==', formData.lastName),
      where('email', '==', formData.email),
      where('eventID', '==', eventID)
    );

    const snapshot = await getDocs(existingGuest);

    if (snapshot.size > 0) {
      errors.exists = 'Guest already exists';
    }

    setErrors(errors);

    if (Object.keys(errors).length !== 0) {
      return;
    } else {
      addDoc(relatedEventGuestIdRef, { "ID": guestID.value });
      addDoc(relatedEventGuestRef, formData);
      e.target.reset();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, } = e.target;
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  }

  function clearErrors() {
    setErrors({});
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button >Add new guest</Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>New guest</SheetTitle>
          <SheetDescription>
            Fill in the details of the person you want to invite to your event.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleOnSubmit} id="RelatedEventGuestListForm" className="grid gap-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="firstName">First name</Label>
            <Input name="firstName" type="text" placeholder="First name" onChange={handleChange} />
            {!!errors?.firstName && <em className="text-base text-rose-700">{errors.firstName}</em>}
            {errors.exists && <em className="text-base text-rose-700">{errors.exists}</em>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName">Last name</Label>
            <Input name="lastName" type="text" placeholder="Last name" onChange={handleChange} />
            {!!errors?.lastName && <em className="text-base text-rose-700">{errors.lastName}</em>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email address</Label>
            <Input name="email" type="text" placeholder="Email" onChange={handleChange} />
            {!!errors?.email && <em className="text-base text-rose-700">{errors.email}</em>}
          </div>
        </form>
        <SheetFooter className="grid gap-4 py-4 grid-cols-2">
          <SheetClose>
            <Button type='reset' variant='secondary' className="w-full" onClick={clearErrors}>Cancel</Button>
          </SheetClose>
          <Button type='submit' form='RelatedEventGuestListForm' >Add your guest</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}