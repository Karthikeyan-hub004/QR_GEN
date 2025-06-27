const express = require('express');
const QRCode = require('qrcode');
const { body, validationResult } = require('express-validator');
const QRCodeModel = require('../models/QRCode');
const auth = require('../middleware/auth');

const router = express.Router();

// Generate QR Code
router.post('/generate', auth, [
  body('title').isLength({ min: 1, max: 100 }).trim().escape(),
  body('content').isLength({ min: 1, max: 2000 }).trim(),
  body('type').isIn(['text', 'url', 'email', 'phone', 'wifi'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, type, customization } = req.body;

    const options = {
      color: {
        dark: customization?.color || '#000000',
        light: customization?.backgroundColor || '#ffffff'
      },
      width: customization?.size || 200,
      errorCorrectionLevel: customization?.errorCorrectionLevel || 'M'
    };

    const qrCodeData = await QRCode.toDataURL(content, options);

    const qrCode = new QRCodeModel({
      title,
      content,
      type,
      customization: {
        color: options.color.dark,
        backgroundColor: options.color.light,
        size: options.width,
        errorCorrectionLevel: options.errorCorrectionLevel
      },
      qrCodeData,
      userId: req.userId
    });

    await qrCode.save();

    res.status(201).json(qrCode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's QR codes
router.get('/my-codes', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const qrCodes = await QRCodeModel.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await QRCodeModel.countDocuments({ userId: req.userId });

    res.json({
      qrCodes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific QR code
router.get('/:id', auth, async (req, res) => {
  try {
    const qrCode = await QRCodeModel.findOne({ _id: req.params.id, userId: req.userId });
    if (!qrCode) {
      return res.status(404).json({ message: 'QR code not found' });
    }
    res.json(qrCode);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete QR code
router.delete('/:id', auth, async (req, res) => {
  try {
    const qrCode = await QRCodeModel.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!qrCode) {
      return res.status(404).json({ message: 'QR code not found' });
    }
    res.json({ message: 'QR code deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update download count
router.post('/:id/download', auth, async (req, res) => {
  try {
    const qrCode = await QRCodeModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $inc: { downloadCount: 1 } },
      { new: true }
    );
    if (!qrCode) {
      return res.status(404).json({ message: 'QR code not found' });
    }
    res.json({ message: 'Download count updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
