package com.startingblue.dailypainting.diary.exception;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice("com.startingblue.dailypainting.diary")
public class DiaryExceptionControllerAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({IllegalArgumentException.class})
    public ErrorResponse handleIllegalArgumentException(IllegalArgumentException e) {
        log.error("[exceptionHandle] : {}", e);
        return new ErrorResponse("BAD_REQUEST", "Invalid argument provided", e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(EntityExistsException.class)
    public ErrorResponse handleEntityExistsException(EntityExistsException e) {
        log.error("[exceptionHandle] : {}", e);
        return new ErrorResponse("BAD_REQUEST", "Diary already exists.", e.getMessage());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EntityNotFoundException.class)
    public ErrorResponse handleEntityNotFoundException(EntityNotFoundException e) {
        log.error("[exceptionHandle] : {}", e);
        return new ErrorResponse("NOT_FOUND", "Diary not found", e.getMessage());
    }


    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(InternalError.class)
    public ErrorResponse handleInternalError(InternalError e) {
        log.error("[exceptionHandle] : {}", e);
        return new ErrorResponse("INTERNAL_SERVER_ERROR", "Failed to save diary.", e.getMessage());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ErrorResponse handleGenericException(Exception e) {
        log.error("[exceptionHandle] : {}", e);
        return new ErrorResponse("INTERNAL_SERVER_ERROR", "An unexpected error occurred", e.getMessage());
    }
}
