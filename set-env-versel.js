const fs = require('fs');
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
  messagingSenderId: "${process.env.messagingSenderId}",
  application_status: [
    { name: 'Pending' },
    { name: 'Validated' },
    { name: 'Refused' },
  ],
  application_category: [
    { name: 'CDI' },
    { name: 'CDD' },
    { name: 'Apprenticeship contract', },
    { name: 'professionalization contract'}
  ],
};
`;

fs.writeFile(targetPath, environmentFileContent, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Output generated at ${targetPath}`);
});
