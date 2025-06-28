const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  type: {
    type: String,
    enum: ['text', 'url', 'email', 'phone', 'wifi'],
    default: 'text'
  },
  customization: {
    color: {
      type: String,
      default: '#000000'
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    size: {
      type: Number,
      default: 200,
      min: 100,
      max: 1000
    },
    errorCorrectionLevel: {
      type: String,
      enum: ['L', 'M', 'Q', 'H'],
      default: 'M'
    }
  },
  qrCodeData: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

qrCodeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('QRCode', qrCodeSchema);
