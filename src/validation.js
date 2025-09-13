const ROMAN_NUMERAL_REGEX = /^(?=[MDCLXVI])M*(C[MD]|D?C*)(X[CL]|L?X*)(I[XV]|V?I*)$/i;
// This regex is a common one for catching a wide range of emojis.
const EMOJI_REGEX = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;

export function validateInput(value) {
  const trimmedValue = value.trim();

  if (trimmedValue === '') {
    return 'Input is empty. Are you trying to calculate the sound of one hand clapping?';
  }

  if (EMOJI_REGEX.test(trimmedValue)) {
    return "Emojis? Cute, but this isn't a group chat. Stick to numbers.";
  }

  if (ROMAN_NUMERAL_REGEX.test(trimmedValue)) {
    return "Roman numerals? Why in the world would you try that, you dunce. We're in the 21st century. Use the Hindu numbers";
  }

  // Check for non-numeric characters, allowing for a single decimal point and a leading negative sign.
  if (!/^-?\d*\.?\d+$/.test(trimmedValue)) {
    return `"${trimmedValue}" is not a number. Did you fail kindergarten math?`;
  }
  
  const num = Number(trimmedValue);

  if (isNaN(num)) {
     return `"${trimmedValue}" is not a valid number. Your intelligence is questionable.`;
  }

  if (!isFinite(num)) {
    return "Infinity? Really? Then wouldn't it also be infinite light time? Think harder, genius.";
  }

  if (num < 0) {
    return "Ah yes, negative distance, the official unit of measuring your progress in life.";
  }

  return null; // No error
}
