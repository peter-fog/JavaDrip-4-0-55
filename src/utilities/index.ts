export const getImageUrl = (image?: string | Types.CloudinaryImage) => {
  //TODO: this is for commercetools, because we have enhancer. Think how to avoid this
  const imageUrl = typeof image === 'string' ? image : image?.[0]?.url || image?.[0]?.src;

  if (!imageUrl || imageUrl === 'unresolved') return '';

  if (imageUrl.startsWith('//')) return imageUrl.replace('//', 'https://');

  return imageUrl;
};

export const camelize = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
    .replace(/\s+/g, '');
};

export const fromCamelCaseText = (text?: string) => {
  const result = text?.replace(/([A-Z])/g, ' $1') || '';
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const formatProjectMapLink = (projectMapLink?: Types.ProjectMapLink) => {
  if (!projectMapLink) return projectMapLink;
  const { dynamicInputValues = {}, path } = projectMapLink || {};
  return Object.keys(dynamicInputValues || {}).reduce(
    (acc, key) => acc.replace(`:${key}`, dynamicInputValues[key]),
    path
  );
};
