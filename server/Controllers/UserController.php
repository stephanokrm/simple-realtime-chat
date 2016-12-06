<?php

include_once __DIR__ . '/../Services/Session.php';
include_once __DIR__ . '/../Services/Response.php';

class UserController {

    public function login($user) {
        Session::setId($user->session);
    }

    public function sessionId() {
        Response::json(Session::getId());
    }

}
