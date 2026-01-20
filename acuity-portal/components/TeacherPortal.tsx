
import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  FilePlus, 
  Clock, 
  TrendingUp, 
  MoreVertical, 
  CheckCircle, 
  XCircle,
  Plus,
  BookOpen,
  PieChart as PieChartIcon
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
// Fix: Removed SUBJECTS from mockData import as it belongs to constants
import { mockUsers, mockQuizzes, mockAssignments, mockMaterials } from '../services/mockData';
// Fix: Added SUBJECTS to constants import
import { COLORS, SUBJECTS } from '../constants';
import { UserRole } from '../types';

const TeacherPortal: React.FC = () => {
  const [activeView, setActiveView] = useState<'students' | 'content'>('students');
  const [showAddModal, setShowAddModal] = useState<'quiz' | 'assignment' | 'material' | null>(null);

  const students = mockUsers.filter(u => u.role === UserRole.STUDENT);
  const totalStudents = students.length;
  const presentCount = students.filter(s => s.isPresent).length;
  const absentCount = totalStudents - presentCount;

  const attendanceData = [
    { name: 'Present', value: presentCount, color: COLORS.success },
    { name: 'Absent', value: absentCount, color: COLORS.danger },
  ];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Content Added Successfully!');
    setShowAddModal(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
          <p className="text-gray-600">Managing <span className="text-sky-600 font-bold">{totalStudents}</span> total nursing students</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button 
            onClick={() => setActiveView('students')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeView === 'students' ? 'bg-sky-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Students & Attendance
          </button>
          <button 
            onClick={() => setActiveView('content')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeView === 'content' ? 'bg-sky-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Content Management
          </button>
        </div>
      </div>

      {activeView === 'students' && (
        <div className="space-y-8">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-500 uppercase">Daily Attendance</p>
                <Clock className="w-5 h-5 text-sky-500" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{((presentCount/totalStudents)*100).toFixed(0)}%</h3>
                  <p className="text-xs text-gray-500">Students marked present</p>
                </div>
                <div className="h-16 w-16">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={attendanceData}
                          innerRadius={15}
                          outerRadius={25}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {attendanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                   </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-gray-500 uppercase mb-2">Total Students</p>
              <h3 className="text-3xl font-bold text-gray-900">{totalStudents}</h3>
              <p className="text-xs text-gray-500 mt-1">Enrolled in current session</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-gray-500 uppercase mb-2">Avg. Progress</p>
              <h3 className="text-3xl font-bold text-green-600">78%</h3>
              <p className="text-xs text-gray-500 mt-1">Across all subjects</p>
            </div>
          </div>

          {/* Student List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">Student Directory & Live Status</h2>
              <div className="flex space-x-2">
                <span className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full"><div className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></div> Active</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Username</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Fee Status</th>
                    <th className="px-6 py-4 text-right">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-xs">
                            {student.name.charAt(0)}
                          </div>
                          <span className="ml-3 font-medium text-gray-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">@{student.username}</td>
                      <td className="px-6 py-4">
                        {student.isPresent ? (
                          <span className="inline-flex items-center text-xs font-semibold text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" /> Present
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-xs font-semibold text-red-500">
                            <XCircle className="w-4 h-4 mr-1" /> Absent
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-green-50 text-green-600">Paid</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end space-x-2">
                            <div className="w-24 bg-gray-100 rounded-full h-1.5">
                              <div className="bg-sky-500 h-1.5 rounded-full" style={{width: '75%'}}></div>
                            </div>
                            <span className="text-xs font-bold">75%</span>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeView === 'content' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Action Cards */}
          <div className="space-y-6">
            <button 
              onClick={() => setShowAddModal('quiz')}
              className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-sky-300 transition-all"
            >
              <div className="flex items-center">
                <div className="p-3 bg-sky-50 text-sky-600 rounded-xl group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <FilePlus className="w-6 h-6" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="font-bold text-gray-900 text-lg">Create New Quiz</h3>
                  <p className="text-sm text-gray-500">Add multiple choice or subject questions</p>
                </div>
              </div>
              <Plus className="text-gray-300 group-hover:text-sky-500" />
            </button>

            <button 
               onClick={() => setShowAddModal('assignment')}
              className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-sky-300 transition-all"
            >
              <div className="flex items-center">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <FilePlus className="w-6 h-6" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="font-bold text-gray-900 text-lg">Add Assignment</h3>
                  <p className="text-sm text-gray-500">Post new clinical or theory tasks</p>
                </div>
              </div>
              <Plus className="text-gray-300 group-hover:text-emerald-500" />
            </button>

            <button 
              onClick={() => setShowAddModal('material')}
              className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-sky-300 transition-all"
            >
              <div className="flex items-center">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="font-bold text-gray-900 text-lg">Upload Materials</h3>
                  <p className="text-sm text-gray-500">Share PPTs, PDFs or research papers</p>
                </div>
              </div>
              <Plus className="text-gray-300 group-hover:text-amber-500" />
            </button>
          </div>

          {/* Recently Added Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-800">Recently Uploaded Content</h2>
             </div>
             <div className="divide-y divide-gray-100">
               {[...mockQuizzes, ...mockAssignments, ...mockMaterials].slice(0, 6).map((item: any, idx) => (
                 <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center">
                       <div className="text-xs text-gray-400 font-mono w-8">{idx + 1}.</div>
                       <div>
                          <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">{(item as any).subject || 'General'}</p>
                       </div>
                    </div>
                    <span className="text-[10px] px-2 py-1 bg-gray-100 rounded-full font-bold text-gray-500 uppercase">
                      {(item as any).type || 'Assigned'}
                    </span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}

      {/* Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Add {showAddModal.charAt(0).toUpperCase() + showAddModal.slice(1)}</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input required type="text" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none" placeholder="Enter title..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none">
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              {showAddModal === 'material' ? (
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                   <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100" />
                </div>
              ) : (
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Deadline/Date</label>
                   <input type="date" className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none" />
                </div>
              )}
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(null)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-medium">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 font-medium shadow-lg shadow-sky-200">Save Content</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherPortal;
