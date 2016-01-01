<? header('Content-Type: text/html; charset=utf-8'); ?>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <title>Управление расписанием ЦПБСИЗ</title>

    <!-- Bootstrap Core CSS -->
    <link href="style/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS: You can use this stylesheet to override any Bootstrap styles and/or apply your own styles -->
    <link href="style/custom.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Custom Fonts from Google -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&subset=latin,cyrillic" rel="stylesheet" type="text/css">
</head>

<body>
	<!-- Header -->
    <header>
        <div class="header-content">
            <div class="header-content-inner">
                <h1>Управление расписанием</h1>
                <!--
                <p>Старый портал МП ХК закрыт на обновление.</p>
                <a href="https://docs.google.com/forms/d/1VIBI6wk-cls0cDlLiIFPFPdHJiTWsHtZc4JCJstfFjs/viewform" class="btn btn-primary btn-lg">Вступить в МП ХК</a>-->
                <!-- Тип кодирования данных, enctype, ДОЛЖЕН БЫТЬ указан ИМЕННО так -->

                <p>Импортировать расписание:</p>
                <button id="lock" class="btn btn-primary btn-lg">🔒Блокировать расписание</button>
                <div id="schedule_editor">
    				<form enctype="multipart/form-data" action="schedule_file_check_and_upload_script.php" method="POST">
    				    <!-- Поле MAX_FILE_SIZE должно быть указано до поля загрузки файла -->
    				    <input type="hidden" name="MAX_FILE_SIZE" value="20000000" />
    				    <!-- Название элемента input определяет имя в массиве $_FILES -->
    				    <input name="schedule_data_file" class="btn btn-primary " style="margin-left: auto; margin-right: auto; margin-bottom: 20px;" type="file" />
    				    <input type="submit" class="btn btn-primary btn-lg" value="Импортировать" />
    				</form>

                    <button id="unlock" class="btn btn-primary btn-lg">🔓Активировать расписание</button>
                </div>

            </div>
        </div>
    </header>


	<!-- Export Section -->
    <section class="content content-2" id="export-content">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                    <h2 class="section-heading">Экспорт расписания</h2>
                    <a href="data/export_schedule.php" class="btn btn-primary btn-lg">Экспортировать</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Export Section -->
    <section class="content content-3" id="list-doctorsdatabyname-content">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                    <h2 class="section-heading">Список данных по врачам</h2>
                    <div class="doctorsdatabyname-btns">
                        <!--<a href="#doctorsdatabyname" class="btn btn-primary btn-lg">ДУБОТОЛКИНА ЕЛЕНА ВЛАДИМИРОВНА</a>-->
                    </div>
                    <div class="doctorsdatabyname-hidden-data"></div>
                </div>
            </div>
        </div>
    </section>


	<!-- Footer -->
    <footer class="page-footer">

        <!-- Copyright etc -->
        <div class="small-print">
        	<div class="container">
        		<p>Подсистема импорта/экспорта управления расписанием ЦПБСИЗ. Разработано в ООО "Техно Медиа" (С) 2015</p>
        	</div>
        </div>

    </footer>

    <!-- jQuery -->
    <script src="style/jquery-1.11.3.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="style/bootstrap.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="style/jquery.easing.min.js"></script>

    <!-- Custom Javascript -->
    <script src="style/custom.js"></script>




</body></html>
