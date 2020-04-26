package com.devengers.service.sessionmanagement.controller;

import com.devengers.service.sessionmanagement.model.UserSessionDetail;
import com.devengers.service.sessionmanagement.repository.SessionDetailsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@ComponentScan
@RequestMapping("/rest/db")
public class SessionServiceResource{
	String str ="";
	
	@Autowired
    SessionDetailsRepository quotesRepository;

    public void details(UserSessionDetail user) {
		quotesRepository.save(user);
	}


    
    
	@GetMapping("/{userid}")
    public List<UserSessionDetail> getUserInformation(@PathVariable("userid") final String userid) {
        return quotesRepository.findByuserid(userid);
    }

}
