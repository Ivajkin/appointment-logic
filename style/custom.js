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



	function merge_patients(patients1, patients2) {
		for(var t = 0; t < patients2.length; ++t) {
			patients1.push(patients2[t]);
		}
		return patients1;
	}
	function merge_doctors(specialists) {
		var unique_IDs = {}; var exists = true;
		for(var i = 0; i < specialists.length; ++i)
		if(!unique_IDs[specialists[i].id]) {
			unique_IDs[specialists[i].id] = exists;

			for(var j = i+1; j < specialists.length; ++j) {
				if(specialists[i].id === specialists[j].id) {
					specialists[i].patients = merge_patients(specialists[i].patients, specialists[j].patients);
					specialists.splice(j, 1);
					--j;
				}
			}
		} else alert("Неожиданная ситуация на мерджинге элемента " + i + ". Обнаружен дубликат с id=" + specialists[i].id);/*specialists.splice(i, 1);*/
		return specialists;
	}
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
				//if(patient != '1') {
					var schedule_date_of_the_specialist = patient_data_row_DOM.find('td:nth-child('+date_column+')').text();


					//if(is_up_to_date(schedule_date_of_the_specialist)) {
						specialists.push({
							name: patient_data_row_DOM.find('td:nth-child(11)').text(),
							speciality: patient_data_row_DOM.find('td:nth-child(15)').text(),
							patients: [{
								patient: (patient == "1" ? "-" : patient),
								date: schedule_date_of_the_specialist + ' (' + patient_data_row_DOM.find('td:nth-child(6)').text().toLowerCase() + ')',
								time: [patient_data_row_DOM.find('td:nth-child(3)').text()]
							}],

							id: patient_data_row_DOM.find('td:nth-child(2)').text()
						});
					//}
				//}
			}
			var doctors = merge_doctors(specialists);
			callback(doctors);
		});
	}
	function convert_to_date(date_string_ru) {
		// "01.01.2018" -> Date
		return new Date(date_string_ru.substring(6,10),date_string_ru.substring(3,5),date_string_ru.substring(0,2));
	}
	function show_doctor_data(doctor_data) {
		$("#list-doctorsdatabyname-content .section-heading").text(doctor_data.name);
		  // DOM element where the Timeline will be attached
		  var container = document.getElementById('doctorsdatabyname-visualization');

		  var patients_data = [];
		  var current_id = 1;
		  for(var i = 0; i < doctor_data.patients.length; ++i) {
		  	// Format {patient, date, time[]}
		  	var patient = doctor_data.patients[i];

  		  	for(var j = 0; j < patient.time.length; ++j) {
				var content = "<strong>" + patient.patient + "</strong><br/>" + patient.date + "<br/>" + patient.time[j];
			  	patients_data.push({id: i, content: content, start: convert_to_date(patient.date)});
				++current_id;
			}
		  }
		  // Create a DataSet (allows two way data-binding)
		  var items = new vis.DataSet(
		    /* Format:
				[{id: 1, content: 'item 1', start: '2013-04-20'},
			    {id: 2, content: 'item 2', start: '2013-04-14'},
			    {id: 3, content: 'item 3', start: '2013-04-18'},
			    {id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
			    {id: 5, content: 'item 5', start: '2013-04-25'},
			    {id: 6, content: 'item 6', start: '2013-04-27'}
				]
			*/
			patients_data
		  );

		  // Configuration for the Timeline
		  var options = {};

		  // Create a Timeline
		  var timeline = new vis.Timeline(container, items, options);
		//alert(JSON.stringify(doctor_data));
		// TODO: use modal/non-modal window
		$(".doctorsdatabyname-btns").hide();

	}
	function setup_viewdoctor_btn(btn, doctor_data) {
		btn.click(function() {
			show_doctor_data(doctor_data);
		});
	}
	function create_doctorbutton(button_name, doctor_data) {
		return $(".doctorsdatabyname-btns")
			.append('<a href="#doctorsdatabyname" class="btn btn-primary btn-lg" id="doctor' + doctor_data.id + '">' + button_name + '</a>');
	}
	function create_doctorsbuttons() {
		load_doctors(function(doctors) {
			for(var i = 0; i < doctors.length; ++i) {
				create_doctorbutton(doctors[i].name, doctors[i]);
				setup_viewdoctor_btn($('.doctorsdatabyname-btns a#doctor'+doctors[i].id), doctors[i]);
			}
		});
	}
	function setup_doctorsdatabyname() {
		create_doctorsbuttons();
	}
	setup_doctorsdatabyname();
});
