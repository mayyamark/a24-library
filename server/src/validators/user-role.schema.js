import userRoles from '../data/user-roles.js';
const userRoleSchema = {
  role: (value) =>
    typeof value === 'string' &&
    value &&
    Object.values(userRoles).includes(value),
};

export default userRoleSchema;
