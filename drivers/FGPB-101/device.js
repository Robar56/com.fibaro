'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class Button extends ZwaveDevice {
	
	onMeshInit() {
		this.registerCapability('measure_battery', 'BATTERY');
		this._onButtonTrigger = new Homey.FlowCardTriggerDevice("FGPB-101").register().registerRunListener((args, state, callback) => {
			if(state && args &&
				state.hasOwnProperty('scene') &&
				args.hasOwnProperty('scene')) {
					this.log(`Received state scene: ${state.scene}, expected args scene: ${args.scene}`);
					return callback(null, state.scene === args.scene);
            }
		});

		this.node.CommandClass.COMMAND_CLASS_CENTRAL_SCENE.on('report', (command, report) => {
			let debouncer = 0;

			if (command.name === 'CENTRAL_SCENE_NOTIFICATION') {
				if (report &&
					report.Properties1.hasOwnProperty('Key Attributes')) {
					const buttonValue = {scene: report.Properties1['Key Attributes']};
					this.log(`Scene parameter: ${buttonValue.scene} should equal `);
					if (buttonValue.scene === 'Key Released') {
						if (debouncer === 0) {
                            this.log(`Device: ${this}, tokens: null, state: ${buttonValue}`);
                            this._onButtonTrigger.trigger(this, null, buttonValue);

							debouncer++;
							setTimeout(() => debouncer = 0, 2000);
						}
					} else {
                        this._onButtonTrigger.trigger(this, null, buttonValue);
                    }
				}
			}
		});
	}
	
}

module.exports = Button;