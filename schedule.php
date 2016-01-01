<div id="SCHEDULE_DATA" style="display: none;">
	 <?
 	include("appointment-logic/data/SCHEDULE_DATA.html");
?>
</div>
<div id="schedule-loading-bar">
</div>
 <a class="popup-modal" id="appointment-start" href="#appointment-popup-window">Записаться</a><br>
<div id="appointment-popup-window" class="mfp-hide white-popup-block">
	<h1> <a href="http://cure-aids.nichost.ru/personal/"> <span style="font-size: 12pt; color: #00a650;">Вернуться на сайт</span> </a>
	<?
            // Проверка, заблокирован ли файл записи
            if(file_exists("appointment-logic/data/SCHEDULE_DATA.html")) {
                echo "<p style=\"font-size: 14pt;\">В данный момент запись возможна по телефону 47-56-03 с 08-00 до 12-00 в рабочие дни.</p>";
            } else {
                echo "<p style=\"font-size: 14pt;\">Онлайн запись на данный момент закрыта.</p><p style=\"font-size: 12pt;\">Блокировка записи устанавливается на некоторое время в связи с  редактированием. Возобновление записи будет произведено в течение 40 минут.  </p>"   ;
 
         }
        ?> </h1>
	<h1> <a href="http://cure-aids.nichost.ru/personal/"> <span style="font-size: 14pt;"> <span style="font-size: 20pt;">*</span>
	- Важная информация для родителей </span> </a> </h1>
	<table class="doctor-select-screen" height="6" width="639">
	<tbody class="schedule-doctor-selector">
	</tbody>
	</table>
	<p>
 <a href="http://антиспид27.рф/personal/"><br>
 </a>
	</p>
	<p>
 <a href="http://антиспид27.рф/personal/"><br>
 <span style="font-size: 14pt;"> </span></a><span style="font-size: 14pt;"> </span>
	</p>
 <span style="font-size: 14pt;"> </span>
	<p>
 <span style="font-size: 14pt;"> </span><a class="popup-modal-dismiss" href="#"><span style="font-size: 14pt;"> </span></a><span style="font-size: 14pt;"> </span>
	</p>
 <span style="font-size: 14pt;"> </span>
	<p>
 <span style="font-size: 14pt;"> </span><a href="http://cure-aids.nichost.ru/personal/"><span style="color: #00a650; font-size: 13pt;">Вернуться на сайт.</span></a>
	</p>
 <a class="popup-modal-dismiss" href="#"> </a>
	<p>
	</p>
	<div id="print-popup-window" class="mfp-hide white-popup-block">
		<h1>Талон на посещение специалиста по предварительной записи </h1>
		 &nbsp; &nbsp; &nbsp; КГБУЗ ЦПБСИЗ МЗ ХК ( переулок Пилотов 2, г. Хабаровск)<br>
		<p>
 <b>Уважаемые пациенты, просим Вас обязательно ознакомиться с перечисленной ниже информацией : </b><br>
 <b>1)&nbsp; Предварительно Вы можете позвонить (за день&nbsp; до приема) по тел. 47-56-03</b> ,с целью уточнения информации&nbsp; режиму работы врача ( прием может быть отменен по объективным причинам - болезнь врача, выездная проверка). <br>
 <b>2) В день посещения Вам необходимо подойти в учреждение&nbsp; заранее</b> (для оформления договора медицинских услуг&nbsp; - посещение врача). <br>
 <b>3) Работает система электронной очереди </b>.Вам необходимо взять&nbsp; в терминале талон (услуга- посещение врача по предварительной записи) и ожидать своей очереди. <br>
 <b>4) На прием к врачу при себе иметь следующие документы: </b><br>
			 - Направление от лечащего врача ,&nbsp; результаты анализов (при наличии) , выписку из амбулаторной карты (мед.организации , где Вы наблюдаетесь)&nbsp; или&nbsp; этапный эпикриз. <br>
			 - Паспорт *<sup>1</sup>, полис медицинского страхования *<sup>2</sup>,СНИЛС *<sup>3</sup> <br>
			 - <b>Для&nbsp; лиц, не достигших возраста&nbsp; 15 лет -свидетельство о рождении * </b><br>
			 Перечисленные документы необходимы для заполнения медицинской документации , в том числе "Медицинская карта амбулаторного больного" , учетная форма&nbsp; №&nbsp; 25/у-04 титульный лист:&nbsp; *<sup>1</sup> Паспорт строка 2- 6;&nbsp; *<sup>2</sup> ОМС строка 7,9&nbsp; *<sup>3</sup> СНИЛС строка 8 <br>
 <span style="font-size: 10pt;">Основание: Приказ Минздравсоцразвития России от 15.12.2014 N 834н &nbsp; "Об&nbsp; утверждении унифицированных форм медицинской документации, используемых в медицинской организации, оказывающих медицинскую помощь в амбулаторных условиях, и порядков по их заполнению". </span><br>
 <b>5) Обращаем Ваше внимание на необходимость оформления письменного информирования согласия на медицинское вмешательство.</b>Согласие оформляется при каждом обращении за медицинской помощью. <br>
 <b>Медицинское вмешательство</b> - <span style="font-size: 10pt;">консультативный прием специалистов, включая опрос, в том числе выявление жалоб, сбор анамнеза, осмотр, в том числе пальпация, перкуссия, аускультация, риноскопия, фарингоскопия, непрямая ларингоскопия, антропометрические исследования, термометрия, тонометрия, исследование функций нервной системы (чувствительной и двигательной сферы), забор крови из периферической вены, диагностические, лабораторные исследования, функциональная диагностика УЗИ, Эластография . </span><br>
 <b>6) В отношении лиц, не достигших возраста 15 лет *,&nbsp;</b> информированное добровольное согласие на медицинское вмешательство дает один из родителей или иной законный представитель. При оформлении согласия указываются ФИО законного представителя, паспортные данные и родственные отношения.Законным представителем несовершеннолетнего лица является один из родителей или усыновитель&nbsp;или попечитель. *&nbsp; Законный представитель должен иметь при себе паспорт, свидетельство о рождении ребенка, документы подтверждающие право опеки, попечительства. *
		</p>
 <br>
		<p>
			 <!--Дата: -->
		</p>
		<div class="date-time">
 <strong>...</strong>
		</div>
		 Врач: <strong>
		<div class="doctor-name">
			 ...
		</div>
 </strong>
		Пациент:
		<div class="patient-name">
			 ...
		</div>
 <strong>Уникальный код:
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
			&#10003;Запись завершена! </strong><br>
 <a class="btn btn-default btn-lg" id="end-appintment-reload" href="/personal/zapis-na-priem.php"> <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
			Завершить запись </a> <a class="btn btn-default" id="repeat-print" href="#"> <span class="glyphicon glyphicon-print" aria-hidden="true"></span>
			Повторно напечатать талон </a>
		</p>
	</div>
</div>
<script type="text/javascript" src="appointment-logic/main.js"></script>