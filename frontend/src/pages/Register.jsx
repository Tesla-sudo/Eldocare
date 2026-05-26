// src/pages/Register.jsx
import  { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Hospital } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    phone: '',
    fullName: '',
    role: 'chv',           // Default to CHV
    password: '',
    nationalId: '',
    // Hospital specific fields
    facilityName: '',
    county: '',
    contactPhone: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare payload based on role
    const payload = {
      phone: formData.phone,
      fullName: formData.fullName,
      role: formData.role,
      password: formData.password,
      nationalId: formData.role === 'chv' ? formData.nationalId : null,
    };

    // Add facility details if Hospital
    if (formData.role === 'hospital') {
      payload.facilityName = formData.facilityName;
      payload.county = formData.county;
      payload.contactPhone = formData.contactPhone;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Account created successfully! Please login.');
        navigate('/login');
      } else {
        toast.error(data.error || 'Registration failed');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-green-600 mb-8 hover:text-green-700">
          ← Back to Homepage
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <h1 className="text-3xl font-bold text-center mb-2">Join HealthAccess</h1>
          <p className="text-gray-600 text-center mb-8">
            Register as a Hospital or CHV
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am registering as:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'chv' })}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition ${formData.role === 'chv' ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}
                >
                  <Users size={28} className={formData.role === 'chv' ? 'text-green-600' : 'text-gray-400'} />
                  <span className="font-medium">CHV</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'hospital' })}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition ${formData.role === 'hospital' ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}
                >
                  <Hospital size={28} className={formData.role === 'hospital' ? 'text-green-600' : 'text-gray-400'} />
                  <span className="font-medium">Hospital</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Full Name / Contact Person</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-green-600"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="0712345678"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-green-600"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            {/* Hospital Specific Fields */}
            {formData.role === 'hospital' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Hospital/Facility Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
                    value={formData.facilityName}
                    onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">County</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
                    value={formData.county}
                    onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                    required
                  />
                </div>
              </>
            )}

            {/* CHV Specific Fields */}
            {formData.role === 'chv' && (
              <div>
                <label className="block text-sm font-medium mb-1">National ID Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
                  value={formData.nationalId}
                  onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Create Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-green-600"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold text-lg transition disabled:opacity-70"
            >
              {loading ? 'Creating Account...' : `Register as ${formData.role.toUpperCase()}`}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            Already registered?{' '}
            <Link to="/login" className="text-green-600 font-semibold">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;