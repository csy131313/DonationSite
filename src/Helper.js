//מחזיר את גובה התרומה תמיד בשקלים
export const calcDonationInSekels = (coin, cntD, dollarRate) => {
    if (coin == "dollar")
        return +cntD * +dollarRate;
    return +cntD;
}
// מציג את הסכום לפי מצב מטבע באתר
export const returnCntAcordingCoin = (coin, cntD, dollarRate) => {
    if (coin == "dollar")
        return Number((cntD / dollarRate).toFixed(1)).toLocaleString('en') + "$";
    return "₪" + Number(cntD.toFixed(1)).toLocaleString('en');
}
// calc the diff between a date to date now
export const calcDiffDate = (date) => {
    let timeNow = new Date();
    const differenceInMinutes = Math.floor((timeNow.getTime() - date.getTime()) / (1000 * 60));
    if (differenceInMinutes == 0)
        return "now"
    if (differenceInMinutes < 60)
        return differenceInMinutes + " minutes ago"
    differenceInMinutes *= 60;
    if (differenceInMinutes < 24)
        return differenceInMinutes + "hours ago";
    differenceInMinutes *= 24;
    if (differenceInMinutes < 7)
        return differenceInMinutes + "days ago";
    differenceInMinutes *= 7;
    if (differenceInMinutes < 52)
        return differenceInMinutes + "weeks ago"
    differenceInMinutes *= 52;
    return differenceInMinutes + "years ago"
}

export const validate = (newDonor, coin) => {
    let err = {};
    if (!newDonor.name)
        err.name = "name is reqire"
    if (!newDonor.cnt)
        err.cnt = "Amount is a required field";
    else if ((newDonor.cnt < 18 && coin == "shekel") || (newDonor.cnt < 6 && coin == "dollar"))
        err.cnt = "Minimum donation amount is 18 NIS or 6 dollars";
    // if (!newDonor.phone)
    //     err.phone = "It is recommended to enter a phone number"
    // else if (!(/^\d+$/.test(newDonor.phone)))
    //     err.phone = "phone must be onli digits"
    // else if (newDonor.phone.length != 10)
    //     err.phone = "You must enter 10 digits";
    // if (!newDonor.email)
    //     err.email = "It is recommended to enter a mail adress"
    // else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(newDonor.email))
    //     err.email = "Enter a valid email address"
    return err;
}
export function isValidDate(dateString) {
    // Get the current date
    const currentDate = new Date();

    // Extract the month and year from the input string
    const month = dateString.substr(0, 2);
    const year = dateString.substr(3, 2);

    // Create a new Date object with the extracted month and year
    const inputDate = new Date(`20${year}`, month - 1, 1);

    // Check if the input date is a valid date
    const isValid = inputDate.getMonth() == month - 1 && inputDate.getFullYear() == `20${year}`;

    // Check if the input date is greater than the current date
    const isFutureDate = inputDate > currentDate;

    return isValid && isFutureDate;
}

export const validateCreditCard = (newDonor) => {
    let err = {};
    if (!newDonor.numberCard)
        err.numberCard = "cerdit card is require"
    else {
        const formattedInput = newDonor.numberCard.replace(/\s/g, '').slice(0, 19);
        const digitCount = formattedInput.length;
        if (formattedInput == 0)
            err.numberCard = "cerdit card is require"
        else if (!(/^\d+$/.test(formattedInput)))
            err.numberCard = "credit card number must be onli digits"
        else if (digitCount != 16)
            err.numberCard = "credit card number must be 16 digits"
    }
    if (!newDonor.cvv)
        err.cvv = "cvv is require"
    else if (newDonor.cvv.length != 3)
        err.cvv = "cvv must be 3 digits"
    else if (!(/^\d+$/.test(newDonor.cvv)))
        err.cvv = "cvv must be onli digits"
    if (!newDonor.date)
        err.date = "date is require"
    else if (!isValidDate(newDonor.date))
        err.date = "the date is not validate"
    if (!newDonor.id)
        err.id = "id number is require"
    else if (newDonor.id.length != 9)
        err.id = "id number must be 9 digits"
    else if (!(/^\d+$/.test(newDonor.id)))
        err.id = "id number must be onli digits"
    return err;
}