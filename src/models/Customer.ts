import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  customerId: string;
  formData: {
    vehicleData: {
      make: string;
      model: string;
      year: number;
      vin: string;
    };
    driverInfo: {
      name: string;
      dob: string;
      licenseNumber: string;
    };
    insuranceWishes: {
      coverageType: string;
      deductible: number;
    };
    personalData: {
      email: string;
      phone: string;
      address: string;
    };
    guid: string;
  };
}

const CustomerSchema: Schema = new Schema({
  customerId: { type: String, required: true, unique: true },
  formData: {
    vehicleData: {
      make: { type: String },
      model: { type: String },
      year: { type: Number },
      vin: { type: String }
    },
    driverInfo: {
      name: { type: String },
      dob: { type: String },
      licenseNumber: { type: String }
    },
    insuranceWishes: {
      coverageType: { type: String },
      deductible: { type: Number }
    },
    personalData: {
      email: { type: String },
      phone: { type: String },
      address: { type: String }
    },
    guid: { type: String }
  }
});

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
