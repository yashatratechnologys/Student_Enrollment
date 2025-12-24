import { useState } from "react";
import { registerStudent } from "../services/api";
import SuccessModal from "./SuccessModal";

const coursesList = ["C Language", "C++", "Java", "Python"];

const EnrollmentForm = () => {
  // ✅ Hooks MUST be inside component
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    qualification: "",
    institute: "",
    branch: "",
    passingYear: "",
    percentage: "",
    courses: [],
    batchPreference: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const toggleCourse = (course) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.includes(course)
        ? prev.courses.filter((c) => c !== course)
        : [...prev.courses, course],
    }));
    setErrors({ ...errors, courses: "" });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.fullName.trim())
      tempErrors.fullName = "Full name is required";

    if (!formData.email)
      tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Enter a valid email address";

    if (!formData.mobile)
      tempErrors.mobile = "Mobile number is required";
    else if (!/^[0-9]{10}$/.test(formData.mobile))
      tempErrors.mobile = "Enter a valid 10-digit mobile number";

    if (formData.courses.length === 0)
      tempErrors.courses = "Please select at least one course";

    if (!formData.batchPreference)
      tempErrors.batchPreference = "Please select batch preference";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await registerStudent(formData);
      setShowModal(true);

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        qualification: "",
        institute: "",
        branch: "",
        passingYear: "",
        percentage: "",
        courses: [],
        batchPreference: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-10">

        <h2 className="text-3xl font-bold text-center text-blue-900 mb-1">
          Student Enrollment Form
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Fill details carefully to enroll
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={`input ${errors.fullName && "border-red-500"}`}
            />
            {errors.fullName && (
              <p className="error">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`input ${errors.email && "border-red-500"}`}
            />
            {errors.email && (
              <p className="error">{errors.email}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className={`input ${errors.mobile && "border-red-500"}`}
            />
            {errors.mobile && (
              <p className="error">{errors.mobile}</p>
            )}
          </div>

          {/* Education */}
          <input
            type="text"
            name="qualification"
            placeholder="Highest Qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="input"
          />

          <input
            type="text"
            name="institute"
            placeholder="College / School Name"
            value={formData.institute}
            onChange={handleChange}
            className="input"
          />

          <input
            type="text"
            name="branch"
            placeholder="Branch / Stream"
            value={formData.branch}
            onChange={handleChange}
            className="input"
          />

          <input
            type="number"
            name="passingYear"
            placeholder="Passing Year"
            value={formData.passingYear}
            onChange={handleChange}
            className="input"
          />

          <input
            type="text"
            name="percentage"
            placeholder="Percentage / CGPA"
            value={formData.percentage}
            onChange={handleChange}
            className="input"
          />

          {/* Courses */}
          <div className="md:col-span-2">
            <p className="font-semibold text-gray-700 mb-2">
              Select Course(s)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {coursesList.map((course) => (
                <label
                  key={course}
                  className={`cursor-pointer border rounded-xl p-3 text-center text-sm font-medium transition
                  ${
                    formData.courses.includes(course)
                      ? "bg-blue-900 text-white"
                      : "bg-gray-50 hover:bg-blue-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    onChange={() => toggleCourse(course)}
                  />
                  {course}
                </label>
              ))}
            </div>
            {errors.courses && (
              <p className="error">{errors.courses}</p>
            )}
          </div>

          {/* Batch */}
          <div className="md:col-span-2">
            <select
              name="batchPreference"
              value={formData.batchPreference}
              onChange={handleChange}
              className={`input ${
                errors.batchPreference && "border-red-500"
              }`}
            >
              <option value="">Select Batch Preference</option>
              <option>Morning</option>
              <option>Evening</option>
              <option>Weekend</option>
            </select>
            {errors.batchPreference && (
              <p className="error">{errors.batchPreference}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="md:col-span-2 bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
          >
            Enroll Now
          </button>
        </form>
      </div>

      {/* ✅ Success Modal */}
      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default EnrollmentForm;
