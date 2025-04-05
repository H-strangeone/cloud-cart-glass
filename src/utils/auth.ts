
type User = {
  username: string;
  password: string;
};

// Predefined users for authentication
export const predefinedUsers: User[] = [
  { username: "saurabh", password: "1234" },
  { username: "rohit", password: "1234" },
  { username: "chirag", password: "1234" },
  { username: "admin", password: "1234" }, // Default admin account
];

// Function to verify user credentials
export const verifyCredentials = (username: string, password: string): boolean => {
  return predefinedUsers.some(
    (user) => user.username.toLowerCase() === username.toLowerCase() && user.password === password
  );
};

