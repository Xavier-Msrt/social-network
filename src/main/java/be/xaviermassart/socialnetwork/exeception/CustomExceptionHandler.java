package be.xaviermassart.socialnetwork.exeception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(BadAuthenticationCredentialException.class)
    public ResponseEntity<Object> handleBadAuthenticationCredentialException() {
        return ResponseEntity.badRequest().build();
    }
}
