import mongoose from "mongoose";

const RentDetailSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "OwnerUser",
      required: true,
    },
    tenant: {
      type: mongoose.Types.ObjectId,
      ref: "TenantUser",
      required: true,
    },
    realEstate: {
      type: mongoose.Types.ObjectId,
      ref: "RealEstate",
      required: true,
    },
    paymentPlan: {
      type: String,
      enum: {
        values: [
          "Monthly",
          "Every 2 Months",
          "Every 3 Months",
          "Every 6 Months",
          "Every 12 Months",
        ],
        message: "{VALUE} is not supported",
      },
      required: [true, "Please provide a plan"],
      default: "Monthly",
    },
    startDate: {
      type: String,
      required: [true, "Please provide a start date"],
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ["Paid", "Unpaid"],
        message: "{VALUE} is not supported",
      },
      required: [true, "Please provide a payment status"],
      default: "Unpaid",
    },
    currentRentDate: {
      from: {
        type: String,
        required: [true, "Please provide a start date"],
      },
      to: {
        type: String,
        required: [true, "Please provide an end date"],
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("RentDetail", RentDetailSchema);
