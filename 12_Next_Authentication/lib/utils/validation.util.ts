function userValidation(email: string, password: string) {
  return (
    !email || !email.includes('@') || !password || password.trim().length < 7
  );
}

export default {
  userValidation,
};
