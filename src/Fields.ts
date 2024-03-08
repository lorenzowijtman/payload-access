import { roles } from './Vars';
import { config } from './config';

/*
Add this field to the user collection to allow the user to be assigned a organisation for access operations
*/
export const OrganisationField = ({ hasMany }: { hasMany?: boolean }) => ({
  name: 'organisations',
  type: 'relationship',
  relationTo: ['organisations'],
  hasMany: hasMany ?? false,
});

/*
Add this field to the user collection to allow the user to be assigned a role for access operations
*/
export const RoleField = ({
  defaultValue,
  required = true,
  saveToJWT = true,
}: {
  defaultValue: keyof typeof config.roles;
  required: boolean;
  saveToJWT: boolean;
}) => ({
  name: 'role',
  label: 'Role',
  type: 'select',
  options: config.roles,
  defaultValue: defaultValue,
  required: required,
  saveToJWT: saveToJWT,
});
