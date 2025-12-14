// Export all Sanity schemas
import { narratorSchema } from './narrator';
import { storySchema } from './story';

export const schemaTypes = [narratorSchema, storySchema];

export { narratorSchema, storySchema };