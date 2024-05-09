import React, { useState } from 'react';

function FacultyComponent() {
    const [facultyInfo, setFacultyInfo] = useState({
        name: '',
        department: '',
        contactNumber: ''
    });
    const [tickets, setTickets] = useState({
        count: 0,
        downloaded: false
    });
    const [feedback, setFeedback] = useState("");
    const [feedbackGiven, setFeedbackGiven] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFacultyInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleTicketsChange = (e) => {
        const ticketCount = parseInt(e.target.value, 10);
        if (ticketCount >= 0 && ticketCount <= 3) {
            setTickets({ ...tickets, count: ticketCount });
        }
    };

    const downloadTickets = () => {
        if (tickets.count > 0) {
            setTickets({ ...tickets, downloaded: true });
        }
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const submitFeedback = (e) => {
        e.preventDefault();
        if (tickets.downloaded && feedback.trim() !== "") {
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
            <h1>Faculty Dashboard</h1>
            <form style={style.form}>
                <label style={style.label}>Name:</label>
                <input style={style.input} name="name" value={facultyInfo.name} onChange={handleInputChange} required />
                <label style={style.label}>Department:</label>
                <input style={style.input} name="department" value={facultyInfo.department} onChange={handleInputChange} required />
                <label style={style.label}>Contact Number:</label>
                <input style={style.input} name="contactNumber" value={facultyInfo.contactNumber} onChange={handleInputChange} required />
                <label style={style.label}>Number of Tickets (max 3):</label>
                <input style={style.input} type="number" value={tickets.count} onChange={handleTicketsChange} min="0" max="3" />
                <button type="button" style={style.button} onClick={downloadTickets} onMouseOver={e => e.target.style.backgroundColor = style.buttonHover.backgroundColor} onMouseOut={e => e.target.style.backgroundColor = style.button.backgroundColor}>Download Tickets</button>
            </form>
            {tickets.downloaded && !feedbackGiven && (
                <form onSubmit={submitFeedback} style={style.form}>
                    <textarea style={{ ...style.input, ...style.textarea }} value={feedback} onChange={handleFeedbackChange} placeholder="Enter your feedback here..." required />
                    <button type="submit" style={style.button} onMouseOver={e => e.target.style.backgroundColor = style.buttonHover.backgroundColor} onMouseOut={e => e.target.style.backgroundColor = style.button.backgroundColor}>Submit Feedback</button>
                </form>
            )}
            {feedbackGiven && <p>Thank you for your feedback!</p>}
        </div>
    );
}

export default FacultyComponent;
