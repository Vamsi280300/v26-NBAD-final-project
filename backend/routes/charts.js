const express = require('express');
const router  = express.Router();
const verify  = require('../middleware/verifyToken');
const Chart   = require('../models/chart');

/* Summary endpoint */
router.get('/summary', verify, async (req, res) => {
  try {
    const doc = await Chart.findOne({ name: 'summary' });

    if (!doc) {
      return res.status(404).json({
        error: 'Chart data not found. Please run the seed script to populate the database.'
      });
    }

    res.json({ labels: doc.labels, values: doc.datasets.values });
  } catch (error) {
    console.error('Error fetching summary chart data:', error);
    res.status(500).json({ error: 'Failed to retrieve chart data from database' });
  }
});

/* Reports endpoint */
router.get('/reports', verify, async (req, res) => {
  try {
    const doc = await Chart.findOne({ name: 'reports' });

    if (!doc) {
      return res.status(404).json({
        error: 'Chart data not found. Please run the seed script to populate the database.'
      });
    }

    res.json({
      labels:     doc.labels,
      inflation:  doc.datasets.inflation,
      fedRate:    doc.datasets.fedRate,
      debt:       doc.datasets.debt
    });
  } catch (error) {
    console.error('Error fetching reports chart data:', error);
    res.status(500).json({ error: 'Failed to retrieve chart data from database' });
  }
});

module.exports = router;