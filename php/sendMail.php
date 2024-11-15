<?php
require './../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

const RECAPTCHA_VERIFICATION_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify";

$recaptchaResponse = $_POST["g-recaptcha-response"];

if(!isset($recaptchaResponse) || empty($recaptchaResponse)) {
    http_response_code(400);
    echo json_encode([
        "message" => "ReCAPTCHA no fue resuelto. Por favor, intente de nuevo."
    ]);
    exit;
}

// Load .env file and environment variables
$dotenv = Dotenv::createImmutable(__DIR__, "./../.env");
$dotenv->load();

$smtpHost = $_ENV['SMTP_HOST'];
$smtpUser = $_ENV['SMTP_USER'];
$smtpPassword = $_ENV['SMTP_PASSWORD'];
$smtpPort = $_ENV['SMTP_PORT'];
$secretKey = $_ENV['GOOGLE_RECAPTCHA_V2_SECRET_KEY'];

// Verify recaptcha
$verifyResponse = file_get_contents(
    RECAPTCHA_VERIFICATION_ENDPOINT. "?secret=" . $secretKey . "&response=" . $recaptchaResponse);
$response = json_decode($verifyResponse);

if(!$response->success) {
    http_response_code(403);
    echo json_encode([
        "message" => "La verificación del ReCAPTCHA falló. Por favor, intente de nuevo."
    ]);
    exit;
}

// Get data from the request
$contactNumber = $_POST["contact_number"];
$userName = $_POST["user_name"];
$userEmail = $_POST["user_email"];
$userMessage = $_POST["user_message"];

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;             //Enable verbose debug output
    $mail->isSMTP();                                   //Send using SMTP
    $mail->SMTPAuth   = true;                          //Enable SMTP authentication
    
    $mail->Host       = $smtpHost;                     //Set the SMTP server to send through
    $mail->Username   = $smtpUser;                     //SMTP username
    $mail->Password   = $smtpPassword;                 //SMTP password
    
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;   //Enable implicit TLS encryption
    $mail->Port       = $smtpPort;                     //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom($smtpUser, 'Felrod S.R.L.');
    $mail->addAddress($userEmail);           //Add a recipient
    $mail->addReplyTo($userEmail);
    $mail->addBCC($smtpUser);

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Su mensaje #' . $contactNumber . ' fue enviado correctamente.';
    $mail->Body    = <<<HTML
    <p>Hola, {$userName}. Gracias por contactarnos. Le informamos que hemos recibido su mensaje:</p>
    <blockquote style="font-style: italic; color: #555;">
        {$userMessage}
    </blockquote>
    <p>Te responderemos pronto.</p>
    <p>Atentamente,<br>El equipo de Felrod.</p>
    HTML;

    $mail->send();

    http_response_code(200);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "message" => $e->getMessage()
    ]);
}
?>