package com.startingblue.dailypainting.diary.exception;

import lombok.Getter;

@Getter
public class ErrorResponse {

    private String code;
    private String detail;
    private String message;

    public ErrorResponse(String code, String detail, String message) {
        this.code = code;
        this.detail = detail;
        this.message = message;
    }
}
