import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CareerForm({ selectedJob }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetterText: "",
    resume: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create form data for both requests
    const formDataWithJob = new FormData();
    formDataWithJob.append("name", formData.name);
    formDataWithJob.append("email", formData.email);
    formDataWithJob.append("phone", formData.phone);
    formDataWithJob.append("coverLetterText", formData.coverLetterText);
    formDataWithJob.append("resume", formData.resume);
    formDataWithJob.append("job_role", selectedJob);

    const formDataForResumesApi = new FormData();
    formDataForResumesApi.append("name", formData.name);
    formDataForResumesApi.append("email", formData.email);
    formDataForResumesApi.append("phone", formData.phone);
    formDataForResumesApi.append("country", formData.country);
    formDataForResumesApi.append("coverLetterText", formData.coverLetterText);
    formDataForResumesApi.append("role", selectedJob);
    formDataForResumesApi.append("message", formData.message);
    formDataForResumesApi.append("status", "new");
    formDataForResumesApi.append("resume", formData.resume);

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/carrier`, {
        method: "POST",
        body: formDataWithJob,
      });

      if (response.ok) {
        const responseResume = await fetch(
          `${process.env.REACT_APP_API}/resumes`,
          {
            method: "POST",
            body: formDataForResumesApi,
          }
        );

        if (responseResume.ok) {
          setIsSubmitted(true);
        } else {
          toast.error("Failed to submit application to resumes API");
        }
      } else {
        toast.error("Failed to submit application to carrier API");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting the application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const thankYouMessage = (
    <div className="flex items-center justify-center h-screen">
      <div className="p-1 rounded shadow-lg">
        <div className="flex flex-col items-center p-4 space-y-2 bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-600 w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl font-bold font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Thank You!
          </h1>
          <p>
            Thank you for your interest! Check your email for a link to the
            guide.
          </p>
          <a
            href="/careers"
            className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="text-sm font-medium">Explore More</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {isSubmitted ? (
        thankYouMessage // Render the thank-you message if submitted
      ) : (
        <>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Apply for {selectedJob}
          </h3>
          <form
            className="space-y-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div>
              <label
                htmlFor="modal-name"
                className="block text-sm font-medium text-gray-700"
              >
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="modal-name"
                name="name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="modal-email"
                className="block text-sm font-medium text-gray-700"
              >
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="modal-email"
                name="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="modal-phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="modal-phone"
                name="phone"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="modal-cover-letter-text"
                className="block text-sm font-medium text-gray-700"
              >
                Cover Letter<span className="text-red-500">*</span>
              </label>
              <textarea
                id="modal-cover-letter-text"
                name="coverLetterText"
                rows="4"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800"
                placeholder="Write your cover letter here..."
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="modal-resume"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Resume<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleInputChange}
                name="resume"
                id="resume"
                accept=".pdf,.doc,.docx"
                className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm text-gray-900 file:bg-gray-200 file:border-0 file:me-4 file:py-3 file:px-4"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
