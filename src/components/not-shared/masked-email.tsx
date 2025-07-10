export const getMaskedEmail = (email: string): string => {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;

  const maskedUser =
    user.length > 2 ? user.slice(0, 2) + "*".repeat(user.length - 2) : user;

  return `${maskedUser}@${domain}`;
};
