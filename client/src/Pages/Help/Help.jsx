import "./Help.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  FaArrowLeft,
  FaQuestionCircle,
  FaBug,
  FaBook,
  FaEnvelope,
  FaShieldAlt,
  FaFileContract,
  FaInfoCircle,
} from "react-icons/fa";

import { createBugReport } from "../../api/bugReportApi";

function Help() {

  const navigate = useNavigate();
  const { user } = useAuth();

  const [report, setReport] = useState("");

  const faqs = [
    {
      question: "How do I create a project?",
      answer:
        "Navigate to Create Project from the Project Lead Dashboard and fill in the required details.",
    },
    {
      question: "How can I join a project?",
      answer:
        "Open the Projects page and click Join Request on any available project.",
    },
    {
      question: "How do I update my profile?",
      answer:
        "Go to your Profile page and click Edit Profile to update your information.",
    },
    {
      question: "How can I contact support?",
      answer:
        "Use the Contact Support section below or submit a bug report.",
    },
  ];

  const handleSubmit = async () => {

    if (!report.trim()) {
      alert("Please describe the issue.");
      return;
    }

    try {

      await createBugReport({

        user: user._id,

        userName: user.userName,

        email: user.email,

        report,

      });

      alert("Bug Report Submitted Successfully!");

      setReport("");

    } catch (error) {

      console.log(error);

      alert("Unable to submit bug report.");

    }

  };

  return (

    <div className="help-page">

      <div className="help-container">

        <div className="help-header">

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>

          <h1>Help Center</h1>

        </div>

        {/* FAQ */}

        <div className="help-card">

          <h2>

            <FaQuestionCircle />

            Frequently Asked Questions

          </h2>

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="faq-item"
            >

              <h3>{faq.question}</h3>

              <p>{faq.answer}</p>

            </div>

          ))}

        </div>

        {/* Contact */}

        <div className="help-card">

          <h2>

            <FaEnvelope />

            Contact Support

          </h2>

          <p>

            <strong>Email :</strong>

            support@devconnect.com

          </p>

          <p>

            <strong>Phone :</strong>

            +91 9876543210

          </p>

          <p>

            <strong>Working Hours :</strong>

            Monday - Friday (9 AM - 6 PM)

          </p>

        </div>

        {/* Bug Report */}

        <div className="help-card">

          <h2>

            <FaBug />

            Report a Bug

          </h2>

          <textarea
            rows="6"
            placeholder="Describe the issue you encountered..."
            value={report}
            onChange={(e) =>
              setReport(e.target.value)
            }
          />

          <button
            className="submit-btn"
            onClick={handleSubmit}
          >

            Submit Report

          </button>

        </div>

        {/* User Guide */}

        <div className="help-card">

          <h2>

            <FaBook />

            User Guide

          </h2>

          <ul>

            <li>Create your profile.</li>

            <li>Join developer communities.</li>

            <li>Join projects.</li>

            <li>Collaborate using project chat.</li>

            <li>Track project progress.</li>

            <li>Update your profile regularly.</li>

          </ul>

        </div>

        {/* Privacy */}

        <div className="help-card">

          <h2>

            <FaShieldAlt />

            Privacy Policy

          </h2>

          <p>

            DevConnect securely stores user information.
            Personal details are never shared with third parties without permission.

          </p>

        </div>

        {/* Terms */}

        <div className="help-card">

          <h2>

            <FaFileContract />

            Terms & Conditions

          </h2>

          <p>

            Users should maintain respectful communication,
            follow community guidelines,
            and use DevConnect responsibly.

          </p>

        </div>

        {/* About */}

        <div className="help-card">

          <h2>

            <FaInfoCircle />

            About DevConnect

          </h2>

          <p>

            DevConnect is a collaborative platform where students,
            developers, project leaders, and administrators work together,
            build projects, join communities,
            improve technical skills,
            and collaborate effectively.

          </p>

        </div>

      </div>

    </div>

  );

}

export default Help;