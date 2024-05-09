import React, { useState } from 'react';

function StudentComponent() {
    const [studentInfo, setStudentInfo] = useState({
        name: '',
        cnic: '',
        registrationNumber: '',
        contactNumber: ''
    });
    const [paymentInfo, setPaymentInfo] = useState({
        iban: '',
        expiryDate: '',
        cardName: ''
    });
    const [ticket, setTicket] = useState({ booked: false, paid: false, canCancel: false });
    const [ticketDownloaded, setTicketDownloaded] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [feedbackGiven, setFeedbackGiven] = useState(false);

    const handleInputChange = (e, stateSetter) => {
        const { name, value } = e.target;
        stateSetter(prev => ({ ...prev, [name]: value }));
    };

    const bookTicket = (e) => {
        e.preventDefault();
        setTicket({ ...ticket, booked: true });
    };

    const handlePaymentSubmission = (e) => {
        e.preventDefault();
        if (paymentInfo.iban && paymentInfo.expiryDate && paymentInfo.cardName) {
            setTicket({ ...ticket, paid: true, canCancel: true });
        }
    };

    const downloadTicket = () => {
        if (ticket.paid && !ticketDownloaded) {
            setTicketDownloaded(true);
            setTicket(prevTicket => ({ ...prevTicket, canCancel: false }));
        }
    };

    const cancelTicket = () => {
        if (ticket.canCancel) {
            setTicket({ booked: false, paid: false, canCancel: false });
            setTicketDownloaded(false);
        }
    };

    // Function to handle changes to the feedback textarea
    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const submitFeedback = (e) => {
        e.preventDefault();
        if (ticketDownloaded && feedback.trim() !== "") {
            setFeedbackGiven(true);
            console.log("Feedback submitted:", feedback);
            setFeedback("");
        }
    };

    const style = {
        container: {
            padding: '20px',
            maxWidth: '600px',
            margin: '0 auto',
            background: 'linear-gradient(to right, #ff9966 0%, #ff5e62 100%)',
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        },
        form: { display: 'flex', flexDirection: 'column', marginBottom: '20px' },
        input: { marginBottom: '10px', padding: '10px', fontSize: '16px', backgroundColor: 'rgba(255,255,255,0.8)' },
        button: { padding: '10px 20px', cursor: 'pointer', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none' },
        buttonHover: { backgroundColor: '#45a049' },
        textarea: { padding: '10px', fontSize: '16px' },
        label: { marginBottom: '5px', fontWeight: 'bold' }
    };

    return (
        <div style={style.container}>
            <h1>Student Dashboard</h1>
            {!ticket.booked && (
                <form onSubmit={bookTicket} style={style.form}>
                    <label style={style.label}>Name:</label>
                    <input style={style.input} name="name" value={studentInfo.name} onChange={(e) => handleInputChange(e, setStudentInfo)} required />
                    <label style={style.label}>CNIC:</label>
                    <input style={style.input} name="cnic" value={studentInfo.cnic} onChange={(e) => handleInputChange(e, setStudentInfo)} required />
                    <label style={style.label}>Registration Number:</label>
                    <input style={style.input} name="registrationNumber" value={studentInfo.registrationNumber} onChange={(e) => handleInputChange(e, setStudentInfo)} required />
                    <label style={style.label}>Contact Number:</label>
                    <input style={style.input} name="contactNumber" value={studentInfo.contactNumber} onChange={(e) => handleInputChange(e, setStudentInfo)} required />
                    <button type="submit" style={style.button} onMouseOver={e => e.target.style.backgroundColor = style.buttonHover.backgroundColor} onMouseOut={e => e.target.style.backgroundColor = style.button.backgroundColor}>Book Ticket</button>
                </form>
            )}
            {ticket.booked && !ticket.paid && (
                <form onSubmit={handlePaymentSubmission} style={style.form}>
                    <label style={style.label}>Cardholder's Name:</label>
                    <input style={style.input} name="cardName" value={paymentInfo.cardName} onChange={(e) => handleInputChange(e, setPaymentInfo)} required />
                    <label style={style.label}>IBAN:</label>
                    <input style={style.input} name="iban" value={paymentInfo.iban} onChange={(e) => handleInputChange(e, setPaymentInfo)} required />
                    <label style={style.label}>Expiry Date:</label>
                    <input style={style.input} name="expiryDate" value={paymentInfo.expiryDate} onChange={(e) => handleInputChange(e, setPaymentInfo)} required />
                    <button type="submit" style={style.button} onMouseOver={e => e.target.style.backgroundColor = style.buttonHover.backgroundColor} onMouseOut={e => e.target.style.backgroundColor = style.button.backgroundColor}>Submit Payment</button>
                </form>
            )}
            {ticket.paid && (
                <>
                    <button style={style.button} onClick={downloadTicket} onMouseOver={e => e.target.style.backgroundColor = style.buttonHover.backgroundColor} onMouseOut={e => e.target.style.backgroundColor = style.button.backgroundColor}>Download Ticket</button>
                    {ticket.canCancel && <button style={style.button} onClick={cancelTicket} onMouseOver={e => e.target.style.backgroundColor = style.buttonHover.backgroundColor} onMouseOut={e => e.target.style.backgroundColor = style.button.backgroundColor}>Cancel Ticket</button>}
                </>
            )}
            {ticketDownloaded && !feedbackGiven && (
                <form onSubmit={submitFeedback} style={style.form}>
                    <textarea style={{ ...style.input, ...style.textarea }} value={feedback} onChange={handleFeedbackChange} placeholder="Enter your feedback here..." required />
                    <button type="submit" style={style.button} onMouseOver={e => e.target.style.backgroundColor = style.buttonHover.backgroundColor} onMouseOut={e => e.target.style.backgroundColor = style.button.backgroundColor}>Submit Feedback</button>
                </form>
            )}
            {feedbackGiven && <p>Thank you for your feedback!</p>}
        </div>
    );
}

export default StudentComponent;
