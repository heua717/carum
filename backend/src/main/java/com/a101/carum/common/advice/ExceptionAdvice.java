package com.a101.carum.common.advice;

import com.a101.carum.common.exception.AccessFailException;
import com.a101.carum.common.exception.LessMoneyException;
import com.a101.carum.common.exception.RefreshFailException;
import com.a101.carum.common.exception.UnAuthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;

@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler({SQLException.class, NoSuchAlgorithmException.class})
    public ResponseEntity handleSQLException(SQLException e) {
        e.printStackTrace();
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({NullPointerException.class, IllegalArgumentException.class})
    public ResponseEntity handleNPE(Exception e) {
        e.printStackTrace();
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UnAuthorizedException.class)
    public ResponseEntity illegalRequestException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public  ResponseEntity duplicatedException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity(HttpStatus.CONFLICT);
    }

    @ExceptionHandler({AccessFailException.class, RefreshFailException.class, LessMoneyException.class})
    public ResponseEntity refreshFailException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity(HttpStatus.PRECONDITION_FAILED);
    }

}
