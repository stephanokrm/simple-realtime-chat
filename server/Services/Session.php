<?php

error_reporting(0);
ini_set('display_errors', 0);

class Session {

    private static function start() {
        session_start();
    }

    public static function put($key, $value = null) {
        self::start();
        $_SESSION[$key] = serialize($value);
    }

    public static function get($key) {
        self::start();
        return unserialize($_SESSION[$key]);
    }

    public static function forget($key) {
        self::start();
        unset($_SESSION[$key]);
    }

    public static function has($key) {
        self::start();
        return isset($_SESSION[$key]);
    }

    public static function setId($id) {
        session_id($id);
        self::start();
    }

    public static function getId() {
        self::start();
        return session_id();
    }

}
