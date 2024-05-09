import React, { useState, useEffect } from 'react';

function AdminComponent() {
    const [tickets, setTickets] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [bookingEnabled, setBookingEnabled] = useState(true);
    const [ticketOperationsEnabled, setTicketOperationsEnabled] = useState(true);
    const [busAssignments, setBusAssignments] = useState([]);

    // This function simulates retrieving feedbacks from a server
    const fetchFeedbacks = () => {
        // Simulate fetching feedback from an API
        setFeedbacks([
            { id: 1, text: "Great service!", studentId: 123 },
            { id: 2, text: "The bus was late.", studentId: 456 },
        ]);
    };

    // useEffect to simulate fetching initial data
    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const generateTicket = (studentId) => {
        if (!bookingEnabled) return;  // Check if booking is enabled
        const newTicket = { id: tickets.length + 1, studentId: studentId };
        setTickets([...tickets, newTicket]);
        console.log(`Ticket generated for student ${studentId}`);
    };

    const assignBus = (studentId, busId) => {
        const assignment = { studentId, busId };
        setBusAssignments([...busAssignments, assignment]);
        console.log(`Bus ${busId} assigned to student ${studentId}`);
    };

    const toggleBooking = () => {
        setBookingEnabled(!bookingEnabled);
        setTicketOperationsEnabled(!bookingEnabled);  // Disable ticket operations when booking is disabled
    };

    const toggleTicketOperations = () => {
        setTicketOperationsEnabled(!ticketOperationsEnabled);
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={toggleBooking}>{bookingEnabled ? "Disable" : "Enable"} Booking</button>
            <button onClick={toggleTicketOperations}>{ticketOperationsEnabled ? "Disable" : "Enable"} Ticket Operations</button>
            <h2>Bus Assignments</h2>
            {busAssignments.map((assignment, index) => (
                <div key={index}>
                    Student ID: {assignment.studentId}, Bus ID: {assignment.busId}
                </div>
            ))}
            <h2>Feedbacks</h2>
            {feedbacks.map(feedback => (
                <div key={feedback.id}>
                    Student {feedback.studentId}: {feedback.text}
                </div>
            ))}
        </div>
    );
}

export default AdminComponent;
