

/* 

---- Democracy voting app, howto…  -----

-- App logic : 

- start with a given screen, given ID numebr

	- set the relevant content according to the screen id 
	- set the utton interaction according to the screen type 

- when one clicks a choice on the frist ( choice ) screen

	- the relevant result screen is selected as the enxt screen

		- the relevant content is set up, 
			!!!! ACCORDING TO THE DATA IN THE CHOICE SCREEN DATA 

		- buttons in this view : 
			- return to choice screen
			- go to next selection screen 
				- this could be a button that's continuously there 
*/

/*

TO DO : 

	- make it possible to edit more texts - such as page titles and page headlines ( plus the info-texts… )
	- update the readme file. 
		- add instructions about how to update the meta-data file …
*/




//////////////////////////// VARIABLES
//////////////////////////// VARIABLES
//////////////////////////// VARIABLES


//// (remote) data 

var remote_data_url = "https://raw.githubusercontent.com/miskaknapek/test_metadata_for_wahltinder/master/test_meta_data_file.txt";

var raw_fetched_remote_metadata_text_file = "";
var PARSED_fetched_remote_metadata_text_file = "";

// for parsed meta data objects 
var curr_meta_data_objects = [];


//// Which display mode are we in? 
var mode__choosing = "choosing";
var mode__seeing_results = "seeing_results";

var current__choosing_or_seeingResults__mode = mode__choosing; 

//// which results screen mode are we in? 

var yes_vote__screen = "yes_vote__screen";
var no_vote__screen = "no_vote__screen";

var current_voting_screen_mode = "nada";


//// which choice screen id are we at? 

var current_choice_screen__as_i_in_list_of_choice_screens = 0;


//// button references

var back_button;
var next_button;
var yes_button;
var no_button;


//// image and text div referenes 

var outer_outer;
var image_area_outer;
var image_image_outer; 
var image_central_area;
var text_area__main;
var text_area__sub;


///// animation matters

var animation_speed = 200;

//////////////////////////// methods
//////////////////////////// methods
//////////////////////////// methods


// set up buttons for current view 
//
set_up_buttons_for_current_view = function(){
	console.log(">>>> set_up_buttons_for_current_view() - currently in mode |"+current__choosing_or_seeingResults__mode+"|");

	if( current__choosing_or_seeingResults__mode == mode__choosing ){

		setup_buttons_for__selection_screen();
	}else{

		setup_buttons_for__results_screen();
	}
}


//


//////// preselect popular div areas 


var bind_image_and_text_divs_to_variables = function(){

	console.log(">>>> bind_image_and_text_divs_to_variables() ");

	outer_outer = $("#outer_outer");
	image_area_outer = $("#image_area_outer");
	image_image_outer = $("#image_image_outer");
	image_central_area = $("#image_central_area");
	image_image = $( "#image_image" );
	text_area__main = $( "#image_MAIN_text_area" );
	text_area__sub = $( "#image_SUB_text_area" );	
}


//// set up buttons : for selection screen
/*
back, next, yes, no
*/

var bind_buttons_to_variables = function(){

	console.log(">>>> bind_buttons_to_variables() ");

	// back
	back_button = $( "#button_back");
	// next
	next_button = $( "#button_next" );
	//// no button 
	no_button = $( "#button_no" );
	//// yes button 
	yes_button = $( "#button_yes" );
}



///////////// BUTTONS! 



//////// Buttons setup for selection screen
//
var setup_buttons__INITIALLY__for__all_screens = function(){
	console.log(">>>> setup_buttons_for__selection_screen() ");


	//// reset the interactive things on the footer buttons
	$( "#footer" ).off();


	//// back button - hide, unused
	back_button.hide();
	// … functionality 
	back_button.click( function(){

		console.log("---- back_button clicked ");
		set_curr_mode_to__choosing();

		// setup view according to data 
		setup_relevant_screen_according_to_parameters();		
	});

	//// no button
	// should be hidden otherwise, so show it
	// … functionality 
	no_button.click( function(){

		console.log("click : button_no");

		click_NO_button();	
	});

	//// yes button 
	//
	// should be hidden otherwise, so show it
	yes_button.show()
	// yes button functionality 
	yes_button.click( function(){

		console.log("click : button_yes");

		click_YES_button();
	});

	//// next button … functionality 
	next_button.click( function(){

		console.log("click : button_next");

		click_next_button();
	});
}


