'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class FibaroFloodSensorPlus extends ZwaveDevice {
	
	onMeshInit() {
        this.registerCapability('alarm_water', 'NOTIFICATION');
        this.registerCapability('alarm_tamper', 'NOTIFICATION');
        this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL', {
        	getOpts: {
        		getOnOnline: true,
			}
		});
        this.registerCapability('measure_battery', 'BATTERY');

        this.setCapabilityValue('alarm_water', false);
        this.setCapabilityValue('alarm_tamper', false);

        /*
		=====================================================
		General setting registration
		=====================================================
		*/
        this.registerSetting('flood_sensor');
        this.registerSetting('flood_signal');
        this.registerSetting('alarm_duration');
        this.registerSetting('alarm_cancellation_delay');
        this.registerSetting('tamper_alarm');

        /*
		=====================================================
		Temperature setting registration
		=====================================================
		*/
        this.registerSetting('temperature_measure_interval');
        this.registerSetting('temperature_measure_hysteresis');
        this.registerSetting('temperature_measure_offset');
        this.registerSetting('low_temperature_threshold');
        this.registerSetting('high_temperature_threshold');

    }
	
}

module.exports = FibaroFloodSensorPlus;