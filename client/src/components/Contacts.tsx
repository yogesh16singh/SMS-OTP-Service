import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("https://sms-otp-service.onrender.com/api/contacts");
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table className="mt-8 ml-16 w-[95vw]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-blue-500">Sr.no</TableHead>
            <TableHead className="text-blue-500"> Name</TableHead>
           
            <TableHead className="text-blue-500">Information</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No contacts available.
              </TableCell>
            </TableRow>
          ) : (
            contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">{contact.id}</TableCell>
                <TableCell>{contact.firstName + " " + contact.lastName}</TableCell>
                <TableCell className="">
                  <Button className="bg-blue-500 hover:bg-blue-800" asChild>
                    <a href={`/contact/${contact.id}`}>Get Info</a>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactsList;
