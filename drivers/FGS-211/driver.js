"use strict";

const path			= require('path');
const ZwaveDriver	= require('homey-zwavedriver');

// http://www.pepper1.net/zwavedb/device/336
// FGS-211

module.exports = new ZwaveDriver( path.basename(__dirname), {
	capabilities: {
		'onoff': {
			'command_class'				: 'COMMAND_CLASS_SWITCH_BINARY',
			'command_get'				: 'SWITCH_BINARY_GET',
			'command_set'				: 'SWITCH_BINARY_SET',
			'command_set_parser'		: value => {
				return {
					'Switch Value': ( value > 0 ) ? 3 : 0
				};
			},
			'command_report'			: 'SWITCH_BINARY_REPORT',
			'command_report_parser'		: report => {
				return report['Value'] === 'on/enable';
			}
		}
	},
	settings: {
		"auto_off": {
			"index": 3,
			"size": 1,
			"parser": function( value ){
				return new Buffer([ ( value === true ) ? 1 : 0 ]);
			}
		},
		"auto_off_relay": {
			"index": 4,
			"size": 1
		},
		"switch_type": {
			"index": 14,
			"size": 1
		},
		"save_power_state": {
			"index": 16,
			"size": 1,
			"parser": function( value ){
				return new Buffer([ ( value === true ) ? 1 : 0 ]);
			}
		}
	}
});