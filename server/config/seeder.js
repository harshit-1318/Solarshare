import User from "../models/User.js";
import Listing from "../models/Listing.js";
import Transaction from "../models/Transaction.js";
import MeterReading from "../models/MeterReading.js";
import Dispute from "../models/Dispute.js";
import CarbonCredit from "../models/CarbonCredit.js";
import Notification from "../models/Notification.js";
import PricingSetting from "../models/PricingSetting.js";

export const seedInitialData = async () => {
  try {
    // Remove dummy seed users if they exist in the database
    const dummyEmails = [
      "sunita@solarshare.com",
      "amit@solarshare.com",
      "rahul@solarshare.com",
      "priya@solarshare.com",
      "kiran@solarshare.com",
      "meena@solarshare.com"
    ];

    const dummyUsers = await User.find({ email: { $in: dummyEmails } });
    if (dummyUsers.length > 0) {
      const dummyUserIds = dummyUsers.map((u) => u._id);

      // Delete related dummy documents
      await Transaction.deleteMany({
        $or: [
          { buyer: { $in: dummyUserIds } },
          { seller: { $in: dummyUserIds } }
        ]
      });
      await Listing.deleteMany({ seller: { $in: dummyUserIds } });
      await Dispute.deleteMany({ raisedBy: { $in: dummyUserIds } });
      await CarbonCredit.deleteMany({ user: { $in: dummyUserIds } });
      await Notification.deleteMany({ user: { $in: dummyUserIds } });
      await MeterReading.deleteMany({ user: { $in: dummyUserIds } });

      // Delete dummy users
      await User.deleteMany({ _id: { $in: dummyUserIds } });
      console.log(`Cleaned up ${dummyUsers.length} dummy seed users and associated records.`);
    }

    // Ensure Admin user exists
    let adminUser = await User.findOne({ role: "admin" });
    if (!adminUser) {
      adminUser = await User.create({
        name: "Arjun Mehta",
        email: "admin@solarshare.com",
        password: "adminpassword123",
        role: "admin",
        phone: "+91 98765 43210",
        address: { line1: "Grid Operations Center", city: "Bangalore", state: "Karnataka", pincode: "560001" },
        isVerified: true
      });
      console.log("Admin user initialized: admin@solarshare.com");
    }

    // Ensure Pricing Settings exist
    const pricingCount = await PricingSetting.countDocuments();
    if (pricingCount === 0) {
      await PricingSetting.create({
        baseTariff: 4.8,
        minPrice: 3.0,
        maxPrice: 6.5,
        dynamicMultiplier: 1.2,
        lastUpdatedBy: adminUser._id
      });
    }

    console.log("Mongoose cleanup and initial setup completed.");
  } catch (err) {
    console.error("Error during seed/cleanup:", err.message);
  }
};
