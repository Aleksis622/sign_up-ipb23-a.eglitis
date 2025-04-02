<?php 

$host = "localhost";
$dbname = "sign_up";
$username = "root";
$password = "root";


try{

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username , $password);
// Izveidojam PDo instansi ieklaujot
//Datubazes stilu
//Host
//datubazes nosaukumu
// un character set = utf8

$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// atlauj jeb izmet errorus ja tadi vispar ir

echo "Database connected succesfully! :)<br>";




}catch(PDOException $e){


die("Database connection failed:" . $e->getMessage());



}





















?>