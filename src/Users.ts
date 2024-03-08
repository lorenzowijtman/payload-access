import { CollectionAfterOperationHook } from 'payload/dist/exports/types';

// Pass auth token to the user after creation by loggin in the user
export const UserTokenInCreateRes: CollectionAfterOperationHook = async ({
  args, // arguments passed into the operation
  operation, // name of the operation
  result, // the result of the operation, before modifications
}) => {
  if (operation === 'create') {
    const r = await args.req.payload.login({
      collection: 'users',
      data: {
        email: args.data.email as string,
        password: args.data.password as string,
      },
      req: args.req,
      depth: 2,
      locale: 'en',
      overrideAccess: false,
      showHiddenFields: true,
    });
    result['token'] = r.token;
  }
  return result;
};
