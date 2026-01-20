
import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Presentation, 
  CreditCard, 
  TrendingUp,
  Download,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { mockQuizzes, mockAssignments, mockMaterials, mockGrades, mockFees } from '../services/mockData';
import { COLORS } from '../constants';

const StudentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'academics' | 'finance'>('overview');

  const downloadVoucher = (month: string) => {
    alert(`Downloading Fee Voucher for ${month}...`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-gray-600">Your current attendance: <span className="text-green-600 font-bold">Present</span></p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-sky-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('academics')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'academics' ? 'bg-sky-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Academics
          </button>
          <button 
            onClick={() => setActiveTab('finance')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'finance' ? 'bg-sky-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Fees & Billing
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Performance Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-sky-500" /> Subject Performance
              </h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockGrades}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="subject" />
                  <YAxis unit="%" />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="percentage" fill={COLORS.secondary} radius={[4, 4, 0, 0]}>
                    {mockGrades.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.percentage > 80 ? COLORS.success : entry.percentage > 60 ? COLORS.secondary : COLORS.danger} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Pending Assignments</h3>
              <div className="space-y-4">
                {mockAssignments.filter(a => a.status === 'Pending').map(assignment => (
                  <div key={assignment.id} className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{assignment.title}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" /> {assignment.deadline}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded uppercase">Due</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Upcoming Quizzes</h3>
              <div className="space-y-4">
                {mockQuizzes.map(quiz => (
                  <div key={quiz.id} className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{quiz.title}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1" /> {quiz.date}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-sky-600">{quiz.subject}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'academics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Study Material */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <Presentation className="w-5 h-5 mr-2 text-sky-500" /> PPTs & Materials
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {mockMaterials.map(item => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
                      {item.type === 'PPT' ? <Presentation className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.subject} • {item.type}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-sky-600">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Marks */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-sky-500" /> Academic Progress
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {mockGrades.map((grade, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">{grade.subject}</span>
                      <span className="text-sm font-bold text-gray-900">{grade.marks}/{grade.total} ({grade.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-1000" 
                        style={{ 
                          width: `${grade.percentage}%`, 
                          backgroundColor: grade.percentage > 80 ? COLORS.success : grade.percentage > 60 ? COLORS.secondary : COLORS.danger 
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'finance' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-sky-500" /> Fee Statements
            </h2>
            <div className="text-sm text-gray-500">Academic Session 2024-25</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Month</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Due Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockFees.map((fee, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{fee.month}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">PKR {fee.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{fee.dueDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        fee.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {fee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => downloadVoucher(fee.month)}
                        className="inline-flex items-center px-3 py-1 bg-sky-50 text-sky-600 rounded-lg text-xs font-semibold hover:bg-sky-100 transition-colors"
                      >
                        <Download className="w-4 h-4 mr-1" /> Voucher
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
