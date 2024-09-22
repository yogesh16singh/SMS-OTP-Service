import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const NewMessage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const navigate = useNavigate();

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setMessage(`Hi. Your OTP is: ${otp}`);
  };

  const handleSend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/send-otp",
        {
          contactId: parseInt(id!),
          customMessage: message,
        }
      );
      setDialogMessage(response.data.message || "Message sent successfully!");
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error sending message:", error);
      setDialogMessage("Failed to send message. Please try again.");
      setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    if (dialogMessage.includes("successfully")) {
      navigate(`/contact/${id}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-slate-200 rounded-md">
      <h2 className="text-2xl font-bold mb-4"> Message</h2>
      <Button onClick={generateOTP} variant="outline" className="mb-4">
          Generate OTP
        </Button>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message..."
        className="mb-4 border border-black rounded-md p-2"
      />
      <div className="flex space-x-2 ml-[80%]">
        <Button onClick={handleSend}>Send</Button>
      </div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Message Status</AlertDialogTitle>
            <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDialogClose}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NewMessage;
