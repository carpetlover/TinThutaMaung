// Display welcoming pop-up message only on index page
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has seen the welcome message during this session
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');

    // Only show modal if user hasn't seen it during this session
    if (!hasSeenWelcome) {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'welcome-modal-overlay';

        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.id = 'welcome-modal';
        modalContainer.innerHTML = `
            <div class="modal-content">
                <h1>Welcome to Los Pollos Hermanos!</h1>
                <p>Experience the finest quality chicken and family recipes passed down through generations.</p>
                <p>Every dish is prepared with precision, consistency, and care.</p>
                <button id="close-modal">Enter</button>
            </div>
        `;

        // Append modal to overlay
        modalOverlay.appendChild(modalContainer);

        // Insert modal into body
        document.body.appendChild(modalOverlay);

        // Close modal functionality
        const closeButton = document.getElementById('close-modal');
        closeButton.addEventListener('click', function() {
            modalOverlay.style.opacity = '0';
            setTimeout(function() {
                modalOverlay.remove();
            }, 300);
            // Mark that user has seen the welcome message for this session
            sessionStorage.setItem('hasSeenWelcome', 'true');
        });

        // Also close when clicking outside the modal
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.style.opacity = '0';
                setTimeout(function() {
                    modalOverlay.remove();
                }, 300);
                // Mark that user has seen the welcome message for this session
                sessionStorage.setItem('hasSeenWelcome', 'true');
            }
        });
    }

    // Create interactive user input section
    createUserInputSection();
});

// Interactive function to take user input and display personalized message
function createUserInputSection() {
    const inputSection = document.createElement('div');
    inputSection.id = 'user-input-section';
    inputSection.innerHTML = `
        <div class="input-container">
            <h2>Help Us Improve Our Menu!</h2>
            <p>What is your favorite dish?</p>
            <input type="text" id="favorite-dish" placeholder="Enter your favorite dish..." />
            <button id="submit-dish">Submit</button>
            <div id="response-message"></div>
        </div>
    `;

    // Insert at the top of the body content
    const bodyDiv = document.querySelector('#body');
    if (bodyDiv) {
        bodyDiv.insertBefore(inputSection, bodyDiv.firstChild);
    }

    // Handle user input submission
    const submitButton = document.getElementById('submit-dish');
    const inputField = document.getElementById('favorite-dish');
    const responseDiv = document.getElementById('response-message');

    submitButton.addEventListener('click', function() {
        handleDishSubmission(inputField, responseDiv);
    });

    // Allow Enter key to submit
    inputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleDishSubmission(inputField, responseDiv);
        }
    });
}

// Handle the dish submission and display personalized response
function handleDishSubmission(inputField, responseDiv) {
    const favoriteDish = inputField.value.trim();

    if (favoriteDish === '') {
        responseDiv.innerHTML = '<p class="error-message">Please enter a dish name!</p>';
        responseDiv.style.display = 'block';
        return;
    }

    // Display personalized message
    responseDiv.innerHTML = `
        <p class="success-message">
            Thank you! We will consider putting <strong>${favoriteDish}</strong> in our menu!
            Your feedback helps us serve you better.
        </p>
    `;
    responseDiv.style.display = 'block';

    // Clear input field
    inputField.value = '';

    // Add animation
    responseDiv.style.animation = 'fadeIn 0.5s ease-in';
}
