import { Access } from 'payload/config';
import { CollectionConfig } from 'payload/dist/collections/config/types';
import { Field } from 'payload/dist/exports/types';

type PayloadAccess = {
  admin?: (args?: any) => Promise<boolean> | boolean;
  create?: Access;
  delete?: Access;
  read?: Access;
  readVersions?: Access;
  unlock?: Access;
  update?: Access;
};

const Organisations = ({
  access,
  fields,
}: {
  access?: PayloadAccess;
  fields?: Field[];
}): CollectionConfig => ({
  slug: 'organisations',
  admin: {
    useAsTitle: 'name',
    enableRichTextRelationship: false,
    enableRichTextLink: false,
  },
  access: access,
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    {
      name: 'access',
      label: 'Access',
      type: 'json',
      admin: {
        description: `JSON that defined access for this organisation {"include": ["*" || "<collection>"], "exclude": ["<collection>"]}`,
      },
    },
    ...(fields || []),
  ],
});

export default Organisations;
