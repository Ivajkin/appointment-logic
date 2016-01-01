<?php
	$logfile = 'data/appointments_log.log';
	if(isset($_POST['patient_data'])) {
		$patient_data = $_POST['patient_data'];
		file_put_contents($logfile, "\npatient_data:".$patient_data, FILE_APPEND);
	}

	if(isset($_POST['patient_name']) &&
		isset($_POST['date']) &&
		isset($_POST['doctor_name']) &&
		isset($_POST['time']) &&
		isset($_POST['doctor_id'])) {

		if(!file_exists("data/SCHEDULE_DATA.html")) {
			header("HTTP/1.0 403 Forbidden");
			die("  сожалению сейчас нет возможности произвести запись. ќнлайн запись на данный момент закрыта. Ѕлокировка записи устанавливаетс€ на некоторое врем€ в св€зи с редактированием. ¬озобновление записи будет произведено в течение 40 минут. ");
		}
		
		$patient_name 	= $_POST['patient_name'];
		$date 			= $_POST['date'];
		$doctor_name 	= $_POST['doctor_name'];
		$time 			= $_POST['time'];
		$doctor_id 			= $_POST['doctor_id'];

	 	$doc = new DOMDocument();
		$doc->loadHTMLFile("data/SCHEDULE_DATA.html");

		$title = $doc->getElementsByTagName("title");
	    if ($title->length > 0) { $title->item(0)->textContent = "saved_schedule_data"; }

		$datetimes = $doc->getElementsByTagName('tr');

		file_put_contents($logfile, "\nData extracted:\n", FILE_APPEND);
		foreach ($datetimes as $tr) {
		//for ($i = 1; $i <= count($datetimes); $i++) {
			//file_put_contents($logfile, "\nLine:\n".$tr->c14n(), FILE_APPEND);
			/*$current_doctor_id 		= $tr->childNodes[1]->textContent;
			$current_date 			= $tr->childNodes[3]->textContent;
			$current_doctor_name 	= $tr->childNodes[10]->textContent;
			$current_time 			= $tr->childNodes[2]->textContent;*/
			$current_doctor_id 		= $tr->childNodes[2]->textContent;
			$current_date 			= $tr->childNodes[6]->textContent;
			$current_doctor_name 	= $tr->childNodes[20]->textContent;
			$current_time 			= $tr->childNodes[4]->textContent;

			//file_put_contents($logfile, "search: ".$date." : ".$doctor_id." : ".$doctor_name." : ".$time."\n", FILE_APPEND);
			//file_put_contents($logfile, "line: ".$current_date." : ".$current_doctor_id." : ".$current_doctor_name." : ".$current_time."\n", FILE_APPEND);

			if($date == $current_date &&
				//$doctor_name == $current_doctor_name &&
				$time == $current_time &&
				$doctor_id == $current_doctor_id) {
					file_put_contents($logfile, "Found line: ".$current_date." : ".$current_doctor_name." : ".$current_doctor_id." : ".$current_time."\n", FILE_APPEND);

					if($tr->childNodes[12]->textContent == "1") {
						$tr->childNodes[12]->textContent = $patient_name;
					} else {
						header("HTTP/1.0 403 Forbidden");
						die("ќшибка блокировки: это врем€ уже зан€л другой пациент.");
					}

			}
		}
		$doc->saveHTMLFile("data/SCHEDULE_DATA.html");


	}

?>