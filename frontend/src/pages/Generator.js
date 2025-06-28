import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Download, Save } from 'lucide-react';

const Generator = () => {
  const [qrCode, setQrCode] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      type: 'text',
      color: '#000000',
      backgroundColor: '#ffffff',
      size: 200,
      errorCorrectionLevel: 'M'
    }
  });

  const watchedValues = watch();

  const generateMutation = useMutation(
    (data) => axios.post('/api/qr/generate', data),
    {
      onSuccess: (response) => {
        setQrCode(response.data);
        toast.success('QR code generated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to generate QR code');
      }
    }
  );

  const downloadMutation = useMutation(
    (id) => axios.post(`/api/qr/${id}/download`),
    {
      onSuccess: () => {
        toast.success('QR code downloaded!');
      }
    }
  );

  const onSubmit = (data) => {
    const payload = {
      title: data.title,
      content: data.content,
      type: data.type,
      customization: {
        color: data.color,
        backgroundColor: data.backgroundColor,
        size: parseInt(data.size),
        errorCorrectionLevel: data.errorCorrectionLevel
      }
    };
    generateMutation.mutate(payload);
  };

  const downloadQRCode = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.download = `${qrCode.title}.png`;
      link.href = qrCode.qrCodeData;
      link.click();
      downloadMutation.mutate(qrCode._id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">QR Code Generator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter QR code title"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  {...register('type')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="text">Text</option>
                  <option value="url">URL</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="wifi">WiFi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  {...register('content', { required: 'Content is required' })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter content for QR code"
                />
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foreground Color
                  </label>
                  <input
                    {...register('color')}
                    type="color"
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <input
                    {...register('backgroundColor')}
                    type="color"
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size (px)
                  </label>
                  <input
                    {...register('size', { min: 100, max: 1000 })}
                    type="number"
                    min="100"
                    max="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Error Correction
                  </label>
                  <select
                    {...register('errorCorrectionLevel')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="L">Low</option>
                    <option value="M">Medium</option>
                    <option value="Q">Quartile</option>
                    <option value="H">High</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={generateMutation.isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {generateMutation.isLoading ? 'Generating...' : 'Generate QR Code'}
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="flex flex-col items-center">
              {qrCode ? (
                <>
                  <div className="mb-4">
                    <img
                      src={qrCode.qrCodeData}
                      alt="Generated QR Code"
                      className="border border-gray-300 rounded-lg"
                      style={{ width: watchedValues.size, height: watchedValues.size }}
                    />
                  </div>
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-lg">{qrCode.title}</h3>
                    <p className="text-gray-600 text-sm">{qrCode.type.toUpperCase()}</p>
                  </div>
                  <button
                    onClick={downloadQRCode}
                    className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download QR Code
                  </button>
                </>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500">Generate a QR code to see preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
