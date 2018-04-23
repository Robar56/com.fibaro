'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class RadiatorThermostat extends ZwaveDevice {
	
	onMeshInit() {
		this.registerCapability('measure_battery', 'BATTERY', {
			getOpts: {
				pollInterval: 'poll_interval_battery'
			}
		});
        this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL', {
        	getOpts: {
        		pollInterval: 'poll_interval_measure_temperature'
			}
		});
        this.registerCapability('target_temperature', 'THERMOSTAT_SETPOINT',  {
            getOpts: {
                pollInterval: 'poll_interval_target_temperature'
            }
        });
    }
	
}

module.exports = RadiatorThermostat;