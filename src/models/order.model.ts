import mongoose, { Document, Schema } from "mongoose";
import Currency from "../enums/currency.enum";
import OrderStatus from "../enums/order-status.enum";

export interface IOrder extends Document {
  status: OrderStatus;
  currency: Currency;
  totalPrice: number;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema: Schema = new Schema(
  {
    status: {
      type: String,
      enum: ["New", "Cancelled", "Done"],
      default: "New",
      required: true,
    },
    currency: { type: String, enum: ["try", "usd", "eur"], required: true },
    totalPrice: { type: Number, required: true },
    note: { type: String },
  },
  {
    id: true,
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model<IOrder>("Model", OrderSchema);
