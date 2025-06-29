import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Download, Save } from 'lucide-react';

const Generator = () => {
  const [qrCode, setQrCode] = useState(null);
  
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
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus
