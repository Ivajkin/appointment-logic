<?php
	// � PHP 4.1.0 � ����� ������ ������� ������� ������������ $HTTP_POST_FILES
	// ������ $_FILES.

	//$uploaddir = '/var/www/uploads/';
	$uploaddir = './data/';
	//$uploadfile = $uploaddir . basename($_FILES['schedule_data_file']['name']);
	$uploadfile = $uploaddir . basename('SCHEDULE_DATA.html.locked');

	if(!rename("data/SCHEDULE_DATA.html.locked", "data/SCHEDULE_DATA.html.last_backup")) {
		echo "������ � �������� �������� ����� ��������� ������ ����� ����� ����������� �����!";
	}
	
	echo '<pre>';
	if (move_uploaded_file($_FILES['schedule_data_file']['tmp_name'], $uploadfile)) {
	    echo "&#10003; ���� ��������� � ��� ������� ��������.\n\n <br/>";

	} else {
	    echo "��������� ����� � ������� �������� ��������!\n\n";
	}

	echo '<br/>��������� ���������� ����������:';
	print_r($_FILES);

	$doc = new DOMDocument();
	$doc->loadHTMLFile("data/SCHEDULE_DATA.html.locked");
	$lines = $doc->getElementsByTagName('tr');
	$lines_count = $lines->length;

	print_r($lines);

	print "</pre>";

	echo "<strong>���������� �������: ".$lines_count."</strong><br/>";

	echo "<p><a href=\"http://��������27.��/personal/appointment-logic/import-export-0285228105812-dashboard.php\">��������� �� �������� ���������� �����������</a></p>";

?>
