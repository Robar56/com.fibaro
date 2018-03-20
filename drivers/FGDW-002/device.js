'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class FibaroDoorSensorTwo extends ZwaveDevice {

	onMeshInit() {
		this.registerCapability('alarm_contact', 'NOTIFICATION');
		this.registerCapability('alarm_tamper', 'NOTIFICATION');
        this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL');
        this.registerCapability('measure_battery', 'BATTERY');
	}

}

module.exports = FibaroDoorSensorTwo;
