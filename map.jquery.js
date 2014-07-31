/* map will just have locations, eg. mt vernon, 
opts will have struct that maps data to location */

(function($){

	$.fn.rolloverMap = function(opts){

		//need a map
		if(!opts.map_url) return;

		opts.$map.css('background', 'url('+ opts.map_url+') 0 0 no-repeat');

		var active_width, active_height, dot_width, dot_height, $dot, using_theirs = false;

		//opts have image for rollovers?
		if(0){
			using_theirs = true;
		}

		/* default rollover - dot */

		else {

			//create an el for us
			$dot = $('<span class="dot">').css('top', 20).css('left', 20);
			
			//put in map - temporarily, so we can get hieght width
			opts.$map.append($dot);

			//get the height/width
			dot_width = $dot.css('width'),
			dot_height = $dot.css('height');

			//should match up or else
			if(dot_height !== dot_width) //freak out
				return false;

			//now get active
			$dot.addClass('aa-map-active');
			active_width = $dot.css('width'),
			active_height = $dot.css('height'),
			border_width = $dot.css('border').split(' ')[0],
			border_width = parseInt(border_width.substring(0, border_width.length -2));


			//same thing, freak out if its not a dot
			if(active_width !== active_height) //freak out
				return false;

			dot_width = parseInt(dot_width.substring(0, dot_width.length -2));
			active_width = parseInt(active_width.substring(0, active_width.length -2));
			active_width += border_width + border_width;

			//remove what we did
			opts.$map.empty();
			$dot.removeClass('aa-map-active');

		}
		
		//meant for all, not only default		
		var offset = parseInt(dot_width/2),
			active_offset = parseInt(active_width/2);

		return this.each(function(){

			//put in locations rollovers
			opts.rollovers.forEach(function(val, i){
				
				//want to do this, but for now
				if(using_theirs){}

				//default behavior
				else {
					var $d = $dot.clone()
							     .css('top', val.y - offset)
							     .css('left', val.x - offset)
							     .attr('data-x', val.x- offset)
						  		 .attr('data-y', val.y - offset);
					
					opts.$map.append($d);

					if(val.primary){
						$d.addClass('aa-map-active')
						  .css('top', val.y - active_offset)
						  .css('left', val.x - active_offset);

						val.$ref.addClass('aa-map-active');
					}

					$d.hover(function(){
						var $active = $('.aa-map-active');
						$active.removeClass('aa-map-active');

						var x = $active.attr('data-x'),
							y = $active.attr('data-y');
							
						$active.css('top', y).css('left', x);
						
						val.$ref.addClass('aa-map-active');
						$d.css('top', val.y - active_offset).css('left', val.x - active_offset).addClass('aa-map-active');
					}, function(){
						if(!opts.keep_active) $('span.active').css('top', val.y - offset).css('left', val.x - offset).removeClass('aa-map-active');
					});
				}

			});
		});
	};

})(jQuery);


/* 

 opts?

 var opts = {
	
	$map: '',
	$ref: '',
	map_url: '',

	rollovers: [{
			inactive: '',
			active: '',
			x: '',
			y: '',
			refs: ''
	}]
 }

 */