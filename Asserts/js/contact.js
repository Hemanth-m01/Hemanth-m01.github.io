const form = document.querySelector(".contact-form");
const loader = document.getElementById("loader");
const popover = document.getElementById("popover");
const responseDiv = document.querySelector(".response");

// Define success and error images
const successImg = 'Asserts/images/success.png';
const errorImg = "Asserts/images/error.png";

// Hide popover initially
popover.style.display = "none";

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission
  loader.style.display = "block"; // Show loader

  // Collecting checked services
  const services = Array.from(
    document.querySelectorAll('input[name="services"]:checked')
  )
    .map((checkbox) => checkbox.value)
    .join(", ");

  // Creating form data and adding the services string
  const formData = new FormData(form);
  formData.set("services", services); // Update 'services' with the comma-separated values

  try {
    // Sending data to Google Sheets
    const response = await fetch(scriptURL, { method: "POST", body: formData });

    if (response.ok) {
      responseDiv.innerHTML = `<img src="${successImg}" alt="Success" class="response-img" /> <br> <br> <span class="success">Form submitted successfully!</span><br> <br>`;
    } else {
      throw new Error("Network response was not ok.");
    }
  } catch (error) {
    responseDiv.innerHTML = `<img src="${errorImg}" alt="Error" class="response-img" /> <br> <br><span class="error">Error submitting the form. Please try again <span><br> <br>`;
    console.error("Error!", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
    popover.style.display = "block"; // Show popover
  }
});
// close the popover
function closePopover() {
  popover.style.display = "none";
  // Reset form values if needed
  document.getElementById("contactForm").reset();
}
