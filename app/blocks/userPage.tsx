interface CodeManager {
    codes: number[];
    min: number;
    max: number;
}

function createCodeManager(min: number, max: number): CodeManager {
    return {
        codes: [],
        min,
        max,
    }
}

function getRandomCode(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUniqueCode(manager: CodeManager): number {
    let code: number;
    
    while(true) {
        code = getRandomCode(manager.min, manager.max);
        if(!manager.codes.includes(code)) {
            break;
        }
    }

    manager.codes.push(code);

    if(manager.codes.length === manager.max - manager.min + 1) {
        manager.codes = [];
    }

    console.log(manager.codes);

    return code;
}

const codeManager = createCodeManager(1000, 9000);
const eventCode = generateUniqueCode(codeManager);


export const UserPage = (): React.ReactElement => {
    return (
        <div>
            <p>{eventCode}</p>
            <p></p>
        </div>
    )
}