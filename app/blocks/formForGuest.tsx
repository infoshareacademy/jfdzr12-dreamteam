import React, { useEffect, useState } from 'react';
import { Button } from "~/atoms/ui/button";
import { Label } from "~/atoms/ui/label";
import { SelectMenu } from './menuSelectComponent';
import { AlcoholCheckbox } from './alcoholCheckboxCompnent';

const textAnswerYes = "Tak";
const textAnswerNo = "Nie";
const textLabelPresence = "Potwierdzenie przybycia : ";
const textLabelPartner = "Obecność Osoby Towarzyszącej : ";
const textButtonSubmit = "Wyślij";
const textLabelChild = "Obecność dziecka";
const textLabelNumberOfChildren = "Podaj liczbę dzieci";
const initialNumberOfChildren = 1;
const textLabelMenuGuest = "Preferowany rodzaj menu dla Gościa:";
const textLabelMenuPartner = "Preferowany rodzaj menu dla Osoby Towarzyszącej:";
const textLabelMenuChild = "Preferowany rodzaj menu dla Dziecka/Dzieci:";
// const textLabelMenuChildren = "Preferowany rodzaj menu dla Dzieci:";
const textLabelAdditionalInfo = "Uczulenia/Dodatkowe informacje: "
const textLabelAlcoholGuest = "Preferowany alkohol dla Gościa: "; 
// const textLabelAlcoholPartner = "Preferowany alkohol dla Osoby Towarzyszącej: ";
const textLabelAccommodation = "Czy potrzebny nocleg: ";

const menuOptions = [
  // {value: "default", label: "Select an option"},
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
]

// interface reprezentujący obiekt przekazywany do onSubmit
interface FormValues {
  isPresenceChecked: string;
  isPartnerChecked?: string;
  isChildChecked?: string;
  numChildren?: number;
  selectedMenuGuest?: string;
  selectedMenuPartner?: string;
  selectedMenuChild?: string;
  // selectedMenuChildren?: string;
  additionalDietaryComment?: string;
  isAlcoholCheckedGuest?: string[];
  isAlcoholCheckedPartner?: string[];
  isAccommodationChecked?: string;
}

interface NameFormProps {
  onSubmit: (objectValues: FormValues) => void;
}

