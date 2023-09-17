const employee = {
    name: "Mahavir Ojha",
    empId: 6350,
    stream: "Java",
    position: "Senior Engineer",
    location: "Bangalore",
    skills: ["Java", "Spring Boot", "SQL", "HTML", "CSS", "JavaScript", "React", "JUnit"],
    address: {
        line1: "2/XN, Road No. 20",
        line2: "Sidhgora",
        city: "Jamshedpur",
        state: "Jharkhand",
        pincode: 831009
    },
    printProfile: () => {
        console.log(employee);
    }
};

export default function ExploringJavascript() {
    return (
        <>
            <div>{employee.name} ({employee.empId})</div>
            <div>{employee.skills[0]}</div>
            <div>{employee.address.line1}</div>
            <div>{employee.printProfile()}</div>
        </>
    );
}