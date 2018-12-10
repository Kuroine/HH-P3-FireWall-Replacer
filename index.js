
const	HARROWHOLD = 9950;



module.exports = function hhp3wall(dispatch) {
	const command = dispatch.command
	let enabled = true,
		hooks = [];
	
	command.add('hhwall', () => {
		if(enabled){
			enabled = false;
			command.message('HH-P3-FireWall-Replacer module off');
		}
		else{
			enabled = true;
			command.message('HH-P3-FireWall-Replacer module on');
		}
	});
	
	dispatch.hook('S_LOAD_TOPO', 3, (event) => {
		if(event.zone == HARROWHOLD){
			hook('S_SPAWN_NPC', 10, (event) => {
				if(enabled && event.templateId == 3018 && event.huntingZoneId == 950)
				{
					//console.log("BLOCKED P3 WALL SPAWN");
					event.templateId = 47946;
					event.huntingZoneId = 979;
					return true;
				}
				//console.log("S_SPAWN_NPC " + require('util').inspect(event, {depth: null}));
			});
		}
		else
		{
			unload()
		}
		//console.log("Entering zone: " + event.zone)
	});
		
	/*dispatch.hook('sDespawnNpc', event => {
		console.log("sDespawnNpc " + require('util').inspect(event, {depth: null}));
	})*/
	
	function unload() {
		if(hooks.length) {
			for(let h of hooks) dispatch.unhook(h)

			hooks = []
		}
	}

	function hook() {
		hooks.push(dispatch.hook(...arguments))
	}
}
