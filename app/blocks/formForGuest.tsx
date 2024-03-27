// import React, { useState } from 'react';
// import { Button } from "~/atoms/ui/button";
// import { Label } from "~/atoms/ui/label";

// interface NameFormProps {
//   onSubmit: (isPresenceChecked: string, isPartnerChecked: string | undefined) => void;
// }

// export const FormForGuest: React.FC<NameFormProps> = ({ onSubmit }) => {
//   const [isPresenceChecked, setIsPresenceChecked] = useState<string | undefined>();
//   const [showAdditionalQuestions, setShowAdditionalQuestions] = useState<boolean>(false);
//   const [isPartnerChecked, setIsPartnerChecked] = useState<string | undefined>();

//   const handleRadioPresenceChange = (value: string) => {
//     setIsPresenceChecked(value);
//     if (value === "Potwierdzam przybycie") {
//       setShowAdditionalQuestions(true);
//     } else {
//       setShowAdditionalQuestions(false);
//     }
//   };

//   const handleRadioPartnerChange = (value: string) => {
//     setIsPartnerChecked(value);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isPresenceChecked !== undefined && (!showAdditionalQuestions || isPartnerChecked !== undefined)) {
//       // console.log(isPresenceChecked, isPartnerChecked)
//       onSubmit(isPresenceChecked, isPartnerChecked);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} id="IdFormForGuest" method="post" action="/guest">
//       <Label htmlFor="presence">Potwierdzenie przybycia:</Label>
//       <div>
//         <input 
//           name="presence"
//           type="radio" 
//           id="presence-yes" 
//           value={isPresenceChecked} 
//           onChange={() => handleRadioPresenceChange("Potwierdzam przybycie")}
//           required
//         />
//         <Label htmlFor="presence-yes">Tak</Label>
//       </div>
//       <div>
//         <input
//           name="presence" 
//           type="radio" 
//           id="presence-no" 
//           value={isPresenceChecked} 
//           onChange={() => handleRadioPresenceChange("Odmawiam przybycia")} 
//           required
//         />
//         <Label htmlFor="presence-no">Nie</Label>
//       </div>
//       {/* {showAdditionalQuestions && (
//         <> */}
//           <Label htmlFor="partner">Obecność Osoby Towarzyszącej:</Label>
//           <div>
//           <input 
//               name="partner" 
//               type="radio" 
//               id="partner-yes" 
//               value={isPartnerChecked} 
//               onChange={() => handleRadioPartnerChange("z Osobą Towarzyszącą")} 
//               required
//             />
//             <Label htmlFor="partner-yes">Tak</Label>
//           </div>
//           <div>
//           <input 
//               name="partner" 
//               type="radio" 
//               id="partner-no" 
//               value={isPartnerChecked} 
//               onChange={() => handleRadioPartnerChange("bez Osoby Towarzyszącej")} 
//               required
//             />
//             <Label htmlFor="partner-no">Nie</Label>
//           </div>
//         {/* </>
//       )} */}

//       <Button type="submit">Wyślij</Button>
//     </form>
//   );
// }


import React, { useState } from 'react';
import { Button } from "~/atoms/ui/button";
import { Label } from "~/atoms/ui/label";

const textAnswerYes = "Tak";
const textAnswerNo = "Nie";
const textLabelPresence = "Potwierdzenie przybycia : ";
const textLabelPartner = "Obecność Osoby Towarzyszącej : ";
const textButtonSubmit = "Wyślij";

// Type reprezentujący obiekt przekazywany do onSubmit
type FormValues = {
  isPresenceChecked: string | undefined;
  isPartnerChecked: string | undefined;
}

type NameFormProps = {
  onSubmit: (objectValues: FormValues) => void;
}

export const FormForGuest: React.FC<NameFormProps> = ({ onSubmit }) => {
  const [isPresenceChecked, setIsPresenceChecked] = useState<string | undefined>();
  const [showAdditionalQuestions, setShowAdditionalQuestions] = useState<boolean>(false);
  const [isPartnerChecked, setIsPartnerChecked] = useState<string | undefined>();

  const handleRadioPresenceChange = (value: string) => {
    setIsPresenceChecked(value);
    if (value === "true") {
      setShowAdditionalQuestions(true);
    } else {
      setShowAdditionalQuestions(false);
    }
  };

  const handleRadioPartnerChange = (value: string) => {
    setIsPartnerChecked(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPresenceChecked !== undefined && (!showAdditionalQuestions || isPartnerChecked !== undefined)) {
      onSubmit({isPresenceChecked, isPartnerChecked});
    }
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
        </>
      )}

      <Button type="submit">{textButtonSubmit}</Button>
    </form>
  );
}
