import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">

      <h1>Contact Us</h1>

      <p className="contact-subtitle">
        We'd love to hear from you.
      </p>

      <div className="contact-container">

        <form className="contact-form">

          <input
            type="text"
            placeholder="Enter Name"
          />

          <input
            type="email"
            placeholder="Enter Email"
          />

          <input
            type="text"
            placeholder="Subject"
          />

          <textarea
            placeholder="Enter Message"
            rows="6"
          />

          <button type="submit">
            Send Message
          </button>

        </form>

      </div>

    </div>
  );
}

export default Contact;