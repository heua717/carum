package com.a101.carum.common.exception;

public class UnAuthorizedException extends RuntimeException{
    public UnAuthorizedException(String string){
        super(string);
    }
}