export const FormForGuest: React.FC<NameFormProps> = ({ onSubmit }) => {
  const [isPresenceChecked, setIsPresenceChecked] = useState<string>();
  const [showAdditionalQuestions, setShowAdditionalQuestions] = useState<boolean>(false);
  const [isPartnerChecked, setIsPartnerChecked] = useState<string>();
  const [isChildChecked, setIsChildChecked] = useState<string>();
  const [showQuestionAboutNumber, setShowQuestionAboutNumber] = useState<boolean>(false);
  const [numChildren, setNumChildren] = useState<number>(initialNumberOfChildren); 
  const [selectedMenuGuest, setSelectedMenuGuest] = useState<string | undefined>('standard');
  const [selectedMenuPartner, setSelectedMenuPartner] = useState<string | undefined>('standard');
  const [selectedMenuChild, setSelectedMenuChild] = useState<string | undefined>('standard');
  // const [selectedMenuChildren, setSelectedMenuChildren] = useState<string | undefined>('standard');
  const [showQuestionAboutMenuPartner, setShowQuestionAboutMenuPartner] = useState<boolean>(false);
  const [showQuestionAboutMenuChild, setShowQuestionAboutMenuChild] = useState<boolean>(false);
  // const [showQuestionAboutMenuChildren, setShowQuestionAboutMenuChildren] = useState<boolean>(false);
  const [additionalDietaryComment, setAdditionalDietaryComment] = useState<string>();
  const [isAlcoholCheckedGuest, setIsAlcoholCheckedGuest] = useState<string[] | undefined>([]);
  // const [isAlcoholCheckedPartner, setIsAlcoholCheckedPartner] = useState<string[] | undefined>([]);
  // const [showQuestionAboutAlcoholPartner, setShowQuestionAboutAlcoholPartner] = useState<boolean>(false);
  const [isAccommodationChecked, setIsAccommodationChecked] = useState<string>();

  const handleRadioPresenceChange = (value: string) => {
    setIsPresenceChecked(value);
    if (value === "true") {
      setShowAdditionalQuestions(true);
    } 
    else if (value === "false") {
      setShowAdditionalQuestions(false);
      // setIsPartnerChecked(null);
      // reset opcji (w przypadku zmany decyzji na odmowę obecności)
      setShowAdditionalQuestions(false);
      setIsPartnerChecked(undefined);
      setIsChildChecked(undefined);
      setNumChildren(initialNumberOfChildren);
      setSelectedMenuGuest(undefined);
      setSelectedMenuPartner(undefined);
      setSelectedMenuChild(undefined); 
      // setSelectedMenuChildren(undefined); 
      setShowQuestionAboutNumber(false); 
      setShowQuestionAboutMenuPartner(false); 
      setShowQuestionAboutMenuChild(false); 
      // setShowQuestionAboutMenuChildren(false); 
      setIsAlcoholCheckedGuest(undefined);
      // setIsAlcoholCheckedPartner(undefined);
      setIsAccommodationChecked(undefined);
    }
  };

  const handleRadioPartnerChange = (value: string) => {
    setIsPartnerChecked(value);
    if (value === "true") {
      setShowQuestionAboutMenuPartner(true);
      // setShowQuestionAboutAlcoholPartner(true);
    }
    else {
      setShowQuestionAboutMenuPartner(false);
      // setShowQuestionAboutAlcoholPartner(false);
    }
  };

  const handleRadioChildChange = (value: string) => {
    setIsChildChecked(value);
    if (value === "true") {
      setShowQuestionAboutNumber(true);
      setShowQuestionAboutMenuChild(true);
      }
    else {
      setShowQuestionAboutNumber(false);
      setShowQuestionAboutMenuChild(false);
    }
  };

  const handleMenuGuestChange = (value: string) => {
    setSelectedMenuGuest(value);
  };

  const handleMenuPartnerChange = (value: string) => {
    setSelectedMenuPartner(value);
  };

  const handleMenuChildChange = (value: string) => {
    setSelectedMenuChild(value);
  };

  // const handleMenuChildrenChange = (value: string) => {
  //   setSelectedMenuChildren(value);
  // };

  // useEffect(() => {
  //   if (isChildChecked === "true" && numChildren === 1){
  //     setShowQuestionAboutMenuChild(true);
  //     setShowQuestionAboutMenuChildren(false);
  //   } 
  //   else if (isChildChecked === "true" && numChildren > 1) {
  //     setShowQuestionAboutMenuChildren(true);
  //     setShowQuestionAboutMenuChild(false);
  //   } else {
  //     setShowQuestionAboutMenuChildren(false);
  //     setShowQuestionAboutMenuChild(false);
  //   }
  // }, [isChildChecked, numChildren]);

  const handleAdditionalDietaryComment = (value: string) => {
    setAdditionalDietaryComment(value);
  };

  const handleAlcoholCheckedGuest = (value: string[]) => {
    setIsAlcoholCheckedGuest(value);
  };

  // const handleAlcoholCheckedPartner = (value: string[]) => {
  //   setIsAlcoholCheckedPartner(value);
  // };

  const handleRadioAccommodationChange = (value: string) => {
    setIsAccommodationChecked(value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (isPresenceChecked === "false"){
    //   onSubmit({isPresenceChecked})
    // }
    // else if (isPresenceChecked !== undefined && (!showAdditionalQuestions || isPartnerChecked !== undefined || isChildChecked !== undefined)) {
    //   if (!showQuestionAboutNumber){
    //     onSubmit({isPresenceChecked, isPartnerChecked, isChildChecked, selectedMenuGuest})
    //   }
    //   else if (!showQuestionAboutNumber || numChildren !== undefined && (!showQuestionAboutMenuChild || numChildren === 1 || selectedMenuChild !== undefined)){
    //   onSubmit({isPresenceChecked, isPartnerChecked, isChildChecked, numChildren, selectedMenuGuest, selectedMenuChild});
    //   }
    // //........
    // }
  };

  return (
    <form onSubmit={handleSubmit} id="IdFormForGuest" method="post" action="/guest">
      <Label htmlFor="presence">{textLabelPresence}</Label>
      <div>
        <input 
          name="presence"
          type="radio" 
          id="presence-yes" 
          value={isPresenceChecked} 
          onChange={() => handleRadioPresenceChange("true")}
          required
        />
        <Label htmlFor="presence-yes">{textAnswerYes}</Label>
      </div>
      <div>
        <input
          name="presence" 
          type="radio" 
          id="presence-no" 
          value={isPresenceChecked} 
          onChange={() => handleRadioPresenceChange("false")} 
          required
        />
        <Label htmlFor="presence-no">{textAnswerNo}</Label>
      </div>

      <hr/>

      {showAdditionalQuestions && (
        <>
          <Label htmlFor="partner">{textLabelPartner}</Label>
          <div>
          <input 
              name="partner" 
              type="radio" 
              id="partner-yes" 
              value={isPartnerChecked} 
              onChange={() => handleRadioPartnerChange("true")} 
              required
            />
            <Label htmlFor="partner-yes">{textAnswerYes}</Label>
          </div>
          <div>
          <input 
              name="partner" 
              type="radio" 
              id="partner-no" 
              value={isPartnerChecked} 
              onChange={() => handleRadioPartnerChange("false")} 
              required
            />
            <Label htmlFor="partner-no">{textAnswerNo}</Label>
          </div>

          <hr/>

          <Label htmlFor="child">{textLabelChild}</Label>
          <div>
          <input 
              name="child" 
              type="radio" 
              id="child-yes" 
              value={isChildChecked} 
              onChange={() => handleRadioChildChange("true")} 
              required
            />
            <Label htmlFor="child-yes">{textAnswerYes}</Label>
          </div>
          <div>
          <input 
              name="child" 
              type="radio" 
              id="child-no" 
              value={isChildChecked} 
              onChange={() => handleRadioChildChange("false")} 
              required
            />
            <Label htmlFor="child-no">{textAnswerNo}</Label>
          </div>

          {showQuestionAboutNumber && (
            <>
            <Label htmlFor="numberOfChildren">{textLabelNumberOfChildren}</Label>
            <div>
            <input 
                name="numberOfChildren" 
                type="number" 
                id="numberOfChildren"
                min={initialNumberOfChildren} 
                value={numChildren} 
                onChange={(e) => {
                  const num = e.target.valueAsNumber
                  setNumChildren(num)
                }}
                required
              />
            </div>
            </>
          )}

          <hr/>

          <div>
              <Label>{textLabelMenuGuest}
              <div>
                  <SelectMenu 
                  options={menuOptions} 
                  name="selectedMenu" 
                  // value={selectedMenuGuest}
                  onChange={handleMenuGuestChange} />
              </div>
              </Label>
              {showQuestionAboutMenuPartner && (
                  <Label>{textLabelMenuPartner}
                  <div>
                      <SelectMenu 
                      options={menuOptions} 
                      name="selectedMenu" 
                      onChange={handleMenuPartnerChange} />
                  </div>
                  </Label>
              )}
              {showQuestionAboutMenuChild && (
                  <Label>{textLabelMenuChild}
                  <div>
                      <SelectMenu 
                      options={menuOptions} 
                      name="selectedMenu" 
                      onChange={handleMenuChildChange} />
                  </div>
                  </Label>
              )}
              {/* {showQuestionAboutMenuChildren && (
              <Label>{textLabelMenuChildren}
              <div>
                  <SelectMenu 
                  options={menuOptions} 
                  name="selectedMenu" 
                  onChange={handleMenuChildrenChange} />
              </div>
              </Label>
              )} */}
          </div>

          <div>
            <Label htmlFor="addInfo">{textLabelAdditionalInfo}</Label>
            <div>
              <textarea
              maxLength = {500}
              name="addInfo"
              id="addInfo"
              placeholder="Miejsce na komentarz..."
              value={additionalDietaryComment}
              onChange={(e) => handleAdditionalDietaryComment(e.target.value)}
              />
            </div>
          </div>
          
          <hr/>

          <div>
            <Label htmlFor="checkedAlcoholGuest">{textLabelAlcoholGuest}</Label>
            <div>
              <AlcoholCheckbox 
              options={alcoholOptions} 
              name="checkedAlcoholGuest" 
              checked={isAlcoholCheckedGuest}
              onChange={handleAlcoholCheckedGuest}
              />
            </div>
          </div>
          {/* {showQuestionAboutAlcoholPartner && (
          <div>
            <Label htmlFor="checkedAlcoholPartner">{textLabelAlcoholPartner}</Label>
            <div>
              <AlcoholCheckbox 
              options={alcoholOptions} 
              name="checkedAlcoholPartner" 
              checked={isAlcoholCheckedPartner}
              onChange={handleAlcoholCheckedPartner}
              />
            </div>
          </div>
         )} */}

        <hr/>

        <Label htmlFor="accommodation">{textLabelAccommodation}</Label>
          <div>
            <input 
              name="accommodation"
              type="radio" 
              id="accommodation-yes" 
              value={isAccommodationChecked} 
              onChange={() => handleRadioAccommodationChange("true")}
              required
            />
            <Label htmlFor="accommodation-yes">{textAnswerYes}</Label>
          </div>
          <div>
            <input
              name="accommodation" 
              type="radio" 
              id="accommodation-no" 
              value={isAccommodationChecked} 
              onChange={() => handleRadioAccommodationChange("false")} 
              required
            />
            <Label htmlFor="accommodation-no">{textAnswerNo}</Label>
         </div>

         <hr/>

          {/* <Label htmlFor="transport">{textLabelTransport}</Label>
            <div>
              <input 
                name="transport"
                type="radio" 
                id="transport-own" 
                value={isTransportChecked} 
                onChange={() => handleRadioTransportChange("true")}
                required
              />
              <Label htmlFor="accommodation-yes">{textAnswerYes}</Label>
            </div>
            <div>
              <input
                name="accommodation" 
                type="radio" 
                id="accommodation-no" 
                value={isAccommodationChecked} 
                onChange={() => handleRadioTransportChange("false")} 
                required
              />
              <Label htmlFor="accommodation-no">{textAnswerNo}</Label>
          </div> */}

        </>
      )}

      <Button type="submit">{textButtonSubmit}</Button>
    </form>
  );
}
