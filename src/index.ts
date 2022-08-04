/**
 *
 * @param strings The literal strings given by a tagged template
 * @param values The values coming from the expressions used in the tagged template
 * @returns The final string
 */
export function typeSafeTemplateLiteral(
  strings: TemplateStringsArray,
  ...values: string[]
): string {
  return strings.reduce((finalString, currentString, currentIndex) => {
    return (
      finalString +
      currentString +
      (values[currentIndex] ? values[currentIndex] : "")
    );
  }, "");
}
