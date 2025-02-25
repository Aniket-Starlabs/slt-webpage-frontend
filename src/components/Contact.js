import { motion } from "motion/react";
import React, { useState } from "react";
import StarBg from "../assets/Images/Star_bg.png";
import TeamSvg from "../assets/SVG/Contact/Contact.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobileSvg from "../assets/SVG/Contact/Mobile.svg";
import StarryNight from "./Stars";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "subject") {
      // Limit the subject field to 10 words
      if (value.length > 40) {
        setFormData({ ...formData, [name]: value.slice(0, 40) });
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };
  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
    }));
  };

  // Email validation function
  const validateEmail = (email) => {
    const regex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate email
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-left",
      });

      setIsSubmitting(false);
      return;
    }

    const updatedFormData = {
      ...formData,
      name: `${firstName} ${lastName}`,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("SUCCESS!", result);
        toast.success("Message sent successfully!"); // Show success toast
        setFormData({ name: "", email: "", message: "", subject: "" });
        setFirstName("");
        setLastName("");
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("FAILED...", error);
      toast.error("Failed to send message. Please try again later."); // Show error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative mx-auto overflow-hidden text-white bg-black bg-cover max-w-screen-2xl"
      // style={{ backgroundImage: `url(${StarBg})` }}
      id="contact"
    >
      <StarryNight />
      <ToastContainer />
      <div className="relative mx-auto overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative hidden 2xl:flex"
          >
            <div className="relative">
              <img
                src={TeamSvg}
                alt="Team meeting illustration"
                className="object-cover w-full "
              />
            </div>
          </motion.div>

          {/* Mobile illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center 2xl:hidden"
          >
            <img src={MobileSvg} alt="Mobile SVG" />
          </motion.div>

          {/* Right side - Contact Form */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-10/12 px-8 py-2 my-5 border border-gray-600 shadow-lg rounded-2xl bg-white/10"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 text-3xl font-bold text-center md:mb-6 md:text-5xl text-emerald-400"
              >
                Contact Us
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[0.75rem] text-center text-gray-200 xs:text-sm lg:text-base"
              >
                Connect with Starlabs Technologies to explore cutting-edge
                solutions tailored to your business needs. Our team is here to
                help you innovate and achieve your goals.
              </motion.p>

              <form onSubmit={handleSubmit} className="mt-12 space-y-10">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block mb-1 font-semibold text-white"
                    >
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-2 text-gray-200 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-emerald-500"
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block mb-1 font-semibold text-white"
                    >
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-2 text-gray-200 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-emerald-500"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1 font-semibold text-white"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 text-gray-200 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-emerald-500"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div className="contact">
                    <label
                      htmlFor="phoneNumber"
                      className="block mb-1 font-semibold text-white "
                    >
                      Phone number
                    </label>
                    <PhoneInput
                      id="phoneNumber"
                      country={"in"} // Default country code
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      containerClass="w-full"
                      inputClass="!w-full !h-[2.65rem] !bg-transparent !rounded-none !border-b-2 !border-0  !text-gray-200 !pl-11 "
                      buttonClass="!bg-transparent !border-0 !text-white"
                      dropdownClass="!bg-black !text-white"
                      searchClass="!bg-black !text-white !border-red-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-1 font-semibold text-white"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-2 text-gray-200 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-emerald-500"
                    placeholder="Enter subject"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-1 font-semibold text-white"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 text-gray-200 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-emerald-500 min-h-[100px]"
                    placeholder="Type your message here"
                    required
                  />
                </div>

                <div className="w-full text-center">
                  <button
                    type="submit"
                    className="w-8/12 p-2 font-semibold text-center text-black transition-all rounded-lg lg:w-full lg:p-3 bg-emerald-500 hover:bg-emerald-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
