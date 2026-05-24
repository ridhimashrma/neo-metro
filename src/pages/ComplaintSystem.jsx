import { useState } from 'react';
import { MessageSquare, Star, Plus, Trash2, CheckCircle } from 'lucide-react';
import { reviews } from '../data/mockData';
import { useData } from '../context/DataContext';
import '../styles/neometro.css';

export default function ComplaintSystem() {
  const { complaints, addComplaint, deleteComplaint } = useData();
  const [activeTab, setActiveTab] = useState('complaints');
  const [newComplaint, setNewComplaint] = useState({ 
    subject: '', 
    description: '', 
    category: 'Bus Service' 
  });
  const [submitted, setSubmitted] = useState(false);

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComplaint.subject || !newComplaint.description) return;
    
    addComplaint(newComplaint);
    setSubmitted(true);
    setNewComplaint({ subject: '', description: '', category: 'Bus Service' });
    
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="glass p-8 flex justify-between items-center">
        <div>
          <h1 className="neon-cyan text-3xl font-black">CITIZEN VOICE PLATFORM</h1>
          <p className="text-cyan-400">Complaints & Feedback Management</p>
        </div>
        <button 
          onClick={() => setActiveTab('new')} 
          className="btn-neon flex items-center gap-3"
        >
          <Plus size={20} /> LOG NEW COMPLAINT
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-black/30 p-2 rounded-2xl w-fit">
        {['complaints', 'reviews', 'new'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === tab 
                ? 'bg-cyan-500 text-black' 
                : 'hover:bg-white/10 text-gray-400'
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* New Complaint Form */}
      {activeTab === 'new' && (
        <div className="glass p-10 max-w-2xl mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-cyan-400 text-sm mb-2">Category</label>
                <select 
                  value={newComplaint.category}
                  onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})}
                  className="glass w-full p-4"
                >
                  <option value="Bus Service">Bus Service</option>
                  <option value="Driver Behavior">Driver Behavior</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Air Quality">Air Quality</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Complaint Subject"
                value={newComplaint.subject}
                onChange={(e) => setNewComplaint({...newComplaint, subject: e.target.value})}
                className="glass w-full p-5 text-lg"
                required
              />

              <textarea
                placeholder="Provide detailed description of the issue..."
                rows="6"
                value={newComplaint.description}
                onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                className="glass w-full p-5"
                required
              />

              <button type="submit" className="btn-neon w-full py-5 text-lg">
                SUBMIT TO CENTRAL LEDGER
              </button>
            </form>
          ) : (
            <div className="text-center py-16">
              <CheckCircle size={80} className="mx-auto text-emerald-400 mb-6" />
              <h3 className="text-2xl font-bold text-white">Complaint Registered Successfully</h3>
              <p className="text-cyan-400 mt-3">Your ticket has been logged.</p>
            </div>
          )}
        </div>
      )}

      {/* All Complaints List */}
      {activeTab === 'complaints' && (
        <div className="space-y-6">
          {complaints.length === 0 ? (
            <div className="glass p-12 text-center">
              <p className="text-gray-400">No complaints yet.</p>
            </div>
          ) : (
            complaints.map(c => (
              <div key={c._id} className="glass p-8 flex justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="font-bold text-xl">{c.subject}</h4>
                    <span className={`px-4 py-1 text-xs font-bold rounded-full ${
                      c.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{c.description}</p>
                  <p className="text-xs text-gray-500 mt-4">Submitted by: {c.submittedBy}</p>
                </div>
                
                <button 
                  onClick={() => deleteComplaint(c._id)}
                  className="text-red-400 hover:text-red-500 hover:bg-red-500/10 p-3 rounded-xl transition-all"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="glass p-8 flex items-center gap-6">
            <Star size={48} className="text-amber-400" />
            <div>
              <p className="text-5xl font-black">{avgRating} <span className="text-2xl text-gray-400">/ 5.0</span></p>
              <p className="text-cyan-400 uppercase tracking-widest">Overall Citizen Rating</p>
            </div>
          </div>

          {reviews.map(review => (
            <div key={review._id} className="glass p-8">
              <div className="flex justify-between items-start">
                <p className="font-bold text-lg">{review.userName}</p>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-amber-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mt-4">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}