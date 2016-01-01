// Offset for Site Navigation
$('#siteNav').affix({
	offset: {
		top: 100
	}
})

$(document).ready(function() {
	var lock_schedule, show_editor, unlock_schedule, hide_editor;
	$("#lock").click(function() {
		lock_schedule(show_editor);
	});
	$("#unlock").click(function() {
		unlock_schedule(hide_editor);
	});

	show_editor = function() {
		$("#schedule_editor").show("fast");
		$("#lock").hide();

		$("#export-content").show("fast");
	};
	hide_editor = function() {
		$("#lock").show("fast");
		$("#schedule_editor").hide();

		$("#export-content").hide();
	};
	hide_editor();

	var schedule_data_directory = "/personal/appointment-logic/data/";
	(function() {

		lock_schedule = function(callback) {
			function locking_error() {
				var error_message = "Error during schedule locking";
				alert(error_message);
				throw error_message;
			}
			$.post(schedule_data_directory + "lock_schedule.php", function(data) {
				if(data == "success") {
					callback();
				} else {
					locking_error();
				}
			})
			.error(locking_error);
		};
		unlock_schedule = function(callback) {
			function unlocking_error() {
				var error_message = "Error during schedule unlocking";
				alert(error_message);
				throw error_message;
			}
			$.post(schedule_data_directory + "unlock_schedule.php", function(data) {
				if(data == "success") {
					callback();
				} else {
					unlocking_error();
				}
			})
			.error(unlocking_error)
		};
	}) ();

	function on_schedule_is_locked(callback) {
		function on_file_exists(url, callback) {
			$.get(url).done(callback);
		}
		on_file_exists(schedule_data_directory + "SCHEDULE_DATA.html.locked", callback)
	};
	on_schedule_is_locked(show_editor);

	function load_doctors(callback) {
		$.get("data/export_schedule.php", function(data) {
			$(".doctorsdatabyname-hidden-data").html(data);
			var SCHEDULE_DATA_row = $('#SCHEDULE_DATA tr');
			var lines_count = SCHEDULE_DATA_row.size();
			var specialists = [];
			for(var i = 1; i < lines_count; ++i) {
				var date_column = 4;
				var patient_column = 7;
				//if($('#SCHEDULE_DATA tr:nth-child('+ i +') > td:nth-child('+date_column+')').text()[0] != 'Н') { }
				var patient_data_row_DOM = $('#SCHEDULE_DATA tr:nth-child('+ i +')');
				var patient = patient_data_row_DOM.find('td:nth-child('+patient_column+')').text();
				if(patient == '1') {
					var schedule_date_of_the_specialist = patient_data_row_DOM.find('td:nth-child('+date_column+')').text();


					if(is_up_to_date(schedule_date_of_the_specialist)) {
						specialists.push({
							name: patient_data_row_DOM.find('td:nth-child(11)').text(),
							speciality: patient_data_row_DOM.find('td:nth-child(15)').text(),
							talons: [{
								date: schedule_date_of_the_specialist + ' (' + patient_data_row_DOM.find('td:nth-child(6)').text().toLowerCase() + ')',
								time: [patient_data_row_DOM.find('td:nth-child(3)').text()]
							}],

							id: patient_data_row_DOM.find('td:nth-child(2)').text()
						});
					}
				}
			}
			callback(specialists);
		});
	}
	function create_doctorbutton(button_name, doctor_data) {
		return $(".doctorsdatabyname-btns")
			.append('<a href="#doctorsdatabyname" class="btn btn-primary btn-lg">ДУБОТОЛКИНА ЕЛЕНА ВЛАДИМИРОВНА</a>');
	}
	function setup_doctorbutton_callback(doctor_button) {
		throw "Not implemented yet!";
	}
	function create_doctorsbuttons() {
		load_doctors(function(doctors) {
			for(var i = 0; i < doctors.length; ++i) {
				setup_doctorbutton_callback(
					create_doctorbutton(doctors[i].name, doctors[i])
				);
			}
		});
	}
	function setup_doctorsdatabyname() {
		create_doctorsbuttons();
	}
	setup_doctorsdatabyname();
});
