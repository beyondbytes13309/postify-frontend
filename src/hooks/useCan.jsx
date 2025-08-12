import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import permissions from '../configs/permissions.js'

export function useCan() {
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
