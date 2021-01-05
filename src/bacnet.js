const bacnet = require('node-bacnet');
const logger = require('./serverlog/logger')
    // Initialize BACStack
const bacnetDevice = new bacnet({
    port: 47808, // Use BAC0 as communication port
    apduTimeout: 6000, // Wait twice as long for response
    interface: '0.0.0.0'
});

// Discover Devices
bacnetDevice.on('iAm', (device) => {
    logger.info('address: ', device.address);
    logger.info('deviceId: ', device.deviceId);
    logger.info('maxApdu: ', device.maxApdu);
    logger.info('segmentation: ', device.segmentation);
    logger.info('vendorId: ', device.vendorId);
});

// emitted on errors
bacnetDevice.on('error', (err) => {
    logger.error(err);
    bacnetDevice.close();
});

bacnetDevice.createObject()

module.exports = {
    bacnetDevice
}