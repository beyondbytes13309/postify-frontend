
// const permissions = {
//   user: ["delete_own_comment", "delete_own_post", "edit_own_comment", "edit_own_post"],
//   admin: ["delete_any_comment", "delete_any_post", "edit_own_comment", "edit_own_post", 'edit_any_comment'],
//   banned: [],
// };

const perms = {
    CREATE_POST: 'create_post',
    EDIT_OWN_POST: 'edit_own_post',
    EDIT_ANY_POST: 'edit_any_post',
    DELETE_OWN_POST: 'delete_own_post',
    DELETE_ANY_POST: 'delete_any_post',
    VIEW_POSTS: 'view_posts',

    MAKE_REACTION: 'make_reaction',
    DELETE_OWN_REACTION: 'delete_own_reaction',

    MAKE_COMMENT: 'make_comment',
    DELETE_OWN_COMMENT: 'delete_own_comment',
    EDIT_OWN_COMMENT: 'edit_own_comment',
    EDIT_ANY_COMMENT: 'edit_any_comment',
    DELETE_ANY_COMMENT: 'delete_any_comment',
    VIEW_COMMENTS: 'view_comments',

    EDIT_OWN_PROFILE: 'edit_own_profile',
    EDIT_ANY_PROFILE: 'edit_any_profile',

    RESTRICT_LEVEL_1: 'restrict_any_user_level_1',
    RESTRICT_LEVEL_2: 'restrict_any_user_level_2',
    RESTRICT_LEVEL_3: 'restrict_any_user_level_3'
}

const permissions = {
    user: [
        perms.EDIT_OWN_PROFILE,

        perms.CREATE_POST,
        perms.EDIT_OWN_POST,
        perms.DELETE_OWN_POST,
        perms.VIEW_POSTS,

        perms.MAKE_REACTION,
        perms.DELETE_OWN_REACTION,

        perms.MAKE_COMMENT,
        perms.EDIT_OWN_COMMENT,
        perms.DELETE_OWN_COMMENT,
        perms.VIEW_COMMENTS,
    ],
    moderator: [
        perms.EDIT_OWN_PROFILE,

        perms.CREATE_POST,
        perms.EDIT_OWN_POST,
        perms.DELETE_OWN_POST,
        perms.DELETE_ANY_POST,
        perms.VIEW_POSTS,

        perms.MAKE_REACTION,
        perms.DELETE_OWN_REACTION,

        perms.MAKE_COMMENT,
        perms.EDIT_OWN_COMMENT,
        perms.DELETE_OWN_COMMENT,
        perms.DELETE_ANY_COMMENT,
        perms.VIEW_COMMENTS,
        
        perms.RESTRICT_LEVEL_1,
        perms.RESTRICT_LEVEL_2
    ],
    admin: Object.values(perms),
    restricted_l1: [
        perms.EDIT_OWN_PROFILE,
        perms.MAKE_COMMENT,
        perms.EDIT_OWN_COMMENT,
        perms.DELETE_OWN_COMMENT,
        perms.MAKE_REACTION,
        perms.DELETE_OWN_REACTION,

        perms.VIEW_COMMENTS,
        perms.VIEW_POSTS
    ],
    restricted_l2: [
        perms.EDIT_OWN_COMMENT,
        perms.MAKE_REACTION,
        perms.DELETE_OWN_REACTION,
        
        perms.VIEW_COMMENTS,
        perms.VIEW_POSTS
    ],
    restricted_l3: []
};

export default permissions