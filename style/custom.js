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
});
