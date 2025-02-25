import React, {
  lazy,
  Suspense,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import bgImage from "../assets/Images/Star_bg.png";
import { ReactComponent as CloudSvgLarge } from "../assets/SVG/Hero/Cloud.svg";
import { Navbar } from "../components";
import "react-toastify/dist/ReactToastify.css";
import StarryNight from "../components/Stars";

const RotatingMoon = lazy(() => import("../components/RotatingMoon"));

const Assignment = () => {
  // Memoize styles for better performance

  const fileInputRef = useRef(null);
  const [roles, setRoles] = React.useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Handle navigation to job application page

  const [formData, setFormData] = useState({
    email: "",
    appliedFor: "",
    link: "",
  });

  const handleNextStep = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/resumer?email=${encodeURIComponent(
          formData.email
        )}`
      );

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          email: data.email,
          appliedFor: data.roles[0],
        }));
        setRoles(data.roles);
        setName(data.name);
        setCurrentStep(2);
      } else {
        toast.error("Email not found");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching user data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Application Submitted Successfully!");
        setIsSubmitting(false);
        setFormData({
          email: "",
          appliedFor: "",
          link: "",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        const errorResponse = await response.json();
        toast.error(errorResponse.message || "Something went wrong!");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting the application");
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  //Greeting according to time
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getGreeting = () => {
      // Determine the user's local time zone (you can use Intl.DateTimeFormat for specific locales)
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Get the current hour in the user's local time
      const userHour = new Date().toLocaleString("en-US", {
        timeZone: userTimezone,
        hour: "2-digit",
        hour12: false,
      });

      // Determine greeting based on the user's hour of the day
      if (userHour >= 5 && userHour < 12) {
        setGreeting("Good Morning");
      } else if (userHour >= 12 && userHour < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };

    getGreeting();
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <section
        id="home"
        className="relative w-full min-h-screen overflow-hidden bg-center bg-contain pt-28 sm:pt-20 lg:pt-28 md:bg-cover"
      >
        <StarryNight />
        {/* Content */}
        <div
          className={`relative mx-auto max-w-screen-2xl z-20 ${
            currentStep === 1 && "pb-32"
          }`}
        >
          <div className="pb-28 lg:pb-24">
            <div className="mx-auto space-y-6 text-center text-white xs:space-y-8 md:space-y-3">
              <div>
                <h1 className="text-3xl font-bold tracking-widest xs:text-4xl lg:text-5xl font-AgencyFb ">
                  STARLABS
                </h1>
                <h2 className="tracking-wide text-md xs:text-xl lg:text-3xl font-AgencyFb ">
                  SPECIALIZED TEAM FOR ALTERNATIVE RESEARCH
                </h2>
              </div>

              <div className="mx-auto w-10/12 sm:w-8/12 md:w-7/12 lg:w-6/12 xl:w-5/12 text-sm sm:text-base md:text-lg leading-[7.5vw] sm:leading-[6vw] md:leading-[5vw] lg:leading-relaxed xl:leading-loose tracking-wider text-white flex flex-col gap-5">
                <div
                  className={`bg-cover bg-top w-full h-full ${
                    currentStep === 1 && "pt-10"
                  }`}
                >
                  <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 backdrop-blur-[10px] backdrop-saturate-[180%] bg-[rgba(71,71,71,0.38)] rounded-lg border border-[rgba(255,255,255,0.125)]">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-7 md:mb-8 text-[#00ff9d]">
                      Submit your Assignment
                    </h3>

                    <form
                      className="space-y-4 sm:space-y-8 text-white/80 text-start md:px-10"
                      onSubmit={
                        currentStep === 1 ? handleNextStep : handleSubmit
                      }
                    >
                      {currentStep === 1 ? (
                        <>
                          <div className="">
                            <label
                              htmlFor="email"
                              className="block mb-2 ml-1 text-sm font-medium"
                            >
                              Email<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-3 py-1 text-white placeholder-white border rounded-lg sm:px-4 border-white/30 bg-black/50 focus:outline-none focus:ring-1 focus:ring-green-500"
                              required
                            />
                          </div>
                          <div className="w-1/3 mx-auto">
                            <button
                              type="submit"
                              className="w-full bg-[#00ff9d] hover:bg-[#00cc7d] text-black font-medium py-2 sm:py-2 rounded-xl transition-colors"
                            >
                              Next
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Name (readonly) */}
                          <div>
                            <h3 className="  animate-text bg-gradient-to-r from-[#00ff9d] via-[#00dd7d] to-[#00ea56] bg-clip-text text-transparent text-center text-lg sm:text-xl md:text-xl font-semibold -mt-4">
                              Hello, {name}. {greeting}!
                            </h3>
                          </div>

                          {/* Email (readonly) */}
                          <div>
                            <label className="block mb-2 ml-1 text-sm font-medium">
                              Email
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              className="w-full px-3 py-1 border rounded-lg sm:px-4 border-white/30 bg-black/50 text-white/70"
                              readOnly
                            />
                          </div>

                          {/* Role dropdown */}
                          <div>
                            <label className="block mb-2 ml-1 text-sm font-medium">
                              Select the role you've applied for{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <select
                              className="w-full px-3 py-2 text-white placeholder-white border rounded sm:px-4 border-white/30 bg-black/50 focus:outline-none focus:ring-1 focus:ring-green-500"
                              value={formData.appliedFor}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  appliedFor: e.target.value,
                                })
                              }
                              required
                            >
                              {roles.map((role, index) => (
                                <option key={index} value={role}>
                                  {role}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Link input */}
                          <div>
                            <label
                              htmlFor="link"
                              className="block mb-2 ml-1 text-sm font-medium"
                            >
                              Link<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="link"
                              name="link"
                              value={formData.link}
                              onChange={handleInputChange}
                              className="w-full px-3 py-1 text-white placeholder-white border rounded-lg sm:px-4 border-white/30 bg-black/50 focus:outline-none focus:ring-1 focus:ring-green-500"
                              required
                            />
                          </div>

                          {/* Submit Button */}
                          <div className="w-1/3 mx-auto">
                            <button
                              type="submit"
                              className="w-full bg-[#00ff9d] hover:bg-[#00cc7d] text-black font-medium py-2 sm:py-2 rounded-xl transition-colors"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Sending..." : "Submit"}
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Rocket svg */}
        <div className="absolute z-20 hidden md:block bottom-20 right-2 xs:bottom-20 xs:right-9 md:right-9 md:bottom-24 lg:right-3 xl:bottom-44 xl:right-8 2xl:right-36">
          <svg
            className="w-36 h-36 md:w-40 md:h-40 lg:w-60 lg:h-60 xl:w-64 xl:h-64 "
            viewBox="0 0 100 267"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M87.6493 101.194C86.7429 148.928 61.3126 188.404 47.2116 188.244C43.1583 184.251 16.448 155.436 9.96109 104.58C8.76874 48.2163 37.6757 1.72638 50.1996 1.19507C64.9399 6.42418 88.5557 53.46 87.6493 101.194Z"
              fill="#B9B9B9"
            />
            <path
              d="M28.686 171.112L50.1997 168.124L70.9166 171.112L79.0839 191.829L19.9211 191.231L28.686 171.112Z"
              fill="#454444"
            />
            <path
              d="M83.6658 121.511L100 158.563V182.268L91.2354 168.523L75.4985 158.563L83.6658 121.511Z"
              fill="#D9D9D9"
              fill-opacity="0.49"
            />
            <path
              d="M16.3345 121.511L-2.28882e-05 158.563V182.268L8.76482 168.523L24.5017 158.563L16.3345 121.511Z"
              fill="#D9D9D9"
              fill-opacity="0.49"
            />
            <path
              d="M18.1273 138.443L4.1832 158.562L0.995979 180.873L8.76482 168.522L24.5017 158.562L18.1273 138.443Z"
              fill="#2E2E2E"
              fill-opacity="0.74"
            />
            <path
              d="M82.0707 138.244L96.0148 158.363L99.202 180.674L91.4332 168.324L75.6963 158.363L82.0707 138.244Z"
              fill="#2E2E2E"
              fill-opacity="0.74"
            />
            <path
              d="M23.7068 156.172H76.0967L75.1007 159.757H24.902L23.7068 156.172Z"
              fill="#303030"
            />
            <path
              d="M24.3032 34.2627H75.2987L74.3292 33.0675H25.4666L24.3032 34.2627Z"
              fill="#303030"
            />
            <path
              d="M22.7112 37.0513H76.8939L75.8638 35.8561H23.9473L22.7112 37.0513Z"
              fill="#303030"
            />
            <path
              d="M49.503 0C59.0171 5.19972 63.3271 11.9027 73.308 31.0754H25.1013C32.959 14.7555 39.2681 6.75772 49.503 0Z"
              fill="#131212"
              fill-opacity="0.7"
            />
            <ellipse
              cx="49.6027"
              cy="56.9714"
              rx="12.1513"
              ry="14.7409"
              fill="#332E2E"
              fill-opacity="0.71"
            />
            <ellipse
              cx="49.6011"
              cy="56.9188"
              rx="8.16724"
              ry="9.90781"
              fill="#1F1E1E"
            />
            <ellipse
              cx="49.802"
              cy="84.2611"
              rx="5.57763"
              ry="6.57364"
              fill="#332E2E"
              fill-opacity="0.71"
            />
            <ellipse
              cx="49.8007"
              cy="84.3751"
              rx="3.98402"
              ry="4.69546"
              fill="#1B1919"
              fill-opacity="0.71"
            />
            <ellipse
              cx="49.8"
              cy="103.185"
              rx="5.97603"
              ry="7.17124"
              fill="#332E2E"
              fill-opacity="0.71"
            />
            <ellipse
              cx="49.6029"
              cy="103.026"
              rx="4.18322"
              ry="5.01987"
              fill="#231F1F"
            />
            <path
              d="M26 194H74V201.409L73.3557 204.631L72.0671 202.698V209.463H70.4564L71.1007 217.839L69.1678 216.228V221.383L65.9463 225.893L63.6913 232.98L62.4027 236.523L61.7584 243.611L58.5369 241.678L56.604 255.852L52.7383 250.376L50.8054 260.362L46.9396 252.309H43.0738L42.1074 244.899H40.1745L39.2081 241.678L38.2416 232.98L36.6309 235.235L35.9866 230.403L33.0872 228.148V220.416L31.4765 223.315V211.396L29.2215 215.262L27.2886 205.275L26 194Z"
              fill="#EE5660"
            />
            <path
              d="M26 193H24.8792L25.0065 194.114L26.2951 205.389L26.2995 205.427L26.3068 205.465L28.2397 215.452L28.7451 218.063L30.0853 215.766L30.4765 215.095V223.315V227.175L32.0872 224.275V228.148V228.637L32.4733 228.937L35.0495 230.941L35.6396 235.367L35.974 237.875L37.4446 235.816L37.5363 235.688L38.2142 241.788L38.2242 241.878L38.2502 241.965L39.2167 245.187L39.4305 245.899H40.1745H41.2293L42.0822 252.438L42.1958 253.309H43.0738H46.3104L49.9038 260.795L51.2125 263.521L51.7871 260.552L53.2742 252.869L55.7871 256.429L57.2517 258.504L57.5949 255.987L59.3228 243.316L61.2439 244.468L62.61 245.288L62.7543 243.701L63.3868 236.743L64.6311 233.322L64.638 233.302L64.6442 233.283L66.8515 226.346L69.9815 221.964L70.1678 221.703V221.383V218.363L70.4605 218.607L72.2793 220.123L72.0977 217.762L71.5363 210.463H72.0671H73.0671V209.463V206.001L73.8628 207.194L74.3363 204.827L74.9806 201.606L75 201.508V201.409V194V193H74H26Z"
              stroke="#F8883D"
              stroke-opacity="0.94"
              stroke-width="2"
            />
            <path
              d="M35.6648 194H67.2353V198.748L66.8115 200.812L65.964 199.573V203.908H64.9046L65.3283 209.275L64.057 208.243V211.546L61.9382 214.436L60.455 218.977L59.6075 221.248L59.1837 225.789L57.0649 224.551L55.7936 233.634L53.251 230.124L51.9797 236.523L49.4371 231.363H46.8946L46.2589 226.615H44.9876L44.352 224.551L43.7163 218.977L42.6569 220.422L42.2331 217.326L40.3262 215.881V210.927L39.2668 212.785V205.147L37.7836 207.624L36.5123 201.225L35.6648 194Z"
              fill="url(#paint0_linear_47_2)"
              fill-opacity="0.62"
            />
            <defs>
              <linearGradient
                id="paint0_linear_47_2"
                x1="51.45"
                y1="194"
                x2="51.45"
                y2="236.523"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#EE5660" />
                <stop offset="1" stop-color="#FFCD18" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Rocket smoke */}
        <div className="hidden md:block absolute bottom-0 lg:-right-[4rem] -right-[2.8rem] xs:-right-[1rem] xl:-right-[5.2rem]  2xl:right-0">
          <svg
            className="w-[20rem] h-[7rem] md:w-[22rem] md:h-[9rem]  lg:w-[32rem] xl:w-[40rem] xl:h-[15.4rem] 2xl:w-[44rem] lg:h-[12rem] 2xl:h-[15.5rem]"
            viewBox="0 0 601 259"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M341.429 161.758L355.265 0H408.447L420.121 166.433C420.121 166.433 429.252 155.905 434.822 161.758C437.97 165.066 444.766 172.978 444.766 172.978C444.766 172.978 460.048 143.027 474.6 137.448C492.467 130.596 516.973 156.616 516.973 156.616C516.973 156.616 532.484 142.197 544.645 140.72C560.162 138.836 575.343 156.616 575.343 156.616C575.343 156.616 585.288 116.41 612.527 116.41C650.144 116.41 660.953 153.343 660.953 153.343C660.953 153.343 676.92 148.344 686.463 153.343C695.929 158.301 715 172.978 715 172.978V259H0.718392C0.718392 259 -8.78794 197.914 41.3615 173.913C67.7365 161.291 105.785 199.159 105.785 199.159C105.785 199.159 123.584 172.366 140.808 166.433C159.127 160.123 189.666 172.978 189.666 172.978C189.666 172.978 202.25 153.116 214.743 148.668C227.992 143.951 244.145 156.616 244.145 156.616C244.145 156.616 250.631 125.227 277.87 123.422C305.109 121.617 313.325 156.616 313.325 156.616C313.325 156.616 320.224 149.36 325.864 148.668C334.614 147.594 341.429 161.758 341.429 161.758Z"
              fill="url(#paint0_linear_225_131)"
              fill-opacity="0.5"
            />
            <defs>
              <linearGradient
                id="paint0_linear_225_131"
                x1="377.653"
                y1="17.5274"
                x2="372.83"
                y2="243.932"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D1CCCC" />
                <stop offset="1" stop-color="#131212" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="hidden md:block absolute left-0 z-40 bottom-10 xs:bottom-14 h-[10rem] w-[10rem] xs:h-[12rem] xs:w-[12rem] md:w-64 md:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 ">
          <Suspense fallback={<div>Loading...</div>}>
            <RotatingMoon position={[0, 0, 50]} fov={45} />
          </Suspense>
        </div>
        {/* Cloud svg */}
        <div className="absolute bottom-0 z-10 hidden w-full md:block right-20 sm:right-0">
          <div className="">
            <CloudSvgLarge className="max-w-full h-[12rem]  sm:h-auto mx-auto   scale-150 sm:scale-100" />
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(Assignment);
