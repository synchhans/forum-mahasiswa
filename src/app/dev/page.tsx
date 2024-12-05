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
import PengumumanModal from "../components/PengumumanModal";
import DiskusiModal from "../components/DiskusiModal";
import AgendaModal from "../components/AgendaModal";

export default function DevPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [alert, setAlert] = useState<string | null>(null);
  const [alertDetails, setAlertDetails] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
        setAlertDetails(null);
      }, 5000); // Reset alert after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (!isMounted) {
    return null;
  }

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleSeedData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/seed", {
        method: "GET",
      });

      const result = await response.json();
      if (response.ok) {
        setAlert(result.message || "Seed data processed successfully.");
        setAlertDetails(
          result.details || "All seed data was processed successfully."
        );
        setAlertType("success");
      } else {
        setAlert(result.error || "Error seeding data.");
        setAlertDetails(
          result.details || "Please check the server logs for more details."
        );
        setAlertType("error");
      }
    } catch (error) {
      setAlert("An error occurred during seeding.");
      setAlertDetails("Please check the server connection.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
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
        setAlertDetails(
          result.details || "The general data has been successfully updated."
        );
        setAlertType("success");
      } else {
        setAlert(result.message || "An error occurred during data update.");
        setAlertDetails(
          result.details || "Please check the form for any errors."
        );
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
      setAlertDetails("If the issue persists, please contact support.");
      setAlertType("error");
    }

    setModalOpen(false);
  };

  return (
    <ClerkProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Development Dashboard
          </h1>

          <SignedOut>
            <p className="text-gray-600 text-center mb-6">
              You must log in to access the Developer page.
            </p>
            <div className="flex justify-center">
              <SignInButton>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300">
                  Login
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex flex-col items-center mb-6">
              <UserButton />
              <p className="mt-4 text-lg text-gray-700">Welcome, Developer!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              <button
                onClick={handleSeedData}
                className="bg-green-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-green-700 transition duration-300"
              >
                Seed Data
              </button>
              <button
                onClick={() =>
                  openModal(<GeneralForm onSave={handleSaveGeneralData} />)
                }
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
              >
                General
              </button>
              <button
                onClick={() => openModal(<PengumumanModal />)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
              >
                Pengumuman
              </button>
              <button
                onClick={() => openModal(<DiskusiModal />)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
              >
                Diskusi
              </button>
              <button
                onClick={() => openModal(<AgendaModal />)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
              >
                Agenda
              </button>
            </div>
          </SignedIn>
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          {modalContent}
        </Modal>

        {alert && alertType && (
          <Alert message={alert} type={alertType!} details={alertDetails!} />
        )}

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white text-2xl font-bold">Loading...</div>
          </div>
        )}
      </div>
    </ClerkProvider>
  );
}
