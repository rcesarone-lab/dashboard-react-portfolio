export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

export type SessionUser = Omit<User, "password">;

const USERS_KEY = "app-users";
const SESSION_KEY = "auth-user";

const defaultUsers: User[] = [
  {
    id: 1,
    name: "Cesar Ramirez",
    email: "rcesarone@gmail.com",
    password: "123456",
    role: "admin",
  },
];

export function getUsers(): User[] {
  const stored = localStorage.getItem(USERS_KEY);

  if (!stored) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }

  try {
    const parsedUsers = JSON.parse(stored);

    if (!Array.isArray(parsedUsers)) {
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
      return defaultUsers;
    }

    return parsedUsers;
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
}

export function login(email: string, password: string): SessionUser | null {
  const users = getUsers();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  );

  if (!user) return null;

  const sessionUser: SessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

  return sessionUser;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): SessionUser | null {
  const stored = localStorage.getItem(SESSION_KEY);

  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getSession());
}

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export function registerUser(input: RegisterInput): SessionUser | null {
  const users = getUsers();

  const emailAlreadyExists = users.some(
    (user) => user.email.toLowerCase() === input.email.toLowerCase()
  );

  if (emailAlreadyExists) {
    return null;
  }

  const newUser: User = {
    id: Date.now(),
    name: input.name,
    email: input.email,
    password: input.password,
    role: "user",
  };

  const updatedUsers = [...users, newUser];

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

  const sessionUser: SessionUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

  return sessionUser;
}