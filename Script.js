const outputElement = document.getElementById('output');
const inputElement = document.getElementById('code-input');
const activateButton = document.getElementById('activate-button');
const purchaseInfo = document.getElementById('purchase-info');
const purchaseButton = document.getElementById('purchase-button'); // Added reference

let isHacking = false;

// Function to append text to the output with typing effect
function typeMessage(message, delay = 50, callback) {
    let i = 0;
    function typeChar() {
        if (i < message.length) {
            outputElement.textContent += message.charAt(i);
            i++;
            outputElement.scrollTop = outputElement.scrollHeight; // Auto-scroll
            setTimeout(typeChar, delay);
        } else if (callback) {
            outputElement.textContent += '\n'; // Add newline after message
            outputElement.scrollTop = outputElement.scrollHeight; // Auto-scroll
            callback();
        } else {
             outputElement.textContent += '\n'; // Add newline if no callback
             outputElement.scrollTop = outputElement.scrollHeight; // Auto-scroll
        }
    }
    typeChar();
}

// Simulate the hacking process
function startHacking(activationCode) {
    isHacking = true;
    activateButton.disabled = true;
    inputElement.disabled = true;
    outputElement.textContent = ''; // Clear previous output
    purchaseInfo.style.display = 'none'; // Hide purchase info initially

    const steps = [
        { msg: 'Initializing sequence...', delay: 1000 },
        { msg: 'Connecting to pbank secure network...', delay: 1500 },
        { msg: `Authenticating with code: ${activationCode}...`, delay: 1000 },
        { msg: 'Bypassing firewall [Layer 1]...', delay: 800 },
        { msg: 'Bypassing firewall [Layer 2]...', delay: 1200 },
        { msg: 'Accessing primary authentication server...', delay: 1500 },
        { msg: 'Authentication successful. Code accepted.', delay: 500 },
        { msg: 'Establishing secure tunnel...', delay: 1000 },
        { msg: 'Access granted. Welcome.', delay: 500 },
        { msg: '...', delay: 800 },
        { msg: 'SYSTEM WARNING: User IP address not assigned.', delay: 1500, color: '#ffcc00' }, // Warning color
        { msg: 'IP logging active on pbank server.', delay: 1000, color: '#ffcc00' },
        { msg: 'Recommend purchasing IP Tracker to remove logs and trace.', delay: 1000, color: '#ffcc00' }
    ];

    let currentStep = 0;

    function nextStep() {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            if (step.color) {
                outputElement.innerHTML += `<span style="color:${step.color};"></span>`; // Add span for color
                const span = outputElement.querySelector('span:last-child');
                typeMessageWithElement(span, step.msg, 50, () => {
                     setTimeout(nextStep, step.delay);
                });

            } else {
                 typeMessage(step.msg, 50, () => {
                    setTimeout(nextStep, step.delay);
                 });
            }
            currentStep++;
        } else {
            // Hacking simulation finished
            isHacking = false;
            activateButton.disabled = false;
            inputElement.disabled = false;
            inputElement.value = ''; // Clear input
            inputElement.focus();
            purchaseInfo.style.display = 'block'; // Show purchase info
        }
    }

    // Modified typeMessage to work with a specific element (for color)
    function typeMessageWithElement(element, message, delay = 50, callback) {
        let i = 0;
        function typeChar() {
            if (i < message.length) {
                element.textContent += message.charAt(i);
                i++;
                outputElement.scrollTop = outputElement.scrollHeight; // Auto-scroll
                setTimeout(typeChar, delay);
            } else if (callback) {
                 outputElement.innerHTML += '\n'; // Use innerHTML to add newline after span
                 outputElement.scrollTop = outputElement.scrollHeight; // Auto-scroll
                 callback();
            } else {
                 outputElement.innerHTML += '\n';
                 outputElement.scrollTop = outputElement.scrollHeight; // Auto-scroll
            }
        }
        typeChar();
    }


    nextStep(); // Start the sequence
}


activateButton.addEventListener('click', () => {
    const code = inputElement.value.trim();
    if (code && !isHacking) {
        startHacking(code);
    } else if (!code) {
         outputElement.textContent += '\n> ERROR: Activation code cannot be empty.\n';
         outputElement.scrollTop = outputElement.scrollHeight;
    }
});

inputElement.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isHacking) {
        activateButton.click(); // Trigger button click on Enter
    }
});

// Placeholder for purchase button action
purchaseButton.addEventListener('click', () => {
    if (isHacking) return; // Don't do anything if hacking is in progress

    outputElement.textContent += '\n> Initializing secure purchase protocol...\n';
    outputElement.scrollTop = outputElement.scrollHeight;

    // --- Flutterwave API Placeholder ---
    // This is where you would typically initiate the payment process.
    // 1. Call your backend server to create a payment link/session.
    // 2. Your backend interacts with Flutterwave's API using your secret key.
    // 3. Your backend returns a payment link or parameters to the frontend.
    // 4. Redirect the user or open the Flutterwave checkout modal.
    console.log("--- Flutterwave Integration Point ---");
    console.log("1. Send request to backend to initiate payment for IP Tracker.");
    console.log("2. Backend interacts with Flutterwave API.");
    console.log("3. Redirect user or use Flutterwave Inline JS.");
    // Example using hypothetical function:
    // initiateFlutterwavePayment({ amount: 50, currency: 'USD', user: 'hacker123', item: 'IP Tracker' });
    // --- End Flutterwave Placeholder ---

    // Simulate a delay and response for the demo
    purchaseButton.disabled = true;
    purchaseButton.textContent = 'Processing...';
    setTimeout(() => {
        typeMessage("> Purchase module requires backend integration (See console). Simulating completion.", 50, () => {
             typeMessage("> IP Tracker functionality sort code:Not Activated.", 50, () => {
                purchaseButton.textContent = 'Purchase IP Tracker';
                purchaseButton.disabled = false;
                purchaseInfo.style.display = 'none'; // Hide after "purchase"
             });
        });
    }, 2000);
});

// Initial message
typeMessage("PBank Secure Activation Terminal v1.3\nReady. Enter activation code.", 30);
inputElement.focus();

      
