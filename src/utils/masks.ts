const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

const cnpjMask = (value: string) => {
  if (!value) return '';

  return value
    .replace(/\D+/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

const masksMap = {
  cpf: cpfMask,
  cnpj: cnpjMask,
};

export type MaskType = keyof typeof masksMap;

const mask = (type: MaskType, value: string) => {
  const selectedMask = masksMap[type];
  return selectedMask(value);
};

export { mask };
