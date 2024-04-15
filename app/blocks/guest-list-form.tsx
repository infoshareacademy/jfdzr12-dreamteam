import { FormEvent, useState } from "react";
import { Button } from "~/atoms/ui/button";
import { Input } from "~/atoms/ui/input";
import { Label } from "~/atoms/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/atoms/ui/card";
import { addDoc, collection } from "firebase/firestore";
import { db } from "~/db/firebase";

interface NewGuest {
  firstname: string;
  lastname: string;
  email: string;
}

type FormErrorData<T> = Partial<Record<keyof T, string>>;

const newGuestListData = collection(db, 'guest-list');

export const GuestListForm = () => {
  const [error, setError] = useState<FormErrorData<NewGuest>>({});

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    if (!(e.target instanceof HTMLFormElement)) {
      return;
    }
    e.preventDefault();
    const _formData = new FormData(e.target);
    console.log("_formData", _formData);

    const formData = Object.fromEntries(new FormData(e.target));
    console.log("formData", formData, e);

    const errors: FormErrorData<NewGuest> = {};

    if (!("firstname" in formData && typeof formData.firstname === "string" && formData.firstname.length > 2)) {
      errors.firstname = "Full first name is required";
    }
    if (!("lastname" in formData && typeof formData.lastname === "string" && formData.lastname.length > 2)) {
      errors.lastname = "Full last name is required";
    }
    if (!("email" in formData && typeof formData.email === "string" && formData.email.includes("@"))) {
      errors.email = "Email address must contain \"@\"";
    }

    setError(errors);
    addDoc(newGuestListData, formData);
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <Card className="w-fit">

        <CardHeader>
          <CardTitle className="text-base">Add your new guest</CardTitle>
        </CardHeader>

        <CardContent className=" grid grid-cols-3 gap-6 items-top">
          <div className="space-y-1">
            <Label htmlFor="firstname">First name</Label>
            <Input name="firstname" type="text" placeholder="First name" />
            {!!error?.firstname && <em className="text-xs">{error.firstname}</em>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="lastname">Last name</Label>
            <Input name="lastname" type="text" placeholder="Last name" />
            {!!error?.lastname && <em className="text-xs">{error.lastname}</em>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email address</Label>
            <Input name="email" type="email" placeholder="Email" />
            {!!error?.email && <em className="text-xs">{error.email}</em>}
          </div>

        </CardContent>
        <CardFooter className="grid">
          <Button type='submit' className="justify-self-end">Add your guest</Button>
        </CardFooter>

      </Card>
    </form>
  )
}