"use strict";

$(document).ready(function() {

	function merge_dates(talons) {
		//[{date, time[]}]
		for(var i = 0; i &lt; talons.length; ++i) {
			for(var j = i+1; j &lt; talons.length; ++j) {
				if(talons[i].date=== talons[j].date) {
					//alert("Before concat: " + JSON.stringify(talons));
					talons[i].time = talons[i].time.concat(talons[j].time);
					//alert("After concat: " + JSON.stringify(talons));
					talons.splice(j--, 1);
				}
			}
		}
		return talons;
	}

	function merge_talons(talons1, talons2) {
		for(var t = 0; t &lt; talons2.length; ++t) {
			talons1.push(talons2[t]);
		}

		var talons = merge_dates(talons1);
		return talons;
	}
	/* Проверяем merge_talons */
	(function() {
		var test_result_dates_1 = [{date: "01.01.2016", time:["12:50"]}, {date: "01.01.2016", time:["13:50"]}];
		var test_result_dates_2 = [{date: "01.02.2016", time:["12:50","13:50"]},{date: "01.01.2016", time:["13:50"]}];
		test_result_dates_1 = merge_dates(test_result_dates_1);
		test_result_dates_1 = JSON.stringify(test_result_dates_1);
		test_result_dates_2 = JSON.stringify(test_result_dates_2);
		if(test_result_dates_1 !== test_result_dates_2) {
			throw ("Ошибка в merge_dates: " + test_result_dates_1 + ":" + test_result_dates_2);
		}
	}) ();
	/* Проверяем merge_talons */

	function save_appointment(date, time, success_callback, fail_callback) {
		$.post('appointment-logic/save_appointment.php', {
			patient_data: doctor + '\nПациент: ' + patient_name + ' ' + date_time,
			patient_name: patient_name,
			date: date,
			doctor_name: doctor,
			time: time,
			doctor_id: doctors_by_names[doctor].id
		})
		.done(success_callback)
		.fail(fail_callback);
		/*alert(JSON.stringify({
			patient_data: doctor + '\nПациент: ' + patient_name + ' ' + date_time,
			patient_name: patient_name,
			date: date[0],
			doctor_name: doctor,
			time: time[0]
		}));*/
		//$('#appointment').submit();
	}

	/*
	 *	@schedule_date_of_the_specialist: формат "11.11.2018"
	 */
	function is_up_to_date(schedule_date_of_the_specialist) {
		// Если отсутствует первый символ, добавляем 0, например "1.01.2018" -&gt; "01.01.2018"
		if(schedule_date_of_the_specialist.length == 9) {
			schedule_date_of_the_specialist = 0 + schedule_date_of_the_specialist;
		}
		if(schedule_date_of_the_specialist.length != 10) {
			throw "Неверный формат даты в is_up_to_date";
		}

		var today_date = new Date(); var today_date_n = today_date.getDate(); var today_date_month = today_date.getMonth()+1;
		var schedule_date_of_the_specialist_month = parseInt(schedule_date_of_the_specialist[3]+schedule_date_of_the_specialist[4]);

		//alert('schedule_date_of_the_specialist_month: ' + schedule_date_of_the_specialist_month);
		//alert('today_date_month: ' + today_date_month);

		// Проверяем, актуальная ли дата для записи
		var is_up_to_date = false;
		today_date_month &lt;= schedule_date_of_the_specialist_month;
		if(today_date_month &lt; schedule_date_of_the_specialist_month) {
			is_up_to_date = true;
		} else {
			var schedule_date_of_the_specialist_day = parseInt(schedule_date_of_the_specialist[0]+schedule_date_of_the_specialist[1]);
			if(today_date_month == schedule_date_of_the_specialist_month &amp;&amp; today_date_n &lt; schedule_date_of_the_specialist_day) {
				is_up_to_date = true;
			}
		}

		return is_up_to_date;
	}

	/* Проверяем is_up_to_date */
	(function() {
		var date = new Date();
		var test_date_1 = date.getDate() + "." + date.getMonth() + ".2016";
		var test_date_2 = date.getDate()+4 + "." + (date.getMonth()+1) + ".2016";
		if(is_up_to_date(test_date_1) || !is_up_to_date(test_date_2)) {
			throw ("Ошибка в is_up_to_date");
		}
	}) ();
	/* Проверяем is_up_to_date */

	function merge(specialists) {
		//alert("specialist IN merge: " + JSON.stringify(specialists));

		var unique_IDs = {}; var exists = true;
		for(var i = 0; i &lt; specialists.length; ++i)
		if(!unique_IDs[specialists[i].id]) {
			unique_IDs[specialists[i].id] = exists;

			for(var j = i+1; j &lt; specialists.length; ++j) {
				//alert("specialists[i].id = "+specialists[i].id + "; specialists[j].id = "+specialists[j].id);
				if(specialists[i].id === specialists[j].id) {
					//alert("Same ID so doing merge");

					specialists[i].talons = merge_talons(specialists[i].talons, specialists[j].talons);

					//alert("before splicing: " + JSON.stringify(specialists) + "(j=" + j + ")");
					specialists.splice(j, 1);
					--j;
					//alert("after splicing: " + JSON.stringify(specialists) + "(j=" + j + ")");
				}
			}
		} else alert("Неожиданная ситуация на мерджинге элемента " + i + ". Обнаружен дубликат с id=" + specialists[i].id);/*specialists.splice(i, 1);*/
		//alert("specialist OUT merge: " + JSON.stringify(specialists));
		return specialists;
	}


		var specialists = [];
		/*
			Format:
			[
				{
					name: 'Черникова ЕЛЕНА СЕРГЕЕВНА',
					speciality: 'Гастроэнтеролог',
					talons: [
						{
							date: '8.09.2016 (Понедельник)',
							time: ['10:40', '11:40']
						}
					]
				},
				{
					name: 'Черноног ЛЮДМИЛА ИВАНОВНА',
					speciality: 'Невролог',
					talons: []
				},
			]
		*/

		var print_setup = false;

		var date_time, doctor, patient_name, doctor_id;
		function open_print_page() {
			$('#print-popup-window .date-time').text(date_time);
			$('#print-popup-window .doctor-name').text(doctor);
			$('#print-popup-window .patient-name').text(patient_name);
			$('#print-popup-window .UID').text(Math.round(Math.random()*10000));
			$('#appointment-popup-window').html($('#print-popup-window').html());
			function PrintElem(elem) {
				Popup($(elem).html());
			}

			function Popup(data) {
				var mywindow = window.open('', 'my div', 'height=400,width=600');
				mywindow.document.write('
');
				/*optional stylesheet*/ //mywindow.document.write('');
				mywindow.document.write('');
				mywindow.document.write(data);
				mywindow.document.write('');

				mywindow.document.close(); // necessary for IE &gt;= 10
				mywindow.focus(); // necessary for IE &gt;= 10

				mywindow.print();
				mywindow.close();

				return true;
			}
			PrintElem('#appointment-popup-window');

			//window.print();
			if(!print_setup) {
				print_setup = true;
				$('.print-additional-buttons').show();
				$('#repeat-print').click(open_print_page);
				$('#end-appintment-reload').click(function() {
					location.reload();
				});
			}
		}

		$('.popup-modal').magnificPopup({
			type: 'inline',
			preloader: false,
			focus: '#patient_name',
			modal: true
		});
		$(document).on('click', '.popup-modal-dismiss', function (e) {
			e.preventDefault();
			$.magnificPopup.close();

			location.reload();
		});

		var SCHEDULE_DATA_row = $('#SCHEDULE_DATA tr');
		var lines_count = SCHEDULE_DATA_row.size();
		var specialists = [];
		for(var i = 1; i &lt; lines_count; ++i) {
			var date_column = 4;
			var patient_column = 7;
			//if($('#SCHEDULE_DATA tr:nth-child('+ i +') &gt; td:nth-child('+date_column+')').text()[0] != 'Н') {
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
		//alert(JSON.stringify(specialists));

		//merge([{id:1,talons:[1,2,3]},{id:1,talons:[4,5,6]},{id:1,talons:[7,8,9]},{id:2,talons:[10,11,12]},{id:2,talons:[13,14,15]},{id:3,talons:[16,17,18]}]);
		specialists = merge(specialists);
		//alert(JSON.stringify(specialists));
		//alert(JSON.stringify(specialists));







		var schedule = '';//'<p>Выберите врача (сделайте один  щелчок на фамилии врача).</p>';
		for(var key in specialists) {
			if(specialists[key].talons)
				schedule += '  <a class="doctor-selector" href="javascript:void(0);">'+specialists[key].name+'</a>'+
					specialists[key].speciality + 	'<!--<tr>-->';
		}

		var doctor_selected = false;

		$('.schedule-doctor-selector').html(schedule);

		var talons_by_doctors = {};
		for(var key in specialists)
			talons_by_doctors[specialists[key].name] = specialists[key].talons;

		var doctors_by_names = {};
		for(var key in specialists)
			doctors_by_names[specialists[key].name] = specialists[key];


		$('.doctor-selector').click(function() {
			doctor = $(this).text();

			var schedule = '<form id="appointment" method="post" action="">' +
			    		'<p>Врач: ' + doctor + '</p>' +
				    	'<p><span id="patient_label" class="text_marked">Введите Вашу фамилию, инициалы в графу Пациент</span><br>Пациент: <input style="width: 300px; margin-top: 5px" name="patient_name" id="patient_name" value="" type="text"></p>' +
				    	'<p style="margin-bottom: 15px; margin-top: 20px"><span id="date_label" class="text_marked">Выберите дату и время записи.</span></p>' +
				    	'<div class="time-selector" style="margin: -15px 10px 20px 150px;" id="div_28.09.2016">' +

				    	'<p><input name="send_app" type="hidden"></p><p><input name="doctor_id" id="doctor_id" type="hidden">'+doctor_id+'</p>';
			$('.schedule-doctor-selector').parent().removeClass('doctor-select-screen');
			$('.schedule-doctor-selector').html(schedule);

			function confirm_time_selected() {

				patient_name = $('#patient_name').val();
				while(!patient_name || (patient_name.length &lt; 2)) {
					patient_name = prompt("Пожалуйста, введите ваше ФИО (не менее двух символов)", "");
				}
				document.getElementById('patient_name').value;
				date_time = $(this).attr('id');
				var date = /\d{2}\.\d{2}\.\d{4}/.exec(date_time)[0];
				var time = /\d{2}-\d{2}/.exec(date_time)[0];
				if (confirm('Подтвердите запись на прием в КГБУЗ ЦПБСИЗ МЗ ХК переулок Пилотов 2\nВрач: ' + doctor +
								'\nПациент: '+patient_name+'\n'+ date_time +
								'\nНажмите на кнопку ОК для подтверждения записи.\nНажмите на кнопку Отмена для отмены введенных данных.')) {
								    //document.getElementById('appointment').submit();


								    save_appointment(date, time,
								    	open_print_page,
								    	function() {
								    		if(confirm("К сожалению произошла ошибка записи. Видимо кто-то записался на это время раньше чем вы. Предлагаем вам записаться на другое время" ))
								    		{
								    			location.reload();
								    		} else {
								    			confirm("В случае возникновения ошибок обращайтесь по адресу info@tmedia.pro, а также koptue@mail.ru");
								    			location.reload();
								    		}

								    	});

								}
								else {
								    //window.location.href = '/personal/zapis-na-priem.php';
								}
			}
			$('#patient_name').focus();
			//$('#patient_name').bind("change paste keyup",
			//	function() {
						var talons = '';
						for(var key in talons_by_doctors[doctor]) {
							var date = talons_by_doctors[doctor][key].date;
							talons += '<strong id="date_10:40">' + date + '</strong> <br>';
							for(var key2 in talons_by_doctors[doctor][key].time) {
								var time = talons_by_doctors[doctor][key].time[key2];
								talons += '<input class="time-selector-time" id="Дата: ' + date + '. Время: ' + time + '" name="time" value="' + date + ' ' + time + '" type="radio">' + time + '<br>';
							}
						}
						//talons_by_doctors[doctor][key].date + talons_by_doctors[doctor][key].time;

						//$('.time-selector').html( +
						//		'<input class="time-selector-time" name="time" id="Дата: 28.09.2016 Время: 11:40" value="1443400800" onclick="radio_changed()" type="radio">  11:40<br></div></form>');
						$('.time-selector').html(talons);
						$(".time-selector-time").click(confirm_time_selected);
			//});

		});

		// ??
		//$('#appointment-popup-window').click();
		$('#appointment-start').click();
		$('#schedule-loading-bar').fadeOut(700);



				$('.print-popup-window').magnificPopup({
					type: 'inline',
					preloader: false,
					focus: '#username'
				});
				$(document).on('click', '.popup-modal-dismiss', function (e) {
					e.preventDefault();
					$.magnificPopup.close();
					//location.reload(false);
				});

				$('.print-additional-buttons').hide();
	});
