import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        // Use production MongoDB URI if available, otherwise fallback to local
        const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/sk";
        
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        if (process.env.NODE_ENV === 'production') {
            options.ssl = true;
            options.sslValidate = false;
        }

        await mongoose.connect(uri, options);
        console.log(`Connected to MongoDB: ${process.env.NODE_ENV === 'production' ? 'Production' : 'Development'}`);
    } catch (error) {
        console.error("Connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;