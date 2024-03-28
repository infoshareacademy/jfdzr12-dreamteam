import React, { useState } from 'react';
import { Button } from "~/atoms/ui/button";
import { Label } from "~/atoms/ui/label";

const textAnswerYes = "Tak";
const textAnswerNo = "Nie";
const textLabelPresence = "Potwierdzenie przybycia : ";
const textLabelPartner = "Obecność Osoby Towarzyszącej : ";
const textButtonSubmit = "Wyślij";
const textLabelChild = "Obecność dziecka";
const textLabelNumberOfChildren = "Podaj liczbę dzieci";
const initialNumber = 1;

// interface reprezentujący obiekt przekazywany do onSubmit
interface FormValues {
  isPresenceChecked: string;
  isPartnerChecked?: string;
  isChildChecked?: string;
  numChildren?: number;
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
  const [numChildren, setNumChildren] = useState<number>(initialNumber); 

  const handleRadioPresenceChange = (value: string) => {
    setIsPresenceChecked(value);
    if (value === "true") {
      setShowAdditionalQuestions(true);
    } else {
      setShowAdditionalQuestions(false);
      // setIsPartnerChecked(null);
    }
  };

  const handleRadioPartnerChange = (value: string) => {
    setIsPartnerChecked(value);
  };

  const handleRadioChildChange = (value: string) => {
    setIsChildChecked(value);
    if (value === "true") {
      setShowQuestionAboutNumber(true);
    } else {
      setShowQuestionAboutNumber(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPresenceChecked === "false"){
      onSubmit({isPresenceChecked})
    }
    else if (isPresenceChecked !== undefined && (!showAdditionalQuestions || isPartnerChecked !== undefined || isChildChecked !== undefined)) {
      if (!showQuestionAboutNumber){
        onSubmit({isPresenceChecked, isPartnerChecked, isChildChecked})
      }
      else if (!showQuestionAboutNumber || numChildren !== undefined){
      onSubmit({isPresenceChecked, isPartnerChecked, isChildChecked, numChildren});
       
    }}
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
                min="1" 
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
        </>
      )}

      <Button type="submit">{textButtonSubmit}</Button>
    </form>
  );
}
