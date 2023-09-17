//Function component
export default function MyFirstComponent() {
    return (
        < div className="custom-component" >First Component</div >
    );
}

export function MyThirdComponent() {
    return (
        < div className="custom-component" >Third Component</div >
    );
}

//one file can have only one default export
//to export non default components, use curly brackets (no error but will export default only)
//default brackets can be exported directly with name