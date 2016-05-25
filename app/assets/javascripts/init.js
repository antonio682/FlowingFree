if(window.FlowingFreeApp === undefined){
	window.FlowingFreeApp = {};
}

FlowingFreeApp.init = function() {
	console.log('FlowingFreeApp online!!!');
}


$(document).on('ready', function(){
	FlowingFreeApp.init();
});
