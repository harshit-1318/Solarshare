import MeterReading from "../models/MeterReading.js";

// @route GET /api/meter/latest   (current user's most recent reading)
export const getLatestReading = async (req, res) => {
  try {
    const reading = await MeterReading.findOne({ user: req.user._id }).sort({ recordedAt: -1 });
    res.status(200).json(reading || {});
  } catch (err) {
    res.status(500).json({ message: "Could not fetch meter reading", error: err.message });
  }
};

// @route GET /api/meter/history?range=today|week|month
export const getReadingHistory = async (req, res) => {
  try {
    const { range = "today" } = req.query;
    const since = new Date();
    if (range === "today") since.setHours(0, 0, 0, 0);
    if (range === "week") since.setDate(since.getDate() - 7);
    if (range === "month") since.setMonth(since.getMonth() - 1);

    const readings = await MeterReading.find({
      user: req.user._id,
      recordedAt: { $gte: since },
    }).sort({ recordedAt: 1 });

    res.status(200).json(readings);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch reading history", error: err.message });
  }
};

// @route POST /api/meter/ingest
export const ingestMeterReading = async (req, res, next) => {
  try {
    const { generationKwh, consumptionKwh } = req.body;
    if (generationKwh === undefined || consumptionKwh === undefined) {
      return res.status(400).json({ message: "generationKwh and consumptionKwh are required" });
    }

    const surplusKwh = Math.max(0, Number(generationKwh) - Number(consumptionKwh));

    const reading = await MeterReading.create({
      user: req.user._id,
      role: req.user.role,
      generationKwh: Number(generationKwh),
      consumptionKwh: Number(consumptionKwh),
      surplusKwh,
      recordedAt: new Date()
    });

    res.status(201).json(reading);
  } catch (err) { next(err); }
};

// @route GET /api/meter/all-readings
export const getAllUserReadings = async (req, res, next) => {
  try {
    const readings = await MeterReading.find({ user: req.user._id }).sort({ recordedAt: -1 }).limit(100);
    res.json(readings);
  } catch (err) { next(err); }
};

// Import simulator variables
import { isSimulationRunning, setSimulationState } from "../services/meterSimulator.js";

// @route POST /api/meter/simulation/start
export const startSimulation = (req, res) => {
  setSimulationState(true);
  res.json({ message: "Smart meter simulator simulation running status set to: ACTIVE", isSimulationRunning });
};

// @route POST /api/meter/simulation/stop
export const stopSimulation = (req, res) => {
  setSimulationState(false);
  res.json({ message: "Smart meter simulator simulation running status set to: INACTIVE", isSimulationRunning });
};

