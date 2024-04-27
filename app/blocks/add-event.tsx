import { Button } from "~/atoms/ui/button";
import { Link } from "@remix-run/react";

export function AddEvent() {
  return (
    <>
      <div className="container">
      {/* tu na sztywno obniżony dół mt-10, lewa strona Your wedding */}
        <div className="left-section section mt-10" > 
          <h2>Your Wedding<span className="ml-2" >&#9829;</span></h2>
          <Link to="new-event">
          <Button className="add-button shadow" variant="outline" style={{ fontSize: '1.1em'  }} >
              Add wedding event 
            </Button>
          </Link>
        </div>
              {/* tu na sztywno obniżony dół mt-10, lewa strona Related event */}
        <div className="right-section section mt-10 ">
          <h2>Related Event<span className="ml-2">&#9829;</span></h2>
          <Link to="new-related-event">
            <Button className="add-button shadow" variant="outline" style={{ fontSize: '1.1em' }}>
            Add related event
            </Button>
          </Link>
        </div>
      </div>
      {/* w style margin-top 200px na sztywno zeby karteczki wydarzen były pod menu */}
      <style>{`
        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 200px;
        }
          
          
        .section {
          flex: 1;
          text-align: center;
      
      
  
        }

        .add-button {
          display: block;
          width: auto;
          margin: 30px auto;
      
        }
      `}</style>
    </>
  );
}

