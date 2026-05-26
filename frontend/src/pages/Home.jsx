// src/pages/Home.jsx
import 'react';
import { Phone, ArrowRight } from 'lucide-react';
// import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Access Healthcare Faster
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Connect with Community Health Workers, get triaged, and receive warm handoffs to hospitals — all in one platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/login" 
              className="bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            >
              Sign In
            </a>
            <a 
              href="#how-it-works" 
              className="border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-white/10 transition"
            >
              Learn How It Works
            </a>
          </div>

          <div className="mt-10 text-sm flex items-center justify-center gap-2">
            <Phone size={20} />
            <span className="font-medium">Call us: <strong>0800-HEALTH-KE</strong></span>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">The Challenge in Kenya</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⏳</div>
              <h3 className="font-semibold text-xl mb-2">Long Waiting Times</h3>
              <p className="text-gray-600">Patients wait hours at facilities with limited triage.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🏥</div>
              <h3 className="font-semibold text-xl mb-2">Overcrowded Hospitals</h3>
              <p className="text-gray-600">Non-emergency cases overwhelm critical care.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="font-semibold text-xl mb-2">Limited Access for PWDs</h3>
              <p className="text-gray-600">Persons with disabilities struggle to reach help.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 bg-green-50" id="how-it-works">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Our Solution</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-semibold mb-6">How HealthAccess Works</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">Call or Use CHV</h4>
                    <p className="text-gray-600">Dial our number or let a Community Health Volunteer assist you.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">AI-Powered Triage</h4>
                    <p className="text-gray-600">We assess risk level and give immediate guidance.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">Warm Handoff</h4>
                    <p className="text-gray-600">High-risk cases are referred directly to subscribed hospitals.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h4 className="font-semibold text-xl mb-6 text-center">For Hospitals</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  Receive real-time patient alerts
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  View complete case history
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  Manage subscriptions easily
                </li>
              </ul>
              <button className="w-full mt-8 bg-green-600 text-white py-4 rounded-2xl font-semibold hover:bg-green-700 transition">
                Subscribe as a Hospital
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Save Lives?</h2>
          <p className="text-xl mb-10">Join Kenya’s most accessible digital triage platform.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/login" className="bg-white text-green-700 px-10 py-4 rounded-2xl font-semibold text-lg inline-flex items-center justify-center gap-2">
              Get Started Free
              <ArrowRight />
            </a>
            <a href="tel:0800HEALTHKE" className="border-2 border-white px-10 py-4 rounded-2xl font-semibold text-lg inline-flex items-center justify-center gap-2">
              Call 0800-HEALTH-KE
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;