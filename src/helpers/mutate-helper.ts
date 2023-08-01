export const mutateInfo = (obj, info: string) => {
  if (obj.body) obj.body.junk = obj?.body?.junk + ', ' + info;
  if (obj.query) obj.query.junk = obj?.query?.junk + ', ' + info;
  if (obj.headers) obj.headers.junk = obj?.headers?.junk + ', ' + info;
};
