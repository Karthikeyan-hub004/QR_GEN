import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus, Download, Trash2, Eye, Calendar } from 'lucide-react';

const Dashboard = () => {
  const queryClient = useQueryClient();

  const { data: qrCodes, isLoading } = useQuery(
    'myQrCodes',
    () => axios.get('/api/qr/my-codes').then(res => res.data),
    {
      onError: (error) => {
        toast.error('Failed to load QR codes');
      }
    }
  );

  const deleteMutation = useMutation(
    (id) => axios.delete(`/api/qr/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('myQrCodes');
        toast.success('QR code deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete QR code');
      }
    }
  );

  const downloadMutation = useMutation(
    (id) => axios.post(`/api/qr/${id}/download`)
  );

  const handleDownload = (qrCode) => {
    const link = document.createElement('a');
    link.download = `${qrCode.title}.png`;
    link.href = qrCode.qrCodeData;
    link.click();
    downloadMutation.mutate(qrCode._id);
    toast.success('QR code downloaded!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this QR code?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: '#2c3e50' }}>
              My QR Codes
            </h1>
            <p style={{ color: '#6c757d' }} className="mt-2">Manage and download your generated QR codes</p>
          </div>
          <Link to="/generate" className="btn btn-primary animate-slide-up">
            <Plus className="w-4 h-4 mr-2" />
            Generate New QR Code
          </Link>
        </div>

        {qrCodes?.qrCodes?.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto border rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f8f9fa' }}>
                <Eye className="w-12 h-12" style={{ color: '#6c757d' }} />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-3" style={{ color: '#2c3e50' }}>No QR codes yet</h3>
            <p style={{ color: '#6c757d' }} className="mb-8 max-w-md mx-auto">
              Create your first QR code to get started with our powerful generator
            </p>
            <Link to="/generate" className="btn btn-primary">
              <Plus className="w-5 h-5 mr-2" />
              Generate Your First QR Code
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qrCodes?.qrCodes?.map((qrCode, index) => (
              <div 
                key={qrCode._id} 
                className="qr-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1 truncate" style={{ color: '#2c3e50' }}>
                      {qrCode.title}
                    </h3>
                    <span className="inline-block px-3 py-1 text-xs font-medium border rounded uppercase" style={{ backgroundColor: '#f8f9fa', color: '#6c757d' }}>
                      {qrCode.type}
                    </span>
                  </div>
                </div>
                
                <div className="mb-6 text-center">
                  <div className="qr-preview inline-block">
                    <img
                      src={qrCode.qrCodeData}
                      alt={qrCode.title}
                      className="mx-auto rounded-lg"
                      style={{ width: '140px', height: '140px' }}
                    />
                  </div>
                </div>

                <div className="text-sm mb-6 space-y-2" style={{ color: '#6c757d' }}>
                  <div className="border p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                    <p className="font-medium mb-1" style={{ color: '#2c3e50' }}>Content:</p>
                    <p className="break-words text-xs">
                      {qrCode.content.length > 50 
                        ? `${qrCode.content.substring(0, 50)}...` 
                        : qrCode.content}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-xs">
                        {new Date(qrCode.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs">
                      {qrCode.downloadCount} downloads
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(qrCode)}
                    className="flex-1 btn btn-primary text-sm py-2.5"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(qrCode._id)}
                    disabled={deleteMutation.isLoading}
                    className="btn btn-secondary text-sm py-2.5 px-3"
                    title="Delete QR Code"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {qrCodes?.totalPages > 1 && (
          <div className="mt-12 flex justify-center animate-fade-in">
            <div className="flex space-x-2 p-2 border rounded-lg" style={{ backgroundColor: '#ffffff' }}>
              {Array.from({ length: qrCodes.totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-4 py-2 rounded font-medium transition-all duration-200 ${
                    qrCodes.currentPage === i + 1
                      ? 'btn btn-primary'
                      : 'btn btn-outline'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
