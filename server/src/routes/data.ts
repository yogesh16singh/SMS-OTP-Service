export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface SentMessage {
  contact: Contact;
  otp: string;
  time: Date;
}

export const contacts: Contact[] = [
 
  { id: 1, firstName: 'Data', lastName: 'Taskers', phone: '+919810153260' },
  { id: 2, firstName: 'Yogesh', lastName: 'singh', phone: '+918005901896' }

];

export const messages: SentMessage[] = [];
