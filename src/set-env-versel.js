import { writeFile } from 'fs';
const targetPath = './src/environments/environment.prod.ts';

require('dotenv').config();

const environmentFileContent = `
export const environment = {
  production: true,
  projectId: "${process.env.projectId}",
  appId: "${process.env.appId}",
  storageBucket: "${process.env.storageBucket}",
  apiKey: "${process.env.apiKey}",
  authDomain: "${process.env.authDomain}",
  messagingSenderId: "${process.env.messagingSenderId}"
};
`;

writeFile(targetPath, environmentFileContent, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Output generated at ${targetPath}`);
});
