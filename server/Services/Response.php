<?php

class Response {

    public static function json($values) {
        echo json_encode($values);
        exit();
    }

}
