
const permissions = {
  user: ["delete_own_comment", "delete_own_post", "edit_own_comment", "edit_own_post"],
  admin: ["delete_any_comment", "delete_any_post", "edit_own_comment", "edit_own_post"],
  banned: [],
};

export default permissions