function calculate() {

    // YOUR CODE GOES HERE
    //retrieve 2 user inputs num1 and num2
    // .value is to obtain what user inputted
    const number1 = Number(document.getElementById("number1").value)
    const number2 = Number(document.getElementById("number2").value)
    let result = 0
    for (number = number1; number <= number2; number++) {
        result += number;
    }

    document.getElementById("result").innerText = "The sum is: " + result;
    //calc the summation fo all integers between num1 and num2
    // .InnerText is to retrieve text within the para and change it to "The sum is: xxx" 
    //add more code so result can be displayed in the HTML page
}