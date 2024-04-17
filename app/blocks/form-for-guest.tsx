import React, { useReducer, useState } from 'react';
import { Button } from "~/atoms/ui/button";
import { Label } from "~/atoms/ui/label";
// import { MySelect } from '../atoms/ui/my-select';
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/atoms/ui/dropdown-menu"
 
type Checked = DropdownMenuCheckboxItemProps["checked"]
import { Input } from '~/atoms/ui/input';
import { Checkbox } from '~/atoms/ui/checkbox';
import { Textarea } from '~/atoms/ui/textarea';
import { Select } from '@radix-ui/react-select';
import { MySelect } from '~/atoms/ui/my-select';
import { NewGuest, addGuest } from '~/db/guest';


const textLabelFirstName = "Enter your name:";
const textLabelSecondName ="Enter your surname:";
const textLabelPresence = "Do you confirm your arrival? ";
const textLabelPartner = "Do you confirm the presence of accompanying person? ";
const textButtonSubmit = "Send";
const textLabelChild = "Will you be accompanied by a child?";
const textLabelNumberOfChildren = "Specify the number of children accompanying you";
const textLabelMenuGuest = "Select your preferred menu option:";
const textLabelMenuPartner = "Select the preferred menu option for the accompanying person:";
const textLabelMenuChild = "Select the preferred menu option for the child/children:";
const textLabelAdditionalInfo = "Optional: Please feel free to provide any additional information regarding the menu (e.g., any food allergies or dietary restrictions) "
const textLabelAlcoholGuest = "Select your preferred alcohol(s): "; 
const textLabelAccommodation = "Will accommodation be needed? ";
const textLabelTransport = "Please indicate your preferred mode of transportation: ";


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

// interface FormValues {
//   isAlcoholCheckedGuest?: string[];
//   alcohols?: string[];
// }

interface NameFormProps {
  onSubmit: (objectValues: NewGuest) => void;
}

export const FormForGuest: React.FC<NameFormProps> = ({ onSubmit }) => {
  const [showAdditionalQuestions, setShowAdditionalQuestions] = useState<boolean>(false);
  const [showQuestionAboutChild, setShowQuestionAboutChild] = useState<boolean>(false);

  const [showQuestionAboutPartner, setShowQuestionAboutPartner] = useState<boolean>(false);
  // const [isAlcoholCheckedGuest, setIsAlcoholCheckedGuest] = useState<string[] | undefined>([]);
  const [alcohols, toggleAlcohol] = useReducer((prev: Partial<Record<AlcoholKind, boolean>>, alcoholKind: AlcoholKind) => {
    return {
      ...prev,
      [alcoholKind]: !prev[alcoholKind]
    }
  }, {});

  const handleSubmit = (e: React.FormEvent) => {
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

    console.log('handleSubmit', formData)
    // addGuest(formData);
    
  };

  return (
    <form onSubmit={handleSubmit} id="IdFormForGuest" method="post" action="/guest">
      <div>
        <Label htmlFor="firstName">{textLabelFirstName}</Label>
        <Input 
        name="firstName"
        />
      </div>

      <div>
        <Label htmlFor="lastName">{textLabelSecondName}</Label>
        <Input 
        name="lastName"
        />
      </div>

      <div>
      <Label htmlFor="presence">{textLabelPresence}</Label>
        <input 
          name="presence"
          type="checkbox" 
          onChange={(e) => setShowAdditionalQuestions(e.target.checked)}
        />
      </div>

      <hr/>

      {showAdditionalQuestions && (
        <>
          <div>
          <Label htmlFor="partner">{textLabelPartner}</Label>
          <input 
              name="partner" 
              type="checkbox" 
              onChange={(e) => setShowQuestionAboutPartner(e.target.checked)} 
            />
          </div>
       

          <hr/>

          <div>
          <Label htmlFor="child">{textLabelChild}</Label>
          <input 
              name="child" 
              type="checkbox" 
              onChange={(e) => setShowQuestionAboutChild(e.target.checked)} 
            />
          </div>

          {showQuestionAboutChild && (
            <>
            <Label htmlFor="numberOfChildren">{textLabelNumberOfChildren}</Label>
            <div>
            <Input 
                name="numberOfChildren" 
                type="number" 
                min={1}
              />
            </div>
            </>
          )}

          <hr/>

          <div>
              <Label>{textLabelMenuGuest}
              <div>
                  <MySelect 
                  options={menuOptions} 
                  name="selectedMenuGuest" 
                   />
              </div>
              </Label>
              {showQuestionAboutPartner && (
                  <Label>{textLabelMenuPartner}
                  <div>
                      <MySelect 
                      options={menuOptions} 
                      name="selectedMenuPartner" 
                      />
                  </div>
                  </Label>
              )}
              {showQuestionAboutChild && (
                  <Label>{textLabelMenuChild}
                  <div>
                      <MySelect 
                      options={menuOptions} 
                      name="selectedMenuChild" 
                   />
                  </div>
                  </Label>
              )}
        
          </div>

          <div>
            <div>
            <Label htmlFor="additionalInfo">{textLabelAdditionalInfo}</Label>
              <Textarea
              maxLength = {500}
              name="additionalInfo"
              placeholder="Your additional comment..."
              />
            </div>
          </div>
          
          <hr/>
          <div>
            <Label htmlFor="alcohol">{textLabelAlcoholGuest}</Label>
            <div>
              {alcoholOptions.map((element)=>{
                return <Label key={element.value}>
                      <Checkbox name={element.value} /> {element.label}
                      </Label>
              })}
            </div>
          </div>
        <hr/>

          <div>
        <Label htmlFor="accommodation">{textLabelAccommodation}</Label>
            <input 
              name="accommodation"
              type="checkbox" 
            />
          </div>

         <hr/>

          <div>
          <Label htmlFor="transport">{textLabelTransport}</Label>
              <input
                name="transport" 
                type="checkbox" 

              />
          </div>
          
        </>
      )}

      <Button type="submit">{textButtonSubmit}</Button>
    </form>
  );
}
