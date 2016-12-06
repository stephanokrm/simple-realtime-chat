<?php

$route = filter_input(INPUT_GET, 'route', FILTER_SANITIZE_STRING);
$postdata = file_get_contents("php://input");
$post = json_decode($postdata);

$parameters = explode('@', $route);
$controller = $parameters[0];
$method = $parameters[1];

include_once 'Controllers/' . $controller . '.php';

if (class_exists($controller)) {
    $controller = new $controller();
    if (method_exists($controller, $method)) {
        $post ? $controller->$method($post) : $controller->$method();
    }
}



