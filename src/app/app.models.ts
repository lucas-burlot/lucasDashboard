export interface User {
    uid: string;
    email: string;
    password: string;
    lastname: string;
    firstname: string;
}

export interface ApplicationCategory {
    name: string;
}

export interface ApplicationStatus {
    name: string;
}

export interface Application {
    uid: string;
    user_uid: string;
    application_title: string;
    company_name: string;
    application_category: ApplicationCategory;
    application_date: Date;
    application_contact_name: string;
    application_contact_phone: string;
    application_contact_email: string;
    application_status: ApplicationStatus;
}

export interface Graph {
    data: [{}];
    layout: {
        height: number;
        width: number;
    };
}
