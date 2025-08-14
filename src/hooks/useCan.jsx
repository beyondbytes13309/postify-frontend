import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import permissions from '../configs/permissions.js'

const powerMap = {
    'deleted': -2,
    'restricted': -1,
    'user': 0,
    'moderator': 1,
    'admin': 2
}

export function useCan() {
  const user = useContext(AuthContext)?.user || {};
  const userID = user._id;
  const userRole = user.role;

  return function can(actions, resource) {
    let rolePerms = []
    const restrictionObject = user?.restrictionObject
    if (userRole == 'restricted') {
      rolePerms = permissions[`restricted_l${restrictionObject?.level}`] || [];
    } else {
      rolePerms = permissions[userRole] || []
    }

    // Handle '_own_' actions
    const isAllowed = actions?.some?.((action) => {
      if (action.includes("_own_") && resource) {
        if (resource.authorID?._id?.toString?.() === userID) {
          return rolePerms.includes(action);
        }
        return false;
      }

      if (action.includes('_any_') && resource) {
        const ownerOfResource = resource?.authorID
        const roleOfOwnerOfResource = ownerOfResource?.role || 'deleted'

        if (powerMap[userRole] <= powerMap[roleOfOwnerOfResource]) {
            return false
        }
        return rolePerms.includes(action)
      }

      return rolePerms.includes(action);
    });

    return isAllowed;
  };
}