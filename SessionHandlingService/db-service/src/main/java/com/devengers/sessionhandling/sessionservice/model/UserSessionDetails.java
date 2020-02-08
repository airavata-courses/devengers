package com.devengers.sessionhandling.sessionservice.model;

import java.util.List;

public class UserSessionDetails {

    private String userName;
    private List<String> quotes;

    public UserSessionDetails() {
    }

    public UserSessionDetails(String userName, List<String> quotes) {
        this.userName = userName;
        this.quotes = quotes;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<String> getQuotes() {
        return quotes;
    }

    public void setQuotes(List<String> quotes) {
        this.quotes = quotes;
    }
}
