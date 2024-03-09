import { Field } from 'payload/dist/exports/types';
import { PayloadRequest } from 'payload/dist/types';

/**
 * This function checks the access rights for a collection.
 *
 * @param {Object} params - The parameters for the function.
 * @param {PayloadRequest} params.req - The request object provided by Payload.
 * @param {string} [params.allowedRole] - The minimum role level that is allowed to access the collection.
 * @param {string} [params.collectionString] - The slug of the collection.
 * @param {boolean | Object | Function | undefined} [params.userAccess] - The user access rights. Can be a boolean, a GraphQL query (Object) or a function that returns a boolean / GraphQL query.
 * @param {boolean | Object | Function | undefined} [params.apiAccess] - The API access rights. Can be a boolean, a GraphQL query (Object) or a function that returns a boolean / GraphQL query.
 * @returns {Promise<any>} A promise that resolves with the access rights.
 */
export const collectionAccess: any = async ({
  req,
  allowedRole,
  collectionString,
  userAccess,
  apiAccess,
}: {
  req: PayloadRequest;
  allowedRole?: string;
  collectionString?: string;
  userAccess?: boolean | Function | Object | undefined;
  apiAccess?: boolean | Function | Object | undefined;
}): Promise<any> => {
  if (req != null) {
    const { user, collection } = req;
    // Login and personal profile requests should always be allowed in terms of access
    if (
      req.originalUrl == '/api/users/login' ||
      req.originalUrl == '/api/users/me'
    ) {
      return true;
    }

    // Only check organisational access if there are organisations in the config
    if (
      req.config.organisations?.length != null &&
      req.config.organisations?.length > 0
    ) {
      var hasCollectionAccess = false;
      if (user?.organisations?.length) {
        // Only accesible when opening a collection page
        const collectionName = collectionString || collection?.config?.slug;
        if (user.organisations.length) {
          const hasOrgAccess = user.organisations.findIndex((org: any) => {
            if (org.value) {
              if (typeof org.value == 'string') {
                // required for login
                return true;
              }

              const accessObj = org.value.access;
              if (accessObj.include.length) {
                if (accessObj.exclude.length) {
                  // Some collections should be excluded
                  return (
                    !accessObj.exclude.includes(collectionName) &&
                    (accessObj.include.includes('*') ||
                      accessObj.include.includes(collectionName))
                  );
                } else {
                  return (
                    accessObj.include.includes('*') ||
                    accessObj.include.includes(collectionName)
                  );
                }
              }
            }
            return false;
          });

          hasCollectionAccess = hasOrgAccess >= 0;
        }
      }

      if (!hasCollectionAccess && user != null) {
        return false;
      }
    }

    if (user == undefined) {
      if (apiAccess != undefined && req.method) {
        return apiAccess;
      }
    }

    if (user != null) {
      if (userAccess != undefined) {
        return userAccess;
      }

      const userRoleIndex = req.config.roles.findIndex(
        (role: string | undefined) => role == user.role
      );
      const allowedRoleIndex = req.config.roles.findIndex(
        (role: string | undefined) => role == allowedRole
      );

      return userRoleIndex >= 0 && userRoleIndex >= allowedRoleIndex;
    }
  }
};

export const accessOwnRecords = async ({
  req,
  fieldName,
}: {
  req: PayloadRequest;
  fieldName: string;
}) => {
  if (req.user) {
    // Go through collection fields to see if the userId field exists
    req.collection.config.fields.forEach((field: any) => {
      if (field.name == fieldName) {
        return {
          fieldName: {
            equals: req.user.id,
          },
        };
      }
    });

    return {
      id: {
        equals: req.user.id,
      },
    };
  }
  return false;
};
