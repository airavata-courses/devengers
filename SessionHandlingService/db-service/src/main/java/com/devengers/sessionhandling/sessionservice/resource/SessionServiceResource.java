package com.devengers.sessionhandling.sessionservice.resource;

import com.devengers.sessionhandling.sessionservice.model.UserSessionDetail;
import com.devengers.sessionhandling.sessionservice.model.UserSessionDetails;
import com.devengers.sessionhandling.sessionservice.repository.SessionDetailsRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/db")
public class SessionServiceResource {

    private SessionDetailsRepository quotesRepository;

    public SessionServiceResource(SessionDetailsRepository quotesRepository) {
        this.quotesRepository = quotesRepository;
    }

    @GetMapping("/{username}")
    public List<String> getQuotes(@PathVariable("username") final String username) {

        return getQuotesByUserName(username);
    }

    @PostMapping("/add")
    public List<String> add(@RequestBody final UserSessionDetails quotes) {

        quotes.getQuotes()
                .stream()
                .map(quote -> new UserSessionDetail(quotes.getUserName(), quote))
                .forEach(quote -> quotesRepository.save(quote));
        return getQuotesByUserName(quotes.getUserName());
    }


    @PostMapping("/delete/{username}")
    public List<String> delete(@PathVariable("username") final String username) {

        List<UserSessionDetail> quotes = quotesRepository.findByUserName(username);
        quotesRepository.delete(quotes);

        return getQuotesByUserName(username);
    }


    private List<String> getQuotesByUserName(@PathVariable("username") String username) {
        return quotesRepository.findByUserName(username)
                .stream()
                .map(UserSessionDetail::getQuote)
                .collect(Collectors.toList());
    }



}
