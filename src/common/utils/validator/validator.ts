export const required = (value: string): string | undefined => {
  if (value) {
    return undefined;
  }
  return "Required";
};

export const maxLengthCreator = (maxLength: number) => (values: string) => {
  if (values && values.length > maxLength) {
    return `Max length ${maxLength}`;
  }
  return undefined;
};
export const minLengthCreator = () => (values: string) => {
  if (values && values.trim().length < 1) {
    return `Write symbols`;
  }
  return undefined;
};
