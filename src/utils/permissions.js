import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const permissions = {
  user: ["delete_own_comment", "delete_own_post", "edit_own_comment", "edit_own_post"],
  admin: ["delete_any_comment", "delete_any_post", "edit_own_comment", "edit_own_post"],
  banned: [],
};

export default function useCan() {
  const user = useContext(AuthContext)?.user || {};
  const userID = user._id;
  const userRole = user.role;

  return function can(actions, resource) {
    const rolePerms = permissions[userRole] || [];

    // Handle '_own_' actions
    const isAllowed = actions?.some?.((action) => {
      if (action.includes("_own_") && resource) {
        const [verb, scope, type] = action.split("_"); // e.g., 'edit_own_post'
        if (resource.authorID?._id?.toString?.() === userID) {
          return rolePerms.includes(action);
        }
        return false;
      }
      return rolePerms.includes(action);
    });

    return isAllowed;
  };
}
