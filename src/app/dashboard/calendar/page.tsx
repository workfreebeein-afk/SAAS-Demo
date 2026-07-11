"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Users, Video } from "lucide-react";

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState("July 2026");

  const meetings = [
    { id: 1, title: "TechCorp Discovery Call", date: "July 11", time: "10:00 AM", company: "TechCorp Global", host: "Sarah Mitchell", link: "zoom.us/j/12345" },
    { id: 2, title: "MedPlus Platform Demo", date: "July 13", time: "2:30 PM", company: "MedPlus Healthcare", host: "Emily Rodriguez", link: "teams.microsoft.com/l/123" },
    { id: 3, title: "DataStream Tech Q&A", date: "July 15", time: "11:00 AM", company: "DataStream Analytics", host: "Sarah Mitchell", link: "zoom.us/j/54321" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Calendar</h2>
          <p className="text-sm text-gray-500 dark:text-white/40">Manage your sales meetings and follow-up activities</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mock Calendar Widget */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-white/8 rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <span className="font-bold text-gray-900 dark:text-white text-sm">{currentMonth}</span>
            <div className="flex gap-2">
              <button className="p-1.5 border border-gray-200 dark:border-white/10 text-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5"><ChevronLeft className="w-4 h-4" /></button>
              <button className="p-1.5 border border-gray-200 dark:border-white/10 text-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Calendar grid mock */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-gray-400 mb-4 uppercase tracking-widest">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => <span key={day}>{day}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const hasMeeting = day === 11 || day === 13 || day === 15;
              return (
                <div
                  key={day}
                  className={`aspect-square border border-gray-100 dark:border-white/5 rounded-xl p-2 text-xs font-semibold flex flex-col justify-between cursor-pointer transition-all ${
                    hasMeeting ? "bg-brand-50 dark:bg-brand-500/10 border-brand-200 dark:border-brand-500/30" : "hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  <span className={hasMeeting ? "text-brand-600 dark:text-brand-400 font-bold" : "text-gray-500 dark:text-white/40"}>{day}</span>
                  {hasMeeting && <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mx-auto" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Meetings List */}
        <div className="bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-white/8 rounded-2xl p-6 shadow-card space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm border-b border-gray-100 dark:border-white/8 pb-3">Upcoming Meetings</h3>
          <div className="space-y-4">
            {meetings.map(meet => (
              <div key={meet.id} className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/8 rounded-xl space-y-3">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-xs leading-tight">{meet.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">{meet.company}</p>
                </div>
                <div className="space-y-1.5 text-xs text-gray-600 dark:text-white/50">
                  <p className="flex items-center gap-1.5"><CalendarIcon className="w-3.5 h-3.5" />{meet.date}</p>
                  <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{meet.time}</p>
                  <p className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />Hosted by {meet.host}</p>
                </div>
                <a href={`https://${meet.link}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all">
                  <Video className="w-3.5 h-3.5" />
                  Join Room
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
