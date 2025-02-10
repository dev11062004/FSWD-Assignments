// Array to store the study session objects
let studySessions = [];

// Function to add a new study session
const addSession = () => {
    try {
        // Get input values from the form
        const topic = document.getElementById('topic').value;
        const sessionTime = new Date(document.getElementById('sessionTime').value);
        const duration = parseInt(document.getElementById('duration').value);

        // Validate input
        if (!topic.trim()) {
            throw new Error("Topic cannot be empty.");
        }
        if (isNaN(duration) || duration <= 0) {
            throw new Error("Duration must be a positive number.");
        }
        if (isNaN(sessionTime.getTime())) {
            throw new Error("Invalid session time.");
        }

        // Create a new session object
        const newSession = { topic, sessionTime, duration };

        // Add the new session to the array
        studySessions.push(newSession);

        // Clear form inputs
        document.getElementById('topic').value = '';
        document.getElementById('sessionTime').value = '';
        document.getElementById('duration').value = '';

        // Display today's sessions
        displayTodaysSessions();
    } catch (error) {
        alert(error.message);
    }
};

// Function to display today's sessions
const displayTodaysSessions = () => {
    const listElement = document.getElementById('todaysSessions');
    listElement.innerHTML = ''; // Clear current list

    const today = new Date();
    const todayStart = new Date(today.setHours(0, 0, 0, 0));
    const todayEnd = new Date(today.setHours(23, 59, 59, 999));

    // Filter sessions scheduled for today
    const todaysSessions = studySessions.filter(session => {
        return session.sessionTime >= todayStart && session.sessionTime <= todayEnd;
    });

    // Display sessions in the list
    todaysSessions.forEach(session => {
        const listItem = document.createElement('li');
        listItem.textContent = `${session.topic} - ${session.sessionTime.toLocaleTimeString()} - Duration: ${session.duration} mins`;
        listElement.appendChild(listItem);
    });
};

// Function to start a countdown for the next session
const startSessionCountdown = () => {
    const upcomingSession = studySessions.find(session => session.sessionTime > new Date());

    if (upcomingSession) {
        const timeToSession = upcomingSession.sessionTime.getTime() - new Date().getTime();
        setTimeout(() => {
            alert(`Session on "${upcomingSession.topic}" starts now!`);
        }, timeToSession);
    } else {
        alert("No upcoming sessions found.");
    }
};

// Simulate fetching study materials asynchronously for a given topic
const fetchStudyMaterials = async () => {
    const topic = prompt("Enter the topic to fetch materials for:");

    if (!topic) {
        alert("Please enter a valid topic.");
        return;
    }

    try {
        const materials = await fetchMaterials(topic);
        console.log("Study Materials for topic:", topic);
        console.log(materials);
        alert(`Materials for "${topic}" fetched successfully! Check the console.`);
    } catch (error) {
        alert(error.message);
    }
};

// Simulate an asynchronous function that returns study materials
const fetchMaterials = (topic) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const materials = [
                { topic: topic, content: "Introduction to " + topic },
                { topic: topic, content: "Advanced topics in " + topic },
            ];
            if (materials.length > 0) {
                resolve(materials);
            } else {
                reject("No materials found for this topic.");
            }
        }, 2000); // Simulate delay (2 seconds)
    });
};
