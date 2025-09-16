package com.github.Nayan_Mudewar.orgaNize.exception;

public class UserNotFoundException extends RuntimeException{
  public UserNotFoundException(String message){
      super(message);
  }
}