///// do click… 


var click_next_button = function(){
	console.log(">>>> click_next_button() ");

	advance_current_screen_id();

	set_curr_mode_to__choosing();

	// setup view according to data 
	setup_relevant_screen_according_to_parameters();

	// ping the server to let it know which screen we're on 
	// // ping_server_with_current_screen_num();
}


var click_NO_button = function(){
	console.log(">>>> click_NO_button() ");

	set_curr_selection_mode_to__NO();

	set_curr_mode_to__seeing_results();

	// setup view according to data 
	setup_relevant_screen_according_to_parameters();	
}


var click_YES_button = function(){
	console.log(">>>> click_YES_button() ");

	set_curr_selection_mode_to__YES();

	set_curr_mode_to__seeing_results();

	// setup view according to data 
	setup_relevant_screen_according_to_parameters();
}



//////// Buttons setup for results screen
//
var setup_buttons_for__selection_screen = function(){
	console.log(">>>> setup_buttons_for__selection_screen() ");

	//// back button - hide, unused
	back_button.hide();

	//// next screen
	next_button.show()

	//// no button 
	// should be hidden on the results screen
	no_button.show();
	//

	//// yes button 
	// should be hidden on the results screen
	yes_button.show()
	//
}




//////// set up buttons : for results screen
/*
next, return to selection 
*/


var setup_buttons_for__results_screen = function(){
	console.log(">>>> setup_buttons_for__results_screen() -- PLEASE FILL ME IN!");

	// back button
	back_button.show();
		
	// hide : yes button
	$( "#button_no" ).hide();

	// hide : no button 
	$( "#button_yes" ).hide();
}


//// button : go to next selection screen 
/* 
- picks next selection screen
- set the correct mode : selection screen
- set up screen + buttons according to data 
*/



///////// setup swiping action…

var setup_swipe_functionality = function(){
	console.log(">>>> setup_swipe_functionality() ");

	outer_outer.swipe( {
	    swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData, currentDirection)
	    {
			var str = "<h4>Swipe Phase : " + phase + "<br/>";
			str += "Current direction: " + currentDirection + "<br/>";
			str += "Direction from inital touch: " + direction + "<br/>";
			str += "Distance from inital touch: " + distance + "<br/>";
			str += "Duration of swipe: " + duration + "<br/>";
			str += "Fingers used: " + fingers + "<br/></h4>";

			// test: update distance according to direction 
			if( direction === "left" ){
				distance = -distance;
			}
			// image_area_outer.css("background-color", "rgb("+distance+","+distance+","+distance+")" );
			// TEST *only* move things horisontally if dragging is horisontal 
			if( direction ==="left" || direction === "right" ){
				image_central_area.css("left", distance);	
				image_central_area.css("position", "relative");	
				// image_central_area.css("top", "30%" );	
			}

			/*
			else if( direction === "up" || direction == "down" ){
				image_central_area.css("top", distance );	
				image_central_area.css("left", 0 );	
			} */
			
			//Here we can check the:
			//phase : 'start', 'move', 'end', 'cancel'
			//direction : 'left', 'right', 'up', 'down'
			//distance : Distance finger is from initial touch point in px
			//duration : Length of swipe in MS
			//fingerCount : the number of fingers used
			if (phase!="cancel" && phase!="end") {
				if (duration<5000){
				  str +="Under maxTimeThreshold.<h3>Swipe handler will be triggered if you release at this point.</h3>"
				}
				else{
				  str +="Over maxTimeThreshold. <h3>Swipe handler will be canceled if you release at this point.</h3>"
				}
				if (distance<200){
				  str +="Not yet reached threshold.  <h3>Swipe will be canceled if you release at this point.</h3>"
				}
				else{
				  str +="Threshold reached <h3>Swipe handler will be triggered if you release at this point.</h3>"
				}
			}
			if (phase=="cancel"){
				str +="<br/>Handler not triggered. <br/> One or both of the thresholds was not met "
				str +="<br/> ---  MOVE THE IMAGE BACK TO THE MIDDLE OF THE SCREN! ";
				image_area_animation__move_image_back_to_center();
			}
			if (phase=="end"){
				str +="<br/>Handler was triggered.";
				str +="<br/> ---  MOVE THE IMAGE OFF SCREEN";
				if( direction === "left"){
					str += "-- offstage LEFT! ";
					image_area_animation__move_image_offscreen_left();
				}else{
					str += "-- offstage right! ";
					image_area_animation__move_image_offscreen_right();
				}
				// TEST TEST TEST 
				str += "<br/> - distance = "+distance ; 
			}
			// output 
			console.log( str );
			$("#console_area").html( str );


	    },
	    threshold: 20,
	    maxTimeThreshold:5000,
	    fingers:'all'
	});

}


