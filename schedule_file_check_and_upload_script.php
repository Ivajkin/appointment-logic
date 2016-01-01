<?php
	// В PHP 4.1.0 и более ранних версиях следует использовать $HTTP_POST_FILES
	// вместо $_FILES.

	//$uploaddir = '/var/www/uploads/';
	$uploaddir = './data/';
	//$uploadfile = $uploaddir . basename($_FILES['schedule_data_file']['name']);
	$uploadfile = $uploaddir . basename('SCHEDULE_DATA.html.locked');

	if(!rename("data/SCHEDULE_DATA.html.locked", "data/SCHEDULE_DATA.html.last_backup")) {
		echo "Ошибка в процессе создания копии последней версии файла перед сохранением новой!";
	}
	
	echo '<pre>';
	if (move_uploaded_file($_FILES['schedule_data_file']['tmp_name'], $uploadfile)) {
	    echo "&#10003; Файл корректен и был успешно загружен.\n\n <br/>";

	} else {
	    echo "Возможная атака с помощью файловой загрузки!\n\n";
	}

	echo '<br/>Некоторая отладочная информация:';
	print_r($_FILES);

	$doc = new DOMDocument();
	$doc->loadHTMLFile("data/SCHEDULE_DATA.html.locked");
	$lines = $doc->getElementsByTagName('tr');
	$lines_count = $lines->length;

	print_r($lines);

	print "</pre>";

	echo "<strong>Количество записей: ".$lines_count."</strong><br/>";

	echo "<p><a href=\"http://антиспид27.рф/personal/appointment-logic/import-export-0285228105812-dashboard.php\">Вернуться на страницу управления расписанием</a></p>";

?>
