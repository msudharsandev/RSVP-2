export const API_MESSAGES = {
  COHOST: {
    REMOVE: {
      SUCCESS: 'Cohost removed successfully',
      INSUFFICIENT_PERMS_MANAGER_OR_CREATOR_REQUIRED:
        'Insufficient permissions: You need to be a "Creator" to remove other "Manager"s',
      INSUFFICIENT_PERMS_CREATOR_REQUIRED:
        'Insufficient permissions: You need to be a "Creator" or a "Manager" to remove hosts',
      FAILED: 'Something went wrong while deleting the cohost record',
    },
  },
};
