import { useState } from 'react';
import { User, Mail, Phone, Building2, Calendar, Award, LogOut, Edit2, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock faculty data
  const [facultyData, setFacultyData] = useState({
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@institute.edu',
    phone: '+91 98765 43210',
    subject: 'Physics',
    department: 'Science Department',
    joinDate: 'January 2020',
    employeeId: 'FAC-2020-001',
    qualification: 'Ph.D. in Physics',
    specialization: 'Electromagnetism & Quantum Mechanics',
    experience: '12 years',
    batchesHandled: 15,
    studentsImpacted: 2450,
  });

  const [editedData, setEditedData] = useState({ ...facultyData });

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      window.location.href = '/login';
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...facultyData });
  };

  const handleSave = () => {
    setFacultyData({ ...editedData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({ ...facultyData });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Faculty Profile</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2">
            View and manage your profile information
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {!isEditing ? (
            <>
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                <Edit2 size={20} />
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-danger-600 hover:bg-danger-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                <X size={20} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-success-600 hover:bg-success-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                <Save size={20} />
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <div className="card">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-bold">
            {(isEditing ? editedData.name : facultyData.name).split(' ').map(n => n[0]).join('')}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    value={editedData.qualification}
                    onChange={(e) => handleChange('qualification', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{facultyData.name}</h2>
                <p className="text-sm sm:text-base md:text-lg text-primary-600 font-medium mt-1">{facultyData.subject} Faculty</p>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">{facultyData.qualification}</p>
              </>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <Mail className="text-primary-600" size={20} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-900">{facultyData.email}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary-600" size={20} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Phone</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-900">{facultyData.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="text-primary-600" size={20} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Department</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.department}
                      onChange={(e) => handleChange('department', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-900">{facultyData.department}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-primary-600" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Joined</p>
                  <p className="text-sm font-medium text-gray-900">{facultyData.joinDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="subsection-title">Professional Information</h3>
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Employee ID</span>
              <span className="text-sm font-medium text-gray-900">{facultyData.employeeId}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600 block mb-2">Specialization</span>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.specialization}
                  onChange={(e) => handleChange('specialization', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ) : (
                <span className="text-sm font-medium text-gray-900">{facultyData.specialization}</span>
              )}
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Total Experience</span>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                  className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right"
                />
              ) : (
                <span className="text-sm font-medium text-gray-900">{facultyData.experience}</span>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="subsection-title">Teaching Impact</h3>
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
              <div className="flex items-center gap-3">
                <Award className="text-primary-600" size={24} />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-primary-700">{facultyData.batchesHandled}</p>
                  <p className="text-xs sm:text-sm text-primary-600">Batches Handled</p>
                </div>
              </div>
            </div>
            <div className="p-3 sm:p-4 bg-gradient-to-br from-success-50 to-success-100 rounded-lg">
              <div className="flex items-center gap-2 sm:gap-3">
                <User className="text-success-600 w-5 h-5 sm:w-6 sm:h-6" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-success-700">{facultyData.studentsImpacted}</p>
                  <p className="text-xs sm:text-sm text-success-600">Students Impacted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
