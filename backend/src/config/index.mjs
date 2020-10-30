import pkg from 'dotenv';

const { config } = pkg;

config();

const {
  NODE_ENV,
  URL,
  MONGO_URI,
  PORT,
  COOKIE_KEY,
  COOKIE_SECRET,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_NAME,
  REFRESH_TOKEN_PATH,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  SALT,
  DEFAULT_PICTURE,
  GITHUB_CALLBACK,
} = process.env;

export const Environment = {
  appName: 'backend',
  environment: NODE_ENV,
  url: URL,
  db: {
    MONGO_URI,
  },
  server: {
    PORT: parseInt(PORT, 10),
  },
  cookie: {
    COOKIE_KEY,
    COOKIE_SECRET,
  },
  webToken: {
    ACCESS_SECRET: ACCESS_TOKEN_SECRET,
    REFRESH_SECRET: REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_NAME,
    REFRESH_TOKEN_PATH,
  },
  social: {
    githubID: GITHUB_CLIENT_ID,
    githubSecretID: GITHUB_CLIENT_SECRET,
    githubCallBack: GITHUB_CALLBACK,
  },
  salt: SALT,
  img: DEFAULT_PICTURE,
};
