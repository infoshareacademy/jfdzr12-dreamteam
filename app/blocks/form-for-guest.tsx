import React, { useEffect, useReducer, useState } from 'react';
import { Button } from "~/atoms/ui/button";
import { Label } from "~/atoms/ui/label";
import { Input } from '~/atoms/ui/input';
import { Checkbox } from '~/atoms/ui/checkbox';
import { Textarea } from '~/atoms/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/atoms/ui/select';
import { NewGuest, addGuest } from '~/db/guest';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/atoms/ui/card';
import { FieldPath, collection, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '~/db/firebase';
import { guestRef } from '~/db/guest-list-ref';
import { RadioGroup, RadioGroupItem } from '~/atoms/ui/radio-group';


const textLabelFirstName = "First name";
const textLabelSecondName ="Last name";
const textLabelPresence = "Do you confirm your arrival? ";
const textLabelPartner = "Will you be accompanied by a partner or another person? ";
const textLabelChild = "Will you be accompanied by a child? ";
const textLabelNumberOfChildren = "Specify the number of children accompanying you";
const textLabelMenuGuest = "Select your preferred menu option :";
const textLabelMenuPartner = "Select menu for your partner :";
const textLabelMenuChild = "Select menu for child :";
const textLabelAdditionalInfo = "Please feel free to provide any additional information regarding the menu (e.g., any food allergies or dietary restrictions)"
const textLabelAlcoholGuest = "Select your preferred alcohol(s)"; 
const textLabelAccommodation = "Will accommodation be needed? ";
const textLabelTransport = "Will you require transportation? ";
const textButtonSubmit = "Send";
const textButtonCancel = "Cancel";

const basicAnswer = [
  {value: 'yes', label: 'Yes'},
  {value: 'no', label: 'No'},
]

const menuOptions = [
  {value: 'standard', label: 'Standard'},
  {value: 'vegetarian', label: 'Vegetarian'},
  {value: 'vegan', label: 'Vegan'},
  {value: 'gluten-free', label: 'Gluten-free'},
];
const alcoholOptions = [
  {value: "vine", label: "Vine"},
  {value: "vodka", label: "Vodka"},
  {value: "homemade spirits", label: "Homemade spirits"},
  {value: "whiskey", label: "Whiskey"},
  {value: "beer", label: "Beer"},
  {value: "rum", label: "Rum"},
  {value: "gin", label: "Gin"}, 
] as const

type AlcoholKind = typeof alcoholOptions[number]['value']
type FormErrorData<T> = Partial<Record<keyof T, string>>;
interface Guest {
  id: string;
  guestID: string;
  firstName: string;
  lastName: string;
}

interface NameFormProps {
  onSubmit: (objectValues: NewGuest) => void;
}

export const FormForGuest: React.FC<NameFormProps> = ({ onSubmit }) => {
  const [showAdditionalQuestions, setShowAdditionalQuestions] = useState<boolean | null>(false);
  const [showQuestionAboutChild, setShowQuestionAboutChild] = useState<boolean | 'indeterminate'>(false);
  const [showQuestionAboutPartner, setShowQuestionAboutPartner] = useState<boolean | 'indeterminate'>(false);
  const [alcohols, toggleAlcohol] = useReducer((prev: Partial<Record<AlcoholKind, boolean>>, alcoholKind: AlcoholKind) => {
    return {
      ...prev,
      [alcoholKind]: !prev[alcoholKind]
    }
  }, {});
  const [errors, setErrors] = useState<FormErrorData<NewGuest>>({});
  const [guests, setGuests] = useState<Guest[]>([]);
  // const [isRadioActive, setIsRadioactive] = useState<undefined>();
  // const [cancelClicked, setCancelClicked] = useState(false);
// const [sendClicked, setSendClicked] = useState(false);
const [radioGroupKey, setRadioGroupKey] = useState('');

const handleReset = () => {
  setShowAdditionalQuestions(false); 
};

  const getGuestList = () => {
    const guestListCollection = collection(db, 'guestlist');
    onSnapshot(guestListCollection, res => {
      const guestList = res.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Guest));
      setGuests(guestList);
    });
  };
  
  useEffect(() => {
    getGuestList();
  }, []);

  useEffect(() => {
    setRadioGroupKey(''); // Inicjalizacja wartości klucza
  }, []);

  async function handleSubmit (e: React.FormEvent) {
    if (!(e.target instanceof HTMLFormElement)) {
      return;
    }
    e.preventDefault();
    const _formData = new FormData(e.target)
    const formData = Object.fromEntries(_formData.entries()) as unknown as NewGuest

    const alcoholKeys = alcoholOptions.map(opt => opt.value)
    const alcoholValues: string[] = []
    for (const key in formData) {
      if ((alcoholKeys as string[]).includes(key)) {
        alcoholValues.push(key)
        delete formData[key as keyof typeof formData]
      }
    }
    formData.alcohols = alcoholValues

    const errors: FormErrorData<NewGuest> = {};
    if (!("firstName" in formData && typeof formData.firstName === "string" && formData.firstName.length >= 2)) {
      errors.firstName = 'First name is required, min 2 characters';
    }

    if (!("lastName" in formData && typeof formData.lastName === "string" && formData.lastName.length >= 2)) {
      errors.lastName = 'Last name is required, min 2 characters';
    }

    if (!("guestUniqueId" in formData && typeof formData.guestUniqueId === "string" && formData.guestUniqueId.length === 4)) {
      errors.guestUniqueId = 'Your four-digit code is required ';
    }

    if (!("presence" in formData && typeof formData.guestUniqueId === "string")) {
      errors.presence = 'Please indicate your attendance status';
    }

    const guestId = query(guestRef,
      where('guestID', '==', formData.guestUniqueId)
    )

    const snapshot = await getDocs(guestId);

    if (snapshot.size === 0) {
      errors.exists = "Provided code doesn't exist in the database";
    } 

    if (snapshot.size === 1) {
      const docRef = snapshot.docs[0].ref;
      await updateDoc(docRef, {formData});
    }
    
    setErrors(errors);
    if (Object.keys(errors).length !== 0) {
      console.log('Names errors');
      return;
    } 

    console.log('handleSubmit', formData)
    addGuest(formData);
    e.target.reset();
    setRadioGroupKey(performance.now().toString()); // Ustawia nowy klucz po kliknięciu Send
  };

  const handleCancelClick = () => {
    setErrors({});
    setRadioGroupKey(performance.now().toString()); // Ustawia nowy klucz po kliknięciu Cancel
  };

  return (
    <Card className="w-full max-w-screen-lg mx-auto my-8">
      <CardHeader>
        <CardTitle className='text-center'>Guest Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} onReset={handleReset} id="GuestForm" method="post" action="/guest">
          <div className="grid w-full items-center gap-4">
            <div className="space-y-1.5">
              <p className="text-lg font-bold">Your presence</p>
              <div className='grid grid-cols-2 gap-4'>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstName">{textLabelFirstName}</Label>
                  <Input 
                  name="firstName"
                  />
                  {!!errors?.firstName && <em className="text-xs">{errors.firstName}</em>}
                  
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastName">{textLabelSecondName}</Label>
                  <Input 
                  name="lastName"
                  />
                  {!!errors?.lastName && <em className="text-xs">{errors.lastName}</em>}
                </div>
              </div>

              <div>
                <Label htmlFor="guestUniqueId">Your four-digit code</Label>
                  <Input
                  name="guestUniqueId"
                  // type="number"
                  // pattern="[0-9]{4}"
                  />
                  {!!errors?.exists && <em className="text-xs">{errors.exists}</em>}
                  {!!errors?.guestUniqueId && <em className="text-xs"><br/>{errors.guestUniqueId}</em>}
              </div>
              
              <div className="flex flex-col space-y-1.5">
              <RadioGroup key={radioGroupKey} name="presence" onValueChange={(value) => setShowAdditionalQuestions(value === 'yes')}>
                <div><Label>{textLabelPresence}</Label></div>
                
                <div className="flex items-center space-x-2">
                {basicAnswer.map((element)=>{
                          return <div key={element.value}>
                                  <RadioGroupItem value={element.value}/>
                                  <Label htmlFor={element.value}>{" " + element.label}</Label>
                                </div>
                        })}
                </div>
              </RadioGroup>
              {!!errors?.presence && <em className="text-xs">{errors.presence}</em>}
              </div>
              
              {/* <div>
                <Label htmlFor="presence">{textLabelPresence}</Label>
                <Checkbox 
                  name="presence"
                  checked={showAdditionalQuestions}
                  onCheckedChange={setShowAdditionalQuestions}
                  />

              </div> */}
            </div>

              {showAdditionalQuestions && (
              <>
                <div>
                  <p className="text-lg font-bold">Accompanying Guests</p>
                    <div>
                      <Label htmlFor="partner">{textLabelPartner}</Label>
                      <Checkbox
                          name="partner" 
                          checked={showQuestionAboutPartner /*=== basicAnswer[0].value*/}
                          onCheckedChange={setShowQuestionAboutPartner} 
                        />
                    </div>
                
                    <div>
                      <Label htmlFor="child">{textLabelChild}</Label>
                      <Checkbox 
                          name="child" 
                          checked={showQuestionAboutChild}
                          onCheckedChange={setShowQuestionAboutChild} 
                        />
                    </div>

                    {showQuestionAboutChild && (
                      <>
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <Label htmlFor="numberOfChildren">{textLabelNumberOfChildren}</Label>
                          <div>
                          <Input 
                              name="numberOfChildren" 
                              type="number" 
                              defaultValue={1}
                              min={1}
                            />
                          </div>
                        </div>
                      </div>
                      </>
                    )}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <p className="text-lg font-bold">Dinning and alcohol preferences</p>
                      <div className='grid grid-cols-4 gap-4'>
                        {/* <div className='grid-flow-row'> */}
                          <Label htmlFor="selectedMenuGuest">{textLabelMenuGuest}</Label>
                        {/* </div> */}
                          <div>
                          <Select name="selectedMenuGuest" defaultValue={menuOptions[0].value} /*value={selectMenuOptionGuest} onValueChange={setSelectMenuOptionGuest}*/ >
                            <SelectTrigger>
                              <SelectValue /*placeholder="Select your preferred menu option"*/ />
                            </SelectTrigger>
                              <SelectContent position="popper">
                                {menuOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                              </SelectContent>
                          </Select>
                          </div>
                      </div>

                      {showQuestionAboutPartner && (
                        <>
                          <div className='grid grid-cols-4 gap-4'>
                          {/* <div className='grid-flow-row'> */}
                            <Label htmlFor="selectedMenuPartner">{textLabelMenuPartner}</Label>
                          {/* </div> */}
                            <div>
                            <Select name="selectedMenuPartner" defaultValue={menuOptions[0].value} >
                              <SelectTrigger>
                                <SelectValue/>
                              </SelectTrigger>
                                <SelectContent position="popper">
                                  {menuOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                  ))}
                                </SelectContent>
                            </Select>
                            </div>
                          </div>
                        </>
                      )}

                      {showQuestionAboutChild && (
                        <>
                          <div className='grid grid-cols-4 gap-4'>
                          {/* <div className='grid-flow-row'> */}
                            <Label htmlFor="selectedMenuPartner">{textLabelMenuChild}</Label>
                          {/* </div> */}
                            <div>
                            <Select name="selectedMenuChild" defaultValue={menuOptions[0].value} >
                              <SelectTrigger>
                                <SelectValue/>
                              </SelectTrigger>
                                <SelectContent position="popper">
                                  {menuOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                  ))}
                                </SelectContent>
                            </Select>
                            </div>
                          </div>
                        </>
                      )}
                
                

                  <div>
                    <div>
                    <Label htmlFor="additionalInfo"></Label>
                    <div>
                      <Textarea
                      className="resize-none"
                      maxLength = {500}
                      name="additionalInfo"
                      placeholder={textLabelAdditionalInfo}
                      />
                      </div>
                    </div>
                  </div>
                  <div>
                      <Label htmlFor="alcohol">{textLabelAlcoholGuest}</Label>
                      <div className="flex flex-col space-y-1.5">
                        {alcoholOptions.map((element)=>{
                          return <div key={element.value}>
                                <Label>
                                  <Checkbox name={element.value} /> {element.label}
                                </Label>
                                </div>
                        })}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-lg font-bold">Logistical organization</p>
                  <div>
                  <Label htmlFor="accommodation">{textLabelAccommodation}</Label>
                    <Checkbox
                      name="accommodation"
                    />
                  </div>

                  <div>
                  <Label htmlFor="transport">{textLabelTransport}</Label>
                      <Checkbox
                        name="transport" 
                      />
                  </div>
                </div>  
                </>
              )}
          </div>
        </form>
        </CardContent>
        <CardFooter className='grid grid-cols-3 gap-4'>
          <Button form="GuestForm" variant='outline' type="reset" onClick={handleCancelClick} className='w-full'>{textButtonCancel}</Button>
          {/* <Button form="GuestForm">OK</Button> */}
          <Button type="submit" form="GuestForm" /*onClick={handleSendClick}*/>{textButtonSubmit}</Button>
        </CardFooter>
    </Card>
  );
}
