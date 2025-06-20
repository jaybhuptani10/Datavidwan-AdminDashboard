import React, { useState, useEffect } from "react";
import {
  Image,
  BookOpen,
  Wrench,
  ArrowLeft,
  Settings,
  MessageSquare,
  Mail,
  User,
  Users,
  FileText,
} from "lucide-react";
import ImagesTab from "./Images/ImagesTab";
import ServicesTab from "./services/ServicesTab";
import CoursesTab from "./courses/CoursesTab";
import TestimonialsTab from "./Testimonials/TestimonialsTab";
import BlogsTab from "./Blogs.jsx/BlogsTab";
import ContactUsTab from "./Contact/ContactUsTab";
import BlogCommentsTab from "./comments/BlogCommentsTab";
import UserProfileTab from "./UserProfile/UserProfileTab";
import axios from "axios";
import ServicesConsultation from "./consultations/ServicesConsultation";

const DashboardCard = ({
  title,
  count,
  description,
  icon,
  onManage,
  bgColor = "bg-white",
}) => {
  return (
    <div
      className={`${bgColor} rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
          {icon}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-3xl font-bold text-gray-900 mb-1">{count}</h3>
        <p className="text-gray-500 text-sm">Total {description}</p>
      </div>

      <button
        onClick={onManage}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg py-3 px-4 font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Manage {title}
      </button>
    </div>
  );
};

// Placeholder components for the new sections

const AdminPanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [stats, setStats] = useState({
    images: 0,
    courses: 0,
    services: 0,
    blogs: 0,
    testimonials: 0,
    contacts: 0,
    users: 0,
    consultations: 0,
  });

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleManage = (section) => {
    setActivePage(section);
  };

  useEffect(() => {
    // Fetch real stats from backend
    const fetchStats = async () => {
      try {
        const res = await axios.get("/web/stats", {
          withCredentials: true,
        });
        const data = res.data.data || {};
        setStats({
          images: data.totalImages || 0,
          courses: data.totalCourses || 0,
          services: data.totalServices || 0,
          blogs: 0,
          testimonials: 0,
          contacts: data.totalContacts || 0,
          users: 0,
          consultations: data.totalConsults || 0,
        });
      } catch (err) {
        setStats({
          images: 0,
          courses: 0,
          services: 0,
          blogs: 0,
          testimonials: 0,
          contacts: 0,
          users: 0,
          consultations: 0,
        });
      }
    };

    fetchStats();
  }, []);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Settings },
    { id: "images", label: "Images", icon: Image },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "services", label: "Services", icon: Wrench },
    { id: "blogs", label: "Blogs", icon: FileText },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "contact-forms", label: "Contact Forms", icon: Mail },
    { id: "consultations", label: "Consultation", icon: User },
    { id: "User-Profile", label: "User Profile", icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-16" : "w-64"
        } bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 ease-in-out shadow-2xl`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-700">
          {!collapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Admin Panel
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="text-white p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft
              size={20}
              className={`transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <nav className="mt-6 px-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center p-3 mb-1 rounded-lg transition-all duration-200 ${
                  activePage === item.id
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-slate-700"
                }`}
              >
                <div className="flex items-center">
                  <IconComponent size={20} />
                  {!collapsed && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="p-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {activePage === "dashboard"
                ? "Dashboard"
                : navigationItems.find((item) => item.id === activePage)
                    ?.label || "Dashboard"}
            </h1>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium">
              View Website
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        {activePage === "dashboard" && (
          <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard
                  title="Images"
                  count={stats.images}
                  description="images"
                  icon={<Image size={24} className="text-blue-600" />}
                  onManage={() => handleManage("images")}
                />
                <DashboardCard
                  title="Courses"
                  count={stats.courses}
                  description="courses"
                  icon={<BookOpen size={24} className="text-green-600" />}
                  onManage={() => handleManage("courses")}
                />
                <DashboardCard
                  title="Services"
                  count={stats.services}
                  description="services"
                  icon={<Wrench size={24} className="text-purple-600" />}
                  onManage={() => handleManage("services")}
                />
                <DashboardCard
                  title="Blogs"
                  count={stats.blogs}
                  description="blog posts"
                  icon={<FileText size={24} className="text-indigo-600" />}
                  onManage={() => handleManage("blogs")}
                />
                <DashboardCard
                  title="Testimonials"
                  count={stats.testimonials}
                  description="testimonials"
                  icon={<MessageSquare size={24} className="text-yellow-600" />}
                  onManage={() => handleManage("testimonials")}
                />
                <DashboardCard
                  title="Contact Forms"
                  count={stats.contacts}
                  description="form submissions"
                  icon={<Mail size={24} className="text-teal-600" />}
                  onManage={() => handleManage("contact-forms")}
                />
                <DashboardCard
                  title="Consultation"
                  count={stats.consultations}
                  description="consultations"
                  icon={<User size={24} className="text-pink-600" />}
                  onManage={() => handleManage("consultations")}
                />
                <DashboardCard
                  title="Users"
                  count={stats.users}
                  description="registered users"
                  icon={<Users size={24} className="text-orange-600" />}
                  onManage={() => handleManage("user-profiles")}
                />
              </div>
            </div>
          </div>
        )}

        {/* Existing Tab Components */}
        {activePage === "images" && <ImagesTab />}
        {activePage === "courses" && <CoursesTab />}
        {activePage === "services" && <ServicesTab />}
        {activePage === "blogs" && <BlogsTab />}
        {activePage === "testimonials" && <TestimonialsTab />}
        {activePage === "contact-forms" && <ContactUsTab />}
        {activePage === "consultations" && <ServicesConsultation />}
        {activePage === "User-Profile" && <UserProfileTab />}
      </div>
    </div>
  );
};

export default AdminPanel;
