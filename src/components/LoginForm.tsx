import React, { useState, useRef } from "react";

type FormType = "login" | "signup" | "forgot-password";
type customAuthMessageType = {
  type: "success" | "error" | "info";
  content: string;
};

const LoginForm: React.FC = () => {
  const [formType, setFormType] = useState<FormType>("login");
  const [customAuthMessages, setCustomAuthMessages] = useState<
    customAuthMessageType[]
  >([]);
  const authForm = useRef<HTMLFormElement>(null);

  // Function to check if all required fields are filled
  const checkRequiredFields = (
    formData: FormData,
    ...requiredFields: string[]
  ) =>
    requiredFields
      .map((x) => formData.get(x)?.toString().trim())
      .every(Boolean);

  // Function to handle form submission (**Example**)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (formType === "forgot-password") {
      /* Handle form submission (Forgot Password) */

      // Check if all required fields are filled
      if (!checkRequiredFields(formData, "email")) {
        alert("Please fill all the required fields!");
        return;
      }

      setCustomAuthMessages(() => [
        {
          type: "info",
          content: "Password reset link has been sent to your email!",
        },
      ]); // **Replace with actual forget-password logic**
      authForm.current?.reset();
      return;
    }

    if (formType === "signup") {
      /* Handle form submission (Sign Up) */

      // Check if all required fields are filled
      if (
        !checkRequiredFields(
          formData,
          "first_name",
          "email",
          "password",
          "confirm_password",
        )
      ) {
        alert("Please fill all the required fields!");
        return;
      }

      // Check if email format is valid
      const isEmailValid =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          formData.get("email")?.toString().trim() || "",
        );
      console.log("isEmailValid", isEmailValid);
      if (!isEmailValid) {
        alert("Invalid email format. Please use a valid email address!");
        return;
      }

      // Check if password format is valid
      const isPasswordValid =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$#%^&*()-+]).{8,}$/.test(
          formData.get("password")?.toString().trim() || "",
        );
      console.log("isPasswordValid", isPasswordValid);
      if (!isPasswordValid) {
        alert(
          "Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one digit, and one special character.",
        );
        return;
      }

      alert("Registration successfull"); // **Replace with actual registration logic**
      authForm.current?.reset();
      return;
    }

    /* Handle form submission (Log In) */

    // Check if all required fields are filled
    if (!checkRequiredFields(formData, "email", "password")) {
      alert("Please fill all the required fields!");
      return;
    }

    alert("Login successfull"); // **Replace with actual login logic**
    authForm.current?.reset();
    return;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#3c6ff5] to-[#4c0bf4] px-4 py-2 md:px-0 md:py-0">
      <div className="rounded-xl bg-white px-10 py-8 shadow-lg md:w-96 md:rounded-[3rem] md:px-14 md:py-12 lg:w-[33.25rem]">
        <h2 className="mb-6 text-center text-xl font-bold">
          {formType === "signup"
            ? "Create a New Account"
            : formType === "forgot-password"
              ? "Recover Your Account Password"
              : "Log In to Your Account"}
        </h2>
        {!customAuthMessages.length ? (
          <>
            <form ref={authForm} onSubmit={handleSubmit}>
              {formType === "signup" && (
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      className="block text-sm font-bold text-gray-700"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="first_name"
                      placeholder="Enter you first name"
                      className="mt-1 w-full border-2 border-gray-300 border-opacity-40 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min={2}
                      required={true}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-bold text-gray-700"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="last_name"
                      placeholder="Enter you last name"
                      className="mt-1 w-full border-2 border-gray-300 border-opacity-40 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min={2}
                      required={false}
                    />
                  </div>
                </div>
              )}
              <div className="mb-4">
                <label
                  className="block text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="janedoe@mail.com"
                  className="mt-1 w-full border-2 border-gray-300 border-opacity-40 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Please enter a valid email address (e.g., janedoe@mail.com)"
                  required={true}
                />
              </div>

              {["login", "signup"].includes(formType) && (
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="mt-1 w-full border-2 border-gray-300 border-opacity-40 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$#%^&*()-+]).{8,}$"
                    title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character from @$#%^&*-+()"
                    min={8}
                    required={true}
                  />
                </div>
              )}

              {formType === "signup" && (
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold text-gray-700"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirm_password"
                    placeholder="Confirm your password"
                    className="mt-1 w-full border-2 border-gray-300 border-opacity-40 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={true}
                  />
                </div>
              )}

              <div className="mb-4 text-center">
                <button
                  type="submit"
                  className="my-2 min-w-[15ch] rounded-3xl bg-black px-5 py-3 text-white transition-colors hover:bg-gray-800"
                >
                  {formType === "signup"
                    ? "Sign Up"
                    : formType === "forgot-password"
                      ? "Recover"
                      : "Log In"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="mb-4 text-center text-sm font-semibold">
            {customAuthMessages.map((message, index) => (
              <p
                key={index}
                className={`mb-2 ${message.type === "success" ? "text-green-600" : message.type === "error" ? "text-red-600" : "text-gray-600"}`}
              >
                {message.content}
              </p>
            ))}
          </div>
        )}

        <div className="md:text-md mt-4 space-x-5 text-center text-sm font-semibold">
          <button
            onClick={
              formType === "login"
                ? () => {
                    setFormType("signup");
                    setCustomAuthMessages(() => []);
                  }
                : () => {
                    setFormType("login");
                    setCustomAuthMessages(() => []);
                  }
            }
          >
            {formType === "login" ? "Create an account" : "Back to login"}
          </button>
          {formType === "login" && (
            <button onClick={() => setFormType("forgot-password")}>
              Forgot password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
