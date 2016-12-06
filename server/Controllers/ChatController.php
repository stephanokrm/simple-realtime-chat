<?php

include_once __DIR__ . '/../Services/Session.php';
include_once __DIR__ . '/../Services/Response.php';

class ChatController {

    public function index() {
        $messages = [];
        if (Session::has('messages')) {
            $messages = Session::get('messages');
        }
        Response::json($messages);
    }

    public function store($data) {
        $messages = [];
        if (Session::has('messages')) {
            $messages = Session::get('messages');
        }
        array_push($messages, $data);
        Session::put('messages', $messages);
    }

}
