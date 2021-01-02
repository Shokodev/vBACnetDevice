const bacnet = require('node-bacnet');

// Initialize BACStack
const bacnetDevice = new bacnet({ apduTimeout: 6000 });

// Discover Devices
bacnetDevice.on('iAm', (device) => {
    console.log('address: ', device.address);
    console.log('deviceId: ', device.deviceId);
    console.log('maxApdu: ', device.maxApdu);
    console.log('segmentation: ', device.segmentation);
    console.log('vendorId: ', device.vendorId);
});


module.exports = {
    bacnetDevice
}