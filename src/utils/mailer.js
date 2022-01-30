export const generateMail = (invitedUser, url) => ({
  subjct: `${invitedUser} invited you to ChatBuddies! :)`,
  text: `Hello!, how are you?, ${invitedUser} has invited you to Chat with him in ChatBuddies!. Click here to join: ${url}. Thank you!, Chat Buddies auto service. :)`,
})
