// Array to hold appointment objects
let appointments = [];

// Function to add a new appointment
const addAppointment = () => {
    try {
        // Get values from the form
        const clientName = document.getElementById('clientName').value;
        const appointmentTime = new Date(document.getElementById('appointmentTime').value);
        const serviceType = document.getElementById('serviceType').value;

        // Validate the input
        if (!clientName.trim()) {
            throw new Error("Client name cannot be empty.");
        }

        if (isNaN(appointmentTime)) {
            throw new Error("Invalid appointment time.");
        }

        // Add the appointment to the array
        const newAppointment = { clientName, appointmentTime, serviceType };
        appointments.push(newAppointment);

        // Clear input fields
        document.getElementById('clientName').value = '';
        document.getElementById('appointmentTime').value = '';
        
        // Display the updated list of appointments
        displayUpcomingAppointments();

        // Schedule a reminder for this appointment
        scheduleReminder(newAppointment);
    } catch (error) {
        alert(error.message);
    }
};

// Function to display upcoming appointments (next hour)
const displayUpcomingAppointments = () => {
    const currentTime = new Date();
    const nextHour = new Date(currentTime.getTime() + 60 * 60 * 1000); // One hour ahead
    
    const upcomingAppointments = appointments.filter(appointment => {
        return appointment.appointmentTime >= currentTime && appointment.appointmentTime <= nextHour;
    });

    const listElement = document.getElementById('appointmentsList');
    listElement.innerHTML = ''; // Clear current list

    upcomingAppointments.forEach(appointment => {
        const listItem = document.createElement('li');
        listItem.textContent = `Client: ${appointment.clientName}, Service: ${appointment.serviceType}, Time: ${appointment.appointmentTime.toLocaleString()}`;
        listElement.appendChild(listItem);
    });
};

// Function to send reminder when the appointment time approaches
const scheduleReminder = (appointment) => {
    const currentTime = new Date();
    const timeDifference = appointment.appointmentTime.getTime() - currentTime.getTime();

    // Reminder 5 minutes before the appointment
    if (timeDifference > 0 && timeDifference <= 5 * 60 * 1000) {
        setTimeout(() => {
            alert(`Reminder: Your appointment for ${appointment.serviceType} with ${appointment.clientName} is scheduled at ${appointment.appointmentTime.toLocaleString()}`);
        }, timeDifference);
    }
};

// Call this function to display appointments when the page loads
displayUpcomingAppointments();
