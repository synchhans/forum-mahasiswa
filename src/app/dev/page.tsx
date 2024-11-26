"use client";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";
import GeneralForm from "../components/General";
import Alert from "../components/Alert";

export default function DevPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [alert, setAlert] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const Modal = ({
    isOpen,
    onClose,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
        <div className="bg-white w-[90%] max-w-3xl h-auto p-6 my-16 rounded-lg shadow-lg overflow-y-auto relative">
          <div className="mb-4">{children}</div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={onClose}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleSaveGeneralData = async (data: any) => {
    const { _id, ...restData } = data;

    try {
      const response = await fetch(`/api/admin?data=general&id=${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to save data");
      }

      const result = await response.json();
      if (result.success) {
        setAlert(result.message || "Data updated successfully!");
        setAlertType("success");
      } else {
        setAlert(result.message || "An error occurred during data update.");
        setAlertType("error");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error saving data:", error.message);
        setAlert(`An unexpected error occurred: ${error.message}`);
      } else {
        console.error("Unknown error occurred:", error);
        setAlert("An unexpected error occurred. Please try again.");
      }
      setAlertType("error");
    }

    setModalOpen(false);
  };

  return (
    <ClerkProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="max-w-xl w-full p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Developement
          </h1>

          <SignedOut>
            <p className="text-gray-600 text-center mb-6">
              Login diperlukan untuk mengakses halaman pengembang.
            </p>
            <div className="flex justify-center">
              <SignInButton>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200">
                  Masuk
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="text-center mb-6">
              <UserButton />
            </div>
            <div className="text-lg text-gray-600 text-center">
              Selamat datang, Developer!
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <button
                onClick={() =>
                  openModal(<GeneralForm onSave={handleSaveGeneralData} />)
                }
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition duration-200"
              >
                General
              </button>
              <button
                onClick={() => openModal(<div>Pengumuman content here...</div>)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition duration-200"
              >
                Pengumuman
              </button>
              <button
                onClick={() => openModal(<div>Diskusi content here...</div>)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition duration-200"
              >
                Diskusi
              </button>
              <button
                onClick={() => openModal(<div>Agenda content here...</div>)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition duration-200"
              >
                Agenda
              </button>
            </div>
          </SignedIn>
        </div>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {modalContent}
        </Modal>
        {alert && alertType && <Alert message={alert} type={alertType!} />}
      </div>
    </ClerkProvider>
  );
}
