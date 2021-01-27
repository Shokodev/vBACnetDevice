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
    logger.info('Found a device!!');
    logger.info('address: ' + device.header.sender.address);
    logger.info('deviceId: ' + device.payload.deviceId);
    logger.info('maxApdu: ' + device.payload.maxApdu);
    logger.info('segmentation: ' + device.payload.segmentation);
    logger.info('vendorId: ' + device.payload.vendorId);
});

// emitted on errors
bacnetDevice.on('error', (err) => {
    logger.error(err);
    bacnetDevice.close();
});

module.exports = {
    bacnetDevice
}