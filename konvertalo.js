function arabToRoman(number) {
    let dec = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
    let rom = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD', 'D', 'CM', 'M'];
    let i = rom.length - 1;
    let roman = '';

    while (number > 0) {
        let x = Math.floor(number / dec[i]);
        number = number % dec[i];
        console.log(`Processing: ${number} / ${dec[i]} = ${x}`);
        while (x--) {
            roman = roman + rom[i];
        }
        i--;
    }

    return roman;
}
function romanToArab(roman) {
    let dec = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
    let rom = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD', 'D', 'CM', 'M'];
    let arabic = 0;
    let i = 0;

    while (i < roman.length) {
        let j = rom.indexOf(roman.substring(i, i + 2));
        if (j !== -1) {
            arabic += dec[j];
            i += 2;
        } else {
            j = rom.indexOf(roman[i]);
            arabic += dec[j];
            i++;
        }
    }

    return arabic;
}

console.log(arabToRoman(1987)); // "MCMLXXXVII"
console.log(arabToRoman(49));   // "XLIX"
console.log(arabToRoman(2024)); // "MMXXIV"
