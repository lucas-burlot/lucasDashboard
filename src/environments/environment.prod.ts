export const environment = {
  firebase: {
    projectId: '',
    appId: '',
    storageBucket: '',
    apiKey: '',
    authDomain: '',
    messagingSenderId: '',
  },
  production: false,
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
