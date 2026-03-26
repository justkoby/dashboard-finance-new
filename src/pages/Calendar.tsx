import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatWidget from '../components/ChatWidget';
import { 
  FaChevronLeft, FaChevronRight, FaRegCalendarAlt, FaClock
} from 'react-icons/fa';
import './Calendar.css';

export default function Calendar() {
  const [currentDate] = useState(new Date(2025, 5, 15)); // June 2025
  
  const events = [
    { day: 5, title: "PAYE Filing Deadline", type: "tax", priority: "high" },
    { day: 12, title: "MTN Invoice Due (INV-024)", type: "invoice", priority: "medium" },
    { day: 15, title: "Staff Payroll Processing", type: "payroll", priority: "high" },
    { day: 20, title: "SSNIT Contribution Due", type: "tax", priority: "high" },
    { day: 28, title: "Derrer Energy Milestone Payment", type: "milestone", priority: "medium" },
  ];

  const daysInMonth = 30;
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="dashboard calendar-page">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <div className="page-header">
             <div className="title-area">
                <h1>Financial Calendar</h1>
                <p>Track tax deadlines, invoice due dates, and major financial milestones.</p>
             </div>
             <div className="action-buttons">
                <button className="black-btn"><FaRegCalendarAlt /> Sync Google Calendar</button>
             </div>
          </div>

          <div className="calendar-layout">
             <div className="calendar-main">
                <div className="calendar-header">
                   <h2>June 2025</h2>
                   <div className="cal-nav">
                      <button className="icon-btn"><FaChevronLeft /></button>
                      <button className="icon-btn"><FaChevronRight /></button>
                   </div>
                </div>

                <div className="calendar-grid">
                   <div className="weekday">Sun</div><div className="weekday">Mon</div><div className="weekday">Tue</div>
                   <div className="weekday">Wed</div><div className="weekday">Thu</div><div className="weekday">Fri</div><div className="weekday">Sat</div>
                   
                   {/* Empty spaces for start of month - Simplified */}
                   <div className="day empty"></div>
                   
                   {calendarDays.map(day => {
                      const dayEvents = events.filter(e => e.day === day);
                      return (
                         <div key={day} className={`day ${day === 15 ? 'today' : ''}`}>
                            <span className="day-num">{day}</span>
                            <div className="day-events">
                               {dayEvents.map((e, idx) => (
                                  <div key={idx} className={`event-dot ${e.type}`} title={e.title}></div>
                               ))}
                            </div>
                         </div>
                      );
                   })}
                </div>
             </div>

             <div className="calendar-sidebar">
                <h3>Upcoming Deadlines</h3>
                <div className="upcoming-list">
                   {events.map((e, i) => (
                      <div key={i} className={`upcoming-item ${e.priority}`}>
                         <div className="u-date">JUN {e.day}</div>
                         <div className="u-info">
                            <span className="u-title">{e.title}</span>
                            <span className="u-type"><FaClock /> {e.type === 'tax' ? 'Statutory Filing' : 'Transaction Due'}</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  );
}
