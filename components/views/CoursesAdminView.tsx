
import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_COURSES, LEVELS, REGIONS } from '../../constants.tsx';
import { Course, Module, Lesson } from '../../types.ts';
import { QuizBuilder } from './TestsView.tsx';
import { 
  BookOpen, 
  ChevronLeft, 
  Type, 
  Layers,
  Clock,
  Zap,
  MonitorPlay,
  Edit3,
  FileText,
  PlusCircle,
  Award,
  UploadCloud,
  Settings2,
  ChevronRight,
  ListPlus,
  Layout,
  Eye,
  Globe,
  ImageIcon,
  Tag,
  Signal,
  ChevronDown,
  Search,
  Users,
  Filter,
  Trash2,
  PlayCircle,
  Sparkles,
  MoreVertical,
  BarChart3,
  X,
  CheckCircle2,
  Rocket,
  Plus,
  GraduationCap
} from 'lucide-react';

interface CoursesAdminViewProps {
  initialCourseId?: string | null;
  onExitEdit?: () => void;
  onPreviewCourse?: (id: string) => void;
  checkPermission?: (category: any, action: string) => boolean;
}

const NewCourseModal = ({ onClose, onSave }: { onClose: () => void, onSave: (course: Course) => void }) => {
  const [courseName, setCourseName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('Starter Level 1');

  const savedCoursesTemplates = [
    "Starter Level 1", "Starter Level 2", "Starter Level 3", "Starter Level 4",
    "Mover Level 1", "Mover Level 2", "Mover Level 3", "Mover Level 4", "Mover Level 5"
  ];

  const handleCreate = () => {
    if (!courseName.trim()) return;
    
    const newCourse: Course = {
      id: 'course-' + Date.now(),
      name: courseName,
      isPurchased: true,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
      description: `Official ${selectedTemplate} curriculum module for U Book Store learners.`,
      category: selectedTemplate.includes('Starter') ? 'Starter Program' : 'Mover Program',
      level: selectedTemplate,
      duration: "15 Hours",
      lastUpdated: new Date().toISOString(),
      modules: [
        {
          id: 'm1-' + Date.now(),
          title: 'Introduction & Basics',
          lessons: [
            { id: 'l1-' + Date.now(), title: 'Welcome to the Course', type: 'video', isPublished: true }
          ]
        }
      ]
    };
    onSave(newCourse);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#292667]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl border-t-[12px] border-[#fbee21] relative animate-in zoom-in-95 duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbee21]/5 rounded-full -mr-16 -mt-16"></div>
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-[#ec2027] transition-all bg-slate-50 rounded-xl">
          <X size={20} strokeWidth={3} />
        </button>

        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-yellow-50 text-[#292667] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border-2 border-yellow-100 rotate-3">
              <PlusCircle size={32} strokeWidth={3} />
           </div>
           <h3 className="text-2xl font-black text-[#292667] uppercase tracking-tighter leading-none">Add New Class</h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Hub Curriculum Registry</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Layers size={12} className="text-[#ec2027]" /> Choose Template (9 Options)
            </label>
            <div className="relative">
              <select 
                className="w-full bg-slate-50 px-5 py-4 rounded-2xl border-2 border-slate-100 outline-none font-black text-[#292667] text-sm uppercase appearance-none focus:border-[#fbee21] transition-all cursor-pointer shadow-inner"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
              >
                {savedCoursesTemplates.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Type size={12} className="text-[#3b82f6]" /> Enter Class Name
            </label>
            <input 
              required
              type="text" 
              placeholder="e.g. Junior Coders Group 1" 
              className="w-full bg-slate-50 px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#fbee21] focus:bg-white outline-none font-black text-base text-[#292667] transition-all shadow-inner"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
           <button 
             onClick={onClose}
             className="py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
           >
              Cancel
           </button>
           <button 
             onClick={handleCreate}
             disabled={!courseName.trim()}
             className={`py-5 text-[#292667] rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 border-b-4 border-black/10 transition-all active:scale-95 ${
               courseName.trim() ? 'bg-[#fbee21] hover:bg-[#00a651] hover:text-white' : 'bg-slate-300 cursor-not-allowed grayscale'
             }`}
           >
              <CheckCircle2 size={18} strokeWidth={3} /> add class
           </button>
        </div>
      </div>
    </div>
  );
};

const CourseMetadataEditor = ({ course, onUpdate }: { course: Course, onUpdate: (data: Partial<Course>) => void }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
        <div className="p-3 bg-[#292667] text-[#fbee21] rounded-xl shadow-md">
          <Settings2 size={24} strokeWidth={3} />
        </div>
        <div>
          <h4 className="text-xl font-black text-[#292667] uppercase tracking-tighter leading-none">Program Base</h4>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Curriculum Identity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Type size={14} className="text-[#ec2027]" /> Program Name
            </label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-black text-[#292667] text-sm outline-none focus:border-[#292667] transition-all shadow-inner"
              value={course.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Tag size={14} className="text-[#3b82f6]" /> Category
              </label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-bold text-xs text-[#292667] outline-none appearance-none"
                value={course.category}
                onChange={(e) => onUpdate({ category: e.target.value })}
              >
                <option>Standard Curriculum</option>
                <option>Robotics</option>
                <option>AI Foundations</option>
                <option>Digital Literacy</option>
                <option>Starter Program</option>
                <option>Mover Program</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Signal size={14} className="text-[#00a651]" /> Difficulty
              </label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-bold text-xs text-[#292667] outline-none appearance-none"
                value={course.level}
                onChange={(e) => onUpdate({ level: e.target.value })}
              >
                <option>Foundation</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Elite</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <FileText size={14} className="text-slate-400" /> Syllabus Abstract
            </label>
            <textarea 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-600 text-sm outline-none focus:border-[#292667] transition-all resize-none shadow-inner"
              rows={3}
              value={course.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-6">
           <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <ImageIcon size={14} className="text-[#a855f7]" /> Cover Artwork
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pl-12 font-bold text-[#292667] text-xs outline-none focus:border-[#292667] transition-all shadow-inner"
                  value={course.thumbnail}
                  onChange={(e) => onUpdate({ thumbnail: e.target.value })}
                />
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              </div>
           </div>
           
           <div className="aspect-video w-full rounded-3xl overflow-hidden border-4 border-white shadow-xl relative group">
              <img src={course.thumbnail} className="w-full h-full object-cover" alt="Preview" />
           </div>
        </div>
      </div>
    </div>
  );
};

const TaskContentEditor = ({ lesson, onUpdate }: { lesson: Lesson, onUpdate: (data: Partial<Lesson>) => void }) => {
  const [isEditingQuiz, setIsEditingQuiz] = useState(false);

  const getMeta = (type: Lesson['type']) => {
    switch (type) {
      case 'video': return { label: 'Video Lecture', color: 'bg-indigo-500', icon: MonitorPlay };
      case 'quiz': return { label: 'Simple Quiz', color: 'bg-amber-500', icon: Zap };
      case 'assignment': return { label: 'Assignment', color: 'bg-rose-500', icon: UploadCloud };
      case 'text': return { label: 'Reading', color: 'bg-emerald-500', icon: BookOpen };
      default: return { label: 'Task', color: 'bg-slate-500', icon: FileText };
    }
  };

  const MetaIcon = getMeta(lesson.type).icon;

  if (lesson.type === 'quiz' && isEditingQuiz) {
    return (
      <QuizBuilder 
        title={lesson.title}
        initialQuestions={lesson.quiz || []}
        onBack={() => setIsEditingQuiz(false)}
        onSave={(qs) => {
          onUpdate({ quiz: qs });
          setIsEditingQuiz(false);
        }}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl text-white shadow-lg border-b-4 border-black/10 ${getMeta(lesson.type).color}`}>
            <MetaIcon size={28} />
          </div>
          <div>
            <h4 className="text-xl font-black text-[#292667] uppercase tracking-tight leading-none truncate max-w-[200px] md:max-w-none">{lesson.title || 'Untitled Task'}</h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{getMeta(lesson.type).label} Setup</p>
          </div>
        </div>
        <button 
          onClick={() => onUpdate({ isPublished: !lesson.isPublished })}
          className={`px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${lesson.isPublished ? 'bg-green-50 text-[#00a651] border border-[#00a651]/20' : 'bg-slate-100 text-slate-400 border border-transparent'}`}
        >
          {lesson.isPublished ? 'Live' : 'Draft'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Context Title</label>
          <input 
            type="text" 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-black text-[#292667] text-sm outline-none focus:border-indigo-500 transition-all shadow-inner"
            value={lesson.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
          />
        </div>

        {lesson.type === 'video' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">VOD URL</label>
              <div className="relative">
                <MonitorPlay className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input 
                  type="text" 
                  placeholder="https://..."
                  className="w-full bg-slate-50 pl-12 pr-4 py-4 rounded-xl border border-slate-200 outline-none font-bold text-indigo-500 shadow-inner text-xs"
                  value={lesson.content || ''}
                  onChange={(e) => onUpdate({ content: e.target.value })}
                />
              </div>
            </div>
            <div className="aspect-video bg-slate-50 rounded-2xl border-2 border-white shadow-lg flex flex-col items-center justify-center text-slate-200 overflow-hidden">
               {lesson.content ? (
                  <img src={`https://picsum.photos/seed/${lesson.id}/400/225`} className="w-full h-full object-cover" alt="" />
               ) : <MonitorPlay size={32} strokeWidth={1} />}
            </div>
          </div>
        )}

        {lesson.type === 'text' && (
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Learning Content</label>
            <textarea 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 font-bold text-slate-600 text-sm outline-none focus:border-emerald-500 transition-all resize-none shadow-inner leading-relaxed"
              rows={6}
              placeholder="Inject knowledge..."
              value={lesson.content || ''}
              onChange={(e) => onUpdate({ content: e.target.value })}
            />
          </div>
        )}

        {lesson.type === 'quiz' && (
          <div className="p-8 bg-[#292667] rounded-3xl text-center shadow-xl relative overflow-hidden group">
             <Zap size={48} className="text-[#fbee21] mx-auto mb-4" fill="currentColor" />
             <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Quiz Setup</h4>
             <p className="text-[11px] font-bold text-white/50 max-w-xs mx-auto uppercase tracking-widest leading-relaxed mb-6">
               Automated logic challenges for this task.
             </p>
             <button 
               onClick={() => setIsEditingQuiz(true)}
               className="px-8 py-3 bg-[#fbee21] text-[#292667] rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-white transition-all active:scale-95"
             >
               Manage Data
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const CoursesAdminView: React.FC<CoursesAdminViewProps> = ({ initialCourseId, onExitEdit, onPreviewCourse, checkPermission }) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('ubook_courses_v3');
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [activeModuleIdx, setActiveModuleIdx] = useState<number | null>(null);
  const [activeLessonIdx, setActiveLessonIdx] = useState<number | null>(null);
  const [isEditingMetadata, setIsEditingMetadata] = useState(false);
  const [isNewCourseModalOpen, setIsNewCourseModalOpen] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('All Levels');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  
  const canEdit = checkPermission?.('courses', 'edit') ?? true;
  const canDelete = checkPermission?.('courses', 'delete') ?? true;

  const categories = useMemo(() => ['All Categories', ...new Set(courses.map(c => c.category).filter(Boolean) as string[])], [courses]);
  const levels = ['All Levels', 'Foundation', 'Intermediate', 'Advanced', 'Elite'];

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (course.category && course.category.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLevel = levelFilter === 'All Levels' || course.level === levelFilter;
      const matchesCategory = categoryFilter === 'All Categories' || course.category === categoryFilter;
      
      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [courses, searchTerm, levelFilter, categoryFilter]);

  useEffect(() => {
    if (initialCourseId) {
      const course = courses.find(c => c.id === initialCourseId);
      if (course) {
        setEditingCourse(course);
        setIsEditingMetadata(true);
      }
    }
  }, [initialCourseId]);

  const handleManualSave = () => {
    if (!editingCourse) return;
    const updatedCatalog = courses.map(c => 
      c.id === editingCourse.id ? { ...editingCourse, lastUpdated: new Date().toISOString() } : c
    );
    setCourses(updatedCatalog);
    localStorage.setItem('ubook_courses_v3', JSON.stringify(updatedCatalog));
    setEditingCourse(null);
    onExitEdit?.();
  };

  const handleCreateNewCourse = (newCourse: Course) => {
    const updatedCatalog = [newCourse, ...courses];
    setCourses(updatedCatalog);
    localStorage.setItem('ubook_courses_v3', JSON.stringify(updatedCatalog));
    setIsNewCourseModalOpen(false);
  };

  const handleDeleteCourse = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canDelete) return;
    if (confirm("Permanently delete this curriculum program? This cannot be undone.")) {
       const updatedCatalog = courses.filter(c => c.id !== id);
       setCourses(updatedCatalog);
       localStorage.setItem('ubook_courses_v3', JSON.stringify(updatedCatalog));
    }
  };

  const handleAddModule = () => {
    if (!editingCourse || !canEdit) return;
    const newModule: Module = { id: 'm' + Date.now(), title: `Module ${editingCourse.modules.length + 1}`, lessons: [] };
    setEditingCourse({ ...editingCourse, modules: [...editingCourse.modules, newModule] });
    setActiveModuleIdx(editingCourse.modules.length);
    setActiveLessonIdx(null);
    setIsEditingMetadata(false);
  };

  const handleAddLesson = (type: Lesson['type']) => {
    if (activeModuleIdx === null || !editingCourse || !canEdit) return;
    const newLesson: Lesson = { id: 'l' + Date.now(), title: `New ${type.toUpperCase()}`, type, isPublished: true };
    const updatedModules = [...editingCourse.modules];
    updatedModules[activeModuleIdx].lessons.push(newLesson);
    setEditingCourse({ ...editingCourse, modules: updatedModules });
    setActiveLessonIdx(updatedModules[activeModuleIdx].lessons.length - 1);
    setIsEditingMetadata(false);
  };

  if (editingCourse) {
    const activeModule = activeModuleIdx !== null ? editingCourse.modules[activeModuleIdx] : null;
    const activeLesson = (activeModule && activeLessonIdx !== null) ? activeModule.lessons[activeLessonIdx] : null;

    return (
      <div className="h-full flex flex-col gap-4 overflow-hidden animate-in slide-in-from-right duration-500">
        <div className="w-full bg-[#292667] rounded-2xl p-5 text-white shadow-xl border-b-8 border-[#00a651] flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
          <div className="flex items-center gap-4 relative z-10">
            <button onClick={() => { setEditingCourse(null); onExitEdit?.(); }} className="p-3 bg-white/10 rounded-xl text-white shadow-md hover:bg-[#ec2027] transition-all border border-white/10 active:scale-90">
              <ChevronLeft size={24} strokeWidth={4} />
            </button>
            <div className="flex flex-col">
              <h2 className="text-xl font-black leading-none tracking-tight uppercase">Curriculum <span className="text-[#fbee21]">Architect</span></h2>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1 truncate max-w-[150px]">{editingCourse.name}</p>
            </div>
          </div>

          <button onClick={handleManualSave} className="px-8 py-3 bg-[#fbee21] text-[#292667] rounded-xl font-black text-sm uppercase tracking-widest shadow-xl active:scale-95 border-b-4 border-black/10 hover:bg-white transition-all">
            Save changes
          </button>
        </div>

        <div className="flex-1 grid grid-cols-12 gap-4 overflow-hidden pb-1">
          <div className="col-span-12 lg:col-span-4 bg-slate-50 rounded-3xl border border-slate-200 shadow-inner overflow-hidden flex flex-col">
            <div className="p-6 pb-3 flex justify-between items-center shrink-0 border-b border-slate-200">
               <h3 className="text-xs font-black text-[#292667] uppercase tracking-widest">Syllabus Map</h3>
               <button onClick={handleAddModule} className="p-2 bg-[#00a651] text-white rounded-lg shadow-md transition-all active:scale-90"><PlusCircle size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2 p-4">
              <button 
                onClick={() => { setIsEditingMetadata(true); setActiveModuleIdx(null); setActiveLessonIdx(null); }}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${isEditingMetadata ? 'bg-white border-[#292667] shadow-md scale-[1.02]' : 'bg-white/50 border-transparent hover:bg-white/80'}`}
              >
                <div className={`p-2.5 rounded-lg ${isEditingMetadata ? 'bg-[#292667] text-[#fbee21]' : 'bg-slate-200 text-slate-400'}`}><Layout size={20} /></div>
                <p className={`font-black text-sm uppercase tracking-tight ${isEditingMetadata ? 'text-[#292667]' : 'text-slate-400'}`}>Base Config</p>
              </button>

              {editingCourse.modules.map((mod, mIdx) => (
                <div key={mod.id} className="space-y-1.5">
                  <div 
                    onClick={() => { setActiveModuleIdx(mIdx); setActiveLessonIdx(null); setIsEditingMetadata(false); }}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${activeModuleIdx === mIdx && activeLessonIdx === null ? 'bg-white border-indigo-500 shadow-md scale-[1.02]' : 'bg-white border-transparent hover:border-slate-200'}`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shadow-sm ${activeModuleIdx === mIdx ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400'}`}>{mIdx + 1}</span>
                      <span className={`font-black text-sm uppercase tracking-tight truncate ${activeModuleIdx === mIdx ? 'text-[#292667]' : 'text-slate-400'}`}>{mod.title}</span>
                    </div>
                    <ChevronRight size={16} className={activeModuleIdx === mIdx ? 'text-indigo-500' : 'text-slate-200'} />
                  </div>

                  {activeModuleIdx === mIdx && (
                    <div className="ml-6 pl-6 border-l-4 border-indigo-100 space-y-1.5 animate-in slide-in-from-left-2">
                       {mod.lessons.map((lesson, lIdx) => (
                         <button 
                          key={lesson.id} 
                          onClick={() => { setActiveModuleIdx(mIdx); setActiveLessonIdx(lIdx); setIsEditingMetadata(false); }}
                          className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${activeModuleIdx === mIdx && activeLessonIdx === lIdx ? 'bg-[#292667] border-[#292667] text-white shadow-md' : 'bg-white border-transparent hover:border-slate-100'}`}
                         >
                            <span className="text-xs font-black uppercase truncate">{lesson.title}</span>
                         </button>
                       ))}
                       <div className="grid grid-cols-4 gap-2 pt-2">
                           {(['video', 'assignment', 'text', 'quiz'] as Lesson['type'][]).map(type => (
                             <button key={type} onClick={() => handleAddLesson(type)} className="aspect-square flex items-center justify-center bg-white border border-slate-200 text-slate-300 rounded-lg hover:bg-[#00a651] hover:text-white transition-all"><MonitorPlay size={18} /></button>
                           ))}
                       </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8 overflow-hidden">
             <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 h-full flex flex-col overflow-hidden">
                {isEditingMetadata ? (
                   <CourseMetadataEditor course={editingCourse} onUpdate={(data) => setEditingCourse({ ...editingCourse, ...data })} />
                ) : activeLesson ? (
                   <TaskContentEditor lesson={activeLesson} onUpdate={(data) => {
                      if (activeModuleIdx === null || activeLessonIdx === null) return;
                      const updatedModules = [...editingCourse.modules];
                      updatedModules[activeModuleIdx].lessons[activeLessonIdx] = { ...updatedModules[activeModuleIdx].lessons[activeLessonIdx], ...data };
                      setEditingCourse({ ...editingCourse, modules: updatedModules });
                   }} />
                ) : (
                   <div className="h-full flex flex-col items-center justify-center opacity-30 text-center px-10">
                      <BookOpen size={64} className="text-slate-200 mb-4" />
                      <h4 className="text-xl font-black text-[#292667] uppercase">Initialize Workspace</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Select a curriculum node to begin editing</p>
                   </div>
                )}
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden animate-in fade-in duration-500">
      {isNewCourseModalOpen && (
        <NewCourseModal 
          onClose={() => setIsNewCourseModalOpen(false)} 
          onSave={handleCreateNewCourse} 
        />
      )}

      {/* Main Header */}
      <div className="w-full bg-[#292667] rounded-[2rem] p-6 text-white shadow-xl border-b-8 border-[#00a651] flex flex-col md:flex-row items-center justify-between gap-6 flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-4 bg-[#00a651] rounded-2xl text-white shadow-lg rotate-3 border-b-2 border-black/10">
             <BookOpen size={32} strokeWidth={3} />
           </div>
           <div>
             <h2 className="text-2xl md:text-3xl font-black leading-none tracking-tight uppercase">Program <span className="text-[#fbee21]">Library</span></h2>
             <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">U Book Store Global Catalog</p>
           </div>
        </div>
        <div className="flex items-center gap-3 bg-white/10 p-2 rounded-[1.5rem] border border-white/10 backdrop-blur-md relative z-10">
           <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl">
              <span className="text-2xl font-black text-[#fbee21]">{courses.length}</span>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Total Courses</span>
           </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="w-full bg-white p-3 rounded-[1.8rem] shadow-lg border border-slate-100 flex flex-col lg:flex-row items-center gap-3 flex-shrink-0">
        <div className="flex-[2] flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 group focus-within:border-[#00a651] transition-all w-full">
           <Search size={18} className="text-slate-300 group-focus-within:text-[#00a651]" strokeWidth={3} />
           <input 
             type="text" 
             placeholder="Filter by title, category, or skills..." 
             className="bg-transparent outline-none font-black text-xs text-[#292667] uppercase placeholder:text-slate-200 w-full"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-48">
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-50 pl-10 pr-8 py-2.5 rounded-xl border border-slate-100 outline-none font-black text-[10px] text-[#292667] uppercase appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <Tag size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
          </div>

          <div className="relative flex-1 lg:w-48">
            <select 
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full bg-slate-50 pl-10 pr-8 py-2.5 rounded-xl border border-slate-100 outline-none font-black text-[10px] text-[#292667] uppercase appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
            >
              {levels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <Signal size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* YELLOW "add class" BUTTON */}
      {canEdit && (
        <div className="w-full flex-shrink-0 animate-in slide-in-from-top-2 duration-500">
           <button 
             onClick={() => setIsNewCourseModalOpen(true)}
             className="w-full py-5 bg-[#fbee21] hover:bg-[#292667] text-[#292667] hover:text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] shadow-[0_20px_40px_-5px_rgba(251,238,33,0.4)] transition-all border-b-6 border-black/10 flex items-center justify-center gap-4 active:scale-[0.98] group"
           >
              <div className="p-1.5 bg-[#292667]/10 group-hover:bg-white/20 rounded-lg group-hover:rotate-90 transition-transform">
                 <Plus size={28} strokeWidth={3} />
              </div>
              add class
           </button>
        </div>
      )}

      {/* Course Grid */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div 
               key={course.id} 
               onClick={() => { setEditingCourse(course); setIsEditingMetadata(true); }}
               className="bg-white rounded-[2.5rem] border-2 border-slate-50 shadow-md hover:shadow-2xl hover:border-[#fbee21]/40 transition-all group flex flex-col overflow-hidden relative h-full cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-100">
                <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={course.name} />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                   <span className="px-3 py-1 bg-[#292667]/90 backdrop-blur-md text-[#fbee21] rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg border border-white/10">
                     {course.category}
                   </span>
                   <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#ec2027] rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg border border-slate-100">
                     {course.level}
                   </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-md border border-slate-100">
                   <Clock size={12} className="text-[#3b82f6]" strokeWidth={3} />
                   <span className="text-[10px] font-black text-[#292667]">{course.duration || '20h'}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="text-xl font-black text-[#292667] uppercase tracking-tight leading-tight group-hover:text-[#ec2027] transition-colors mb-2 line-clamp-1">{course.name}</h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase leading-relaxed line-clamp-2 min-h-[2.5rem] tracking-tight">
                    {course.description || "Comprehensive curriculum covering fundamental concepts and practical application for young learners."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                   <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg text-[#ec2027] shadow-sm"><Users size={16} strokeWidth={3} /></div>
                      <div>
                        <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Students</p>
                        <p className="text-sm font-black text-[#292667]">1.2k+</p>
                      </div>
                   </div>
                   <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg text-[#00a651] shadow-sm"><Layers size={16} strokeWidth={3} /></div>
                      <div>
                        <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Content</p>
                        <p className="text-sm font-black text-[#292667]">{course.modules.length} Modules</p>
                      </div>
                   </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onPreviewCourse?.(course.id); }}
                    className="flex-1 py-3 bg-slate-100 text-slate-400 hover:bg-[#292667] hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <PlayCircle size={16} strokeWidth={3} className="group-hover/btn:scale-110 transition-transform" />
                    Preview
                  </button>
                  {canEdit && (
                    <button 
                      onClick={() => { setEditingCourse(course); setIsEditingMetadata(true); }}
                      className="flex-[1.5] py-3 bg-[#00a651] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border-b-4 border-black/10"
                    >
                      <Edit3 size={16} strokeWidth={3} />
                      Edit Syllabus
                    </button>
                  )}
                  {canDelete && (
                    <button 
                      onClick={(e) => handleDeleteCourse(course.id, e)}
                      className="p-3 bg-white text-slate-300 hover:text-[#ec2027] hover:bg-red-50 rounded-xl border border-slate-100 transition-all shadow-sm"
                    >
                      <Trash2 size={18} strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* New Program Empty State Card */}
          {canEdit && (
            <button 
              onClick={() => setIsNewCourseModalOpen(true)}
              className="bg-slate-50/50 rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center p-10 group hover:border-[#fbee21]/20 hover:bg-white transition-all text-slate-200 hover:text-[#292667] min-h-[300px]"
            >
              <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 border border-slate-50">
                <PlusCircle size={40} strokeWidth={1} />
              </div>
              <h4 className="text-xl font-black uppercase tracking-widest">New Program</h4>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2 opacity-60">Architect a new curriculum</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesAdminView;
