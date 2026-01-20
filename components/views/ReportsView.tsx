
import React, { useState, useMemo } from 'react';
import { MOCK_STUDENTS, MOCK_CLASSES, MOCK_COURSES } from '../../constants.tsx';
import { UserRole, Student } from '../../types.ts';
import { 
  BarChart3, 
  Users, 
  LayoutGrid, 
  BookOpen, 
  Download, 
  Search, 
  ChevronDown, 
  TrendingUp, 
  Target, 
  ShieldCheck,
  User,
  ListFilter,
  CheckCircle,
  XCircle,
  Award,
  CheckSquare,
  Percent
} from 'lucide-react';

interface ReportsViewProps {
  activeRole?: UserRole;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ activeRole }) => {
  const [activeTab, setActiveTab] = useState<'class' | 'course'>('class');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('all');

  const isAdmin = activeRole === UserRole.MAIN_CENTER || activeRole === UserRole.SUPER_ADMIN;

  // Search logic: If search term exists OR a specific student is selected, we show Individual Learner results
  const isIndividualMode = searchTerm.trim().length > 0 || selectedStudentId !== 'all';

  // Helper to calculate grade letter from percentage
  const getGradeLetter = (grade: number) => {
    if (grade >= 90) return 'A+';
    if (grade >= 80) return 'A';
    if (grade >= 70) return 'B';
    if (grade >= 60) return 'C';
    return 'D';
  };

  // Filtered individual data for search/select results
  const individualData = useMemo(() => {
    let base = MOCK_STUDENTS;
    if (selectedStudentId !== 'all') {
      base = base.filter(s => s.id === selectedStudentId);
    }
    if (searchTerm.trim().length > 0) {
      base = base.filter(s => 
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.username.includes(searchTerm)
      );
    }
    return base;
  }, [searchTerm, selectedStudentId]);

  const classData = useMemo(() => MOCK_CLASSES, []);
  const courseData = useMemo(() => MOCK_COURSES, []);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStudentId('all');
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden animate-in fade-in duration-500">
      {/* Header */}
      <div className="w-full bg-[#292667] rounded-[2.5rem] p-6 md:p-8 text-white shadow-xl border-b-[10px] border-[#3b82f6] flex flex-col md:flex-row items-center justify-between gap-6 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-4 md:p-5 bg-[#3b82f6] rounded-2xl text-white shadow-xl rotate-3">
             <BarChart3 size={32} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-2xl md:text-3xl font-black leading-none tracking-tight uppercase">Hub <span className="text-[#fbee21]">Analytics</span></h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-2">U Book Store Global Data Engine</p>
           </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
           <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/10">
              <Download size={16} strokeWidth={3} /> Export Raw Data
           </button>
        </div>
      </div>

      {/* Filter Bar Row */}
      <div className="w-full bg-white p-3 md:p-4 rounded-[2rem] shadow-lg border border-slate-100 flex flex-col lg:flex-row items-center gap-4 flex-shrink-0">
        <div className="flex-[2] flex items-center gap-4 bg-slate-50 px-6 py-3.5 rounded-2xl border border-slate-100 w-full group focus-within:border-[#3b82f6] transition-all">
          <Search size={22} className="text-slate-400 group-focus-within:text-[#3b82f6]" strokeWidth={3} />
          <input 
            type="text" 
            placeholder="Type Learner Name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-base font-black text-[#292667] outline-none w-full placeholder:text-slate-300 uppercase"
          />
        </div>

        <div className="flex-1 relative w-full lg:w-auto">
          <ListFilter size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" strokeWidth={3} />
          <select 
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="w-full bg-slate-50 pl-14 pr-10 py-3.5 rounded-2xl border border-slate-100 outline-none font-black text-[10px] text-[#292667] uppercase appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <option value="all">Search by Name List</option>
            {MOCK_STUDENTS.map(s => (
              <option key={s.id} value={s.id}>{s.firstName} {s.lastName} ({s.username})</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {isIndividualMode && (
          <button 
            onClick={clearFilters}
            className="px-6 py-3 text-[10px] font-black uppercase text-[#ec2027] hover:bg-red-50 rounded-xl transition-colors border-2 border-transparent hover:border-red-100"
          >
            Reset
          </button>
        )}
      </div>

      {/* Tab Switcher - MIDDLE ALIGN UNDER FILTER BAR */}
      <div className="flex justify-center flex-shrink-0 -mt-2">
        <div className="flex bg-white p-1.5 rounded-[2rem] border-2 border-slate-100 shadow-md relative z-10 w-fit">
           {[
             { id: 'class', label: 'Report by Class', icon: LayoutGrid },
             { id: 'course', label: 'Report by Course', icon: BookOpen }
           ].map(tab => (
             <button 
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); if (!isIndividualMode) clearFilters(); }} 
                className={`px-10 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${!isIndividualMode && activeTab === tab.id ? 'bg-[#292667] text-[#fbee21] shadow-xl scale-105' : 'text-slate-400 hover:text-slate-600'}`}
             >
                <tab.icon size={16} strokeWidth={3} />
                {tab.label}
             </button>
           ))}
        </div>
      </div>

      {/* Main Table Container */}
      <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden mb-4 flex flex-col">
        {/* Dynamic Title Bar */}
        <div className="px-10 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between shrink-0">
           <h3 className="text-sm font-black text-[#292667] uppercase tracking-tighter flex items-center gap-3">
              {isIndividualMode ? (
                <>
                  <div className="p-2 bg-red-50 text-[#ec2027] rounded-lg"><User size={16} strokeWidth={3}/></div>
                  Individual Performance Report
                </>
              ) : activeTab === 'class' ? (
                <>
                  <div className="p-2 bg-blue-50 text-[#3b82f6] rounded-lg"><LayoutGrid size={16} strokeWidth={3}/></div>
                  Class Distribution Report
                </>
              ) : (
                <>
                  <div className="p-2 bg-green-50 text-[#00a651] rounded-lg"><BookOpen size={16} strokeWidth={3}/></div>
                  Global Course Metrics
                </>
              )}
           </h3>
           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Live Node Sync: Active</span>
        </div>

        <div className="flex-1 overflow-auto scrollbar-hide">
          {isIndividualMode ? (
            /* INDIVIDUAL LEARNER LIST */
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#292667] text-white text-[10px] font-black uppercase tracking-widest z-20">
                <tr>
                  <th className="px-10 py-5">Learner ID</th>
                  <th className="px-10 py-5">Full Name</th>
                  <th className="px-10 py-5">Attendance</th>
                  <th className="px-10 py-5">Grade</th>
                  <th className="px-10 py-5">Marks (C/I)</th>
                  <th className="px-10 py-5 text-right">Mastery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {individualData.length > 0 ? individualData.map(student => {
                  const correctAnswers = Math.round((student.finalGrade / 100) * 50);
                  const incorrectAnswers = 50 - correctAnswers;
                  
                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors animate-in slide-in-from-left duration-300">
                      <td className="px-10 py-5 font-mono text-sm font-black text-[#ec2027]">{student.username}</td>
                      <td className="px-10 py-5">
                         <div className="flex items-center gap-4">
                            <img src={`https://picsum.photos/seed/${student.id}/64`} className="w-12 h-12 rounded-xl border-2 border-white shadow-sm object-cover" alt="" />
                            <span className="font-black text-[#292667] text-sm uppercase">{student.firstName} {student.lastName}</span>
                         </div>
                      </td>
                      <td className="px-10 py-5 font-black text-[#292667]">{student.attendance} Days</td>
                      <td className="px-10 py-5">
                         <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100 w-fit">
                            <Award size={14} className="text-[#3b82f6]" />
                            <span className="text-sm font-black text-[#3b82f6]">{getGradeLetter(student.finalGrade)}</span>
                         </div>
                      </td>
                      <td className="px-10 py-5">
                         <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                               <div className="p-1 bg-green-100 rounded-md text-green-600"><CheckCircle size={10} strokeWidth={3} /></div>
                               <span className="text-[11px] font-black text-green-600">{correctAnswers}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                               <div className="p-1 bg-red-100 rounded-md text-red-600"><XCircle size={10} strokeWidth={3} /></div>
                               <span className="text-[11px] font-black text-red-600">{incorrectAnswers}</span>
                            </div>
                         </div>
                      </td>
                      <td className="px-10 py-5 text-right">
                         <div className="flex items-center justify-end gap-3">
                            <div className={`w-12 py-1.5 rounded-lg text-center text-xs font-black text-white shadow-sm ${student.finalGrade >= 85 ? 'bg-[#00a651]' : 'bg-[#ec2027]'}`}>
                               {student.finalGrade}%
                            </div>
                            <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden border border-white">
                               <div className="h-full bg-[#3b82f6]" style={{ width: `${student.finalGrade}%` }}></div>
                            </div>
                         </div>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={6} className="py-32 text-center opacity-30">
                       <Search size={64} className="mx-auto text-slate-300 mb-4" />
                       <h4 className="text-xl font-black text-[#292667] uppercase tracking-widest">No results found</h4>
                       <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Try another name or search term</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : activeTab === 'class' ? (
            /* TAB: REPORT BY CLASS */
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#292667] text-white text-[10px] font-black uppercase tracking-widest z-20">
                <tr>
                  <th className="px-10 py-5">Class Node</th>
                  <th className="px-10 py-5">Assigned Level</th>
                  <th className="px-10 py-5">Enrollment</th>
                  <th className="px-10 py-5">Progress</th>
                  <th className="px-10 py-5">Avg Mastery</th>
                  <th className="px-10 py-5 text-right">Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {classData.map(cls => (
                  <tr key={cls.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-10 py-5 font-black text-[#292667] uppercase tracking-tight">{cls.name}</td>
                    <td className="px-10 py-5 font-black text-[#3b82f6] text-[11px] uppercase tracking-tight">{cls.level}</td>
                    <td className="px-10 py-5">
                       <div className="flex items-center gap-3">
                          <Users size={16} className="text-[#ec2027]" />
                          <span className="font-black text-[#292667]">{cls.students.length} Learners</span>
                       </div>
                    </td>
                    <td className="px-10 py-5">
                       <div className="flex items-center gap-4">
                          <span className="font-black text-sm text-[#292667]">{cls.progress}%</span>
                          <div className="flex-1 max-w-[120px] h-2.5 bg-slate-100 rounded-full overflow-hidden border border-white">
                             <div className="h-full bg-[#00a651]" style={{ width: `${cls.progress}%` }}></div>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-5 font-black text-emerald-600">89.4%</td>
                    <td className="px-10 py-5 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cls.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* TAB: REPORT BY COURSE - MODIFIED COLUMNS */
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#292667] text-white text-[10px] font-black uppercase tracking-widest z-20">
                <tr>
                  <th className="px-10 py-5">Program Title</th>
                  <th className="px-10 py-5">Duration</th>
                  <th className="px-10 py-5">Total number of students</th>
                  <th className="px-10 py-5">Total number of completion</th>
                  <th className="px-10 py-5 text-right">Passing rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {courseData.map((course, idx) => {
                  // Generating some dynamic looking mock data
                  const totalStudents = 420 + (idx * 15);
                  const completionRate = 0.65 + (idx * 0.05);
                  const completionCount = Math.round(totalStudents * completionRate);
                  const passingRate = (completionRate * 100).toFixed(1);
                  
                  return (
                    <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-10 py-5 font-black text-[#292667] uppercase tracking-tight">{course.name}</td>
                      <td className="px-10 py-5 font-black text-slate-400">{course.duration}</td>
                      <td className="px-10 py-5">
                         <div className="flex items-center gap-3">
                            <Users size={16} className="text-[#3b82f6]" />
                            <span className="font-black text-[#292667]">{totalStudents} Learners</span>
                         </div>
                      </td>
                      <td className="px-10 py-5">
                         <div className="flex items-center gap-3 text-[#292667] font-black">
                            <CheckSquare size={16} className="text-emerald-500" />
                            <span>{completionCount} Completed</span>
                         </div>
                      </td>
                      <td className="px-10 py-5 text-right">
                         <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                            <Percent size={14} className="text-emerald-600" />
                            <span className="text-sm font-black text-emerald-600">{passingRate}%</span>
                         </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Summary */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <Target size={18} className="text-[#00a651]" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global KPI Accuracy: 99.8%</span>
              </div>
              <div className="flex items-center gap-2">
                 <ShieldCheck size={18} className="text-[#3b82f6]" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Integrity Verified</span>
              </div>
           </div>
           <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Generated by U Book Store Analytics Engine v2.6</p>
        </div>
      </div>
    </div>
  );
};