//////// image area animations : 


// animate-move image offscreen RIGHT 
var image_area_animation__move_image_offscreen_right = function(){
	console.log(">>>> image_area_animation__move_image_offscreen_right" );

	image_central_area.animate( {
		"left" : $("body").width(),
	}, animation_speed, function(){ 					
					click_YES_button();
					quickly_reset_image_area_position();
		  } );
}

// animate-move image offscreen LEFT 
var image_area_animation__move_image_offscreen_left = function(){
	console.log(">>>> image_area_animation__move_image_offscreen_left" );

	image_central_area.animate( {
		"left" : -1* $("body").width(),
	}, animation_speed, function(){ 
					click_NO_button();
					quickly_reset_image_area_position();
		  } );
}


// animate-move image back to the center 
var image_area_animation__move_image_back_to_center = function(){
	console.log(">>>> image_area_animation__move_image_back_to_center" );

	image_central_area.animate( {
		"left" : 0,
	}, animation_speed, function(){ } );
}



var quickly_reset_image_area_position = function(){

	image_central_area.css("left", "unset");
}





//////// different effects of buttons : 


///// selection/results screen mode?

//// set mode to selection mode 
var set_curr_mode_to__choosing = function(){
	console.log(">>>> set_curr_mode_to__choosing()");

	current__choosing_or_seeingResults__mode = mode__choosing;
}

//// set mode to results mode 
var set_curr_mode_to__seeing_results = function(){
	console.log(">>>> set_curr_mode_to__seeing_results()");

	current__choosing_or_seeingResults__mode = mode__seeing_results;
}


////// results : yes or no mode? 

//// yes result mode 
var set_curr_selection_mode_to__YES = function(){
	console.log(">>>> set_curr_selection_mode_to__YES()");

	current_voting_screen_mode = yes_vote__screen;
}

//// no result mode 
var set_curr_selection_mode_to__NO = function(){
	console.log(">>>> set_curr_selection_mode_to__NO()");

	current_voting_screen_mode = no_vote__screen;
}




//// advance current choosing screen id 

var advance_current_screen_id = function(){
	console.log(">>>> advance_current_screen_id() ");

	current_choice_screen__as_i_in_list_of_choice_screens++ ;

	current_choice_screen__as_i_in_list_of_choice_screens = current_choice_screen__as_i_in_list_of_choice_screens % curr_meta_data_objects.length;

	console.log("---- current_choice_screen__as_i_in_list_of_choice_screens : "+current_choice_screen__as_i_in_list_of_choice_screens );

}



//////// mechanisms : - which is the next screen to see? 

//// set up list of screens to go though
/*
	- could be in linear or random order … 
*/


//// pick next screen 



var setup_relevant_screen_according_to_parameters = function(){
	console.log(">>>> setup_relevant_screen_according_to_parameters() ");
	console.log("--- current__choosing_or_seeingResults__mode : "+current__choosing_or_seeingResults__mode );

	// screen view : selecting or results showing 
	if( current__choosing_or_seeingResults__mode === mode__choosing ){

		// set relevant buttons 
		setup_buttons_for__selection_screen();

		// show relevant data for results screen
		show_relevant_data_for__choosing_screen();

	}
	else{

		// set relevant buttons 
		setup_buttons_for__results_screen();

		// insert data 
		show_relevant_data_for__results_screen()

	}
}





////////// show data 


