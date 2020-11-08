export const required = text => value => (!value ? text : undefined);

export const isEmail = (value) => {
  if (!value) {
    return undefined;
  }
  const result = String(value).match('[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$');
  return !result ? 'Неверный формат поля «Email»' : undefined;
};
