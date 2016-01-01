<?
    if(rename("SCHEDULE_DATA.html.locked", "SCHEDULE_DATA.html")) {
        echo "success";
    } else {
        echo "Error during unlocking of SCHEDULE_DATA.html";
    }
?>
