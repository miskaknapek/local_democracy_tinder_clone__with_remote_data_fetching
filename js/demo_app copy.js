

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

	- make a direct selection of image area, so it doesn't need constant reselecting
	- same for text areas
*/




//////////////////////////// VARIABLES
//////////////////////////// VARIABLES
//////////////////////////// VARIABLES



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

var image_area_outer;
var image_image_outer; 
var text_area__main;
var text_area__sub;


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

	image_area_outer = $("#image_area_outer");
	image_image_outer = $("#image_image_outer");
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

		set_curr_selection_mode_to__NO();

		set_curr_mode_to__seeing_results();

		// setup view according to data 
		setup_relevant_screen_according_to_parameters();		
	});

	//// yes button 
	//
	// should be hidden otherwise, so show it
	yes_button.show()
	// yes button functionality 
	yes_button.click( function(){

		console.log("click : button_yes");

		set_curr_selection_mode_to__YES();

		set_curr_mode_to__seeing_results();

		// setup view according to data 
		setup_relevant_screen_according_to_parameters();
	});

	//// next button … functionality 
	next_button.click( function(){

		console.log("click : button_next");

		advance_current_screen_id();

		set_curr_mode_to__choosing();

		// setup view according to data 
		setup_relevant_screen_according_to_parameters();

	});
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


	$("#outer_outer").swipe( {
		swipeStatus:function(event, phase, direction, distance)
			{
				var str = "";
				if (phase=="move")
					str="You have moved " + distance +" pixels, past 200 and the handler will fire";
				if (phase=="end")
					str="Handler fired, you swiped " + direction;
				// $(this).text(str);
				console.log( str );

				if( direction === "left" ){
					distance = -distance;
				}

				image_image_outer.css("left", distance );
			},
			triggerOnTouchEnd:false,
			threshold: 200,

			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				console.log("--- swipe end! ");
			},		

	});

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

	current_choice_screen__as_i_in_list_of_choice_screens = current_choice_screen__as_i_in_list_of_choice_screens % items.length;

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
	image_image.css("background-image", "url("+items[ current_choice_screen__as_i_in_list_of_choice_screens ].images[0]+")")

	// set main image text 
	text_area__main.html("Fråga : <span class='bold_weight_text'> "+items[ current_choice_screen__as_i_in_list_of_choice_screens ].name+" </span>" );

	// set image sub text () * 2 ?)
	text_area__sub.html( "<i> <span style='font-size:14px'> -Tryck på JA / NEJ så får du se vilka partier som röstade ja/nej i frågan. </i> </span>" );

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
		image_image.css("background-image", "url("+items[ current_choice_screen__as_i_in_list_of_choice_screens ].images[0]+")")

		// set main image text 
		text_area__main.html("Fråga : "+items[ current_choice_screen__as_i_in_list_of_choice_screens ].name );

		// set image sub text () * 2 ?)
		text_area__sub.html( "<span class='bold_weight_text'> JA </span> svarade : <span class='bold_weight_text'> "+( items[ current_choice_screen__as_i_in_list_of_choice_screens ].which_parties_voted_YES_for_this__as_list.join(", ")+" </span> " ) );

	}else{

		// set image
		image_image.css("background-image", "url("+items[ current_choice_screen__as_i_in_list_of_choice_screens ].images[0]+")")

		// set main image text 
		text_area__main.html("Fråga : "+items[ current_choice_screen__as_i_in_list_of_choice_screens ].name );

		// set image sub text () * 2 ?)
		text_area__sub.html( "<span class='bold_weight_text'> NEJ </span> svarade : <span class='bold_weight_text'> "+( items[ current_choice_screen__as_i_in_list_of_choice_screens ].which_parties_voted_NO_for_this__as_list.join(", ")+" </span> " ) );

	}

	// finally set the text area transparencies
	text_area__main.css("background-image", "url(images/transparentBackground_70pc.png)" )
	text_area__sub.css("background-image", "url(images/transparentBackground_90pc.png)" )
	
}











//////////////////////////// initialisation
//////////////////////////// initialisation
//////////////////////////// initialisation


//
console.log("hellow Demo.app scrip! ");


//
$( document ).ready( function(){ 

	console.log("--- document loaded! ");

	console.log("---------- items : ");
	console.log( items );


	////// setup buttons? 
	bind_buttons_to_variables();
	bind_image_and_text_divs_to_variables();
	setup_buttons__INITIALLY__for__all_screens();
	// for er... swiping… 
	setup_swipe_functionality();

	////// initialise 
	show_relevant_data_for__choosing_screen();

});
