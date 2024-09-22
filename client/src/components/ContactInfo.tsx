import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

const ContactInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/contacts/${id}`);
        setContact(response.data);
      } catch (error) {
        console.error('Error fetching contact:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!contact) {
    return <div className="text-center">Contact not found</div>;
  }

  return (
    <div className="p-4 flex flex-col items-center my-auto mt-12 ">
      <Card className="shadow-sm p-8 rounded-lg bg-slate-200 max-w-md w-full  m-auto">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-semibold mb-1">
            {contact.firstName} {contact.lastName}
          </h2>
          <p className="text-lg text-gray-700 mb-4">{contact.phone}</p>
        </div>
        <Link to={`/compose/${contact.id}`} className="w-full">
          <Button className="w-full mb-4 transition duration-200 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow">
            Send Text Message
          </Button>
        </Link>
        <Link to="/" className="mt-4 w-full">
          <Button className="w-full transition duration-200 py-2 rounded-lg border bg-slate-600  hover:text-white">
            All Contacts
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default ContactInfo;
