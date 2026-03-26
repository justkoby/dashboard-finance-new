import React, { useState } from 'react';
import { 
  FaChevronLeft, FaChevronRight, FaTimes
} from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatWidget from '../components/ChatWidget';
import './Calendar.css';

interface Event {
  id: string;
  title: string;
  type: 'Leave Request' | 'Proposal' | 'Project' | 'Task';
  status: 'pending' | 'approved' | 'denied';
  date: string;
  assignee?: string;
  color: string;
  description?: string;
}

const initialEvents: Event[] = [
  { 
    id: '1', 
    title: 'Leave Request', 
    type: 'Leave Request', 
    status: 'pending', 
    date: '2025-08-01', 
    assignee: 'Matthew Oduro',
    color: '#E0E7FF' 
  },
  { 
    id: '2', 
    title: 'Proposal', 
    type: 'Proposal', 
    status: 'pending', 
    date: '2025-08-04', 
    description: 'Name of the proposal',
    color: '#1E1B4B' 
  },
  { 
    id: '3', 
    title: 'Leave Request', 
    type: 'Leave Request', 
    status: 'denied', 
    date: '2025-08-09', 
    assignee: 'Estelle Ama',
    color: '#E0E7FF' 
  },
  { 
    id: '4', 
    title: 'Project', 
    type: 'Project', 
    status: 'approved', 
    date: '2025-08-12', 
    description: 'Name of the project',
    color: '#14532D' 
  },
  { 
    id: '5', 
    title: 'Task', 
    type: 'Task', 
    status: 'pending', 
    date: '2025-08-14', 
    color: '#450A0A' 
  },
  { 
    id: '6', 
    title: 'Proposal', 
    type: 'Proposal', 
    status: 'pending', 
    date: '2025-08-14', 
    color: '#1E1B4B' 
  },
  { 
    id: '7', 
    title: 'Project', 
    type: 'Project', 
    status: 'approved', 
    date: '2025-08-14', 
    color: '#14532D' 
  },
  { 
    id: '8', 
    title: 'Task', 
    type: 'Task', 
    status: 'pending', 
    date: '2025-08-17', 
    description: 'Name of the task',
    assignee: 'Assigned person(s)',
    color: '#450A0A' 
  },
  { 
    id: '9', 
    title: 'Leave Request', 
    type: 'Leave Request', 
    status: 'approved', 
    date: '2025-08-19', 
    assignee: 'Estelle Ama',
    color: '#E0E7FF' 
  },
];

export default function Calendar() {
  const [view, setView] = useState<'month' | 'week' | 'day' | 'list'>('month');
  const [_events, _setEvents] = useState<Event[]>(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 7, 1)); // August 2025

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const monthName = currentMonth.toLocaleString('default', { month: 'long' }).toUpperCase();
  const year = currentMonth.getFullYear();

  const renderMonthDays = (): React.ReactNode[] => {
    const days: React.ReactNode[] = [];
    const count = daysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    const start = startDayOfMonth(currentMonth.getMonth(), currentMonth.getFullYear());

    // Empty spaces
    for (let i = 0; i < start; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Actual days
    for (let i = 1; i <= count; i++) {
      const dateStr = `${year}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayEvents = _events.filter(e => e.date === dateStr);

      days.push(
        <div key={i} className="calendar-day" onClick={() => setIsModalOpen(true)}>
          <span className="day-number">{String(i).padStart(2, '0')}</span>
          <div className="day-events-container">
            {dayEvents.map(event => (
              <div 
                key={event.id} 
                className={`event-card ${event.type.toLowerCase().replace(' ', '-')}`}
                style={{ backgroundColor: event.color }}
              >
                <div className="event-main">
                  <span className="event-title">{event.title}</span>
                  <span className={`status-dot ${event.status}`}></span>
                  <span className="status-text">{event.status}</span>
                </div>
                {event.description && <div className="event-desc">{event.description}</div>}
                {event.assignee && <div className="event-assignee">{event.assignee}</div>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <div className="calendar-content">
          <div className="calendar-top-bar">
            <div className="nav-group">
                 <button className="nav-btn" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}>
                   <FaChevronLeft />
                 </button>
                 <button className="nav-btn" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}>
                   <FaChevronRight />
                 </button>
                 <button className="add-event-btn" onClick={() => setIsModalOpen(true)}>Add Event +</button>
            </div>
            
            <h1 className="calendar-current-date">{monthName} {year}</h1>
            
            <div className="view-tabs">
                {['month', 'week', 'day', 'list'].map(v => (
                  <button 
                    key={v}
                    className={`view-tab ${view === v ? 'active' : ''}`}
                    onClick={() => setView(v as any)}
                  >
                    {v}
                  </button>
                ))}
            </div>
          </div>

          <div className="calendar-container">
            <div className="calendar-grid-header">
              {['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'].map(day => (
                <div key={day} className="weekday-label">{day}</div>
              ))}
            </div>
            <div className="calendar-grid-body">
              {renderMonthDays()}
            </div>
          </div>
        </div>
      </div>
      
      {isModalOpen && <EventModal onClose={() => setIsModalOpen(false)} />}
      <ChatWidget />
    </div>
  );
}

function EventModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay">
      <div className="modern-modal">
        <div className="modal-close" onClick={onClose}><FaTimes /></div>
        <h2 className="modal-title">Add / Edit Event</h2>
        <p className="modal-subtitle">Plan your next big moment: schedule or edit an event to stay on track</p>
        
        <div className="form-group">
          <label>Event Title</label>
          <input type="text" placeholder="Enter title" />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Event Color</label>
            <div className="color-options">
               <label className="radio-option">
                 <input type="radio" name="color" /> <span className="dot danger"></span> Danger
               </label>
               <label className="radio-option">
                 <input type="radio" name="color" /> <span className="dot success"></span> Success
               </label>
               <label className="radio-option">
                 <input type="radio" name="color" /> <span className="dot primary"></span> Primary
               </label>
               <label className="radio-option">
                 <input type="radio" name="color" /> <span className="dot warning"></span> Warning
               </label>
            </div>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Enter Start Date</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Enter End Date</label>
            <input type="date" defaultValue="2026-03-04" />
          </div>
        </div>
        
        <div className="modal-actions">
           <button className="cancel-btn" onClick={onClose}>Close</button>
           <button className="save-btn">Add Event</button>
        </div>
      </div>
    </div>
  );
}
