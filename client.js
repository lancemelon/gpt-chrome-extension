document.getElementById("submit").addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const responseElement = document.getElementById("response");
    const inputElement = document.getElementById("question");

    const question = inputElement.value;

    try {
        // LOCAL HOST USE ONLY
        const res = await fetch("http://localhost:3000/ask", {
            method: "POST", // Ensure method is POST
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question }), // Send question as JSON
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json(); // Parse JSON response
        responseElement.textContent = data.answer; // Display the answer
    } catch (error) {
        console.error("Error fetching data:", error);
        responseElement.textContent = "Error fetching response.";
    }
});