var show_relevant_data_for__choosing_screen = function(){
	console.log(">>>> show_relevant_data_for__choosing_screen() ");

	// set image
	image_image.css("background-image", "url("+curr_meta_data_objects[ current_choice_screen__as_i_in_list_of_choice_screens ].imageurl+")")

	// set main image text 
	text_area__main.html("<span class='bold_weight_text'> "+curr_meta_data_objects[ current_choice_screen__as_i_in_list_of_choice_screens ].introtext+" </span>" );

	// set image sub text () * 2 ?)
	text_area__sub.html( "<i> <span style='font-size:14px'> - Streichen nach rechts für JA, und nach links für NO. <br/> Sehen Sie, was die Parteien gewählt haben. </i> </span>" );

	// finally set the text area transparencies
	text_area__main.css("background-image", "url(images/transparentBackground_90pc.png)" )
	text_area__sub.css("background-image", "url(images/transparentBackground_70pc.png)" )	
}



var show_relevant_data_for__results_screen = function(){
	console.log(">>>> show_relevant_data_for__results_screen() ");
	console.log("---- current_voting_screen_mode : "+current_voting_screen_mode );

	// set image
	var relev_image = null;

	// set text?!
	var relevant_text = null;


	if( current_voting_screen_mode === yes_vote__screen ){

		// set image
		image_image.css("background-image", "url("+curr_meta_data_objects[ current_choice_screen__as_i_in_list_of_choice_screens ].imageurl+")")

		// set main image text 
		text_area__main.html( curr_meta_data_objects[ current_choice_screen__as_i_in_list_of_choice_screens ].introtext );

		// set image sub text () * 2 ?)
		text_area__sub.html( "<span class='bold_weight_text'> JA </span> stimmte : <span class='bold_weight_text'> "+( curr_meta_data_objects[ current_choice_screen__as_i_in_list_of_choice_screens ].jatext+" </span> " ) );

	}else{

		// set image
		image_image.css("background-image", "url("+curr_meta_data_objects[ current_choice_screen__as_i_in_list_of_choice_screens ].imageurl+")")

		// set main image text 
		text_area__main.html( curr_meta_data_objects[ current_choice_screen__as_i_in_list_of_choice_screens ].introtext );

		// set image sub text () * 2 ?)
		text_area__sub.html( "<span class='bold_weight_text'> NEIN </span> stimmte : <span class='bold_weight_text'> "+( curr_meta_data_objects[ current_choice_screen__as_i_in_list_of_choice_screens ].neintext+" </span> " ) );

	}

	// finally set the text area transparencies
	text_area__main.css("background-image", "url(images/transparentBackground_70pc.png)" )
	text_area__sub.css("background-image", "url(images/transparentBackground_90pc.png)" )
	
}



//// [ ANALYTICS ] make some statistics

var ping_server_with_current_screen_num = function(){

	console.log("---- ping_server_with_current_screen_num() ");

		// contact php script with status 
	$.get( "http://sourisr.kapsi.fi/boras5/save_url_test_01.php?"+current_choice_screen__as_i_in_list_of_choice_screens, function( data ) {
	  console.log("\n ------ server pinged - data retrieved : |"+data+"|" );
	});

}




/////// ---------- [REMOTE] DATA FETCHING & PARSING [ NEW ]


//// FETCH DATA 

var fetch_text_data_from_remote_server = function(){

	console.log(">>>> fetch_text_data_from_remote_server() | url : |"+remote_data_url+"|" );

	fetch( remote_data_url, /* { mode: 'no-cors' } */ )
		.then( resp => resp.text() )
		.then( text => {
			 console.log("-- GOT LONGER DATA -> length === "+text.length ); 
			 // window.longer_data = body;
			 window.raw_fetched_remote_metadata_text_file = text;					 

			//// AND THEN :

			// now parse the data 
			parse_fetched_data();

			////// setup buttons? 
			bind_buttons_to_variables();
			bind_image_and_text_divs_to_variables();
			setup_buttons__INITIALLY__for__all_screens();
			// for er... swiping… 
			setup_swipe_functionality();

			////// initialise 
			show_relevant_data_for__choosing_screen();

	} );

}



//// PARSE DATA 

