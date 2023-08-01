export const logInfo = (obj, info: string) => {
  console.log(
    info,
    JSON.stringify(
      {
        body: obj?.body?.junk,
        query: obj?.query?.junk,
        headers: obj?.headers?.junk,
      },
      undefined,
      2,
    ),
  );
};
