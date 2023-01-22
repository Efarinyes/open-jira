import mongoose from "mongoose";


/**
 * 0 = desconectat
 * 1 = conectat
 * 2 = conectant
 * 3 = desconectant
 **/

const mongoConnection = {
    isConnected: 0
}

export const connect = async() => {
    if( mongoConnection.isConnected) {
        console.log('Ja hi ha conexió')
        return;
    }
    if(mongoose.connections.length > 0 ) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;
        if(mongoConnection.isConnected === 1) {
            console.log('Fem servir la conexió existent')
            return;
        }
        await mongoose.disconnect()
    }


    await mongoose.connect(process.env.MONGO_URL || '')
    mongoConnection.isConnected = 1
    console.log('Conectat a MongoDB', process.env.MONGO_URL)
}

export const disconnect = async () => {
    if (process.env.NODE_ENV === 'development') return;
    if (mongoConnection.isConnected === 0 ) return;

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
    console.log('Desconectat de MongoDB')
}