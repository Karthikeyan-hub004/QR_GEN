import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { QrCode, Zap, Shield, Download, Smartphone, Palette } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <QrCode className="w-16 h-16 mx-auto mb-6 text-blue-600" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Generate QR Codes with Ease
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create custom QR codes for your business, events, or personal use. 
            Customize colors, sizes, and download in high quality.
          </p>
          <div className="space-x-4">
            {user ? (
              <Link to="/generate" className="btn btn-primary text-lg px-8 py-3">
                Start Generating
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary text-lg px-8 py-3">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-outline text-lg px-8 py-3">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our QR Generator?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Generate QR codes instantly with our optimized system.</p>
            </div>
            <div className="card text-center">
              <Palette className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-3">Fully Customizable</h3>
              <p className="text-gray-600">Choose colors, sizes, and error correction levels.</p>
            </div>
            <div className="card text-center">
              <Download className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-3">High Quality Downloads</h3>
              <p className="text-gray-600">Download your QR codes in PNG format, ready to use.</p>
            </div>
            <div className="card text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-gray-600">Your data is protected with industry-standard security.</p>
            </div>
            <div className="card text-center">
              <Smartphone className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-3">Mobile Friendly</h3>
              <p className="text-gray-600">Generate QR codes on any device, anywhere.</p>
            </div>
            <div className="card text-center">
              <QrCode className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-3">Multiple Types</h3>
              <p className="text-gray-600">Support for text, URLs, emails, phone numbers, and WiFi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of users who trust our QR code generator.</p>
          {!user && (
            <Link to="/register" className="btn bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Create Your Free Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
