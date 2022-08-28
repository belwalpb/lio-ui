/**
 * This Function wil be used to Validation the Input Against the validation function provided.
 * @param value Current Input Value
 * @param validateFunction Validation Function, which will be called to validate the input value.
 * @returns If Error, an error message or an empty String in case of no error.
 */
export function getValidationError(
    value: any,
    validateFunction?: (value: any) => boolean | string,
): string {
    if (!validateFunction) {
        return '';
    }

    let validationResult = validateFunction(value);

    if (validationResult === true) {
        return '';
    } else if (validationResult === false) {
        return 'Invalid Input';
    } else {
        return validationResult;
    }
}
