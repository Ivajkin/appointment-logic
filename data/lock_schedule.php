<?
    $success = false;
    if(copy("SCHEDULE_DATA.html", "SCHEDULE_DATA.html.last_backup")) {
         if(copy("SCHEDULE_DATA.html", "SCHEDULE_DATA2.htm")) {
  
if(rename("SCHEDULE_DATA.html", "SCHEDULE_DATA.html.locked")) {
      
            $success = true;
        }
    }
     }

    if($success) {
        echo "success";
    } else {
        echo "Error during locking of SCHEDULE_DATA";
    }
?>
