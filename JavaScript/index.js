import { db } from "/FireBase/Firebase.config.js";

import {
    ref,
    push,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-database.js";


const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");
const submitButton = contactForm.querySelector('button[type="submit"]');


// Show Message
function showStatus(message, type) {
    contactStatus.textContent = message;
    contactStatus.className = `contact-status ${type}`;
}


// Contact Form Submit
contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const formData = new FormData(contactForm);

    const name = formData.get("name").trim();
    const phone = formData.get("phone").trim();
    const email = formData.get("email").trim();
    const address = (formData.get("address") || "").trim();
    const subject = formData.get("subject").trim();
    const message = (formData.get("message") || "").trim();

    // Phone Validation
    const phoneDigits = phone.replace(/\D/g, "");

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        showStatus("Please enter a valid phone number.", "error");
        return;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showStatus("Please enter a valid email address.", "error");
        return;
    }

    // Firebase Data
    const contactDetails = {
    name,
    phone,
    email,
    address: address || "User Don't Added Address", 
    subject,
    message: message || "No additional information",
    submittedAt: serverTimestamp()
};

    try {

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        // Save Data in Firebase
        await push(ref(db, "contactMessages"), contactDetails);

        showStatus(
            "Thank you! Your message has been submitted successfully.",
            "success"
        );

        contactForm.reset();

    } catch (error) {

        console.error("Firebase Error:", error);

        showStatus(
            "Something went wrong. Please try again.",
            "error"
        );

    } finally {

        submitButton.disabled = false;
        submitButton.textContent = "Send Message";

    }

});
