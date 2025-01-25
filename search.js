import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
const dotenv = require('dotenv');
const path=require('path');
dotenv.config();

// Load the .proto file for questsearch package
const protoPath = path.resolve(__dirname, "search.proto");
const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Load the package definition and extract the 'questsearch' service
const questsearchPackageDefinition = grpc.loadPackageDefinition(packageDefinition).questsearch;

const grpcServer = process.env.GRPC_SERVER || 'localhost:50051';
// Create a gRPC client for the 'QuestionService'
const client = new questsearchPackageDefinition.QuestionService(
    grpcServer,
    grpc.credentials.createInsecure()
);

// Function to fetch questions via gRPC directly
const fetchQuestions = async (query, type) => {
    return new Promise((resolve, reject) => {
        client.getQuestions({ query, type }, (error, result) => {
            if (error) {
                console.error('Error fetching questions:', error.message);
                reject(error);
            } else {
                console.log('Questions:', result);
                resolve(result);
            }
        });
    });
};

export default fetchQuestions;

