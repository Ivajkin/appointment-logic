<div id="SCHEDULE_DATA" style="display: none;">
	 <?
	/*function innerXML($node) {
		return $node->c14n();
	}

 	$doc = new DOMDocument();//"1.0", "utf-8");
 	//$schedule_contents = file_get_contents("SCHEDULE_DATA.html");
	$doc->loadHTMLFile("appointment-logic/data/SCHEDULE_DATA.html");
	//$doc->loadHTML('xml encoding="utf-8" ' . mb_convert_encoding($schedule_contents, 'HTML-ENTITIES', 'UTF-8'));
	$schedule_tables = $doc->getElementsByTagName('table');
	$schedule_table = $schedule_tables[0];
	$schedule_table_content = innerXML($schedule_table);//$schedule_table->textContent;
	$schedule_table_content = iconv('utf-8','windows-1251',$schedule_table_content);
	echo($schedule_table_content);//->saveHTML();
 	//$doc = loadNprepare("SCHEDULE_DATA.html");*/
 	include("appointment-logic/data/SCHEDULE_DATA.html");
?>
</div>
<div id="schedule-loading-bar">
</div>
 <a class="popup-modal" id="appointment-start" href="#appointment-popup-window">����������</a>
<div id="appointment-popup-window" class="mfp-hide white-popup-block">
	<p>
 <span style="font-size: 12pt;"> </span><a href="http://��������27.��/personal/"><span style="font-size: 12pt; color: #ee1d24;">��������� �� ����.</span></a>
	</p>
	<h1>������ �������� ������ � ������, �������������� � ������.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><span style="color: #ee1d24;"> </span></b><br>
 </h1>
	<table class="doctor-select-screen" height="1" width="560">
	<tbody class="schedule-doctor-selector">
	</tbody>
	</table>
	<p>
 <a href="http://��������27.��/personal/"><br>
 </a>
	</p>
	<p>
 <a href="http://��������27.��/personal/"><br>
 <span style="font-size: 14pt;"> </span></a><span style="font-size: 14pt;"> </span>
	</p>
	<p>
 <span style="font-size: 14pt;"> </span><a class="popup-modal-dismiss" href="#"><span style="font-size: 14pt;"> </span></a><span style="font-size: 14pt;"> </span>
	</p>
 <a class="popup-modal-dismiss" href="#"> </a>
	<p>
	</p>
	<div id="print-popup-window" class="mfp-hide white-popup-block">
		<h1> ����� �� ��������� ����������� �� ��������������� ������ � ����� ������ �� ��</h1>
 <strong> � ���� ��������� ���������� ������� � ����� ������� (��� ���������� ������ ���������� ��� ��������� �����) </strong>
		<p>
			 <!--����: -->
		</p>
		<div class="date-time">
 <strong>...</strong>
		</div>
		 ����: <strong>
		<div class="doctor-name">
			 ...
		</div>
 </strong>
		�������:
		<div class="patient-name">
			 ...
		</div>
 <strong>���������� ���:
		<div class="UID">
			 ...
		</div>
 </strong>
		<p>
		</p>
		 <style type="text/css" media="print">
			.dontprint
			{ display: none; }
		</style>
		<p class="print-additional-buttons dontprint">
 <strong class="btn btn-default btn-lg bg-success"> <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
			&#10003;������ ���������! </strong><br>
 <a class="btn btn-default btn-lg" id="end-appintment-reload" href="/personal/zapis-na-priem.php"> <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
			��������� ������ </a> <a class="btn btn-default" id="repeat-print" href="#"> <span class="glyphicon glyphicon-print" aria-hidden="true"></span>
			�������� ���������� ����� </a>
		</p>
	</div>
</div>
<script type="text/javascript" src="appointment-logic/main.js"></script>