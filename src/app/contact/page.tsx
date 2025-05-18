"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { FormEvent, useContext, useEffect, useState } from "react";
import AuthContext from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import { CreateContact, GetUserContacts } from "@/services/contactServices";
import { ToastError, ToastSuccess } from "@/services/toastNotification";
export default function Home() {
  const authContext = useContext(AuthContext);
  const [subject, setSubject] = useState("");
  const [complaints, setComplaints] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleGetComplaints = async () => {
    await GetUserContacts()
      .then((data: any) => {
        console.log(data.data);
        setComplaints(data.data.data);
      })
      .catch((e) => {
        ToastError("Error Occured while fetching complaints");
      });
  };
  const handleSubmitContact = async (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() == "" || subject.trim() == "") {
      ToastError("Empty fields");
      return;
    }
    await CreateContact({ subject, message })
      .then(() => {
        ToastSuccess("Complaint Added");
        handleGetComplaints();
        setOpen(false);
        setMessage("");
        setSubject("");
      })
      .catch((e) => {
        ToastError("Error Occured");
      });
  };
  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
    handleGetComplaints();
  }, []);

  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col gap-4">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark  dark:bg-boxdark">
            <div className="flex justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
              <button
                type="button"
                title="ADD"
                onClick={() => {
                  setOpen(!open);
                }}
                className="text-bold text-2xl"
              >
                {open ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="text-black dark:text-white"
                    fill="none"
                  >
                    <path
                      d="M15 9L9 14.9996M15 15L9 9.00039"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="text-black dark:text-white"
                    fill="none"
                  >
                    <path
                      d="M12 8V16M16 12L8 12"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                  </svg>
                )}
              </button>
            </div>
            {open && (
              <form action="#">
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Subject
                    </label>
                    <input
                      value={subject}
                      onChange={(e: any) => {
                        setSubject(e.target.value);
                      }}
                      type="text"
                      placeholder="Select subject"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e: any) => {
                        setMessage(e.target.value);
                      }}
                      rows={3}
                      placeholder="Type your message"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmitContact}
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>

          <div>
            Previous Complaints
            <div className="grid grid-cols-1 gap-2">
              {complaints.map((complaint: any) => {
                return (
                  <>
                  <div
                  key={complaint._id}
                  className="  px-3 py-6  border-stroke bg-white shadow-default dark:border-strokedark  dark:bg-boxdark dark:text-white md:px-10"
                >
                  <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <span className="text-gray-600 font-light">
                      {new Date(complaint.createdAt).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>

                    {
                      complaint.status?<span className="border-meta-3 px-2 py-1 text-white bg-meta-3 dark:bg-transparent dark:text-meta-3 rounded-md border">RESOLVED</span>:<span className="border-yellow-500 px-2 py-1 text-white bg-yellow-500 dark:bg-transparent dark:text-yellow-500 rounded-md border">UNRESOLVED</span>
                    }
                    
                  </div>
                  <div className="mt-2">
                    <a
                      className="text-gray-700 hover:text-gray-600 text-2xl font-bold"
                      href="#"
                    >
                      {complaint.subject}
                    </a>
                    <p
                      
                      className="text-gray-600 mt-2"
                    >{complaint.message}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                   {complaint.status? "ADMIN MESSAGE : "+complaint.adminMessage:""}
                  </div>
                </div>
                  </>
                  
                );
              })}
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