var parse_fetched_data = function(){

	console.log(">>>> parse_fetched_data() - original length |"+raw_fetched_remote_metadata_text_file.length+"|");


	//// split the text by line
	intxt_split_by_line = raw_fetched_remote_metadata_text_file.split("\n");

	//
	console.log("--- split the text by newline and got |"+intxt_split_by_line.length+"| lines " );


	// fill this… with meta-data objects
	curr_meta_data_objects = [];

	var current_meta_data_obj = {};
	var current_meta_data_obj__completeness_score = 0;


	// loop and parse 

	for( var i = 0; i < intxt_split_by_line.length; i++ ){

		console.log("--- -- parsing line #"+i+" : |"+intxt_split_by_line[i]+"|" );

		//// figure out which kind of line it is

		// try splitting the line by "]"
		curr_line_split_by_hard_bracket = intxt_split_by_line[i].split("]");

		//
		if( curr_line_split_by_hard_bracket.length > 1 ){

			console.log("--- --- - curr line splits by ]");

			//// check if it's a image url 
			if( curr_line_split_by_hard_bracket[0] === "[introtext" ){

				curr_line_trimmed = curr_line_split_by_hard_bracket[1].trim();
				console.log("--- --- --- this line is a introtext : |"+curr_line_trimmed+"|");

				current_meta_data_obj[ "introtext" ] = curr_line_trimmed;

			} // is it a yes swipe text?
			//// check if it's a image url 
			else if( curr_line_split_by_hard_bracket[0] === "[imageurl" ){

				curr_line_trimmed = curr_line_split_by_hard_bracket[1].trim();
				console.log("--- --- --- this line is an image url : |"+curr_line_trimmed+"|");

				current_meta_data_obj[ "imageurl" ] = curr_line_trimmed;

			} // is it a yes swipe text?
			else if( curr_line_split_by_hard_bracket[0] === "[jatext" ){

				curr_line_trimmed = curr_line_split_by_hard_bracket[1].trim();
				console.log("--- --- --- this line is an JA swipe text  : |"+curr_line_trimmed+"|");

				current_meta_data_obj[ "jatext" ] = curr_line_trimmed;

			} // is it a no swipe text?
			else if( curr_line_split_by_hard_bracket[0] === "[neintext" ){

				curr_line_trimmed = curr_line_split_by_hard_bracket[1].trim();
				console.log( "--- --- --- this line is an NEIN swipe text : |"+curr_line_trimmed+"|");

				current_meta_data_obj[ "neintext" ] = curr_line_trimmed;
			}

		}


		// // // END OF LOOP : is the meta-data object complete? 
		curr_meta_data_obj__num_of_keys = Object.keys( current_meta_data_obj ).length ;
		console.log("--- curr_meta_data_obj__num_of_keys = "+curr_meta_data_obj__num_of_keys );
		console.log("\n current meta data object looks like this : ");
		console.log( JSON.stringify( current_meta_data_obj )+"\n" );
		console.log( "\n" );

		// now check if the object is complete… 
		if( curr_meta_data_obj__num_of_keys === 4 ){

			console.log("||| end of parsing loop : curr obj has enough keys to make an object "+Object.keys( current_meta_data_obj ).length+" || adding curr oject to out meta data objects array and staring an new object" );

			// deep copy first :) 
			curr_meta_data_objects.push( JSON.parse( JSON.stringify( current_meta_data_obj ) ) );

			// reset the object 
			current_meta_data_obj = {};
		}		

	}


	//// go line-by-line and parse the text 

		// if curr_line.slice(0,1) === "#"
		// // make new meta data object 

		// split by "]"
		// // if split_text.length > 2 
		// // if split_text[0] === "[ja":
		// // //  curr_meta_data_obj.ja_data = split_text[0]

console.log("|||| END OF PARSING - got |"+curr_meta_data_objects.length+"| meta data objcts in the curr_meta_data_objects :) ");
}




//////////////////////////// initialisation
//////////////////////////// initialisation
//////////////////////////// initialisation


//
console.log("hellow Demo.app scrip! ");


//
// $( document ).ready( function(){ 
$( window ).on( 'load', function(){ 	

	console.log("--- document loaded! ");

	console.log("---------- curr_meta_data_objects : ");
	console.log( curr_meta_data_objects );

	//// FETCH (REMOET) META DATA! 
	fetch_text_data_from_remote_server();

	//// PARSE REMOTE DATA INTO LOCAL META DATA 

/*
	//// AND THEN :

	////// setup buttons? 
	bind_buttons_to_variables();
	bind_image_and_text_divs_to_variables();
	setup_buttons__INITIALLY__for__all_screens();
	// for er... swiping… 
	setup_swipe_functionality();

	////// initialise 
	show_relevant_data_for__choosing_screen();
*/

	// ping the server- at the start 
	// // ping_server_with_current_screen_num();



});
