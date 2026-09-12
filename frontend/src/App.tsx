import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './api';
import './index.css';

// SVG Icons
const EyeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const EyeOffIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>;
const EditIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const TrashIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

const HomeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const DashboardIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>;
const ProjectsIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const UserIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const LogoutIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;

const isAuthenticated = () => !!localStorage.getItem('token');

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return children;
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = isAuthenticated();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="sidebar">
      <h2>TaskNexus</h2>
      <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}><div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}><HomeIcon/> Home</div></Link>
      {isAuth && (
        <>
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}><div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}><DashboardIcon/> Dashboard</div></Link>
          <Link to="/projects" className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}><div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}><ProjectsIcon/> Projects</div></Link>
          
          <div style={{ marginTop: 'auto', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--primary), #c084fc)', color: 'white', borderRadius: '8px', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserIcon />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'white', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.fullName || 'User'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.email || ''}</div>
            </div>
            <button onClick={handleLogout} className="icon-btn danger" title="Logout" style={{ padding: '0.5rem' }}>
              <LogoutIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isAuth = isAuthenticated();
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        {!isAuth && (
          <div className="topbar">
            <Link to="/login" className="btn-primary" style={{ textDecoration: 'none' }}>Sign In</Link>
          </div>
        )}
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const isAuth = isAuthenticated();
  return (
    <Layout>
      <div style={{ textAlign: 'center', marginTop: '4rem', animation: 'fade-in 0.5s ease-out' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Welcome to TaskNexus
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          The all-in-one platform to organize your tasks, track your progress, and deliver your projects on time. {isAuth ? "You are ready to manage your workflow." : "Create an account to unlock full productivity features!"}
        </p>
        
        {isAuth ? (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/dashboard" className="btn-primary" style={{ fontSize: '1.25rem', padding: '1rem 2rem', textDecoration: 'none' }}>Go to Dashboard</Link>
            <Link to="/projects" className="btn-primary" style={{ fontSize: '1.25rem', padding: '1rem 2rem', textDecoration: 'none', background: 'var(--border)', color: 'white' }}>View Projects</Link>
          </div>
        ) : (
          <Link to="/login" className="btn-primary" style={{ fontSize: '1.25rem', padding: '1rem 2rem', textDecoration: 'none' }}>Get Started Today</Link>
        )}
        
        {/* Simple feature showcase for the home page */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '5rem' }}>
          <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', width: '250px' }}>
            <h3 style={{ color: 'var(--primary)' }}>Track Projects</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Organize multiple projects and monitor their overall completion progress effortlessly.</p>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', width: '250px' }}>
            <h3 style={{ color: '#eab308' }}>Manage Tasks</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Break down projects into bite-sized tasks, set priorities, and assign due dates.</p>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', width: '250px' }}>
            <h3 style={{ color: 'var(--success)' }}>Stay Productive</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Visualize your productivity with beautiful dashboard charts and real-time statistics.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { email: formData.email, password: formData.password } : formData;
      const res = await api.post(endpoint, payload);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
             <div className="form-group">
               <label>Full Name</label>
               <input type="text" className="form-control" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} required />
             </div>
          )}
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" className="form-control" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input type={showPassword ? "text" : "password"} className="form-control" style={{ paddingRight: '3rem' }} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
              <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>{isLogin ? 'Sign In' : 'Sign Up'}</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
          <span style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 'bold' }} onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign up instead' : 'Sign in instead'}</span>
        </p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({ 
    totalProjects: 0, totalTasks: 0, completedTasks: 0, pendingTasks: 0, projectsInProgress: 0, user: '',
    highPriority: 0, mediumPriority: 0, lowPriority: 0,
    projectsCompleted: 0, projectsNotStarted: 0
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const [projectsRes, tasksRes] = await Promise.all([api.get('/projects'), api.get('/tasks')]);
        const tasks = tasksRes.data;
        const projects = projectsRes.data;
        
        setStats({
          totalProjects: projects.length,
          projectsInProgress: projects.filter((p: any) => p.status === 'In Progress').length,
          projectsCompleted: projects.filter((p: any) => p.status === 'Completed').length,
          projectsNotStarted: projects.filter((p: any) => p.status === 'Not Started').length,
          totalTasks: tasks.length,
          completedTasks: tasks.filter((t: any) => t.status === 'Completed').length,
          pendingTasks: tasks.filter((t: any) => t.status !== 'Completed').length,
          highPriority: tasks.filter((t: any) => t.priority === 'High' && t.status !== 'Completed').length,
          mediumPriority: tasks.filter((t: any) => t.priority === 'Medium' && t.status !== 'Completed').length,
          lowPriority: tasks.filter((t: any) => t.priority === 'Low' && t.status !== 'Completed').length,
          user: user.fullName || 'User'
        });
      } catch (err) {}
    };
    fetchData();
  }, []);
  
  const completionRate = stats.totalTasks === 0 ? 0 : Math.round((stats.completedTasks / stats.totalTasks) * 100);
  const circleCircumference = 2 * Math.PI * 50;
  const strokeDashoffset = circleCircumference - (completionRate / 100) * circleCircumference;

  return (
    <Layout>
      <h1 style={{ marginBottom: '2rem' }}>Welcome back, {stats.user}!</h1>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        
        {/* Main Circular Progress Graph */}
        <div className="stat-card" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '2rem' }}>
          <div>
            <h3 style={{ color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>Overall Task Progress</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>{completionRate}%</div>
            <p style={{ color: 'var(--success)', margin: '0.5rem 0 0 0', fontWeight: 'bold' }}>{stats.completedTasks} completed out of {stats.totalTasks}</p>
          </div>
          
          <div style={{ width: '120px', height: '120px', position: 'relative' }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" strokeWidth="12" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--primary)" strokeWidth="12" 
                strokeDasharray={circleCircumference} strokeDashoffset={strokeDashoffset} 
                strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-in-out', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
            </svg>
          </div>
        </div>

        {/* Small Stats Grid */}
        <div style={{ flex: '2 1 400px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
          <div className="stat-card" style={{ justifyContent: 'center' }}>
            <span className="stat-title">Total Projects</span>
            <span className="stat-value">{stats.totalProjects}</span>
          </div>
          <div className="stat-card" style={{ justifyContent: 'center' }}>
            <span className="stat-title">Projects In Progress</span>
            <span className="stat-value" style={{ color: '#38bdf8' }}>{stats.projectsInProgress}</span>
          </div>
          <div className="stat-card" style={{ justifyContent: 'center' }}>
            <span className="stat-title">Completed Tasks</span>
            <span className="stat-value" style={{ color: 'var(--success)' }}>{stats.completedTasks}</span>
          </div>
          <div className="stat-card" style={{ justifyContent: 'center' }}>
            <span className="stat-title">Pending Tasks</span>
            <span className="stat-value" style={{ color: '#eab308' }}>{stats.pendingTasks}</span>
          </div>
        </div>
      </div>
      
      {/* New Graphs Section */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Pending Tasks by Priority Graph */}
        <div className="stat-card" style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: 'white' }}>Pending Tasks by Priority</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--danger)' }}>High Priority ({stats.highPriority})</span>
            </div>
            <div className="progress-bar-bg" style={{ height: '12px' }}>
              <div className="progress-bar-fill" style={{ width: `${stats.pendingTasks ? (stats.highPriority / stats.pendingTasks) * 100 : 0}%`, background: 'var(--danger)' }}></div>
            </div>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <span style={{ color: '#eab308' }}>Medium Priority ({stats.mediumPriority})</span>
            </div>
            <div className="progress-bar-bg" style={{ height: '12px' }}>
              <div className="progress-bar-fill" style={{ width: `${stats.pendingTasks ? (stats.mediumPriority / stats.pendingTasks) * 100 : 0}%`, background: '#eab308' }}></div>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--primary)' }}>Low Priority ({stats.lowPriority})</span>
            </div>
            <div className="progress-bar-bg" style={{ height: '12px' }}>
              <div className="progress-bar-fill" style={{ width: `${stats.pendingTasks ? (stats.lowPriority / stats.pendingTasks) * 100 : 0}%`, background: 'var(--primary)' }}></div>
            </div>
          </div>
        </div>

        {/* Project Breakdown Graph */}
        <div className="stat-card" style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: 'white' }}>Project Status Breakdown</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--success)' }}>Completed ({stats.projectsCompleted})</span>
            </div>
            <div className="progress-bar-bg" style={{ height: '12px' }}>
              <div className="progress-bar-fill" style={{ width: `${stats.totalProjects ? (stats.projectsCompleted / stats.totalProjects) * 100 : 0}%`, background: 'var(--success)' }}></div>
            </div>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <span style={{ color: '#38bdf8' }}>In Progress ({stats.projectsInProgress})</span>
            </div>
            <div className="progress-bar-bg" style={{ height: '12px' }}>
              <div className="progress-bar-fill" style={{ width: `${stats.totalProjects ? (stats.projectsInProgress / stats.totalProjects) * 100 : 0}%`, background: '#38bdf8' }}></div>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Not Started ({stats.projectsNotStarted})</span>
            </div>
            <div className="progress-bar-bg" style={{ height: '12px' }}>
              <div className="progress-bar-fill" style={{ width: `${stats.totalProjects ? (stats.projectsNotStarted / stats.totalProjects) * 100 : 0}%`, background: 'var(--border)' }}></div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Project Search & Filter
  const [projectSearch, setProjectSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState('All');

  const [editingProject, setEditingProject] = useState<any>(null);
  const [projectForm, setProjectForm] = useState({ name: '', description: '', status: 'Not Started', startDate: '', endDate: '' });
  
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  // Task Search & Filter
  const [taskSearch, setTaskSearch] = useState('');
  const [taskStatusFilter, setTaskStatusFilter] = useState('All');
  const [taskPriorityFilter, setTaskPriorityFilter] = useState('All');

  const [editingTask, setEditingTask] = useState<any>(null);
  const [taskForm, setTaskForm] = useState({ name: '', description: '', priority: 'Medium', status: 'Pending', dueDate: '' });
  const [showTaskForm, setShowTaskForm] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {} finally {
      setIsLoading(false);
    }
  };
  useEffect(() => { fetchProjects(); }, []);

  // --- Project CRUD ---
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name) return;
    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject.id}`, projectForm);
      } else {
        await api.post('/projects', projectForm);
      }
      setIsModalOpen(false);
      setEditingProject(null);
      setProjectForm({ name: '', description: '', status: 'Not Started', startDate: '', endDate: '' });
      fetchProjects();
      if (editingProject && selectedProject?.id === editingProject.id) {
         refreshSelectedProject(editingProject.id);
      }
    } catch (err) {}
  };

  const deleteProject = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // prevent opening sidebar
    if (confirm('Are you sure you want to delete this project? All tasks inside will be deleted.')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
        if (selectedProject?.id === id) setSelectedProject(null);
      } catch(err) {}
    }
  };

  const openProjectModal = (p?: any) => {
    if (p) {
      setEditingProject(p);
      setProjectForm({
        name: p.name,
        description: p.description || '',
        status: p.status || 'Not Started',
        startDate: p.startDate ? new Date(p.startDate).toISOString().split('T')[0] : '',
        endDate: p.endDate ? new Date(p.endDate).toISOString().split('T')[0] : ''
      });
    } else {
      setEditingProject(null);
      setProjectForm({ name: '', description: '', status: 'Not Started', startDate: '', endDate: '' });
    }
    setIsModalOpen(true);
  };

  // --- Task CRUD ---
  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.name || !selectedProject) return;
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask.id}`, taskForm);
      } else {
        await api.post('/tasks', { ...taskForm, projectId: selectedProject.id });
      }
      setEditingTask(null);
      setTaskForm({ name: '', description: '', priority: 'Medium', status: 'Pending', dueDate: '' });
      setShowTaskForm(false);
      refreshSelectedProject(selectedProject.id);
    } catch (err) {}
  };

  const deleteTask = async (taskId: string) => {
    if (confirm('Delete this task?')) {
      try {
        await api.delete(`/tasks/${taskId}`);
        refreshSelectedProject(selectedProject.id);
      } catch(err) {}
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, status: string) => {
    try {
      await api.put(`/tasks/${taskId}`, { status });
      refreshSelectedProject(selectedProject.id);
    } catch (err) {}
  };

  const refreshSelectedProject = async (id: string) => {
    try {
      const res = await api.get(`/projects/${id}`);
      setSelectedProject(res.data);
      fetchProjects();
    } catch (err) {}
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(projectSearch.toLowerCase());
    const matchesStatus = projectFilter === 'All' || p.status === projectFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredTasks = selectedProject?.tasks?.filter((t: any) => {
    const matchesSearch = t.name.toLowerCase().includes(taskSearch.toLowerCase());
    const matchesStatus = taskStatusFilter === 'All' || t.status === taskStatusFilter;
    const matchesPriority = taskPriorityFilter === 'All' || t.priority === taskPriorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  }) || [];

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Your Projects</h1>
        <button className="btn-primary" onClick={() => openProjectModal()}>+ New Project</button>
      </div>

      {/* Project Search & Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input type="text" className="form-control" placeholder="Search projects by name..." value={projectSearch} onChange={e => setProjectSearch(e.target.value)} style={{ flex: 1 }} />
        <select className="form-control" value={projectFilter} onChange={e => setProjectFilter(e.target.value)} style={{ width: '200px' }}>
          <option value="All">All Statuses</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading projects...</div>
      ) : (
      <div style={{ display: 'flex', flexDirection: selectedProject ? 'row' : 'column', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Project List */}
        <div style={{ display: 'grid', gridTemplateColumns: selectedProject ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', width: selectedProject ? '40%' : '100%' }}>
          {filteredProjects.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No projects found.</p>}
          {filteredProjects.map((p: any) => {
            const completed = p.tasks?.filter((t:any) => t.status === 'Completed').length || 0;
            const total = p.tasks?.length || 0;
            const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

            return (
              <div key={p.id} className="project-card" style={{ border: selectedProject?.id === p.id ? '2px solid var(--primary)' : '' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', flex: 1 }}>{p.name}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'rgba(139, 92, 246, 0.2)', color: '#d8b4fe', borderRadius: '4px', fontWeight: 'bold' }}>{p.status}</span>
                    <button className="icon-btn" onClick={(e) => { e.stopPropagation(); openProjectModal(p); }} title="Edit Project"><EditIcon /></button>
                    <button className="icon-btn danger" onClick={(e) => deleteProject(e, p.id)} title="Delete Project"><TrashIcon /></button>
                  </div>
                </div>
                <p style={{ color: 'var(--text-muted)', margin: '0 0 1rem 0', fontSize: '0.875rem' }}>{p.description || 'No description'}</p>
                
                {/* Project Statistics */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>{total}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Tasks</div>
                  </div>
                  <div style={{ flex: 1, background: 'rgba(34, 197, 94, 0.1)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--success)' }}>{completed}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Completed</div>
                  </div>
                  <div style={{ flex: 1, background: 'rgba(234, 179, 8, 0.1)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#eab308' }}>{total - completed}</div>
                    <div style={{ fontSize: '0.75rem', color: '#eab308' }}>Pending</div>
                  </div>
                </div>
                
                {/* Progress Graph */}
                <div style={{ background: 'var(--bg-dark)', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Project Progress</span>
                    <span style={{ fontWeight: 'bold', color: progress === 100 ? 'var(--success)' : 'white' }}>{progress}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${progress}%`, background: progress === 100 ? 'var(--success)' : '' }}></div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button className="btn-primary" style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'none' }} onClick={(e) => { e.stopPropagation(); refreshSelectedProject(p.id); setShowTaskForm(false); }}>Manage Tasks</button>
                  <button className="btn-primary" style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem' }} onClick={(e) => { e.stopPropagation(); refreshSelectedProject(p.id); setShowTaskForm(true); }}>+ Add Task</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Details & Tasks Sidebar */}
        {selectedProject && (
          <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)', position: 'sticky', top: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>{selectedProject.name}</h2>
              <button onClick={() => { setSelectedProject(null); setEditingTask(null); setShowTaskForm(false); }} style={{ background: 'var(--bg-dark)', color: 'white', border: 'none', cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: '8px' }}>Close</button>
            </div>
            
            {(showTaskForm || editingTask) ? (
              <form onSubmit={handleSaveTask} style={{ marginBottom: '2.5rem', background: 'var(--bg-dark)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, color: 'var(--primary)' }}>{editingTask ? 'Edit Task' : 'Add New Task'}</h4>
                  <button type="button" onClick={() => { setEditingTask(null); setShowTaskForm(false); setTaskForm({ name: '', description: '', priority: 'Medium', status: 'Pending', dueDate: '' }); }} style={{ background:'transparent', color:'var(--text-muted)', border:'none', cursor:'pointer'}}>Cancel</button>
                </div>
                
                <input type="text" placeholder="Task Name..." className="form-control" style={{ marginBottom: '1rem' }} value={taskForm.name} onChange={e => setTaskForm({...taskForm, name: e.target.value})} required />
                
                <textarea placeholder="Description (optional)" className="form-control" style={{ marginBottom: '1rem', resize: 'vertical', minHeight: '60px' }} value={taskForm.description} onChange={e => setTaskForm({...taskForm, description: e.target.value})} />
                
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Due Date</label>
                    <input type="date" className="form-control" value={taskForm.dueDate} onChange={e => setTaskForm({...taskForm, dueDate: e.target.value})} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Priority</label>
                    <select className="form-control" value={taskForm.priority} onChange={e => setTaskForm({...taskForm, priority: e.target.value})}>
                      <option>Low</option><option>Medium</option><option>High</option>
                    </select>
                  </div>
                  {editingTask && (
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status</label>
                      <select className="form-control" value={taskForm.status} onChange={e => setTaskForm({...taskForm, status: e.target.value})}>
                        <option>Pending</option><option>In Progress</option><option>Completed</option>
                      </select>
                    </div>
                  )}
                </div>
                <button className="btn-primary" style={{ width: '100%' }}>{editingTask ? 'Save Changes' : 'Create Task'}</button>
              </form>
            ) : null}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ margin: 0, color: 'white' }}>Task List ({filteredTasks.length})</h4>
            </div>
            
            {/* Task Search & Filter Bar */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input type="text" className="form-control" placeholder="Search tasks..." value={taskSearch} onChange={e => setTaskSearch(e.target.value)} style={{ flex: 1, padding: '0.5rem' }} />
              <select className="form-control" value={taskStatusFilter} onChange={e => setTaskStatusFilter(e.target.value)} style={{ width: '120px', padding: '0.5rem' }}>
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <select className="form-control" value={taskPriorityFilter} onChange={e => setTaskPriorityFilter(e.target.value)} style={{ width: '120px', padding: '0.5rem' }}>
                <option value="All">All Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {filteredTasks.map((t: any) => (
                <div key={t.id} style={{ background: 'var(--bg-dark)', padding: '1rem 1.5rem', borderRadius: '12px', borderLeft: `4px solid ${t.status === 'Completed' ? 'var(--success)' : t.priority === 'High' ? 'var(--danger)' : t.priority === 'Medium' ? '#eab308' : 'var(--primary)'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem', textDecoration: t.status === 'Completed' ? 'line-through' : 'none', color: t.status === 'Completed' ? 'var(--text-muted)' : 'white', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      {t.name}
                      <button className="icon-btn small" onClick={() => { setEditingTask(t); setTaskForm({ name: t.name, description: t.description||'', priority: t.priority||'Medium', status: t.status||'Pending', dueDate: t.dueDate ? new Date(t.dueDate).toISOString().split('T')[0] : '' }); }} title="Edit Task"><EditIcon /></button>
                      <button className="icon-btn small danger" onClick={() => deleteTask(t.id)} title="Delete Task"><TrashIcon /></button>
                    </div>
                    {t.description && <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0' }}>{t.description}</p>}
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem' }}>
                      {t.dueDate && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>📅 {new Date(t.dueDate).toLocaleDateString()}</span>}
                      <span style={{ color: t.priority === 'High' ? 'var(--danger)' : 'inherit' }}>⚡ {t.priority}</span>
                    </div>
                  </div>

                  {/* Task Status Dropdown */}
                  <div>
                    <select 
                      className="form-control" 
                      style={{ padding: '0.5rem', background: t.status === 'Completed' ? 'rgba(34, 197, 94, 0.1)' : 'var(--bg-card)', color: t.status === 'Completed' ? 'var(--success)' : 'white', borderColor: t.status === 'Completed' ? 'var(--success)' : 'var(--border)', fontWeight: 'bold' }} 
                      value={t.status} 
                      onChange={(e) => handleUpdateTaskStatus(t.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                </div>
              ))}
              {filteredTasks.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-dark)', borderRadius: '12px', border: '1px dashed var(--border)' }}>
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>No tasks match your filters.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ marginTop: 0 }}>{editingProject ? 'Edit Project' : 'Create New Project'}</h2>
            <form onSubmit={handleSaveProject}>
              <div className="form-group">
                <label>Project Name</label>
                <input type="text" className="form-control" value={projectForm.name} onChange={e => setProjectForm({...projectForm, name: e.target.value})} required autoFocus />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" style={{ resize: 'vertical', minHeight: '80px' }} value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Status</label>
                  <select className="form-control" value={projectForm.status} onChange={e => setProjectForm({...projectForm, status: e.target.value})}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Start Date</label>
                  <input type="date" className="form-control" value={projectForm.startDate} onChange={e => setProjectForm({...projectForm, startDate: e.target.value})} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>End Date</label>
                  <input type="date" className="form-control" value={projectForm.endDate} onChange={e => setProjectForm({...projectForm, endDate: e.target.value})} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" className="btn-primary" style={{ background: 'var(--border)', color: 'white' }} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">{editingProject ? 'Save Changes' : 'Create Project'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
